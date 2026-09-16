import {defineArrayMember, defineField, defineType} from 'sanity'

export const scanningSection = defineType({
  name: 'scanningSection',
  title: 'Scanning Section',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
    }),
    defineField({
      name: 'text',
      title: 'Text',
      type: 'text',
      rows: 4,
    }),
    defineField({
      name: 'steps',
      title: 'Steps',
      type: 'array',
      of: [defineArrayMember({type: 'string'})],
    }),
  ],
})