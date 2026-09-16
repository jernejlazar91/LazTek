import {defineArrayMember, defineField, defineType} from 'sanity'

export const linexPage = defineType({
  name: 'linexPage',
  title: 'LINEX stran',
  type: 'document',
  fields: [
    defineField({name: 'eyebrow', title: 'Majhen napis nad naslovom', type: 'string'}),
    defineField({
      name: 'heroTitle',
      title: 'Glavni naslov',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({name: 'heroText', title: 'Uvodni opis', type: 'text', rows: 4}),
    defineField({name: 'heroImage', title: 'Glavna slika', type: 'image', options: {hotspot: true}}),
    defineField({
      name: 'capabilities',
      title: 'Zmogljivosti',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          fields: [
            defineField({name: 'label', title: 'Oznaka', type: 'string'}),
            defineField({name: 'value', title: 'Vrednost', type: 'string'}),
            defineField({name: 'note', title: 'Opomba', type: 'string'}),
          ],
          preview: {select: {title: 'label', subtitle: 'value'}},
        }),
      ],
    }),
    defineField({
      name: 'technologyPoints',
      title: 'Tehnološki poudarki',
      type: 'array',
      of: [defineArrayMember({type: 'string'})],
    }),
    defineField({
      name: 'developmentNotes',
      title: 'Opombe o razvoju / statusu',
      description: 'Uporabi za funkcije v izgradnji, da na strani ne zvenijo kot dokončane.',
      type: 'text',
      rows: 4,
    }),
    defineField({name: 'seoTitle', title: 'SEO naslov', type: 'string', validation: (Rule) => Rule.max(70)}),
    defineField({
      name: 'seoDescription',
      title: 'SEO opis',
      type: 'text',
      rows: 3,
      validation: (Rule) => Rule.max(170),
    }),
  ],
})
