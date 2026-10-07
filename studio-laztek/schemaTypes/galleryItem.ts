import {imageFields, seoFields} from '../lib/content'
import {defineField, defineType} from 'sanity'

export const galleryItem = defineType({
  name: 'galleryItem',
  title: 'Galerijski element',
  type: 'document',
  groups: [{name: 'basic', title: 'Osnovno', default: true}, {name: 'technical', title: 'Tehnični podatki'}, {name: 'media', title: 'Fotografije in video'}, {name: 'seo', title: 'SEO'}],
  fields: [
    defineField({group: 'basic', 
      name: 'title',
      title: 'Naslov',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({group: 'basic', 
      name: 'category',
      title: 'Kategorija',
      type: 'string',
      options: {
        layout: 'dropdown',
        list: [
          {title: '3D tisk', value: '3D tisk'},
          {title: 'Reverse engineering', value: 'Reverse engineering'},
          {title: 'Obnova kosov', value: 'Obnova kosov'},
          {title: 'Prototip', value: 'Prototip'},
          {title: 'LINEX', value: 'LINEX'},
          {title: 'Materiali', value: 'Materiali'},
        ],
      },
    }),
    defineField({group: 'technical', name: 'material', title: 'Material', type: 'string'}),
    defineField({group: 'technical', name: 'technology', title: 'Tehnologija / postopek', type: 'string'}),
    defineField({fields: imageFields, group: 'media', name: 'image', title: 'Slika', type: 'image', options: {hotspot: true}}),
    defineField({group: 'media', name: 'videoUrl', title: 'Video URL', type: 'url'}),
    defineField({group: 'basic', name: 'description', title: 'Opis', type: 'text', rows: 3}),
    defineField({group: 'technical', 
      name: 'relatedProject',
      title: 'Povezan projekt',
      type: 'reference',
      to: [{type: 'project'}],
    }),
    defineField({group: 'basic', name: 'isFeatured', title: 'Izpostavi v galeriji', type: 'boolean', initialValue: false}),
    defineField({group: 'basic', name: 'sortOrder', title: 'Vrstni red', type: 'number', initialValue: 100}),
  
    ...seoFields,
  ],
  orderings: [
    {title: 'Vrstni red', name: 'sortOrderAsc', by: [{field: 'sortOrder', direction: 'asc'}]},
    {title: 'Najnovejše', name: 'createdDesc', by: [{field: '_createdAt', direction: 'desc'}]},
  ],
  preview: {
    select: {title: 'title', subtitle: 'category', media: 'image'},
  },
})
