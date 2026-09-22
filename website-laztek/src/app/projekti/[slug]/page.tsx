import {
  Breadcrumbs,
  CapabilityGrid,
  CTASection,
  ImageSequence,
  TechnicalBadge,
} from '@/components/engineering/DesignSystem'
import JsonLd from '@/components/engineering/JsonLd'
import RichText from '@/components/engineering/RichText'
import SiteHeader from '@/components/SiteHeader'
import {
  getStaticProject,
  staticProjectSlugs,
  type StaticProject,
} from '@/data/projects'
import {pageMetadata, safeWebUrl} from '@/lib/seo'
import {client} from '@/sanity/client'
import {urlFor} from '@/sanity/image'
import type {Metadata} from 'next'
import Image from 'next/image'
import Link from 'next/link'
import {notFound} from 'next/navigation'
import {cache, type ComponentProps} from 'react'

type CmsImage = {alt?: string; _key?: string} & Record<string, unknown>

type CmsProject = {
  _id: string
  title: string
  slug: string
  category?: string
  excerpt?: string
  featuredImage?: CmsImage
  gallery?: CmsImage[]
  videoUrl?: string
  publishedAt?: string
  content?: ComponentProps<typeof RichText>['value']
}

async function getSiteSettings() {
  return client.fetch(`*[_type == "siteSettings"][0]{
    brandName,
    logo
  }`)
}

const getCmsProject = cache(async (slug: string) => {
  return client.fetch<CmsProject | null>(
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

export function generateStaticParams() {
  return staticProjectSlugs.map((slug) => ({slug}))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{slug: string}>
}): Promise<Metadata> {
  const {slug} = await params
  const staticProject = getStaticProject(slug)
  if (staticProject) {
    return pageMetadata(
      staticProject.title,
      staticProject.seoDescription,
      `/projekti/${slug}`,
    )
  }

  const item = await getCmsProject(slug)
  if (!item)
    return {title: 'Vsebina ni najdena', robots: {index: false, follow: false}}

  return pageMetadata(
    item.title,
    item.excerpt || 'Projekti LazTek Engineering.',
    `/projekti/${encodeURIComponent(slug)}`,
  )
}

function StaticProjectArticle({project}: {project: StaticProject}) {
  const projectUrl = `https://laztek.si/projekti/${project.slug}`
  const projectImageUrl = new URL(
    project.featuredImage.src,
    'https://laztek.si',
  ).toString()

  return (
    <>
      <div className="lt-container">
        <Breadcrumbs
          items={[
            {label: 'Projekti', href: '/projekti'},
            {label: project.title},
          ]}
        />
        <article className="lt-project-article">
          <header className="lt-project-header">
            <TechnicalBadge>{project.category}</TechnicalBadge>
            <h1>{project.title}</h1>
            <p className="lt-lead">{project.excerpt}</p>
          </header>

          <figure className="lt-project-cover">
            <Image
              src={project.featuredImage}
              alt={project.featuredAlt}
              priority
              placeholder="blur"
              sizes="(max-width: 800px) 100vw, 1180px"
              style={
                project.featuredPosition
                  ? {objectPosition: project.featuredPosition}
                  : undefined
              }
            />
          </figure>

          <p className="lt-project-intro">{project.intro}</p>

          <section className="lt-project-summary" aria-label="Povzetek projekta">
            <article>
              <span>01 / Izziv</span>
              <h2>Izhodišče</h2>
              <p>{project.challenge}</p>
            </article>
            <article>
              <span>02 / Pristop</span>
              <h2>Izvedba</h2>
              <p>{project.approach}</p>
            </article>
            <article>
              <span>03 / Rezultat</span>
              <h2>Dosežen rezultat</h2>
              <p>{project.result}</p>
            </article>
          </section>

          <section className="lt-project-section" aria-labelledby="potek-projekta">
            <div className="lt-section-heading">
              <TechnicalBadge>Dokumentiran potek</TechnicalBadge>
              <h2 id="potek-projekta">Od izhodišča do rezultata</h2>
              <p>
                Fotografije in tehnični prikazi so razvrščeni po dejanskem
                zaporedju dela. Izdelki in njihove površine niso umetno
                spremenjeni.
              </p>
            </div>
            <ImageSequence
              ariaLabel={`Potek projekta: ${project.title}`}
              items={project.stages}
            />
          </section>

          <section
            className="lt-project-capabilities"
            aria-labelledby="uporabljeni-postopki"
          >
            <div>
              <TechnicalBadge>Uporabljeni postopki</TechnicalBadge>
              <h2 id="uporabljeni-postopki">Kaj je projekt zahteval</h2>
              <p>
                Obseg dela se vedno prilagodi izhodiščnemu kosu, zahtevani
                natančnosti, namenu komponente in izbrani poti izdelave.
              </p>
              <Link className="lt-text-link" href={project.serviceHref}>
                {project.serviceLabel} →
              </Link>
            </div>
            <CapabilityGrid items={project.capabilities} />
          </section>

          <Link href="/projekti" className="lt-text-link lt-project-back">
            ← Nazaj na vse projekte
          </Link>
        </article>
      </div>

      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'CreativeWork',
          name: project.title,
          headline: project.title,
          description: project.seoDescription,
          url: projectUrl,
          creator: {
            '@type': 'Organization',
            name: 'LazTek Engineering',
            url: 'https://laztek.si',
          },
          image: projectImageUrl,
          about: project.capabilities,
        }}
      />

      <CTASection
        title="Imate podoben kos ali razvojni izziv?"
        text="Pošljite fotografije, osnovne mere, obstoječi kos ali kratek opis težave. Skupaj preverimo izvedljivost in smiselno pot do rešitve."
        action="Predstavite svoj projekt"
      />
    </>
  )
}

function CmsProjectArticle({
  project,
  slug,
}: {
  project: CmsProject
  slug: string
}) {
  return (
    <>
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
              src={urlFor(project.featuredImage).width(1600).auto('format').url()}
              alt={project.featuredImage.alt || project.title}
              fetchPriority="high"
            />
          )}
          <RichText value={project.content || []} />
          {project.gallery?.length ? (
            <div className="lt-grid lt-grid-two" style={{marginTop: 28}}>
              {project.gallery.map((image, index) => (
                <img
                  key={image._key || index}
                  src={urlFor(image).width(1000).auto('format').url()}
                  alt={image.alt || `${project.title} — detajl ${index + 1}`}
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
            ← Nazaj na projekte
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
    </>
  )
}

export default async function DetailPage({
  params,
}: {
  params: Promise<{slug: string}>
}) {
  const {slug} = await params
  const staticProject = getStaticProject(slug)
  const [site, cmsProject] = await Promise.all([
    getSiteSettings(),
    staticProject ? Promise.resolve(null) : getCmsProject(slug),
  ])

  let content
  if (staticProject) {
    content = <StaticProjectArticle project={staticProject} />
  } else {
    if (!cmsProject) notFound()
    content = <CmsProjectArticle project={cmsProject} slug={slug} />
  }

  return (
    <>
      <SiteHeader brandName={site?.brandName} basePath="/" />
      <main id="vsebina" tabIndex={-1} className="lt-theme">
        {content}
      </main>
    </>
  )
}
