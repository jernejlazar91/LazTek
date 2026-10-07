import {defineField, defineType, type FieldDefinition, type InitialValueResolverContext} from 'sanity'
import catalogData from '../content/pages.json'
import {PageImageInput} from '../components/PageImageInput'

type Value = string | number | boolean | null | Value[] | {[key: string]: Value}
type EditorField = {name: string; title: string; kind: string; value: Value; preview?: string; legacy?: string}
export type EditorPage = {path: string; title: string; type: string; id: string; seoTitle: string; seoDescription: string; groups: {name: string; title: string; fields: EditorField[]}[]}
export const websitePages = catalogData as unknown as EditorPage[]
const names: Record<string, string> = {title:'Naslov',text:'Besedilo',description:'Opis',eyebrow:'Napis nad naslovom',label:'Oznaka',value:'Vrednost',note:'Opomba',alt:'Opis slike (ALT)',caption:'Podpis slike',action:'Besedilo gumba',href:'Povezava',url:'Povezava',question:'Vprašanje',answer:'Odgovor',name:'Naziv',use:'Uporaba',image:'Fotografija',subtitle:'Podnaslov',items:'Kartice',summary:'Povzetek',tag:'Oznaka',unit:'Enota',family:'Družina materiala',tags:'Oznake za filtre',profile:'Primerjalni profil',bestFor:'Primerno za',examples:'Primeri uporabe',properties:'Lastnosti',process:'Proces',watchOut:'Omejitve',featuredImage:'Naslovna fotografija',featuredAlt:'Opis fotografije',stages:'Koraki projekta'}
function object(value: Value): value is {[key: string]: Value} {return Boolean(value) && typeof value === 'object' && !Array.isArray(value)}

function initial(value: Value, index = 0): Value {
  if (Array.isArray(value)) return value.map((item, i) => {
    if (Array.isArray(item)) return {_type:'row', _key:`row${i}`, tupleRow:true, sourceIndex:i, ...Object.fromEntries(item.map((v,j)=>['c'+j, initial(v)]))}
    const result = initial(item, i)
    return object(result) ? {...result, _type:'item', _key:`item${i}`, sourceIndex:i} : result
  })
  if (object(value)) {
    if (value.__image === true) return {_type:'image',localPreview:value.preview}
    return Object.fromEntries(Object.entries(value).map(([key,v]) => [key, initial(v,index)]))
  }
  return value
}

