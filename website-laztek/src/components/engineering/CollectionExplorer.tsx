'use client'
import {ArrowUpRight} from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import {useId, useMemo, useState} from 'react'

export type CollectionItem = {
  id: string
  title: string
  href: string
  excerpt?: string
  category?: string
  image?: string
  imageSmall?: string
  alt?: string
  publishedAt?: string
  hasVideo?: boolean
}
const normalize = (value: string) =>
  value
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
export default function CollectionExplorer({
  items,
  kind,
}: {
  items: CollectionItem[]
  kind: 'projects' | 'gallery' | 'blog'
}) {
  const id = useId()
  const [query, setQuery] = useState('')
  const [category, setCategory] = useState('Vse')
  const categories = useMemo(
    () => [
      'Vse',
      ...Array.from(
        new Set(
          items.map((x) => x.category).filter((x): x is string => Boolean(x)),
        ),
      ),
    ],
    [items],
  )
  const filtered = items.filter(
    (x) =>
      (category === 'Vse' || x.category === category) &&
      normalize(`${x.title} ${x.excerpt || ''}`).includes(normalize(query)),
  )
  const empty =
    kind === 'projects'
      ? 'Novi projekti bodo predstavljeni kmalu. Za soroden tehnični izziv nam pošljite povpraševanje.'
      : kind === 'gallery'
        ? 'Galerijo izvedb dopolnjujemo. Oglejte si tudi naše storitve in projekte.'
        : 'Tehnične zapiske pripravljamo. Do takrat raziščite storitve in materialno knjižnico.'
  if (!items.length)
    return (
      <div className="lt-empty">
        <p>{empty}</p>
        <Link className="lt-text-link" href="/storitve">
          Raziščite storitve <ArrowUpRight size={16} />
        </Link>
      </div>
    )
  return (
    <div>
      <div className="lt-library-controls">
        <div>
          <label htmlFor={id}>
            {kind === 'blog'
              ? 'Poiščite tehnično temo'
              : 'Poiščite projekt ali področje'}
          </label>
          <input
            className="lt-input"
            id={id}
            type="search"
            placeholder="Vpišite iskalni izraz …"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>
        <p className="lt-muted" role="status">
          Prikazano: {filtered.length} / {items.length}
        </p>
      </div>
      {categories.length > 1 && (
        <div className="lt-filters" aria-label="Področja">
          {categories.map((x) => (
            <button
              type="button"
              key={x}
              aria-pressed={x === category}
              onClick={() => setCategory(x)}
            >
              {x}
            </button>
          ))}
        </div>
      )}
      <div
        className={
          kind === 'gallery'
            ? 'lt-gallery lt-collection'
            : kind === 'blog'
              ? 'lt-journal lt-collection'
              : 'lt-case-grid lt-collection'
        }
      >
        {filtered.map((item, index) => (
          <Link
            className={`lt-case ${kind === 'projects' && index === 0 ? 'lt-case-featured' : ''}`}
            key={item.id}
            href={item.href}
          >
            <div className="lt-case-media">
              {item.image ? (
                <Image
                  src={item.image}
                  sizes={
                    kind === 'gallery'
                      ? '(max-width: 520px) 100vw, (max-width: 800px) 50vw, 33vw'
                      : '(max-width: 800px) 100vw, 50vw'
                  }
                  alt={item.alt || item.title}
                  width={1000}
                  height={625}
                />
              ) : (
                <div className="lt-image-placeholder">
                  {kind === 'blog' ? 'TEHNIČNI ZAPIS' : 'LAZTEK / PROJEKT'}
                </div>
              )}
            </div>
            <div>
              <div className="lt-case-meta">
                <span>
                  {item.category ||
                    (kind === 'blog'
                      ? 'Znanje in razvoj'
                      : 'LazTek Engineering')}
                  {item.hasVideo ? ' / Video' : ''}
                </span>
                {item.publishedAt &&
                  !Number.isNaN(Date.parse(item.publishedAt)) && (
                    <time dateTime={item.publishedAt}>
                      {new Date(item.publishedAt).toLocaleDateString('sl-SI', {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric',
                        timeZone: 'UTC',
                      })}
                    </time>
                  )}
              </div>
              <h2>{item.title}</h2>
              {item.excerpt && <p>{item.excerpt}</p>}
              <span className="lt-text-link">
                {kind === 'blog'
                  ? 'Preberite zapis'
                  : kind === 'gallery'
                    ? 'Oglejte si izvedbo'
                    : 'Oglejte si projekt'}{' '}
                <ArrowUpRight size={16} aria-hidden="true" />
              </span>
            </div>
          </Link>
        ))}
      </div>
      {!filtered.length && (
        <div className="lt-empty">
          <p>Za izbrane pogoje ni zadetkov.</p>
          <button
            type="button"
            className="lt-text-link"
            onClick={() => {
              setQuery('')
              setCategory('Vse')
            }}
          >
            Ponastavi iskanje in filtre
          </button>
        </div>
      )}
    </div>
  )
}
