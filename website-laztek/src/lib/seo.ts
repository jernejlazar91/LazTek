import type {Metadata} from 'next'

export function pageMetadata(
  title: string,
  description: string,
  path: string,
): Metadata {
  return {
    title,
    description,
    alternates: {canonical: path},
    openGraph: {
      title: `${title} | LazTek Engineering`,
      description,
      url: path,
      type: 'website',
      locale: 'sl_SI',
      siteName: 'LazTek Engineering',
      images: [{url: '/opengraph-image', width: 1200, height: 630}],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${title} | LazTek Engineering`,
      description,
      images: ['/opengraph-image'],
    },
  }
}

export function safeWebUrl(value: unknown): string | undefined {
  if (typeof value !== 'string') return undefined
  try {
    const url = new URL(value)
    return ['http:', 'https:'].includes(url.protocol) ? url.href : undefined
  } catch {
    return undefined
  }
}