function field(name: string, title: string, value: Value, imagePreview?: string): FieldDefinition {
  if (imagePreview || object(value) && value.__image === true) return defineField({name,title,type:'image',options:{hotspot:true,...{defaultPreview:imagePreview || (object(value) ? value.preview : '')}}, components:{input:PageImageInput},fields:[{name:'localPreview',type:'string',hidden:true}]})
  if (Array.isArray(value)) {
    const sample = value[0] ?? ''
    if (Array.isArray(sample)) return defineField({name,title,type:'array',of:[{type:'object',name:'row',title:'Vrstica',fields:[
      {name:'tupleRow',type:'boolean',hidden:true,initialValue:true}, {name:'sourceIndex',type:'number',hidden:true},
      ...sample.map((v,i)=>field('c'+i,i===0?'Podatek':`Stolpec ${i+1}`,v)),
    ],initialValue:{tupleRow:true},preview:{select:{title:'c0',subtitle:'c1'}}}]})
    if (object(sample)) return defineField({name,title,type:'array',of:[{type:'object',name:'item',title:'Element',fields:[
      {name:'sourceIndex',type:'number',hidden:true}, ...Object.entries(sample).map(([key,v])=>field(key,names[key]||key,v)),
    ], preview:{select:{title:'title',label:'label',name:'name',question:'question',text:'text'},prepare:({title,label,name,question,text})=>({title:title||label||name||question||text||'Element'})}}]})
    return defineField({name,title,type:'array',of:[{type:typeof sample==='number'?'number':'string'}]})
  }
  if (object(value)) return defineField({name,title,type:'object',options:{collapsible:true,collapsed:false},fields:Object.entries(value).map(([key,v])=>field(key,names[key]||key,v))})
  if (typeof value==='number') return defineField({name,title,type:'number'})
  if (typeof value==='boolean') return defineField({name,title,type:'boolean'})
  const isUrl = name==='href'||name==='url'||typeof value==='string'&&/^(\/|#|https?:\/\/|mailto:|tel:)/.test(value)
  if (isUrl) return defineField({name,title,type:'string',validation:Rule=>Rule.custom(v=>!v || /^(\/(?!\/)|#|https?:\/\/|mailto:|tel:)/i.test(String(v))&&!/[\u0000-\u001f]/.test(String(v)) || 'Uporabi /pot, #sidro, https://, mailto: ali tel:')})
  return defineField({name,title,type:typeof value==='string'&&value.length>110?'text':'string',...(typeof value==='string'&&value.length>110?{rows:3}:{})})
}

export async function pageInitialValue(page: EditorPage, context: InitialValueResolverContext) {
  const result: Record<string, unknown> = {title:page.title,path:page.path,seoTitle:page.seoTitle,seoDescription:page.seoDescription}
  for (const group of page.groups) result[group.name] = Object.fromEntries(group.fields.map(item=>[item.name,item.kind==='projectReferences'?item.value:item.kind==='image'?(item.value || {_type:'image',localPreview:item.preview || ''}):initial(item.value)]))
  const legacyTypes: Record<string,string> = {'/':'homePage','/storitve':'serviceSection','/linex':'linexPage','/materiali':'materialsSection','/o-podjetju':'aboutSection','/kontakt':'contactSection'}
  const type = legacyTypes[page.path] || (page.path.startsWith('/storitve/')?'servicePage':null)
  if (type) {
    const legacy = await context.getClient({apiVersion:'2026-09-01'}).withConfig({perspective:'published'}).fetch<Record<string,unknown>|null>(`*[_type == $type && ($type != "servicePage" || slug.current == $slug)] | order(_updatedAt desc)[0]`,{type,slug:page.path.split('/').pop()})
    const enabled = !['linexPage','servicePage','serviceSection'].includes(type) || legacy?.useCmsContent===true
    if (legacy && enabled) for (const group of page.groups) for (const item of group.fields) {
      const value = item.legacy ? legacy[item.legacy] : undefined
      if ((typeof value==='string'&&value.trim()) || Array.isArray(value) || (value && typeof value==='object' && item.kind==='image')) {
        if(page.path==='/' && value==='Industrijski FDM/FGF 3D tisk, razvoj komponent in reverse engineering za zahtevne tehnične aplikacije.') continue
        ;(result[group.name] as Record<string,unknown>)[item.name]=initial(value as Value)
      }
    }
  }
  return result
}

export const websitePageSchemas = websitePages.map(page=>defineType({
  name:page.type,title:page.title,type:'document',
  groups:[{name:'content',title:'Vsebina strani',default:true},{name:'seo',title:'Prikaz v iskalnikih'}],
  initialValue:(_params,context)=>pageInitialValue(page,context),
  fields:[
    defineField({name:'title',title:'Stran',type:'string',hidden:true}),
    defineField({name:'path',title:'Naslov strani',type:'string',readOnly:true,group:'seo'}),
    ...page.groups.map((group,index)=>defineField({name:group.name,title:`${String(index+1).padStart(2,'0')} · ${group.title}`,type:'object',group:'content',options:{collapsible:true,collapsed:index>0},fields:group.fields.map(item=>item.kind==='projectReferences' ? defineField({name:item.name,title:item.title,type:'array',description:'Izberi projekte, ki jih želiš prikazati na domači strani. Vrstni red spremeniš z vlečenjem. Priporočeno: tri kartice.',of:[{type:'reference',to:[{type:'project'},...websitePages.filter(p=>p.path.startsWith('/projekti/')).map(p=>({type:p.type}))]}],validation:Rule=>Rule.max(6).warning('Za pregleden uvod priporočamo največ šest projektov.')}) : field(item.name,item.title,item.value,item.preview))})),
    defineField({name:'seoTitle',title:'SEO naslov',type:'string',group:'seo',description:'Naslov v iskalniku; ime podjetja doda spletna stran.',validation:Rule=>Rule.max(70).warning('Naslov je dolg.')}),
    defineField({name:'seoDescription',title:'SEO opis',type:'text',rows:3,group:'seo',validation:Rule=>Rule.max(170).warning('Opis je dolg.')}),
  ],
  preview:{prepare:()=>({title:page.title,subtitle:page.path})},
}))
