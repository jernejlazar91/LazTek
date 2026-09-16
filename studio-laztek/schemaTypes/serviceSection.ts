import {defineArrayMember, defineField, defineType} from 'sanity'

export const serviceSection = defineType({
  name: 'serviceSection',
  title: 'Services Section',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Section title',
      type: 'string',
    }),
    defineField({
      name: 'text',
      title: 'Section text',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'items',
      title: 'Service items',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'reference',
          to: [{type: 'serviceItem'}],
        }),
      ],
    }),
  ],
})