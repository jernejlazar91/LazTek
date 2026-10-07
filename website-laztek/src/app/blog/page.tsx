import {getPageEditor, editableMetadata} from '@/sanity/pageEditor';
import SiteHeader from '@/components/CmsSiteHeader'
import {pageMetadata} from '@/lib/seo'
import {client} from '@/sanity/client'
import {urlFor} from '@/sanity/image'
import type {CmsImage} from '@/sanity/content'

type BlogCard = {
  _id: string
  title?: string
  slug?: string
  excerpt?: string
  category?: string
  coverImage?: CmsImage
  publishedAt?: string
}

async function getBlogPageData() {
  return client.fetch<{siteSettings?: {brandName?: string}; posts?: BlogCard[]}>(`{
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
      publishedAt,
      category,
      tags
    }
  }`, {}, {next: {revalidate: 60}})
}

import CollectionExplorer from '@/components/engineering/CollectionExplorer'
import {CTASection, PageHero} from '@/components/engineering/DesignSystem'

export default async function Page() {
  const editor = await getPageEditor("/blog");
  

  const data = await getBlogPageData()
  const site = data?.siteSettings
  const items = (data?.posts || [])
    .filter((item): item is BlogCard & {slug: string} => Boolean(item.slug))
    .map((item) => ({
      id: item._id,
      title: item.title || 'Blog',
      href: `/blog/${encodeURIComponent(item.slug)}`,
      excerpt: item.excerpt,
      category: item.category,
      publishedAt: item.publishedAt,
      image: item.coverImage
        ? urlFor(item.coverImage).width(1200).height(750).auto('format').url()
        : undefined,
      imageSmall: item.coverImage
        ? urlFor(item.coverImage).width(600).height(375).auto('format').url()
        : undefined,
      alt: item.coverImage?.alt || item.title,
    }))
  return (
    <>
      <SiteHeader brandName={site?.brandName} basePath="/" />
      <main id="vsebina" tabIndex={-1} className="lt-theme">
        <PageHero
          eyebrow={editor.text("s01.f001", "Blog / LazTek Engineering")}
          breadcrumb="Blog"
          title={editor.text("s01.f002", "Znanje iz razvoja.")}
          description={editor.text("s01.f003", "Tehnični zapiski, procesne izkušnje in odločitve iz praktičnega dela. O materialih, konstrukciji in aditivni izdelavi.")}
          variant="editorial"
          action={false}
        />
        <section className="lt-container lt-section" aria-label="Blog">
          <CollectionExplorer items={items} kind="blog" />
        </section>
        <CTASection title={editor.text("s02.f004", "Imate podoben tehnični izziv?")} text={editor.text("s02.ctatext", "Pošljite model, osnovne mere ali opis uporabe. Skupaj določimo smiselno pot do izdelave.")} action={editor.text("s02.ctaaction", "Predstavite projekt")} />
      </main>
    </>
  )
}

export async function generateMetadata() { return editableMetadata("/blog", pageMetadata(
  'Tehnični blog',
  'Tehnični zapiski o materialih, CAD razvoju, 3D skeniranju in aditivni proizvodnji.',
  '/blog',
)); }
