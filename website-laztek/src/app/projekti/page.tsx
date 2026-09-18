import SiteHeader from '@/components/SiteHeader'
import Link from 'next/link'
import {client} from '@/sanity/client'
import {urlFor} from '@/sanity/image'
import {ArrowRight, FolderKanban} from 'lucide-react'

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

export default async function ProjectsPage() {
  const data = await getProjectsPageData()
  const site = data?.siteSettings
  const projects = data?.projects || []

  return (
    <main className="laztek-page">
      <SiteHeader
        logoUrl={site?.logo ? urlFor(site.logo).width(2200).height(650).url() : undefined}
        brandName={site?.brandName}
        basePath="/"
      />

      <section className="mx-auto max-w-7xl px-4 pb-16 pt-14 sm:px-6 lg:px-8 lg:pb-24 lg:pt-20">
        <div className="max-w-4xl">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-cyan-300/20 bg-cyan-400/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.22em] text-cyan-100/80 shadow-[0_10px_30px_rgba(14,165,233,0.08)] backdrop-blur-xl">
            <FolderKanban size={16} />
            Projekti
          </div>

          <h1 className="text-4xl font-semibold leading-tight tracking-tight sm:text-5xl lg:text-6xl">
            Razvojni in proizvodni projekti, prikazani skozi problem, rešitev in rezultat.
          </h1>

          <p className="mt-6 max-w-3xl text-base leading-8 text-white/68 sm:text-lg">
            Primeri 3D tiska, reverse engineeringa, skeniranja, CAD razvoja in funkcionalnih tehničnih kosov.
          </p>
        </div>

        {projects.length ? (
          <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {projects.map((project: any) => (
              <Link
                key={project._id}
                href={`/projekti/${project.slug}`}
                className="group overflow-hidden rounded-[2rem] border border-cyan-200/15 bg-[#071b2d]/68 shadow-[0_22px_70px_rgba(0,15,27,0.24)] backdrop-blur-xl transition duration-300 hover:-translate-y-1 hover:border-cyan-300/35 hover:shadow-[0_28px_90px_rgba(0,20,36,0.32)]"
              >
                <div className="relative overflow-hidden border-b border-white/8">
                  {project.featuredImage ? (
                    <img
                      src={urlFor(project.featuredImage).width(900).height(600).url()}
                      alt={project.title || 'Project image'}
                      className="aspect-[16/10] w-full object-cover transition duration-500 group-hover:scale-[1.035]"
                    />
                  ) : (
                    <div className="flex aspect-[16/10] items-center justify-center bg-gradient-to-br from-cyan-400/18 via-sky-500/10 to-blue-600/18 text-sm font-semibold uppercase tracking-[0.18em] text-white/40">
                      Projekt
                    </div>
                  )}
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#041421]/40 via-transparent to-transparent" />
                </div>

                <div className="p-6">
                  <div className="inline-flex rounded-full border border-cyan-200/15 bg-cyan-100/[0.07] px-3 py-1 text-xs font-medium text-cyan-100/70">
                    {project.category || 'Projekt'}
                  </div>

                  <h2 className="mt-4 text-2xl font-semibold tracking-tight text-white">
                    {project.title}
                  </h2>

                  <p className="mt-3 text-sm leading-7 text-white/62">
                    {project.excerpt}
                  </p>

                  <div className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-cyan-200 transition-all group-hover:gap-3">
                    Odpri projekt
                    <ArrowRight size={16} />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="mt-12 rounded-[2rem] border border-cyan-200/15 bg-[#071b2d]/68 p-8 text-white/62 shadow-[0_22px_70px_rgba(0,15,27,0.24)] backdrop-blur-xl">
            Projekti bodo prikazani tukaj, ko so objavljeni v Sanity.
          </div>
        )}
      </section>
    </main>
  )
}
