import SiteHeader from '@/components/SiteHeader'
import {pageMetadata} from '@/lib/seo'
import {client} from '@/sanity/client'
import {urlFor} from '@/sanity/image'

async function getProjectsPageData() {
  return client.fetch(`{
    "siteSettings": *[_type == "siteSettings"][0]{
      brandName,
      logo
    },
    "projects": *[_type == "project"] | order(publishedAt desc){
      _id,
      title,
      "slug": slug.current,
      category,
      excerpt,
      featuredImage,
      publishedAt
    }
  }`)
}

import CollectionExplorer from '@/components/engineering/CollectionExplorer'
import {CTASection, PageHero} from '@/components/engineering/DesignSystem'

export default async function Page() {
  const data = await getProjectsPageData()
  const site = data?.siteSettings
  const items = (data?.projects || [])
    .filter((item: any) => item.slug)
    .map((item: any) => ({
      id: item._id,
      title: item.title || 'Projekti',
      href: `/projekti/${encodeURIComponent(item.slug)}`,
      excerpt: item.excerpt || item.description,
      category: item.category,
      publishedAt: item.publishedAt,
      image: item.featuredImage
        ? urlFor(item.featuredImage)
            .width(1200)
            .height(750)
            .auto('format')
            .url()
        : undefined,
      imageSmall: item.featuredImage
        ? urlFor(item.featuredImage).width(600).height(375).auto('format').url()
        : undefined,
      alt: item.featuredImage?.alt || item.title,
      hasVideo: Boolean(item.videoUrl),
    }))
  return (
    <>
      <SiteHeader brandName={site?.brandName} basePath="/" />
      <main id="vsebina" tabIndex={-1} className="lt-theme">
        <PageHero
          eyebrow="Projekti / LazTek Engineering"
          breadcrumb="Projekti"
          title="Inženirstvo v praksi."
          description="Projekti industrijskega 3D tiska, rekonstrukcije geometrije in razvoja. Izhodišče, pristop in rezultat posamezne izvedbe."
          variant="editorial"
          action={false}
        />
        <section className="lt-container lt-section" aria-label="Projekti">
          <CollectionExplorer items={items} kind="projects" />
        </section>
        <CTASection title="Imate podoben tehnični izziv?" />
      </main>
    </>
  )
}

export const metadata = pageMetadata(
  'Inženirski projekti',
  'Razvojni projekti, industrijski 3D tisk, CAD rekonstrukcija in funkcionalne tehnične komponente LazTek Engineering.',
  '/projekti',
)
