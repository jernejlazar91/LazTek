import {getPageEditor, editableMetadata} from '@/sanity/pageEditor';
import SiteHeader from '@/components/CmsSiteHeader'
import {pageMetadata} from '@/lib/seo'
import {client} from '@/sanity/client'
import {urlFor} from '@/sanity/image'
import type {CmsGalleryItem} from '@/sanity/content'

export async function generateMetadata() { return editableMetadata("/galerija", pageMetadata(
  'Galerija izdelkov in procesov',
  'Galerija 3D tiskanih kosov, prototipov, reverse engineering primerov, procesov in razvojnih projektov Laztek Engineering.',
  '/galerija',
)); }

async function getPageData() {
  return client.fetch<{siteSettings?: {brandName?: string}; galleryItems?: CmsGalleryItem[]}>(`{
    "siteSettings": *[_type == "siteSettings"][0]{
      brandName,
      email,
      phone,
      location,
      logo
    },
    "galleryItems": *[_type == "galleryItem"] | order(isFeatured desc, sortOrder asc, _createdAt desc){
      _id,
      title,
      category,
      image,
      videoUrl,
      description
    }
  }`, {}, {next: {revalidate: 60}})
}

import CollectionExplorer from '@/components/engineering/CollectionExplorer'
import {CTASection, PageHero} from '@/components/engineering/DesignSystem'

export default async function Page() {
  const editor = await getPageEditor("/galerija");
  

  const data = await getPageData()
  const site = data?.siteSettings
  const items = (data?.galleryItems || [])
    .filter((item) => item._id)
    .map((item) => ({
      id: item._id,
      title: item.title || 'Galerija',
      href: `/galerija/${encodeURIComponent(item._id)}`,
      excerpt: item.excerpt || item.description,
      category: item.category,
      publishedAt: item.publishedAt,
      image: item.image
        ? urlFor(item.image).width(1200).height(750).auto('format').url()
        : undefined,
      imageSmall: item.image
        ? urlFor(item.image).width(600).height(375).auto('format').url()
        : undefined,
      alt: item.image?.alt || item.title,
      hasVideo: Boolean(item.videoUrl),
    }))
  return (
    <>
      <SiteHeader brandName={site?.brandName} basePath="/" />
      <main id="vsebina" tabIndex={-1} className="lt-theme">
        <PageHero
          eyebrow={editor.text("s01.f001", "Galerija / LazTek Engineering")}
          breadcrumb="Galerija"
          title={editor.text("s01.f002", "Detajli. Procesi. Izvedbe.")}
          description={editor.text("s01.f003", "Vizualni pregled komponent, prototipov in razvojnih postopkov. Za ozadje posameznih rešitev obiščite tudi projekte.")}
          variant="editorial"
          action={false}
        />
        <section className="lt-container lt-section" aria-label="Galerija">
          <CollectionExplorer items={items} kind="gallery" />
        </section>
        <CTASection title={editor.text("s02.f004", "Imate podoben tehnični izziv?")} text={editor.text("s02.ctatext", "Pošljite model, osnovne mere ali opis uporabe. Skupaj določimo smiselno pot do izdelave.")} action={editor.text("s02.ctaaction", "Predstavite projekt")} />
      </main>
    </>
  )
}
