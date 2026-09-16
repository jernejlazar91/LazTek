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
    <main className="min-h-screen bg-[#050816] text-white">
      <SiteHeader
        logoUrl={site?.logo ? urlFor(site.logo).width(2200).height(650).url() : undefined}
        brandName={site?.brandName}
        basePath="/"
      />

      <div className="px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <div className="inline-flex rounded-full border border-white/10 bg-white/10 px-3 py-1 text-xs text-white/60">
            Blog
          </div>

          <h1 className="mt-4 text-4xl font-semibold sm:text-5xl">{post.title}</h1>
          <p className="mt-4 text-lg text-white/70">{post.excerpt}</p>

          {post.coverImage ? (
            <img
              src={urlFor(post.coverImage).width(1400).height(900).url()}
              alt={post.title || 'Blog image'}
              className="mt-8 w-full rounded-[2rem] border border-white/10 object-cover"
            />
          ) : null}

          <div className="prose prose-invert mt-10 max-w-none prose-p:text-white/80 prose-headings:text-white">
            <PortableText value={post.content || []} />
          </div>
        </div>
      </div>
    </main>
  )
}