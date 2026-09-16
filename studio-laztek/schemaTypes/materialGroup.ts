import {defineArrayMember, defineField, defineType} from 'sanity'

export const materialGroup = defineType({
  name: 'materialGroup',
  title: 'Materialna skupina',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Naziv materialne skupine',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'URL slug',
      type: 'slug',
      options: {source: 'title', maxLength: 96},
    }),
    defineField({
      name: 'variants',
      title: 'Različice / oznake',
      description: 'Primer: PA6, PA6 CF, PA6 GF',
      type: 'array',
      of: [defineArrayMember({type: 'string'})],
    }),
    defineField({
      name: 'shortDescription',
      title: 'Kratek opis',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'keyProperties',
      title: 'Ključne lastnosti',
      type: 'array',
      of: [defineArrayMember({type: 'string'})],
    }),
    defineField({
      name: 'suitableFor',
      title: 'Primerno za',
      type: 'array',
      of: [defineArrayMember({type: 'string'})],
    }),
    defineField({
      name: 'watchOut',
      title: 'Pozor / omejitve',
      type: 'array',
      of: [defineArrayMember({type: 'string'})],
    }),
    defineField({
      name: 'processingNotes',
      title: 'Opombe za proces / tisk',
      type: 'text',
      rows: 4,
    }),
    defineField({
      name: 'sortOrder',
      title: 'Vrstni red',
      type: 'number',
      initialValue: 100,
    }),
    defineField({
      name: 'isVisible',
      title: 'Prikaži v seznamih',
      type: 'boolean',
      initialValue: true,
    }),
  ],
  orderings: [
    {
      title: 'Vrstni red',
      name: 'sortOrderAsc',
      by: [{field: 'sortOrder', direction: 'asc'}],
    },
  ],
  preview: {
    select: {title: 'title', variants: 'variants'},
    prepare: ({title, variants}) => ({
      title,
      subtitle: Array.isArray(variants) ? variants.join(' / ') : undefined,
    }),
  },
})
