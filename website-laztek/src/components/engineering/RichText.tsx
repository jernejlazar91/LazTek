import {PortableText, type PortableTextComponents} from '@portabletext/react'
import type {ComponentProps} from 'react'
import {CmsFigure} from './CmsContent'

const components: PortableTextComponents = {
  block: {
    h1: ({children}) => <h2>{children}</h2>,
  },
  types: {
    image: ({value}) =>
      value?.asset ? (
        <CmsFigure image={value} fallbackAlt={value.caption || 'Ilustracija tehničnega zapisa'} />
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
