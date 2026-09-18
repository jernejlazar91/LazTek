import {
  Breadcrumbs,
  CTASection,
  TechnicalBadge,
} from '@/components/engineering/DesignSystem'
import JsonLd from '@/components/engineering/JsonLd'
import RichText from '@/components/engineering/RichText'
import SiteHeader from '@/components/SiteHeader'
import {pageMetadata} from '@/lib/seo'
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

const getPost = cache(async (slug: string) => {
  return client.fetch(
    `*[_type == "blogPost" && slug.current == $slug][0]{
      _id,
      title,
      "slug": slug.current,
      excerpt,
      coverImage,
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
  const item = await getPost(slug)
  if (!item)
    return {title: 'Vsebina ni najdena', robots: {index: false, follow: false}}
  return pageMetadata(
    item.title,
    item.excerpt || 'Blog LazTek Engineering.',
    `/blog/${encodeURIComponent(slug)}`,
  )
}
export default async function DetailPage({
  params,
}: {
  params: Promise<{slug: string}>
}) {
  const {slug} = await params
  const [site, post] = await Promise.all([getSiteSettings(), getPost(slug)])
  if (!post) notFound()
  return (
    <>
      <SiteHeader brandName={site?.brandName} basePath="/" />
      <main id="vsebina" tabIndex={-1} className="lt-theme">
        <div className="lt-container">
          <Breadcrumbs
            items={[{label: 'Blog', href: '/blog'}, {label: post.title}]}
          />
          <article className="lt-article">
            <header>
              <TechnicalBadge>
                {post.category || 'Blog / LazTek Engineering'}
              </TechnicalBadge>
              <h1>{post.title}</h1>
              <p className="lt-lead">{post.excerpt}</p>
              {post.publishedAt &&
                !Number.isNaN(Date.parse(post.publishedAt)) && (
                  <time className="lt-published" dateTime={post.publishedAt}>
                    {new Date(post.publishedAt).toLocaleDateString('sl-SI', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                      timeZone: 'UTC',
                    })}
                  </time>
                )}
            </header>
            {post.coverImage && (
              <img
                className="lt-article-cover"
                src={urlFor(post.coverImage).width(1600).auto('format').url()}
                alt={post.coverImage.alt || post.title}
                fetchPriority="high"
              />
            )}
            <RichText value={post.content || []} />

            <Link href="/blog" className="lt-text-link">
              ← Nazaj: blog
            </Link>
          </article>
        </div>
        <JsonLd
          data={{
            '@context': 'https://schema.org',
            '@type': 'Article',
            name: post.title,
            headline: post.title,
            description: post.excerpt,
            url: `https://laztek.si/blog/${encodeURIComponent(slug)}`,
            datePublished: post.publishedAt,
            publisher: {
              '@type': 'Organization',
              name: 'LazTek Engineering',
              url: 'https://laztek.si',
            },
            image: post.coverImage
              ? urlFor(post.coverImage).width(1600).url()
              : undefined,
          }}
        />
        <CTASection />
      </main>
    </>
  )
}
