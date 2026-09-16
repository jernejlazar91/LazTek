'use client'

import {useEffect, useRef, useState} from 'react'
import Link from 'next/link'

type SiteHeaderProps = {
  logoUrl?: string
  brandName?: string
  basePath?: string
}

const navPillClass =
  'rounded-full border border-white/10 bg-white/5 px-5 py-3 text-sm font-medium text-white/80 transition hover:border-cyan-300/20 hover:bg-cyan-400/10 hover:text-white'

const dropdownItemClass =
  'rounded-[1.25rem] border border-white/10 bg-white/5 px-4 py-3 text-sm leading-6 text-white/80 transition hover:border-cyan-300/20 hover:bg-cyan-400/10 hover:text-white'

const mobileItemClass =
  'rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-base font-medium text-white/85 transition hover:border-cyan-300/20 hover:bg-cyan-400/10 hover:text-white'

const serviceLinks = [
  {href: '/storitve', label: 'Pregled vseh storitev'},
  {href: '/storitve/industrijski-3d-tisk', label: 'Industrijski 3D tisk'},
  {
    href: '/storitve/3d-skeniranje-reverse-engineering',
    label: '3D skeniranje in reverse engineering',
  },
  {
    href: '/storitve/obnova-plasticnih-kosov',
    label: 'Obnova plastičnih kosov',
  },
  {
    href: '/storitve/konstruiranje-3d-modeliranje',
    label: 'Konstruiranje in 3D modeliranje',
  },
  {
    href: '/storitve/prototipizacija',
    label: 'Prototipizacija in razvoj izdelkov',
  },
]

const mainLinks = [
  {href: '/o-podjetju', label: 'O podjetju'},
  {href: '/linex', label: 'LINEX HT v1'},
  {href: '/materiali', label: 'Materiali'},
  {href: '/projekti', label: 'Projekti'},
  {href: '/galerija', label: 'Galerija'},
  {href: '/blog', label: 'Blog'},
]

