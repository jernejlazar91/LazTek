import {defineArrayMember, defineField, defineType} from 'sanity'
import {cmsActivation, imageFields, richTextMembers, seoFields, serviceOptions} from '../lib/content'

export const project = defineType({
  name: 'project', title: 'Projekt / študija primera', type: 'document',
  groups: [
    {name: 'basic', title: 'Osnovno', default: true},
    {name: 'content', title: 'Vsebina'},
    {name: 'technical', title: 'Tehnični podatki'},
    {name: 'media', title: 'Fotografije in video'},
    {name: 'seo', title: 'SEO'},
  ],
  fields: [
    defineField({name: 'title', title: 'Naslov projekta', type: 'string', group: 'basic', validation: (Rule) => Rule.required()}),
    defineField({name: 'slug', title: 'URL projekta', type: 'slug', group: 'basic', options: {source: 'title', maxLength: 96}, description: 'Del za /projekti/. Ohrani URL obstoječega projekta; sprememba zahteva preusmeritev.', validation: (Rule) => Rule.required()}),
    {...cmsActivation, hidden: true},
    defineField({name: 'category', title: 'Kategorija', type: 'string', group: 'basic', options: {list: ['Industrijski 3D tisk', 'Velikoformatni 3D tisk', 'FGF tisk iz granulata', 'Reverse engineering', 'Obnova plastičnih kosov', 'Konstruiranje', 'Prototipizacija', 'LINEX']}}),
    defineField({name: 'excerpt', title: 'Kratek povzetek', type: 'text', rows: 3, group: 'basic', description: 'Uvod na strani projekta in besedilo kartice v seznamu.'}),
    defineField({name: 'publishedAt', title: 'Datum prve objave', type: 'datetime', group: 'basic', description: 'Datum ohrani pri uredniških popravkih starega projekta.'}),
    defineField({name: 'isFeatured', title: 'Izpostavi na domači strani', type: 'boolean', initialValue: false, group: 'basic'}),
    defineField({name: 'problem', title: 'Izhodišče / tehnični izziv', type: 'text', rows: 4, group: 'content'}),
    defineField({name: 'solution', title: 'Izvedba / uporabljena rešitev', type: 'text', rows: 4, group: 'content'}),
    defineField({name: 'result', title: 'Dosežen rezultat', type: 'text', rows: 4, group: 'content', description: 'Navedi preverljive rezultate. Razvojne cilje loči od opravljenih testov.'}),
    defineField({name: 'content', title: 'Daljši opis', type: 'array', group: 'content', of: richTextMembers, description: 'Naslov projekta je že H1. V vsebini uporabljaj H2/H3, odstavke, sezname, povezave in slike.'}),
    defineField({name: 'clientIndustry', title: 'Panoga / tip naročnika', type: 'string', group: 'technical'}),
    defineField({name: 'material', title: 'Material', type: 'string', group: 'technical'}),
    defineField({name: 'technology', title: 'Tehnologija / postopek', type: 'string', group: 'technical'}),
    defineField({name: 'specs', title: 'Tehnični podatki', type: 'array', group: 'technical', of: [defineArrayMember({type: 'object', fields: [
      defineField({name: 'label', title: 'Podatek', type: 'string'}),
      defineField({name: 'value', title: 'Vrednost z enoto', type: 'string'}),
    ], preview: {select: {title: 'label', subtitle: 'value'}}})]}),
    defineField({name: 'services', title: 'Povezane storitve', type: 'array', group: 'technical', of: [defineArrayMember({type: 'string'})], options: {list: serviceOptions}, description: 'Povezave do storitev na javni strani. Stare zapisane vrednosti se ohranijo.'}),
    defineField({name: 'featuredImage', title: 'Glavna slika', type: 'image', group: 'media', options: {hotspot: true}, fields: imageFields}),
    defineField({name: 'gallery', title: 'Galerija slik', type: 'array', group: 'media', of: [defineArrayMember({type: 'image', options: {hotspot: true}, fields: imageFields})]}),
    defineField({name: 'videoUrl', title: 'Video URL', type: 'url', group: 'media', validation: (Rule) => Rule.uri({scheme: ['http', 'https']})}),
    ...seoFields,
  ],
  preview: {select: {title: 'title', subtitle: 'category', media: 'featuredImage'}},
})
