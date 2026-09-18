import {notFound} from 'next/navigation'
import {PortableText} from '@portabletext/react'
import SiteHeader from '@/components/SiteHeader'
import {client} from '@/sanity/client'
import {urlFor} from '@/sanity/image'

async function getSiteSettings() {
  return client.fetch(`*[_type == "siteSettings"][0]{
    brandName,
    logo
  }`)
}

async function getPost(slug: string) {
  return client.fetch(
    `*[_type == "blogPost" && slug.current == $slug][0]{
      _id,
      title,
      "slug": slug.current,
      excerpt,
      coverImage,
      publishedAt,
      content
    }`,
    {slug}
  )
}

export default async function BlogDetailPage({
  params,
}: {
  params: Promise<{slug: string}>
}) {
  const {slug} = await params
  const [site, post] = await Promise.all([getSiteSettings(), getPost(slug)])

  if (!post) notFound()

  return (
    <main className="laztek-page">
      <SiteHeader
        logoUrl={site?.logo ? urlFor(site.logo).width(2200).height(650).url() : undefined}
        brandName={site?.brandName}
        basePath="/"
      />

      <section className="px-4 py-14 sm:px-6 lg:px-8 lg:py-20">
        <div className="mx-auto max-w-4xl">
          <div className="inline-flex rounded-full border border-cyan-200/15 bg-cyan-100/[0.07] px-3 py-1 text-xs text-white/60">
            Blog
          </div>

          <h1 className="mt-4 text-4xl font-semibold sm:text-5xl">{post.title}</h1>
          <p className="mt-4 text-lg text-white/70">{post.excerpt}</p>

          {post.coverImage ? (
            <img
              src={urlFor(post.coverImage).width(1400).height(900).url()}
              alt={post.title || 'Blog image'}
              className="mt-8 w-full rounded-[2rem] border border-cyan-200/15 object-cover shadow-[0_24px_80px_rgba(0,15,27,0.30)]"
            />
          ) : null}

          <div className="mt-10 rounded-[2rem] border border-cyan-200/15 bg-[#071b2d]/68 p-6 shadow-[0_22px_70px_rgba(0,15,27,0.24)] backdrop-blur-xl sm:p-8">
            <div className="prose prose-invert max-w-none prose-headings:text-white prose-p:text-white/78 prose-a:text-cyan-200 prose-strong:text-white">
              <PortableText value={post.content || []} />
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}