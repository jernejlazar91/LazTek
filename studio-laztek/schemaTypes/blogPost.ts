import {defineArrayMember, defineField, defineType} from 'sanity'
import {imageFields, richTextMembers, seoFields, serviceOptions} from '../lib/content'

export const blogPost = defineType({
  name: 'blogPost', title: 'Tehnični članek', type: 'document',
  groups: [
    {name: 'basic', title: 'Osnovno', default: true},
    {name: 'content', title: 'Vsebina'},
    {name: 'media', title: 'Naslovna slika'},
    {name: 'seo', title: 'SEO'},
  ],
  fields: [
    defineField({name: 'title', title: 'Naslov članka', type: 'string', group: 'basic', validation: (Rule) => Rule.required()}),
    defineField({name: 'slug', title: 'URL članka', type: 'slug', group: 'basic', options: {source: 'title', maxLength: 96}, description: 'Del za /blog/. Ohrani URL že objavljenega članka.', validation: (Rule) => Rule.required()}),
    defineField({name: 'category', title: 'Kategorija', type: 'string', group: 'basic', options: {list: ['3D tisk', 'Velikoformatni 3D tisk', 'FGF tisk iz granulata', 'Materiali', 'Reverse engineering', 'Konstruiranje', 'Prototipizacija', 'LINEX', 'Tehnični nasveti']}}),
    defineField({name: 'tags', title: 'Oznake', type: 'array', group: 'basic', of: [defineArrayMember({type: 'string'})], options: {layout: 'tags'}}),
    defineField({name: 'excerpt', title: 'Kratek povzetek', type: 'text', rows: 3, group: 'basic'}),
    defineField({name: 'authorName', title: 'Avtor', type: 'string', group: 'basic', description: 'Ime dejanskega avtorja; če je prazno, se avtor ne izmišlja.'}),
    defineField({name: 'publishedAt', title: 'Datum prve objave', type: 'datetime', group: 'basic'}),
    defineField({name: 'coverImage', title: 'Naslovna slika', type: 'image', group: 'media', options: {hotspot: true}, fields: imageFields}),
    defineField({name: 'content', title: 'Vsebina članka', type: 'array', group: 'content', of: richTextMembers, description: 'Naslov članka je že H1. V besedilu uporabljaj naslove H2/H3.'}),
    defineField({name: 'services', title: 'Povezane storitve', type: 'array', group: 'content', of: [defineArrayMember({type: 'string'})], options: {list: serviceOptions}}),
    ...seoFields,
  ],
  preview: {select: {title: 'title', subtitle: 'category', media: 'coverImage'}},
})
