import {defineArrayMember, defineField, defineType} from 'sanity'

export const platformSection = defineType({
  name: 'platformSection',
  title: 'Platform Section',
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
      name: 'image',
      title: 'Image',
      type: 'image',
      options: {hotspot: true},
    }),
    defineField({
      name: 'stats',
      title: 'Technical points',
      type: 'array',
      of: [defineArrayMember({type: 'string'})],
    }),
  ],
})