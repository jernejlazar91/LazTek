import SiteHeader from '@/components/SiteHeader'
import Link from 'next/link'
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
    <main className="min-h-screen bg-[#050816] text-white">
      <SiteHeader
        logoUrl={site?.logo ? urlFor(site.logo).width(2200).height(650).url() : undefined}
        brandName={site?.brandName}
        basePath="/"
      />

      <div className="px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <h1 className="text-4xl font-semibold sm:text-5xl">Projekti</h1>
          <p className="mt-4 max-w-3xl text-white/70">
            Vsi razvojni in proizvodni projekti.
          </p>

          <div className="mt-10 grid gap-6 lg:grid-cols-3">
            {projects.map((project: any) => (
              <Link
                key={project._id}
                href={`/projekti/${project.slug}`}
                className="overflow-hidden rounded-[2rem] border border-white/10 bg-white/5 transition hover:-translate-y-1"
              >
                {project.featuredImage ? (
                  <img
                    src={urlFor(project.featuredImage).width(900).height(600).url()}
                    alt={project.title || 'Project image'}
                    className="aspect-[16/10] w-full object-cover"
                  />
                ) : (
                  <div className="flex aspect-[16/10] items-center justify-center bg-gradient-to-br from-cyan-400/18 via-indigo-400/10 to-fuchsia-400/16 text-white/45">
                    Projekt
                  </div>
                )}

                <div className="p-6">
                  <div className="inline-flex rounded-full border border-white/10 bg-white/10 px-3 py-1 text-xs text-white/60">
                    {project.category}
                  </div>
                  <h2 className="mt-4 text-2xl font-semibold">{project.title}</h2>
                  <p className="mt-3 text-sm leading-7 text-white/68">{project.excerpt}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </main>
  )
}