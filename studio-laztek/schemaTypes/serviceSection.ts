import {cmsActivation} from '../lib/content'
import {defineArrayMember, defineField, defineType} from 'sanity'

export const serviceSection = defineType({
  name: 'serviceSection',
  title: "Storitve – pregled",
  type: 'document',
  groups: [{name: 'basic', title: 'Osnovno', default: true}, {name: 'archive', title: 'Arhiv / pripravljeno v kodi'}],
  fields: [
    defineField({group: 'basic', 
      name: 'title',
      title: "Glavni naslov",
      type: 'string',
    }),
    defineField({group: 'basic', 
      name: 'text',
      title: "Uvodni opis",
      type: 'text',
      rows: 3,
    }),
    defineField({readOnly: true, description: 'Spletna stran uporablja pripravljeno vsebino iz kode; to polje je ohranjeno zaradi obstoječih podatkov.', group: 'archive', 
      name: 'items',
      title: "Stare kartice storitev",
      type: 'array',
      of: [
        defineArrayMember({
          type: 'reference',
          to: [{type: 'serviceItem'}],
        }),
      ],
    }),
  
    cmsActivation,
  ],
})