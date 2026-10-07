import Image from 'next/image'
import Link from 'next/link'
import type {ComponentProps, ReactNode} from 'react'
import {urlFor} from '@/sanity/image'
import {relatedServices, stringList, type CmsImage, type EditablePage} from '@/sanity/content'
import {JumpNav, PageHero, ProcessFlow, SectionHeading} from './DesignSystem'

export function CmsFigure({image, priority = false, className = '', fallbackAlt}: {
  image: CmsImage; priority?: boolean; className?: string; fallbackAlt: string
}) {
  if (!image.asset) return null
  const dimensions = /-(\d+)x(\d+)-[^-]+$/.exec(image.asset._ref || image.asset._id || '')
  const width = dimensions ? Number(dimensions[1]) : 1600
  const height = dimensions ? Number(dimensions[2]) : 1000
  return <figure className={`lt-cms-figure ${className}`}>
    <Image src={urlFor(image).width(1600).auto('format').url()} alt={image.alt || fallbackAlt}
      width={width} height={height} sizes="(max-width: 800px) 100vw, 1180px" priority={priority} style={{width: '100%', height: 'auto'}} />
    {image.caption && <figcaption>{image.caption}</figcaption>}
  </figure>
}

export function CmsPageHero({page, ...props}: ComponentProps<typeof PageHero> & {page: EditablePage | null}) {
  const replaced = page?.replaceBody && page.sections?.some(section => section.title?.trim() || section.text?.trim())
  return <PageHero {...props}
    eyebrow={page?.eyebrow?.trim() || props.eyebrow}
    title={page?.heroTitle?.trim() || props.title}
    description={page?.heroText?.trim() || props.description}
    secondary={replaced ? {href: '#cms-section-1', label: 'Podrobnosti storitve'} : props.secondary}
    visual={page?.heroImage?.asset
      ? <CmsFigure image={page.heroImage} priority className="lt-technical-image" fallbackAlt={page.heroTitle || props.breadcrumb} />
      : props.visual} />
}

export function CmsServiceBody({page, children}: {page: EditablePage | null; children: ReactNode}) {
  const sections = page?.sections?.filter(section => section.title?.trim() || section.text?.trim()) || []
  if (!page?.replaceBody || !sections.length) return children
  const cards = page.summaryCards?.filter(card => card.label?.trim() && card.value?.trim()) || []
  return <>
    <JumpNav items={sections.map((section, index) => ({id: `cms-section-${index + 1}`, label: section.title || `Razdelek ${index + 1}`}))} />
    {cards.length > 0 && <section className="lt-container lt-section"><dl className="lt-metrics">
      {cards.map((card, index) => <div className="lt-metric" key={card._key || index}><dt>{card.label}</dt><dd>{card.value}</dd></div>)}
    </dl></section>}
    {sections.map((section, index) => <section className="lt-container lt-section" id={`cms-section-${index + 1}`} key={section._key || index}>
      {section.title && <SectionHeading title={section.title} />}
      <div className="lt-article-body">
        {section.text?.split(/\n\s*\n/).map((paragraph, i) => <p key={i}>{paragraph}</p>)}
        {stringList(section.bullets).length > 0 && <ul>{stringList(section.bullets).map(value => <li key={value}>{value}</li>)}</ul>}
      </div>
    </section>)}
    {stringList(page.suitableFor).length > 0 && <section className="lt-container lt-section lt-article-body"><h2>Primerno za</h2><ul>{stringList(page.suitableFor).map(value => <li key={value}>{value}</li>)}</ul></section>}
    {stringList(page.notIdealFor).length > 0 && <section className="lt-container lt-section lt-article-body"><h2>Kdaj preverimo drugo rešitev</h2><ul>{stringList(page.notIdealFor).map(value => <li key={value}>{value}</li>)}</ul></section>}
    {page.processSteps?.length ? <section className="lt-container lt-section"><SectionHeading title="Potek dela" /><ProcessFlow steps={page.processSteps.map(step => [step.title, step.text].filter(Boolean).join(' — '))} /></section> : null}
  </>
}

export function RelatedServices({values}: {values: unknown}) {
  const links = relatedServices(values)
  return links.length ? <section className="lt-article-body">
    <h2>Povezane storitve</h2>
    <ul>{links.map(link => <li key={link.href}><Link href={link.href}>{link.label}</Link></li>)}</ul>
  </section> : null
}

export function EditableTitle({first, second}: {first: string; second: string}) {
  return <>{first}{second && <><br /><em>{second}</em></>}</>
}
