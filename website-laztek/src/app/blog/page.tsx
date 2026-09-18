import SiteHeader from '@/components/SiteHeader'
import {pageMetadata} from '@/lib/seo'
import {client} from '@/sanity/client'
import {urlFor} from '@/sanity/image'

async function getBlogPageData() {
  return client.fetch(`{
    "siteSettings": *[_type == "siteSettings"][0]{
      brandName,
      logo
    },
    "posts": *[_type == "blogPost"] | order(publishedAt desc){
      _id,
      title,
      "slug": slug.current,
      excerpt,
      coverImage,
      publishedAt
    }
  }`)
}

import CollectionExplorer from '@/components/engineering/CollectionExplorer'
import {CTASection, PageHero} from '@/components/engineering/DesignSystem'

export default async function Page() {
  const data = await getBlogPageData()
  const site = data?.siteSettings
  const items = (data?.posts || [])
    .filter((item: any) => item.slug)
    .map((item: any) => ({
      id: item._id,
      title: item.title || 'Blog',
      href: `/blog/${encodeURIComponent(item.slug)}`,
      excerpt: item.excerpt || item.description,
      category: item.category,
      publishedAt: item.publishedAt,
      image: item.coverImage
        ? urlFor(item.coverImage).width(1200).height(750).auto('format').url()
        : undefined,
      imageSmall: item.coverImage
        ? urlFor(item.coverImage).width(600).height(375).auto('format').url()
        : undefined,
      alt: item.coverImage?.alt || item.title,
      hasVideo: Boolean(item.videoUrl),
    }))
  return (
    <>
      <SiteHeader brandName={site?.brandName} basePath="/" />
      <main id="vsebina" tabIndex={-1} className="lt-theme">
        <PageHero
          eyebrow="Blog / LazTek Engineering"
          breadcrumb="Blog"
          title="Znanje iz razvoja."
          description="Tehnični zapiski, procesne izkušnje in odločitve iz praktičnega dela. O materialih, konstrukciji in aditivni izdelavi."
          variant="editorial"
          action={false}
        />
        <section className="lt-container lt-section" aria-label="Blog">
          <CollectionExplorer items={items} kind="blog" />
        </section>
        <CTASection title="Imate podoben tehnični izziv?" />
      </main>
    </>
  )
}

export const metadata = pageMetadata(
  'Tehnični blog',
  'Tehnični zapiski o materialih, CAD razvoju, 3D skeniranju in aditivni proizvodnji.',
  '/blog',
)
