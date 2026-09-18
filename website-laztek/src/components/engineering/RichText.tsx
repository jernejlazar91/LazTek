import {urlFor} from '@/sanity/image'
import {PortableText, type PortableTextComponents} from '@portabletext/react'
import type {ComponentProps} from 'react'

const components: PortableTextComponents = {
  block: {
    h1: ({children}) => <h2>{children}</h2>,
  },
  types: {
    image: ({value}) =>
      value?.asset ? (
        <figure>
          <img
            src={urlFor(value).width(1400).auto('format').url()}
            alt={value.alt || value.caption || 'Ilustracija tehničnega zapisa'}
            loading="lazy"
            decoding="async"
          />
          {value.caption && <figcaption>{value.caption}</figcaption>}
        </figure>
      ) : null,
  },
  marks: {
    link: ({children, value}) => {
      const href = typeof value?.href === 'string' ? value.href.trim() : ''
      const safe = /^(https?:\/\/|mailto:|tel:|\/(?!\/)|#)/i.test(href)
      return safe ? <a href={href}>{children}</a> : <span>{children}</span>
    },
  },
}
export default function RichText({
  value,
}: {
  value: ComponentProps<typeof PortableText>['value']
}) {
  return (
    <div className="lt-article-body">
      <PortableText value={value || []} components={components} />
    </div>
  )
}
