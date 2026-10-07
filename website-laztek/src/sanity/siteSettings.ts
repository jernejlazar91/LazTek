import {cache} from 'react'
import {client} from './client'
import type {CmsImage} from './content'

export type SiteSettings = {
  siteTitle?: string; brandName?: string; legalName?: string; tagline?: string
  email?: string; phone?: string; location?: string; address?: string
  footerText?: string; headerLogo?: CmsImage
  mapLocation?: {lat?: number; lng?: number}
  socialLinks?: {label?: string; url?: string}[]
}
export const getSiteSettings = cache(async () => client.fetch<SiteSettings | null>(
  `*[_type == "siteSettings"][0]{siteTitle,brandName,legalName,tagline,email,phone,location,address,footerText,headerLogo,mapLocation,socialLinks}`,
  {},{next:{revalidate:60}},
))
export function coordinates(site: SiteSettings | null) {
  const point = site?.mapLocation
  return point && typeof point.lat==='number' && typeof point.lng==='number'
    && Number.isFinite(point.lat) && Number.isFinite(point.lng) && Math.abs(point.lat)<=90 && Math.abs(point.lng)<=180
    ? {lat:point.lat,lng:point.lng} : {lat:45.98020087787109,lng:14.1705128253313}
}
