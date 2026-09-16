import {defineField, defineType} from 'sanity'

export const siteSettings = defineType({
  name: 'siteSettings',
  title: 'Nastavitve strani',
  type: 'document',
  fields: [
    defineField({
      name: 'siteTitle',
      title: 'Naslov strani',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({name: 'brandName', title: 'Ime znamke', type: 'string'}),
    defineField({name: 'legalName', title: 'Uradno ime podjetja', type: 'string'}),
    defineField({name: 'tagline', title: 'Kratek slogan', type: 'string'}),
    defineField({name: 'logo', title: 'Logo', type: 'image', options: {hotspot: true}}),
    defineField({name: 'email', title: 'Email', type: 'string'}),
    defineField({name: 'phone', title: 'Telefon', type: 'string'}),
    defineField({name: 'website', title: 'Spletna stran', type: 'url'}),
    defineField({name: 'location', title: 'Lokacija - kratek prikaz', type: 'string'}),
    defineField({name: 'address', title: 'Naslov', type: 'text', rows: 2}),
    defineField({name: 'footerText', title: 'Kratek tekst za footer', type: 'text', rows: 3}),
    defineField({
      name: 'socialLinks',
      title: 'Družbena omrežja / zunanji linki',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({name: 'label', title: 'Naziv', type: 'string'}),
            defineField({name: 'url', title: 'URL', type: 'url'}),
          ],
          preview: {select: {title: 'label', subtitle: 'url'}},
        },
      ],
    }),
  ],
})
