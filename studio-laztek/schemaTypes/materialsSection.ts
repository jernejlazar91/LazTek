import {seoFields} from '../lib/content'
import {defineArrayMember, defineField, defineType} from 'sanity'

export const materialsSection = defineType({
  name: 'materialsSection',
  title: 'Materiali - uvodna sekcija',
  type: 'document',
  groups: [{name: 'basic', title: 'Osnovno', default: true}, {name: 'content', title: 'Vsebina'}, {name: 'seo', title: 'SEO'}],
  fields: [
    defineField({group: 'basic', name: 'title', title: 'Naslov', type: 'string'}),
    defineField({group: 'basic', name: 'text', title: 'Opis', type: 'text', rows: 4}),
    defineField({group: 'content', 
      name: 'tags',
      title: 'Hitre oznake materialov',
      type: 'array',
      of: [defineArrayMember({type: 'string'})],
    }),
    defineField({group: 'content', 
      name: 'process',
      title: 'Procesne točke',
      type: 'array',
      of: [defineArrayMember({type: 'string'})],
    }),
    defineField({group: 'content', 
      name: 'materialGroups',
      title: 'Materialne skupine',
      type: 'array',
      of: [defineArrayMember({type: 'reference', to: [{type: 'materialGroup'}]})],
    }),
  
    ...seoFields,
  ],
})
