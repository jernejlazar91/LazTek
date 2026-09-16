import {notFound} from 'next/navigation'
import Link from 'next/link'
import SiteHeader from '@/components/SiteHeader'
import {client} from '@/sanity/client'
import {urlFor} from '@/sanity/image'

async function getSiteSettings() {
  return client.fetch(`*[_type == "siteSettings"][0]{
    brandName,
    logo
  }`)
}

async function getGalleryItem(id: string) {
  return client.fetch(
    `*[_type == "galleryItem" && _id == $id][0]{
      _id,
      title,
      category,
      image,
      videoUrl,
      description
    }`,
    {id}
  )
}

async function getAllGalleryItems() {
  return client.fetch(`*[_type == "galleryItem"] | order(_createdAt desc){
    _id,
    title,
    category,
    image
  }`)
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
    <main className="min-h-screen bg-[#050816] text-white">
      <SiteHeader
        logoUrl={site?.logo ? urlFor(site.logo).width(2200).height(650).url() : undefined}
        brandName={site?.brandName}
        basePath="/"
      />

      <div className="px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <div className="mb-6 flex flex-wrap items-center gap-3">
            <Link
              href="/#galerija"
              className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/75 transition hover:border-cyan-300/20 hover:bg-cyan-400/10 hover:text-white"
            >
              ← Nazaj na glavno galerijo
            </Link>

            <div className="inline-flex rounded-full border border-white/10 bg-white/10 px-3 py-1 text-xs text-white/60">
              {item.category}
            </div>
          </div>

          <h1 className="text-4xl font-semibold sm:text-5xl">{item.title}</h1>

          {item.description ? (
            <p className="mt-4 max-w-3xl text-lg text-white/70">{item.description}</p>
          ) : null}

          {item.image ? (
            <div className="mt-8 overflow-hidden rounded-[2rem] border border-white/10 bg-[#0b1020]/70">
              <img
                src={urlFor(item.image).width(2000).height(1400).url()}
                alt={item.title || 'Gallery image'}
                className="w-full object-contain"
              />
            </div>
          ) : null}

          {item.videoUrl ? (
            <div className="mt-6">
              <a
                href={item.videoUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex rounded-full bg-gradient-to-r from-cyan-400 via-sky-400 to-indigo-500 px-5 py-3 text-sm font-semibold text-slate-950 transition hover:scale-[1.02]"
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
                    className="overflow-hidden rounded-[1.5rem] border border-white/10 bg-white/5 transition hover:-translate-y-1"
                  >
                    {galleryItem.image ? (
                      <img
                        src={urlFor(galleryItem.image).width(900).height(600).url()}
                        alt={galleryItem.title || 'Gallery image'}
                        className="aspect-[16/10] w-full object-cover"
                      />
                    ) : (
                      <div className="flex aspect-[16/10] items-center justify-center text-white/45">
                        Slika
                      </div>
                    )}

                    <div className="p-4">
                      <div className="text-sm text-white/50">{galleryItem.category}</div>
                      <div className="mt-1 font-medium text-white">{galleryItem.title}</div>
                    </div>
                  </Link>
                ))}
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}