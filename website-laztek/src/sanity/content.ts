import {cache} from 'react'
import {client} from './client'
import {pageMetadata} from '@/lib/seo'
import {urlFor} from './image'
import type {Material} from '@/data/materials'

export type CmsImage = {
  _key?: string
  asset?: {_ref?: string; _id?: string}
  alt?: string
  caption?: string
} & Record<string, unknown>

export type CmsGalleryItem = {
  _id: string
  title?: string
  category?: string
  image?: CmsImage
  videoUrl?: string
  description?: string
  excerpt?: string
  publishedAt?: string
  material?: string
  technology?: string
  seoTitle?: string
  seoDescription?: string
  relatedProject?: {title?: string; slug?: string}
}

export type EditablePage = {
  useCmsContent?: boolean
  replaceBody?: boolean
  eyebrow?: string
  heroTitle?: string
  heroText?: string
  heroImage?: CmsImage
  seoTitle?: string
  seoDescription?: string
  ctaTitle?: string
  ctaText?: string
  summaryCards?: {label?: string; value?: string; _key?: string}[]
  sections?: {title?: string; text?: string; bullets?: string[]; _key?: string}[]
  suitableFor?: string[]
  notIdealFor?: string[]
  processSteps?: {title?: string; text?: string; _key?: string}[]
  capabilities?: {label?: string; value?: string; note?: string; _key?: string}[]
  technicalSpecs?: {label?: string; value?: string; _key?: string}[]
  technologyPoints?: string[]
  developmentNotes?: string
}

export const getEditablePage = cache(async (type: 'servicePage' | 'linexPage', slug = '') => {
  const page = await client.fetch<EditablePage | null>(
    `*[_type == $type && ($type == "linexPage" || slug.current == $slug)] | order(_updatedAt desc)[0]`,
    {type, slug},
    {next: {revalidate: 60}},
  )
  return page?.useCmsContent === true ? page : null
})

export async function serviceMetadata(title: string, description: string, path: string) {
  const page = await getEditablePage('servicePage', path.split('/').pop())
  return pageMetadata(textOr(page?.seoTitle, title), textOr(page?.seoDescription, description), path,
    page?.heroImage?.asset ? urlFor(page.heroImage).width(1200).height(630).fit('crop').url() : undefined)
}

export function textOr(value: unknown, fallback: string): string {
  return typeof value === 'string' && value.trim() ? value.trim() : fallback
}

export function stringList(value: unknown): string[] {
  return Array.isArray(value)
    ? value.filter((item): item is string => typeof item === 'string' && Boolean(item.trim())).map(item => item.trim())
    : []
}

export const serviceLinks = [
  {label: 'Industrijski 3D tisk', href: '/storitve/industrijski-3d-tisk', aliases: ['industrial-printing', '3D tisk']},
  {label: 'Velikoformatni 3D tisk', href: '/storitve/velikoformatni-3d-tisk', aliases: ['large-format-printing']},
  {label: 'FGF tisk iz granulata', href: '/storitve/fgf-3d-tisk-granulat', aliases: ['fgf-printing', 'FGF 3D tisk']},
  {label: '3D skeniranje in reverse engineering', href: '/storitve/3d-skeniranje-reverse-engineering', aliases: ['scanning-reverse', 'Reverse engineering', '3D skeniranje']},
  {label: 'Obnova plastičnih kosov', href: '/storitve/obnova-plasticnih-kosov', aliases: ['plastic-restoration', 'Obnova kosov']},
  {label: 'CAD konstruiranje', href: '/storitve/konstruiranje-3d-modeliranje', aliases: ['engineering-modeling', 'Konstruiranje', 'Konstruiranje & 3D modeliranje']},
  {label: 'Prototipiranje', href: '/storitve/prototipizacija', aliases: ['prototyping', 'Prototipizacija']},
]

export function relatedServices(values: unknown) {
  const selected = new Set(stringList(values).map(value => value.toLocaleLowerCase('sl-SI')))
  return serviceLinks.filter(link => [link.href, link.href.split('/').pop() || '', link.label, ...link.aliases]
    .some(value => selected.has(value.toLocaleLowerCase('sl-SI'))))
}

export type CmsMaterial = {
  title?: string
  useCmsContent?: boolean
  isVisible?: boolean
  family?: string
  shortDescription?: string
  tags?: string[]
  profile?: {label: string; value: string}[]
  suitableFor?: string[]
  examples?: string[]
  keyProperties?: string[]
  processingNotes?: string
  watchOut?: string[]
}

export function mergeMaterials(defaults: Material[], documents: CmsMaterial[]): Material[] {
  const key = (value: string) => value.toUpperCase().replace(/[\s_-]+/g, '')
  const enabled = documents.filter(item => item.useCmsContent === true && item.title?.trim())
  const byTitle = new Map(enabled.map(item => [key(item.title!), item]))
  const fallbackTitles = new Set(defaults.map(item => key(item.title)))
  const merge = (item: CmsMaterial, fallback?: Material): Material => ({
    title: textOr(item.title, fallback?.title || ''),
    family: textOr(item.family, fallback?.family || 'Tehnični material'),
    subtitle: textOr(item.shortDescription, fallback?.subtitle || ''),
    tags: stringList(item.tags).length ? stringList(item.tags) : fallback?.tags || [],
    profile: item.profile?.filter(row => row.label?.trim() && row.value?.trim()).length
      ? item.profile.filter(row => row.label?.trim() && row.value?.trim()) : fallback?.profile || [],
    bestFor: stringList(item.suitableFor).length ? stringList(item.suitableFor) : fallback?.bestFor || [],
    examples: stringList(item.examples).length ? stringList(item.examples) : fallback?.examples || [],
    properties: stringList(item.keyProperties).length ? stringList(item.keyProperties) : fallback?.properties || [],
    process: item.processingNotes?.trim() ? item.processingNotes.split(/\n+/).filter(Boolean) : fallback?.process || [],
    watchOut: stringList(item.watchOut).length ? stringList(item.watchOut) : fallback?.watchOut || [],
  })
  return [
    ...defaults.flatMap(item => {
      const override = byTitle.get(key(item.title))
      return override?.isVisible === false ? [] : [override ? merge(override, item) : item]
    }),
    ...enabled.filter(item => !fallbackTitles.has(key(item.title!)) && item.isVisible !== false).map(item => merge(item)),
  ]
}
