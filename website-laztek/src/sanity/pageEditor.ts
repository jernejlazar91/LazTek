import {cache} from 'react'
import type {Metadata} from 'next'
import type {StaticImageData} from 'next/image'
import {client} from './client'
import {urlFor} from './image'
import routes from './pageRoutes.json'

type RecordValue = Record<string, unknown>
function record(value: unknown): value is RecordValue {
  return typeof value === 'object' && value !== null && !Array.isArray(value)
}
function safeLink(value: string): boolean {
  return /^(\/(?!\/)|#|https?:\/\/|mailto:|tel:)/i.test(value) && !/[\u0000-\u001f]/.test(value)
}

/** Resolve an uploaded photo into the same dimensions-aware shape as a local image. */
function imageValue(value: unknown, fallback: StaticImageData): StaticImageData {
  if (!record(value) || !record(value.asset)) return fallback
  const reference = String(value.asset._ref || value.asset._id || '')
  const dimensions = /-(\d+)x(\d+)-[^-]+$/.exec(reference)
  if (!dimensions) return fallback
  return {src: urlFor(value).width(1800).auto('format').url(), width: Number(dimensions[1]), height: Number(dimensions[2])}
}

/** Keep layout-only values (icons, crops and local image imports) out of the CMS. */
export function mergePageValue<T>(value: unknown, fallback: T): T {
  if (value === undefined || value === null) return fallback
  if (typeof fallback === 'string') {
    if (typeof value !== 'string') return fallback
    if (/^(\/|#|https?:|mailto:|tel:)/i.test(fallback) && !safeLink(value)) return fallback
    return value as T
  }
  if (typeof fallback === 'number' || typeof fallback === 'boolean') return (typeof value === typeof fallback ? value : fallback) as T
  if (Array.isArray(fallback)) {
    // Sanity stores tuples as named columns because nested arrays are unsupported.
    if (record(value) && value.tupleRow === true) return fallback.map((item, index) => mergePageValue(value['c' + index], item)) as T
    if (!Array.isArray(value)) return fallback
    return value.map((item, index) => {
      const sourceIndex = record(item) && typeof item.sourceIndex === 'number' ? item.sourceIndex : index
      const base = fallback[sourceIndex] ?? fallback[0]
      return base === undefined ? item : mergePageValue(item, base)
    }) as T
  }
  if (record(fallback) && record(value)) {
    if (typeof fallback.src === 'string' && typeof fallback.width === 'number') return imageValue(value, fallback as unknown as StaticImageData) as T
    const merged: RecordValue = {...fallback}
    for (const key of Object.keys(fallback)) if (key in value) merged[key] = mergePageValue(value[key], fallback[key])
    return merged as T
  }
  return fallback
}

export function createPageEditor(document: RecordValue | null) {
  const get = (key: string): unknown => key.split('.').reduce<unknown>((value, part) => record(value) ? value[part] : undefined, document)
  return {
    exists: Boolean(document),
    text(key: string, fallback: string): string { return mergePageValue(get(key), fallback) },
    data<T>(key: string, fallback: T): T { return mergePageValue(get(key), fallback) },
    image(key: string, fallback: StaticImageData): StaticImageData { return imageValue(get(key), fallback) },
  }
}

const getDocument = cache(async (path: string) => {
  const route = routes.find(item => item.path === path)
  if (!route) return null
  return client.fetch<RecordValue | null>(`*[_id == $id && _type == $type][0]`, {id: route.id, type: route.type}, {next: {revalidate: 60}})
})
export const getPageEditor = cache(async (path: string) => createPageEditor(await getDocument(path)))

export async function editableMetadata(path: string, fallback: Metadata): Promise<Metadata> {
  const document = await getDocument(path)
  if (!document) return fallback
  const title = typeof document.seoTitle === 'string' && document.seoTitle.trim() ? document.seoTitle.trim() : undefined
  const description = typeof document.seoDescription === 'string' && document.seoDescription.trim() ? document.seoDescription.trim() : undefined
  return {...fallback, ...(title ? {title} : {}), ...(description ? {description} : {}),
    openGraph: {...fallback.openGraph, ...(title ? {title: `${title} | LazTek Engineering`} : {}), ...(description ? {description} : {})},
    twitter: {...fallback.twitter, ...(title ? {title: `${title} | LazTek Engineering`} : {}), ...(description ? {description} : {})}}
}
