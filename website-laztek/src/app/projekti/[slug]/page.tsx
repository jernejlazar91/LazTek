import {
  Breadcrumbs,
  CTASection,
  TechnicalBadge,
} from '@/components/engineering/DesignSystem'
import JsonLd from '@/components/engineering/JsonLd'
import RichText from '@/components/engineering/RichText'
import SiteHeader from '@/components/SiteHeader'
import {pageMetadata, safeWebUrl} from '@/lib/seo'
import {client} from '@/sanity/client'
import {urlFor} from '@/sanity/image'
import type {Metadata} from 'next'
import Link from 'next/link'
import {notFound} from 'next/navigation'
import {cache} from 'react'

async function getSiteSettings() {
  return client.fetch(`*[_type == "siteSettings"][0]{
    brandName,
    logo
  }`)
}

const getProject = cache(async (slug: string) => {
  return client.fetch(
    `*[_type == "project" && slug.current == $slug][0]{
      _id,
      title,
      "slug": slug.current,
      category,
      excerpt,
      featuredImage,
      gallery,
      videoUrl,
      publishedAt,
      content
    }`,
    {slug},
  )
})

export async function generateMetadata({
  params,
}: {
  params: Promise<{slug: string}>
}): Promise<Metadata> {
  const {slug} = await params
  const item = await getProject(slug)
  if (!item)
    return {title: 'Vsebina ni najdena', robots: {index: false, follow: false}}
  return pageMetadata(
    item.title,
    item.excerpt || 'Projekti LazTek Engineering.',
    `/projekti/${encodeURIComponent(slug)}`,
  )
}
export default async function DetailPage({
  params,
}: {
  params: Promise<{slug: string}>
}) {
  const {slug} = await params
  const [site, project] = await Promise.all([
    getSiteSettings(),
    getProject(slug),
  ])
  if (!project) notFound()
  return (
    <>
      <SiteHeader brandName={site?.brandName} basePath="/" />
      <main id="vsebina" tabIndex={-1} className="lt-theme">
        <div className="lt-container">
          <Breadcrumbs
            items={[
              {label: 'Projekti', href: '/projekti'},
              {label: project.title},
            ]}
          />
          <article className="lt-article">
            <header>
              <TechnicalBadge>
                {project.category || 'Projekti / LazTek Engineering'}
              </TechnicalBadge>
              <h1>{project.title}</h1>
              <p className="lt-lead">{project.excerpt}</p>
              {project.publishedAt &&
                !Number.isNaN(Date.parse(project.publishedAt)) && (
                  <time className="lt-published" dateTime={project.publishedAt}>
                    {new Date(project.publishedAt).toLocaleDateString('sl-SI', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                      timeZone: 'UTC',
                    })}
                  </time>
                )}
            </header>
            {project.featuredImage && (
              <img
                className="lt-article-cover"
                src={urlFor(project.featuredImage)
                  .width(1600)
                  .auto('format')
                  .url()}
                alt={project.featuredImage.alt || project.title}
                fetchPriority="high"
              />
            )}
            <RichText value={project.content || []} />
            {project.gallery?.length ? (
              <div className="lt-grid lt-grid-two" style={{marginTop: 28}}>
                {project.gallery.map((image: any, index: number) => (
                  <img
                    key={image._key || index}
                    src={urlFor(image).width(1000).auto('format').url()}
                    alt={image.alt || `${project.title} — detail ${index + 1}`}
                    loading="lazy"
                    decoding="async"
                  />
                ))}
              </div>
            ) : null}
            {safeWebUrl(project.videoUrl) && (
              <a
                className="lt-text-link"
                href={safeWebUrl(project.videoUrl)}
                target="_blank"
                rel="noopener noreferrer"
              >
                Oglejte si povezani video ↗
              </a>
            )}
            <Link href="/projekti" className="lt-text-link">
              ← Nazaj: projekti
            </Link>
          </article>
        </div>
        <JsonLd
          data={{
            '@context': 'https://schema.org',
            '@type': 'CreativeWork',
            name: project.title,
            headline: project.title,
            description: project.excerpt,
            url: `https://laztek.si/projekti/${encodeURIComponent(slug)}`,
            datePublished: project.publishedAt,
            creator: {
              '@type': 'Organization',
              name: 'LazTek Engineering',
              url: 'https://laztek.si',
            },
            image: project.featuredImage
              ? urlFor(project.featuredImage).width(1600).url()
              : undefined,
          }}
        />
        <CTASection />
      </main>
    </>
  )
}
