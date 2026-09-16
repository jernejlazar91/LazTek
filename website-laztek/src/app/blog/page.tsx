import SiteHeader from '@/components/SiteHeader'
import Link from 'next/link'
import {client} from '@/sanity/client'
import {urlFor} from '@/sanity/image'

async function getBlogPageData() {
  return client.fetch(`{
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
      publishedAt
    }
  }`)
}

export default async function BlogPage() {
  const data = await getBlogPageData()
  const site = data?.siteSettings
  const posts = data?.posts || []

  return (
    <main className="min-h-screen bg-[#050816] text-white">
      <SiteHeader
        logoUrl={site?.logo ? urlFor(site.logo).width(2200).height(650).url() : undefined}
        brandName={site?.brandName}
        basePath="/"
      />

      <div className="px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <h1 className="text-4xl font-semibold sm:text-5xl">Blog</h1>
          <p className="mt-4 max-w-3xl text-white/70">
            Zapiski o razvoju, materialih in projektih.
          </p>

          <div className="mt-10 grid gap-6 lg:grid-cols-3">
            {posts.map((post: any) => (
              <Link
                key={post._id}
                href={`/blog/${post.slug}`}
                className="overflow-hidden rounded-[2rem] border border-white/10 bg-white/5 transition hover:-translate-y-1"
              >
                {post.coverImage ? (
                  <img
                    src={urlFor(post.coverImage).width(900).height(600).url()}
                    alt={post.title || 'Blog image'}
                    className="aspect-[16/10] w-full object-cover"
                  />
                ) : (
                  <div className="flex aspect-[16/10] items-center justify-center bg-gradient-to-br from-fuchsia-400/18 via-indigo-400/10 to-cyan-400/16 text-white/45">
                    Blog
                  </div>
                )}

                <div className="p-6">
                  <div className="inline-flex rounded-full border border-white/10 bg-white/10 px-3 py-1 text-xs text-white/60">
                    Blog
                  </div>
                  <h2 className="mt-4 text-2xl font-semibold">{post.title}</h2>
                  <p className="mt-3 text-sm leading-7 text-white/68">{post.excerpt}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </main>
  )
}