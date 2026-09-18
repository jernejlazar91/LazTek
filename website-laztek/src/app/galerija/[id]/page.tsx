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

const getGalleryItem = cache(async (id: string) => {
  return client.fetch(
    `*[_type == "galleryItem" && _id == $id][0]{
      _id,
      title,
      category,
      image,
      videoUrl,
      description
    }`,
    {id},
  )
})

async function getAllGalleryItems() {
  return client.fetch(`*[_type == "galleryItem"] | order(_createdAt desc){
    _id,
    title,
    category,
    image
  }`)
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{id: string}>
}): Promise<Metadata> {
  const {id} = await params
  const item = await getGalleryItem(id)
  if (!item)
    return {title: 'Vsebina ni najdena', robots: {index: false, follow: false}}
  return pageMetadata(
    item.title || 'Galerija',
    item.description || 'Izvedba LazTek Engineering.',
    `/galerija/${encodeURIComponent(id)}`,
  )
}

export default async function GalleryDetailPage({
  params,
}: {
  params: Promise<{id: string}>
}) {
  const {id} = await params

  const [site, item, allItems] = await Promise.all([
    getSiteSettings(),
    getGalleryItem(id),
    getAllGalleryItems(),
  ])

  if (!item) notFound()

  return (
    <>
      <SiteHeader
        logoUrl={
          site?.logo
            ? urlFor(site.logo).width(2200).height(650).url()
            : undefined
        }
        brandName={site?.brandName}
        basePath="/"
      />
      <main id="vsebina" tabIndex={-1} className="lt-theme">
        <div className="px-4 py-16 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-6xl">
            <div className="mb-6 flex flex-wrap items-center gap-3">
              <Link
                href="/galerija"
                className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/75 transition hover:border-cyan-300/20 hover:bg-cyan-400/10 hover:text-white"
              >
                ← Nazaj na glavno galerijo
              </Link>

              <div className="inline-flex rounded-full border border-cyan-200/15 bg-cyan-100/[0.07] px-3 py-1 text-xs text-white/60">
                {item.category}
              </div>
            </div>

            <h1 className="text-4xl font-semibold sm:text-5xl">{item.title}</h1>

            {item.description ? (
              <p className="mt-4 max-w-3xl text-lg text-white/70">
                {item.description}
              </p>
            ) : null}

            {item.image ? (
              <div className="mt-8 overflow-hidden rounded-md border border-white/10 bg-[#0b1020]/70">
                <img
                  loading="lazy"
                  decoding="async"
                  src={urlFor(item.image).width(2000).height(1400).url()}
                  alt={item.title || 'Izvedba LazTek Engineering'}
                  className="w-full object-contain"
                />
              </div>
            ) : null}

            {safeWebUrl(item.videoUrl) ? (
              <div className="mt-6">
                <a
                  href={safeWebUrl(item.videoUrl)}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex rounded-full bg-gradient-to-r from-cyan-400 via-sky-400 to-blue-600 px-5 py-3 text-sm font-semibold text-slate-950 transition hover:scale-[1.02]"
                >
                  Odpri povezani video
                </a>
              </div>
            ) : null}

            <div className="mt-14">
              <h2 className="text-2xl font-semibold">Ostale slike</h2>

              <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {allItems
                  .filter((galleryItem: any) => galleryItem._id !== item._id)
                  .map((galleryItem: any) => (
                    <Link
                      key={galleryItem._id}
                      href={`/galerija/${galleryItem._id}`}
                      className="overflow-hidden rounded-sm border border-white/10 bg-white/5 transition hover:-translate-y-1"
                    >
                      {galleryItem.image ? (
                        <img
                          loading="lazy"
                          decoding="async"
                          src={urlFor(galleryItem.image)
                            .width(900)
                            .height(600)
                            .url()}
                          alt={
                            galleryItem.title || 'Izvedba LazTek Engineering'
                          }
                          className="aspect-[16/10] w-full object-cover"
                        />
                      ) : (
                        <div className="flex aspect-[16/10] items-center justify-center text-white/45">
                          Slika
                        </div>
                      )}

                      <div className="p-4">
                        <div className="text-sm text-white/50">
                          {galleryItem.category}
                        </div>
                        <div className="mt-1 font-medium text-white">
                          {galleryItem.title}
                        </div>
                      </div>
                    </Link>
                  ))}
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  )
}
