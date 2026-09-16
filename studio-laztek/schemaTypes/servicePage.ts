import {defineArrayMember, defineField, defineType} from 'sanity'

export const servicePage = defineType({
  name: 'servicePage',
  title: 'Stran storitve',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Naziv storitve',
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
      name: 'pageType',
      title: 'Tip strani',
      type: 'string',
      options: {
        layout: 'dropdown',
        list: [
          {title: 'Industrijski 3D tisk', value: 'industrial-printing'},
          {title: '3D skeniranje & reverse engineering', value: 'scanning-reverse'},
          {title: 'Obnova plastičnih kosov', value: 'plastic-restoration'},
          {title: 'Konstruiranje & 3D modeliranje', value: 'engineering-modeling'},
          {title: 'Prototipizacija', value: 'prototyping'},
        ],
      },
    }),
    defineField({
      name: 'eyebrow',
      title: 'Majhen napis nad naslovom',
      type: 'string',
    }),
    defineField({
      name: 'heroTitle',
      title: 'Glavni naslov',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'heroText',
      title: 'Uvodni opis',
      type: 'text',
      rows: 4,
    }),
    defineField({
      name: 'heroImage',
      title: 'Glavna slika',
      type: 'image',
      options: {hotspot: true},
    }),
    defineField({
      name: 'summaryCards',
      title: 'Kratke poudarjene kartice',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          fields: [
            defineField({name: 'label', title: 'Oznaka', type: 'string'}),
            defineField({name: 'value', title: 'Vrednost / tekst', type: 'string'}),
          ],
          preview: {
            select: {title: 'label', subtitle: 'value'},
          },
        }),
      ],
    }),
    defineField({
      name: 'sections',
      title: 'Vsebinski sklopi',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          fields: [
            defineField({name: 'title', title: 'Naslov', type: 'string'}),
            defineField({name: 'text', title: 'Opis', type: 'text', rows: 4}),
            defineField({
              name: 'bullets',
              title: 'Točke',
              type: 'array',
              of: [defineArrayMember({type: 'string'})],
            }),
          ],
          preview: {
            select: {title: 'title'},
            prepare: ({title}) => ({title: title || 'Vsebinski sklop'}),
          },
        }),
      ],
    }),
    defineField({
      name: 'suitableFor',
      title: 'Primerno za',
      type: 'array',
      of: [defineArrayMember({type: 'string'})],
    }),
    defineField({
      name: 'notIdealFor',
      title: 'Ni najboljša izbira za',
      type: 'array',
      of: [defineArrayMember({type: 'string'})],
    }),
    defineField({
      name: 'processSteps',
      title: 'Potek dela',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          fields: [
            defineField({name: 'title', title: 'Korak', type: 'string'}),
            defineField({name: 'text', title: 'Opis', type: 'text', rows: 3}),
          ],
          preview: {
            select: {title: 'title', subtitle: 'text'},
          },
        }),
      ],
    }),
    defineField({
      name: 'ctaTitle',
      title: 'CTA naslov',
      type: 'string',
    }),
    defineField({
      name: 'ctaText',
      title: 'CTA opis',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'seoTitle',
      title: 'SEO naslov',
      type: 'string',
      validation: (Rule) => Rule.max(70),
    }),
    defineField({
      name: 'seoDescription',
      title: 'SEO opis',
      type: 'text',
      rows: 3,
      validation: (Rule) => Rule.max(170),
    }),
  ],
  preview: {
    select: {title: 'title', subtitle: 'slug.current', media: 'heroImage'},
  },
})
