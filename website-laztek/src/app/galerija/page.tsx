import type {Metadata} from 'next'
import SiteHeader from '@/components/SiteHeader'
import {client} from '@/sanity/client'
import {urlFor} from '@/sanity/image'
import Link from 'next/link'
import {ArrowRight, Image as ImageIcon, PlayCircle} from 'lucide-react'

export const metadata: Metadata = {
  title: 'Galerija izdelkov in procesov | Laztek Engineering',
  description:
    'Galerija 3D tiskanih kosov, prototipov, reverse engineering primerov, procesov in razvojnih projektov Laztek Engineering.',
}

async function getPageData() {
  return client.fetch(`{
    "siteSettings": *[_type == "siteSettings"][0]{
      brandName,
      email,
      phone,
      location,
      logo
    },
    "galleryItems": *[_type == "galleryItem"] | order(_createdAt desc){
      _id,
      title,
      category,
      image,
      videoUrl,
      description
    }
  }`)
}

export default async function GalleryPage() {
  const data = await getPageData()
  const site = data?.siteSettings
  const galleryItems = data?.galleryItems || []

  return (
    <main className="min-h-screen bg-[#050816] text-white">
      <BackgroundGlow />

      <SiteHeader
        logoUrl={site?.logo ? urlFor(site.logo).width(2200).height(650).url() : undefined}
        brandName={site?.brandName}
        basePath="/"
      />

      <section className="mx-auto max-w-7xl px-4 pb-16 pt-14 sm:px-6 lg:px-8 lg:pb-24 lg:pt-20">
        <div className="max-w-3xl">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-cyan-300/15 bg-cyan-400/10 px-4 py-2 text-xs font-medium uppercase tracking-[0.22em] text-cyan-100/75">
            <ImageIcon size={16} />
            Galerija
          </div>
          <h1 className="text-4xl font-semibold leading-tight tracking-tight sm:text-5xl lg:text-6xl">
            Vizualni pregled kosov, procesov, prototipov in razvojnih primerov.
          </h1>
          <p className="mt-6 text-base leading-8 text-white/70 sm:text-lg">
            Galerija je namenjena hitremu pregledu izvedb. Za podrobnejše razlage so bolj pomembni projekti oziroma case studies.
          </p>
        </div>

        {galleryItems.length ? (
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {galleryItems.map((item: any) => (
              <Link
                key={item._id}
                href={`/galerija/${item._id}`}
                className="group overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.04] transition hover:-translate-y-1 hover:border-cyan-300/30 hover:bg-cyan-400/10"
              >
                <div className="relative aspect-[4/3] overflow-hidden bg-white/[0.04]">
                  {item.image ? (
                    <img
                      src={urlFor(item.image).width(900).height(675).url()}
                      alt={item.title || 'Galerija'}
                      className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center text-white/30">
                      <ImageIcon size={42} />
                    </div>
                  )}
                  {item.videoUrl ? (
                    <div className="absolute right-4 top-4 inline-flex items-center gap-2 rounded-full bg-black/55 px-3 py-2 text-xs font-semibold text-white backdrop-blur">
                      <PlayCircle size={15} /> Video
                    </div>
                  ) : null}
                </div>
                <div className="p-5">
                  {item.category ? (
                    <div className="text-xs font-semibold uppercase tracking-[0.18em] text-cyan-100/55">{item.category}</div>
                  ) : null}
                  <h2 className="mt-3 text-xl font-semibold text-white">{item.title || 'Galerijski primer'}</h2>
                  {item.description ? <p className="mt-3 line-clamp-3 text-sm leading-6 text-white/62">{item.description}</p> : null}
                  <div className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-cyan-200">
                    Odpri primer <ArrowRight size={16} />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="mt-12 rounded-[2rem] border border-white/10 bg-white/[0.04] p-8 text-white/65">
            Galerija je pripravljena. Ko dodaš galerijske elemente v Sanity, se bodo prikazali tukaj.
          </div>
        )}
      </section>
    </main>
  )
}

function BackgroundGlow() {
  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-[#050816]">
      <div className="absolute left-1/2 top-[-10%] h-[520px] w-[520px] -translate-x-1/2 rounded-full bg-cyan-500/20 blur-[140px]" />
      <div className="absolute bottom-[-20%] right-[-10%] h-[620px] w-[620px] rounded-full bg-fuchsia-500/15 blur-[160px]" />
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.035)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.035)_1px,transparent_1px)] bg-[size:80px_80px] opacity-30" />
    </div>
  )
}
