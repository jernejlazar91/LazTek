import {defineField, defineType} from 'sanity'

export const galleryItem = defineType({
  name: 'galleryItem',
  title: 'Galerijski element',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Naslov',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
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
    defineField({name: 'material', title: 'Material', type: 'string'}),
    defineField({name: 'technology', title: 'Tehnologija / postopek', type: 'string'}),
    defineField({name: 'image', title: 'Slika', type: 'image', options: {hotspot: true}}),
    defineField({name: 'videoUrl', title: 'Video URL', type: 'url'}),
    defineField({name: 'description', title: 'Opis', type: 'text', rows: 3}),
    defineField({
      name: 'relatedProject',
      title: 'Povezan projekt',
      type: 'reference',
      to: [{type: 'project'}],
    }),
    defineField({name: 'isFeatured', title: 'Izpostavi v galeriji', type: 'boolean', initialValue: false}),
    defineField({name: 'sortOrder', title: 'Vrstni red', type: 'number', initialValue: 100}),
  ],
  orderings: [
    {title: 'Vrstni red', name: 'sortOrderAsc', by: [{field: 'sortOrder', direction: 'asc'}]},
    {title: 'Najnovejše', name: 'createdDesc', by: [{field: '_createdAt', direction: 'desc'}]},
  ],
  preview: {
    select: {title: 'title', subtitle: 'category', media: 'image'},
  },
})
