import {defineArrayMember, defineField, defineType} from 'sanity'

export const blogPost = defineType({
  name: 'blogPost',
  title: 'Blog objava',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Naslov',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'URL slug',
      type: 'slug',
      options: {source: 'title', maxLength: 96},
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'category',
      title: 'Kategorija',
      type: 'string',
      options: {
        layout: 'dropdown',
        list: [
          {title: '3D tisk', value: '3D tisk'},
          {title: 'Materiali', value: 'Materiali'},
          {title: 'Reverse engineering', value: 'Reverse engineering'},
          {title: 'Prototipizacija', value: 'Prototipizacija'},
          {title: 'LINEX', value: 'LINEX'},
          {title: 'Tehnični nasveti', value: 'Tehnični nasveti'},
        ],
      },
    }),
    defineField({
      name: 'tags',
      title: 'Oznake',
      type: 'array',
      of: [defineArrayMember({type: 'string'})],
      options: {layout: 'tags'},
    }),
    defineField({name: 'excerpt', title: 'Kratek povzetek', type: 'text', rows: 3}),
    defineField({name: 'coverImage', title: 'Naslovna slika', type: 'image', options: {hotspot: true}}),
    defineField({name: 'publishedAt', title: 'Datum objave', type: 'datetime'}),
    defineField({
      name: 'content',
      title: 'Vsebina',
      type: 'array',
      of: [{type: 'block'}],
    }),
    defineField({name: 'seoTitle', title: 'SEO naslov', type: 'string', validation: (Rule) => Rule.max(70)}),
    defineField({name: 'seoDescription', title: 'SEO opis', type: 'text', rows: 3, validation: (Rule) => Rule.max(170)}),
  ],
  preview: {
    select: {title: 'title', subtitle: 'category', media: 'coverImage'},
  },
})
