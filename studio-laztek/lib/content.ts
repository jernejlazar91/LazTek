import {defineArrayMember, defineField} from 'sanity'

export const serviceOptions = [
  {title: 'Industrijski 3D tisk', value: '/storitve/industrijski-3d-tisk'},
  {title: 'Velikoformatni 3D tisk', value: '/storitve/velikoformatni-3d-tisk'},
  {title: 'FGF tisk iz granulata', value: '/storitve/fgf-3d-tisk-granulat'},
  {title: '3D skeniranje in reverse engineering', value: '/storitve/3d-skeniranje-reverse-engineering'},
  {title: 'Obnova plastičnih kosov', value: '/storitve/obnova-plasticnih-kosov'},
  {title: 'CAD konstruiranje', value: '/storitve/konstruiranje-3d-modeliranje'},
  {title: 'Prototipiranje', value: '/storitve/prototipizacija'},
]

export const imageFields = [
  defineField({
    name: 'alt', title: 'Opis slike za dostopnost (ALT)', type: 'string',
    description: 'Opiši dejanski kos, CAD model ali fazo postopka. Ne naštevaj ključnih besed.',
    validation: (Rule) => Rule.required().warning('Dodaj opis slike za dostopnost.'),
  }),
  defineField({name: 'caption', title: 'Podpis pod sliko', type: 'string'}),
]

export const richTextMembers = [
  defineArrayMember({
    type: 'block',
    styles: [
      {title: 'Odstavek', value: 'normal'}, {title: 'Naslov razdelka (H2)', value: 'h2'},
      {title: 'Podnaslov (H3)', value: 'h3'}, {title: 'Manjši podnaslov (H4)', value: 'h4'},
      {title: 'Navedek', value: 'blockquote'},
      {title: 'Stari H1 (na strani prikazan kot H2)', value: 'h1'},
      {title: 'Manjši naslov (H5)', value: 'h5'}, {title: 'Manjši naslov (H6)', value: 'h6'},
    ],
    lists: [{title: 'Točke', value: 'bullet'}, {title: 'Oštevilčen seznam', value: 'number'}],
    marks: {
      decorators: [
        {title: 'Krepko', value: 'strong'}, {title: 'Ležeče', value: 'em'},
        {title: 'Podčrtano', value: 'underline'}, {title: 'Prečrtano', value: 'strike-through'},
        {title: 'Tehnična oznaka', value: 'code'},
      ],
      annotations: [{name: 'link', title: 'Povezava', type: 'object', fields: [defineField({
        name: 'href', title: 'Naslov povezave', type: 'url',
        validation: (Rule) => Rule.uri({allowRelative: true, scheme: ['http', 'https', 'mailto', 'tel']}),
      })]}],
    },
  }),
  defineArrayMember({type: 'image', title: 'Fotografija ali tehnični prikaz', options: {hotspot: true}, fields: imageFields}),
]

export const seoFields = [
  defineField({
    name: 'seoTitle', title: 'SEO naslov', type: 'string', group: 'seo',
    description: 'Neobvezno. Prazno polje uporabi naslov vsebine. Znamko doda spletna stran.',
    validation: (Rule) => Rule.max(70).warning('Naslov je dolg; preveri prikaz v rezultatih.'),
  }),
  defineField({
    name: 'seoDescription', title: 'SEO opis', type: 'text', rows: 3, group: 'seo',
    description: 'Neobvezno. Prazno polje uporabi povzetek oziroma obstoječi opis strani.',
    validation: (Rule) => Rule.max(170).warning('Opis je dolg; Google ga lahko skrajša.'),
  }),
]

export const cmsActivation = defineField({
  name: 'useCmsContent', title: 'Uporabi objavljeno vsebino iz urejevalnika', type: 'boolean',
  group: 'basic', initialValue: false,
  description: 'Za strani s pripravljeno vsebino v kodi. Vklopi po pregledu vsebine. Prazna polja ohranijo privzete vrednosti.',
})
