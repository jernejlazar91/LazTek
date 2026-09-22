import SiteHeader from '@/components/SiteHeader'
import {staticProjects} from '@/data/projects'
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
      description,
      featuredImage,
      videoUrl,
      publishedAt
    }
  }`)
}

import CollectionExplorer from '@/components/engineering/CollectionExplorer'
import {CTASection, PageHero} from '@/components/engineering/DesignSystem'

type CmsProjectCard = {
  _id: string
  title?: string
  slug?: string
  category?: string
  excerpt?: string
  description?: string
  featuredImage?: {alt?: string} & Record<string, unknown>
  publishedAt?: string
  videoUrl?: string
}

type ProjectsPageData = {
  siteSettings?: {brandName?: string; logo?: unknown}
  projects?: CmsProjectCard[]
}

export default async function Page() {
  const data = (await getProjectsPageData()) as ProjectsPageData
  const site = data?.siteSettings
  const staticItems = staticProjects.map((item) => ({
    id: `static-${item.slug}`,
    title: item.title,
    href: `/projekti/${item.slug}`,
    excerpt: item.excerpt,
    category: item.category,
    image: item.featuredImage.src,
    imageSmall: item.featuredImage.src,
    alt: item.featuredAlt,
  }))
  const staticSlugs = new Set(staticProjects.map(({slug}) => slug))
  const cmsItems = (data?.projects || [])
    .filter(
      (item): item is CmsProjectCard & {slug: string} =>
        Boolean(item.slug) && !staticSlugs.has(item.slug || ''),
    )
    .map((item) => ({
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
  const items = [...staticItems, ...cmsItems]
  return (
    <>
      <SiteHeader brandName={site?.brandName} basePath="/" />
      <main id="vsebina" tabIndex={-1} className="lt-theme">
        <PageHero
          eyebrow="Projekti / LazTek Engineering"
          breadcrumb="Projekti"
          title="Resnični projekti. Merljivi koraki."
          description="Oglejte si, kako iz fizičnega kosa, 3D-skena ali začetne ideje nastane uporabna digitalna geometrija, prototip oziroma končna komponenta."
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
  'Projekti 3D-tiska, skeniranja in razvoja',
  'Resnični projekti LazTek Engineering: industrijski 3D-tisk, 3D-skeniranje, reverse engineering, CAD-rekonstrukcija, prototipi in funkcionalne komponente.',
  '/projekti',
)
