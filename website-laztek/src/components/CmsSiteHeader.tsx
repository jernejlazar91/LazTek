import type {ComponentProps} from 'react'
import SiteHeader from './SiteHeader'
import {getSiteSettings, coordinates} from '@/sanity/siteSettings'
import {urlFor} from '@/sanity/image'

export default async function CmsSiteHeader(props: ComponentProps<typeof SiteHeader>) {
  const site=await getSiteSettings()
  const point=coordinates(site)
  return <SiteHeader {...props} brandName={site?.brandName || props.brandName}
    logoUrl={site?.headerLogo?.asset ? urlFor(site.headerLogo).width(1200).auto('format').url() : undefined}
    phone={site?.phone} email={site?.email} location={site?.location || site?.address}
    directionsUrl={`https://www.google.com/maps/dir/?api=1&destination=${point.lat},${point.lng}`} />
}