export default function SiteHeader({
  brandName,
  basePath = '',
}: SiteHeaderProps) {
  const [servicesOpen, setServicesOpen] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  const dropdownRef = useRef<HTMLDivElement | null>(null)
  const closeTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  function cancelCloseTimer() {
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current)
      closeTimeoutRef.current = null
    }
  }

  function startCloseTimer() {
    cancelCloseTimer()

    closeTimeoutRef.current = setTimeout(() => {
      setServicesOpen(false)
    }, 5000)
  }

  function closeAllMenus() {
    cancelCloseTimer()
    setServicesOpen(false)
    setMobileOpen(false)
  }

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (!dropdownRef.current) return

      if (!dropdownRef.current.contains(event.target as Node)) {
        cancelCloseTimer()
        setServicesOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
      cancelCloseTimer()
    }
  }, [])

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-[#050816]/90 backdrop-blur-xl">
      <div className="mx-auto max-w-7xl px-4 py-3 sm:px-6 sm:py-4 lg:px-8">

        {/* MOBILE HEADER */}
        <div className="flex items-center justify-between gap-3 md:hidden">
          <Link
            href={basePath ? '/#domov' : '#domov'}
            onClick={closeAllMenus}
            className="relative flex h-[64px] min-w-0 flex-1 items-center justify-center overflow-hidden rounded-[1.35rem] border border-white/10 bg-gradient-to-br from-cyan-100/20 via-sky-300/45 to-fuchsia-300/10"
            aria-label={brandName || 'LazTek Engineering'}
          >
            <img
              src="/laztek-logo.png"
              alt="LazTek Engineering"
              className="h-full w-full object-contain px-3 py-1"
            />
          </Link>

          <button
            type="button"
            onClick={() => setMobileOpen((value) => !value)}
            className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-white/10 bg-white/5 text-white/90 shadow-[0_10px_40px_rgba(0,0,0,0.35)] transition hover:border-cyan-300/20 hover:bg-cyan-400/10"
            aria-label={mobileOpen ? 'Zapri meni' : 'Odpri meni'}
            aria-expanded={mobileOpen}
          >
            <span className="sr-only">Meni</span>

            <span className="flex flex-col gap-1.5">
              <span className="h-0.5 w-6 rounded-full bg-current" />
              <span className="h-0.5 w-6 rounded-full bg-current" />
              <span className="h-0.5 w-6 rounded-full bg-current" />
            </span>
          </button>
        </div>

        {/* MOBILE MENU */}
        {mobileOpen ? (
          <div className="mt-3 rounded-[1.75rem] border border-white/10 bg-[#0b1020]/95 p-3 shadow-[0_20px_80px_rgba(0,0,0,0.45)] backdrop-blur-xl md:hidden">
            <div className="grid gap-2">
              <Link
                href={basePath ? '/#domov' : '#domov'}
                onClick={closeAllMenus}
                className={mobileItemClass}
              >
                Domov
              </Link>

              <div className="rounded-2xl border border-cyan-300/15 bg-cyan-400/5 p-2">
                <Link
                  href="/storitve"
                  onClick={closeAllMenus}
                  className="block rounded-xl px-3 py-2 text-sm font-semibold uppercase tracking-[0.22em] text-cyan-200"
                >
                  Storitve
                </Link>

                <div className="grid gap-1">
                  {serviceLinks.slice(1).map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={closeAllMenus}
                      className="rounded-xl px-3 py-2 text-sm leading-5 text-white/75 transition hover:bg-white/5 hover:text-white"
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
              </div>

              {mainLinks.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={closeAllMenus}
                  className={mobileItemClass}
                >
                  {item.label}
                </Link>
              ))}

              <Link
                href="/kontakt"
                onClick={closeAllMenus}
                className="mt-1 rounded-2xl bg-gradient-to-r from-cyan-400 via-sky-400 to-indigo-500 px-4 py-3 text-center text-base font-semibold text-slate-950 transition hover:scale-[1.01]"
              >
                Oddajte povpraševanje
              </Link>
            </div>
          </div>
        ) : null}

        {/* DESKTOP HEADER */}
        <div className="relative hidden items-center justify-center md:flex">
          <Link
            href={basePath ? '/#domov' : '#domov'}
            className="relative flex h-[96px] w-full max-w-[500px] items-center justify-center overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-cyan-100/20 via-sky-300/45 to-fuchsia-300/10 lg:h-[110px] lg:max-w-[560px]"
            aria-label={brandName || 'LazTek Engineering'}
          >
            <img
              src="/laztek-logo.png"
              alt="LazTek Engineering"
              className="h-full w-full object-contain px-6 py-2"
            />
          </Link>

          <Link
            href="/kontakt"
            className="absolute right-0 hidden rounded-full bg-gradient-to-r from-cyan-400 via-sky-400 to-indigo-500 px-5 py-3 text-sm font-semibold text-slate-950 transition hover:scale-[1.02] lg:inline-flex"
          >
            Oddajte povpraševanje
          </Link>
        </div>

        {/* DESKTOP NAVIGATION */}
        <nav className="mt-5 hidden flex-wrap items-center justify-center gap-3 md:flex">
          <Link
            href={basePath ? '/#domov' : '#domov'}
            className={navPillClass}
          >
            Domov
          </Link>

          <Link
            href="/o-podjetju"
            className={navPillClass}
          >
            O podjetju
          </Link>

          <div
            ref={dropdownRef}
            className="relative"
            onMouseEnter={cancelCloseTimer}
            onMouseLeave={startCloseTimer}
          >
            <button
              type="button"
              onClick={() => {
                cancelCloseTimer()
                setServicesOpen((v) => !v)
              }}
              className={navPillClass}
              aria-expanded={servicesOpen}
              aria-haspopup="menu"
            >
              Storitve
            </button>

            {servicesOpen ? (
              <div className="absolute left-1/2 top-[calc(100%+12px)] z-50 w-[calc(100vw-2rem)] max-w-[340px] -translate-x-1/2 rounded-[1.75rem] border border-white/10 bg-[#0b1020]/95 p-3 shadow-[0_20px_80px_rgba(0,0,0,0.45)] backdrop-blur-xl">
                <div className="flex flex-col gap-2">
                  {serviceLinks.map((item, index) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => {
                        cancelCloseTimer()
                        setServicesOpen(false)
                      }}
                      className={
                        index === 0
                          ? 'rounded-[1.25rem] border border-cyan-300/20 bg-cyan-400/10 px-4 py-3 text-sm leading-6 text-white transition hover:border-cyan-300/40 hover:bg-cyan-400/20'
                          : dropdownItemClass
                      }
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
              </div>
            ) : null}
          </div>

          <Link href="/linex" className={navPillClass}>
            LINEX HT v1
          </Link>

          <Link href="/materiali" className={navPillClass}>
            Materiali
          </Link>

          <Link href="/projekti" className={navPillClass}>
            Projekti
          </Link>

          <Link href="/galerija" className={navPillClass}>
            Galerija
          </Link>

          <Link href="/blog" className={navPillClass}>
            Blog
          </Link>
        </nav>
      </div>
    </header>
  )
}