import {defineArrayMember, defineField, defineType} from 'sanity'

export const materialsSection = defineType({
  name: 'materialsSection',
  title: 'Materiali - uvodna sekcija',
  type: 'document',
  fields: [
    defineField({name: 'title', title: 'Naslov', type: 'string'}),
    defineField({name: 'text', title: 'Opis', type: 'text', rows: 4}),
    defineField({
      name: 'tags',
      title: 'Hitre oznake materialov',
      type: 'array',
      of: [defineArrayMember({type: 'string'})],
    }),
    defineField({
      name: 'process',
      title: 'Procesne točke',
      type: 'array',
      of: [defineArrayMember({type: 'string'})],
    }),
    defineField({
      name: 'materialGroups',
      title: 'Materialne skupine',
      type: 'array',
      of: [defineArrayMember({type: 'reference', to: [{type: 'materialGroup'}]})],
    }),
  ],
})
