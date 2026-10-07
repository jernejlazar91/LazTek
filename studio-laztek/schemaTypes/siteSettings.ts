import {PageImageInput} from '../components/PageImageInput'
import {defineField, defineType} from 'sanity'

export const siteSettings = defineType({
  name: 'siteSettings',
  title: 'Podatki podjetja',
  type: 'document',
  fields: [
    defineField({
      name: 'siteTitle', hidden:true,
      title: 'Naslov strani',
      type: 'string',
    }),
    defineField({name: 'brandName', title: 'Ime znamke', type: 'string'}),
    defineField({name: 'legalName', title: 'Uradno ime podjetja', type: 'string'}),
    defineField({name: 'tagline', title: 'Kratek slogan', type: 'string'}),
    defineField({hidden:true,name: 'logo', title: 'Logo', type: 'image', options: {hotspot: true}}),
    defineField({name:'headerLogo',title:'Logotip v glavi in nogi strani',type:'image',options:{hotspot:true,...{defaultPreview:'/static/editor-images/laztek-logo.webp'}},components:{input:PageImageInput}}),
    defineField({name:'mapLocation',title:'Položaj delavnice na zemljevidu',type:'geopoint',initialValue:{lat:45.98020087787109,lng:14.1705128253313},description:'Uporablja se na kontaktni strani in pri povezavi za navigacijo.'}),
    defineField({name: 'email', title: 'Email', type: 'string'}),
    defineField({name: 'phone', title: 'Telefon', type: 'string'}),
    defineField({hidden:true,name: 'website', title: 'Spletna stran', type: 'url'}),
    defineField({name: 'location', title: 'Naslov v glavi strani', type: 'string'}),
    defineField({name: 'address', title: 'Polni naslov delavnice', type: 'text', rows: 2}),
    defineField({name: 'footerText', title: 'Opis podjetja v nogi strani', type: 'text', rows: 3}),
    defineField({
      name: 'socialLinks',
      title: 'Družbena omrežja / zunanji linki',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({name: 'label', title: 'Naziv', type: 'string'}),
            defineField({name: 'url', title: 'URL', type: 'url'}),
          ],
          preview: {select: {title: 'label', subtitle: 'url'}},
        },
      ],
    }),
  ],
})
