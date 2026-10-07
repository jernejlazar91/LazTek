import {getPageEditor, editableMetadata} from '@/sanity/pageEditor';
import SiteHeader from '@/components/CmsSiteHeader'
import {staticProjects} from '@/data/projects'
import {pageMetadata} from '@/lib/seo'
import {client} from '@/sanity/client'
import {urlFor} from '@/sanity/image'
import {textOr} from '@/sanity/content'

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
      publishedAt,
      useCmsContent
    }
  }`, {}, {next: {revalidate: 60}})
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
  useCmsContent?: boolean
}

type ProjectsPageData = {
  siteSettings?: {brandName?: string; logo?: unknown}
  projects?: CmsProjectCard[]
}

export default async function Page() {
  const editor = await getPageEditor("/projekti");
  

  const data = (await getProjectsPageData()) as ProjectsPageData
  const site = data?.siteSettings
  const activeCms = new Map((data?.projects || []).filter(item => item.useCmsContent === true && item.slug).map(item => [item.slug, item]))
  const staticItems = await Promise.all(staticProjects.map(async (originalItem) => {
    const projectEditor = await getPageEditor(`/projekti/${originalItem.slug}`)
    const item = projectEditor.data("project", originalItem)
    const cms = projectEditor.exists ? undefined : activeCms.get(item.slug)
    return ({
    id: `static-${item.slug}`,
    title: textOr(cms?.title, item.title),
    href: `/projekti/${item.slug}`,
    excerpt: textOr(cms?.excerpt, item.excerpt),
    category: textOr(cms?.category, item.category),
    image: cms?.featuredImage?.asset ? urlFor(cms.featuredImage).width(1200).height(750).auto('format').url() : item.featuredImage.src,
    imageSmall: cms?.featuredImage?.asset ? urlFor(cms.featuredImage).width(600).height(375).auto('format').url() : item.featuredImage.src,
    alt: textOr(cms?.featuredImage?.alt, item.featuredAlt),
  })}))
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
          eyebrow={editor.text("s01.f001", "Projekti / LazTek Engineering")}
          breadcrumb="Projekti"
          title={editor.text("s01.f002", "Resnični projekti. Merljivi koraki.")}
          description={editor.text("s01.f003", "Oglejte si, kako iz fizičnega kosa, 3D-skena ali začetne ideje nastane uporabna digitalna geometrija, prototip oziroma končna komponenta.")}
          variant="editorial"
          action={false}
        />
        <section className="lt-container lt-section" aria-label="Projekti">
          <CollectionExplorer items={items} kind="projects" />
        </section>
        <CTASection title={editor.text("s02.f004", "Imate podoben tehnični izziv?")} text={editor.text("s02.ctatext", "Pošljite model, osnovne mere ali opis uporabe. Skupaj določimo smiselno pot do izdelave.")} action={editor.text("s02.ctaaction", "Predstavite projekt")} />
      </main>
    </>
  )
}

export async function generateMetadata() { return editableMetadata("/projekti", pageMetadata(
  'Projekti 3D-tiska, skeniranja in razvoja',
  'Resnični projekti LazTek Engineering: industrijski 3D-tisk, 3D-skeniranje, reverse engineering, CAD-rekonstrukcija, prototipi in funkcionalne komponente.',
  '/projekti',
)); }
