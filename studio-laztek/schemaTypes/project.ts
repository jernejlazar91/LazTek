import {defineArrayMember, defineField, defineType} from 'sanity'

export const project = defineType({
  name: 'project',
  title: 'Projekt / case study',
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
          {title: 'Industrijski 3D tisk', value: 'Industrijski 3D tisk'},
          {title: 'Reverse engineering', value: 'Reverse engineering'},
          {title: 'Obnova plastičnih kosov', value: 'Obnova plastičnih kosov'},
          {title: 'Konstruiranje', value: 'Konstruiranje'},
          {title: 'Prototipizacija', value: 'Prototipizacija'},
          {title: 'LINEX', value: 'LINEX'},
        ],
      },
    }),
    defineField({name: 'clientIndustry', title: 'Panoga / tip naročnika', type: 'string'}),
    defineField({name: 'material', title: 'Material', type: 'string'}),
    defineField({name: 'technology', title: 'Tehnologija / postopek', type: 'string'}),
    defineField({name: 'excerpt', title: 'Kratek povzetek', type: 'text', rows: 3}),
    defineField({name: 'problem', title: 'Problem / izziv', type: 'text', rows: 4}),
    defineField({name: 'solution', title: 'Rešitev', type: 'text', rows: 4}),
    defineField({name: 'result', title: 'Rezultat', type: 'text', rows: 4}),
    defineField({
      name: 'specs',
      title: 'Tehnični podatki',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          fields: [
            defineField({name: 'label', title: 'Oznaka', type: 'string'}),
            defineField({name: 'value', title: 'Vrednost', type: 'string'}),
          ],
          preview: {select: {title: 'label', subtitle: 'value'}},
        }),
      ],
    }),
    defineField({
      name: 'services',
      title: 'Povezane storitve',
      type: 'array',
      of: [defineArrayMember({type: 'string'})],
      options: {
        layout: 'tags',
      },
    }),
    defineField({name: 'featuredImage', title: 'Glavna slika', type: 'image', options: {hotspot: true}}),
    defineField({
      name: 'gallery',
      title: 'Galerija slik',
      type: 'array',
      of: [defineArrayMember({type: 'image', options: {hotspot: true}})],
    }),
    defineField({name: 'videoUrl', title: 'Video URL', type: 'url'}),
    defineField({name: 'publishedAt', title: 'Datum objave', type: 'datetime'}),
    defineField({name: 'isFeatured', title: 'Izpostavi projekt', type: 'boolean', initialValue: false}),
    defineField({
      name: 'content',
      title: 'Daljši opis',
      type: 'array',
      of: [{type: 'block'}],
    }),
    defineField({name: 'seoTitle', title: 'SEO naslov', type: 'string', validation: (Rule) => Rule.max(70)}),
    defineField({name: 'seoDescription', title: 'SEO opis', type: 'text', rows: 3, validation: (Rule) => Rule.max(170)}),
  ],
  preview: {
    select: {title: 'title', subtitle: 'category', media: 'featuredImage'},
  },
})
