import {defineArrayMember, defineField, defineType} from 'sanity'

export const serviceItem = defineType({
  name: 'serviceItem',
  title: 'Kartica storitve',
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
      title: 'URL slug / povezava',
      type: 'slug',
      options: {source: 'title', maxLength: 96},
    }),
    defineField({name: 'shortDescription', title: 'Kratek opis', type: 'text', rows: 3}),
    defineField({name: 'image', title: 'Slika', type: 'image', options: {hotspot: true}}),
    defineField({
      name: 'bullets',
      title: 'Točke',
      type: 'array',
      of: [defineArrayMember({type: 'string'})],
    }),
    defineField({name: 'href', title: 'Ročna povezava', description: 'Primer: /storitve/industrijski-3d-tisk', type: 'string'}),
    defineField({name: 'sortOrder', title: 'Vrstni red', type: 'number', initialValue: 100}),
  ],
  preview: {
    select: {title: 'title', subtitle: 'href', media: 'image'},
  },
})
