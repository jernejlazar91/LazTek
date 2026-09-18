import {client} from '@/sanity/client'
import type {MetadataRoute} from 'next'

type SanityItem = {
  slug: string
  _updatedAt?: string
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://laztek.si'

  const [projects, blogPosts, galleryItems] = await Promise.all([
    client.fetch<SanityItem[]>(`
      *[_type == "project" && defined(slug.current)]{
        "slug": slug.current,
        _updatedAt
      }
    `),

    client.fetch<SanityItem[]>(`
      *[_type == "blogPost" && defined(slug.current)]{
        "slug": slug.current,
        _updatedAt
      }
    `),
    client.fetch<{_id: string; _updatedAt?: string}[]>(
      `*[_type == "galleryItem"]{_id, _updatedAt}`,
    ),
  ])

  const staticPages: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}/`,
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: `${baseUrl}/o-podjetju`,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/storitve`,
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/storitve/industrijski-3d-tisk`,
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/storitve/3d-skeniranje-reverse-engineering`,
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/storitve/obnova-plasticnih-kosov`,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/storitve/konstruiranje-3d-modeliranje`,
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/storitve/prototipizacija`,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/linex`,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/materiali`,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/projekti`,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/galerija`,
      changeFrequency: 'weekly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/blog`,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/kontakt`,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/politika-zasebnosti`,
      changeFrequency: 'yearly',
      priority: 0.3,
    },
  ]

  const projectPages: MetadataRoute.Sitemap = projects.map((project) => ({
    url: `${baseUrl}/projekti/${encodeURIComponent(project.slug)}`,
    lastModified: project._updatedAt ? new Date(project._updatedAt) : undefined,
    changeFrequency: 'monthly',
    priority: 0.7,
  }))

  const blogPages: MetadataRoute.Sitemap = blogPosts.map((post) => ({
    url: `${baseUrl}/blog/${encodeURIComponent(post.slug)}`,
    lastModified: post._updatedAt ? new Date(post._updatedAt) : undefined,
    changeFrequency: 'monthly',
    priority: 0.6,
  }))

  const galleryPages: MetadataRoute.Sitemap = galleryItems.map((item) => ({
    url: `${baseUrl}/galerija/${encodeURIComponent(item._id)}`,
    lastModified: item._updatedAt ? new Date(item._updatedAt) : undefined,
    changeFrequency: 'monthly',
    priority: 0.5,
  }))
  return [...staticPages, ...projectPages, ...blogPages, ...galleryPages]
}
