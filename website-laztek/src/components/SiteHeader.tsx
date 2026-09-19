"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import ThemeToggle from "@/components/ThemeToggle";
import laztekLogo from "@/assets/brand/laztek-logo.webp";
import {
  ArrowRight,
  Box,
  Building2,
  ChevronDown,
  FileText,
  Folder,
  Home,
  Image as ImageIcon,
  Layers3,
  Mail,
  MapPin,
  Menu,
  Phone,
  Send,
  Wrench,
  X,
} from "lucide-react";

type SiteHeaderProps = {
  logoUrl?: string;
  brandName?: string;
  basePath?: string;
};

const PHONE_DISPLAY = "+386 31 656 611";
const PHONE_HREF = "tel:+38631656611";
const EMAIL = "jernej.lazar91@gmail.com";
const LOCATION = "Rovte 23, 1373 Rovte";
const DIRECTIONS_URL =
  "https://www.google.com/maps/dir/?api=1&destination=45.98020087787109,14.1705128253313";

const serviceLinks = [
  { href: "/storitve", label: "Pregled vseh storitev" },
  { href: "/storitve/industrijski-3d-tisk", label: "Industrijski 3D tisk" },
  {
    href: "/storitve/3d-skeniranje-reverse-engineering",
    label: "3D skeniranje in reverse engineering",
  },
  {
    href: "/storitve/obnova-plasticnih-kosov",
    label: "Obnova plastičnih kosov",
  },
  {
    href: "/storitve/konstruiranje-3d-modeliranje",
    label: "Konstruiranje in 3D modeliranje",
  },
  {
    href: "/storitve/prototipizacija",
    label: "Prototipizacija in razvoj izdelkov",
  },
];

const mainLinks = [
  { href: "/o-podjetju", label: "O podjetju" },
  { href: "/linex", label: "LINEX HT v1" },
  { href: "/materiali", label: "Materiali" },
  { href: "/projekti", label: "Projekti" },
  { href: "/galerija", label: "Galerija" },
  { href: "/blog", label: "Blog" },
];

const HEX =
  "polygon(12px 0, calc(100% - 12px) 0, 100% 50%, calc(100% - 12px) 100%, 12px 100%, 0 50%)";

const HEX_INNER =
  "polygon(11px 0, calc(100% - 11px) 0, 100% 50%, calc(100% - 11px) 100%, 11px 100%, 0 50%)";

function HeaderBackdrop() {
  return (
    <div
      className="pointer-events-none absolute inset-0 overflow-hidden"
      aria-hidden="true"
    >
      <div className="absolute inset-0 bg-[linear-gradient(180deg,#03111d_0%,#041522_52%,#03101b_100%)]" />

      <div className="absolute left-[16%] top-[-120px] h-[310px] w-[420px] rounded-full bg-blue-500/[0.07] blur-[130px]" />
      <div className="absolute right-[9%] top-[-130px] h-[330px] w-[420px] rounded-full bg-cyan-400/[0.06] blur-[135px]" />

      <svg
        className="absolute inset-0 h-full w-full"
        viewBox="0 0 1800 190"
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          <linearGradient id="gridStroke" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#31b7c9" stopOpacity=".10" />
            <stop offset="52%" stopColor="#3bb7d0" stopOpacity=".30" />
            <stop offset="100%" stopColor="#377da2" stopOpacity=".08" />
          </linearGradient>

          <linearGradient id="activeEdge" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#31b7c9" stopOpacity="0" />
            <stop offset="50%" stopColor="#56cedd" stopOpacity=".8" />
            <stop offset="100%" stopColor="#31b7c9" stopOpacity="0" />
          </linearGradient>

          <filter id="softGlow" x="-100%" y="-100%" width="300%" height="300%">
            <feGaussianBlur stdDeviation="2.8" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* left engineering cluster */}
        <g
          fill="none"
          stroke="url(#gridStroke)"
          strokeWidth="1.1"
          opacity=".78"
        >
          <polygon points="-24,18 47,18 82,79 47,140 -24,140 -59,79" />
          <polygon points="74,-18 136,-18 167,36 136,90 74,90 43,36" />
          <polygon points="132,95 182,95 207,138 182,181 132,181 107,138" />
          <path d="M208 30h68l34 59h68" opacity=".38" />
        </g>

        {/* right engineering cluster */}
        <g
          fill="none"
          stroke="url(#gridStroke)"
          strokeWidth="1.1"
          opacity=".92"
        >
          <polygon points="1517,-21 1594,-21 1633,46 1594,113 1517,113 1478,46" />
          <polygon points="1610,80 1675,80 1708,136 1675,192 1610,192 1577,136" />
          <polygon points="1718,5 1770,5 1796,50 1770,95 1718,95 1692,50" />
          <path d="M1450 120h74l37-64" opacity=".45" />
        </g>

        {/* fine technical fragments */}
        <g fill="none" stroke="#5cc6d4" strokeWidth=".8" opacity=".12">
          <path d="M420 18h42l21 36-21 36h-42" />
          <path d="M1242 90h50l25 43-25 43h-50" />
          <path d="M1012 18h36l18 31" />
          <path d="M708 156h68" />
        </g>

        {/* active energy traces */}
        <g filter="url(#softGlow)">
          <path
            d="M0 155H255"
            stroke="url(#activeEdge)"
            strokeWidth="1.4"
            opacity=".4"
          />
          <path
            d="M1510 155H1800"
            stroke="url(#activeEdge)"
            strokeWidth="1.4"
            opacity=".42"
          />
          <circle cx="256" cy="155" r="1.8" fill="#56cedd" opacity=".72" />
          <circle cx="1510" cy="155" r="1.8" fill="#56cedd" opacity=".72" />
        </g>
      </svg>

      <div className="absolute inset-x-0 bottom-0 h-px bg-[linear-gradient(90deg,transparent_0%,rgba(49,183,201,.18)_16%,rgba(86,206,221,.48)_50%,rgba(49,183,201,.18)_84%,transparent_100%)]" />
    </div>
  );
}

function HexFrame({
  active = false,
  strong = false,
}: {
  active?: boolean;
  strong?: boolean;
}) {
  return (
    <>
      {/* shadow glow */}
      <span
        aria-hidden="true"
        className={[
          "absolute inset-[3px] z-[-4] blur-[9px] transition-opacity duration-200",
          strong
            ? "bg-cyan-400/38 opacity-80 group-hover:opacity-100"
            : active
              ? "bg-cyan-400/22 opacity-85"
              : "bg-cyan-400/14 opacity-0 group-hover:opacity-65",
        ].join(" ")}
        style={{ clipPath: HEX }}
      />

      {/* outer luminous rail */}
      <span
        aria-hidden="true"
        className={[
          "absolute inset-0 z-[-3] transition-all duration-200",
          strong
            ? "bg-[linear-gradient(110deg,#147ba8_0%,#54d9e6_24%,#1596c3_50%,#54d9e6_77%,#147ba8_100%)]"
            : active
              ? "bg-[linear-gradient(110deg,rgba(23,107,145,.92)_0%,rgba(86,206,221,.98)_24%,rgba(49,183,201,.88)_50%,rgba(86,206,221,.96)_77%,rgba(23,107,145,.88)_100%)]"
              : "bg-[linear-gradient(110deg,rgba(55,125,162,.34)_0%,rgba(93,171,190,.48)_24%,rgba(49,183,201,.36)_50%,rgba(91,155,185,.45)_77%,rgba(55,125,162,.30)_100%)] group-hover:bg-[linear-gradient(110deg,rgba(23,107,145,.74)_0%,rgba(86,206,221,.90)_24%,rgba(49,183,201,.72)_50%,rgba(86,206,221,.86)_77%,rgba(23,107,145,.68)_100%)]",
        ].join(" ")}
        style={{ clipPath: HEX }}
      />

      {/* black separator */}
      <span
        aria-hidden="true"
        className="absolute inset-[1px] z-[-2] bg-[#020b12]"
        style={{ clipPath: HEX_INNER }}
      />

      {/* inner technical rail */}
      <span
        aria-hidden="true"
        className={[
          "absolute inset-[3px] z-[-1] transition-all duration-200",
          strong
            ? "bg-[linear-gradient(115deg,rgba(86,206,221,.62),rgba(33,124,164,.36),rgba(86,206,221,.58))]"
            : active
              ? "bg-[linear-gradient(115deg,rgba(86,206,221,.48),rgba(33,124,164,.28),rgba(86,206,221,.44))]"
              : "bg-[linear-gradient(115deg,rgba(86,206,221,.18),rgba(33,124,164,.11),rgba(86,206,221,.15))] group-hover:bg-[linear-gradient(115deg,rgba(86,206,221,.40),rgba(33,124,164,.23),rgba(86,206,221,.36))]",
        ].join(" ")}
        style={{ clipPath: HEX_INNER }}
      />

      {/* inner glass plate */}
      <span
        aria-hidden="true"
        className={[
          "absolute inset-[4px] z-[-1] transition-all duration-200",
          strong
            ? "bg-[radial-gradient(circle_at_50%_-20%,rgba(85,196,222,.34),transparent_48%),linear-gradient(180deg,rgba(8,46,70,.98),rgba(4,20,33,.99))]"
            : active
              ? "bg-[radial-gradient(circle_at_50%_-15%,rgba(49,183,201,.22),transparent_48%),linear-gradient(180deg,rgba(8,39,58,.98),rgba(4,20,32,.99))]"
              : "bg-[radial-gradient(circle_at_50%_-10%,rgba(86,206,221,.07),transparent_48%),linear-gradient(180deg,rgba(7,28,42,.98),rgba(4,17,28,.995))] group-hover:bg-[radial-gradient(circle_at_50%_-15%,rgba(49,183,201,.18),transparent_48%),linear-gradient(180deg,rgba(8,36,53,.98),rgba(4,19,31,.99))]",
        ].join(" ")}
        style={{ clipPath: HEX_INNER }}
      />

      {/* top and bottom optical highlights */}
      <span
        aria-hidden="true"
        className={[
          "absolute left-[19%] right-[19%] top-[1px] h-px bg-gradient-to-r from-transparent via-cyan-100 to-transparent transition-opacity duration-200",
          strong
            ? "opacity-95"
            : active
              ? "opacity-82"
              : "opacity-22 group-hover:opacity-70",
        ].join(" ")}
      />
      <span
        aria-hidden="true"
        className={[
          "absolute bottom-[2px] left-[27%] right-[27%] h-px bg-gradient-to-r from-transparent via-sky-400 to-transparent transition-opacity duration-200",
          strong
            ? "opacity-80"
            : active
              ? "opacity-60"
              : "opacity-10 group-hover:opacity-48",
        ].join(" ")}
      />

      {/* side power nodes */}
      <span
        aria-hidden="true"
        className={[
          "absolute left-[2px] top-1/2 h-[15px] w-[2px] -translate-y-1/2 bg-cyan-200 shadow-[0_0_8px_rgba(86,206,221,.9)] transition-opacity duration-200",
          strong
            ? "opacity-90"
            : active
              ? "opacity-76"
              : "opacity-15 group-hover:opacity-62",
        ].join(" ")}
      />
      <span
        aria-hidden="true"
        className={[
          "absolute right-[2px] top-1/2 h-[15px] w-[2px] -translate-y-1/2 bg-cyan-300 shadow-[0_0_8px_rgba(49,183,201,.85)] transition-opacity duration-200",
          strong
            ? "opacity-90"
            : active
              ? "opacity-76"
              : "opacity-15 group-hover:opacity-62",
        ].join(" ")}
      />
    </>
  );
}

function navButtonClass(active: boolean) {
  return [
    "group relative isolate inline-flex h-[50px] shrink-0 items-center justify-center overflow-hidden px-[14px] min-[1750px]:px-[18px]",
    "text-[12.5px] min-[1750px]:text-[13px] font-bold tracking-[0.012em] transition-all duration-200",
    "[text-shadow:0_1px_0_rgba(255,255,255,.06),0_0_13px_rgba(86,206,221,.05)]",
    active
      ? "text-cyan-50 drop-shadow-[0_0_10px_rgba(49,183,201,.28)]"
      : "text-white/88 hover:-translate-y-[1px] hover:text-white hover:drop-shadow-[0_0_10px_rgba(49,183,201,.20)]",
  ].join(" ");
}

function DesktopLogo({
  brandName,
  href,
}: {
  brandName?: string;
  href: string;
}) {
  return (
    <Link
      href={href}
      className="group relative flex h-[clamp(106px,6.4vw,123px)] w-[clamp(304px,18.4vw,353px)] shrink-0 items-center justify-center"
      aria-label={brandName || "LazTek Engineering"}
    >
      {/* subtle mounting / engineering details */}
      <div className="pointer-events-none absolute inset-x-[8%] bottom-[8px] h-px bg-gradient-to-r from-transparent via-cyan-300/30 to-transparent opacity-70 transition group-hover:via-cyan-200/55" />
      <div className="pointer-events-none absolute right-[-11px] top-1/2 h-[58px] w-px -translate-y-1/2 bg-gradient-to-b from-transparent via-cyan-300/30 to-transparent" />
      <div className="pointer-events-none absolute right-[-13px] top-1/2 h-1.5 w-1.5 -translate-y-1/2 rotate-45 border border-cyan-300/30 bg-[#061521]" />

      <Image
        src={laztekLogo}
        alt="LazTek Engineering"
        priority
        sizes="(min-width: 1760px) 353px, 305px"
        className="relative z-10 h-full w-full object-contain px-0 py-0 drop-shadow-[0_5px_16px_rgba(0,0,0,.26)]"
      />
    </Link>
  );
}

export default function SiteHeader({
  brandName,
  basePath = "",
}: SiteHeaderProps) {
  const pathname = usePathname();

  const [servicesOpen, setServicesOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const dropdownRef = useRef<HTMLDivElement | null>(null);
  const midDropdownRef = useRef<HTMLDivElement | null>(null);
  const closeTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const homeHref = "/";

  function isActive(href: string) {
    return pathname === href || pathname.startsWith(`${href}/`);
  }

  function cancelCloseTimer() {
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current);
      closeTimeoutRef.current = null;
    }
  }

  function startCloseTimer() {
    cancelCloseTimer();
    closeTimeoutRef.current = setTimeout(() => {
      setServicesOpen(false);
    }, 850);
  }

  function closeMenus() {
    cancelCloseTimer();
    setServicesOpen(false);
    setMobileOpen(false);
  }

  useEffect(() => {
    function onPointerDown(event: MouseEvent) {
      const target = event.target as Node;

      const insideFull = dropdownRef.current?.contains(target) ?? false;
      const insideMid = midDropdownRef.current?.contains(target) ?? false;

      if (!insideFull && !insideMid) {
        setServicesOpen(false);
      }
    }

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setServicesOpen(false);
        setMobileOpen(false);
      }
    }

    document.addEventListener("mousedown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);

    return () => {
      document.removeEventListener("mousedown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
      cancelCloseTimer();
    };
  }, []);

  useEffect(() => {
    closeMenus();
  }, [pathname]);

  return (
    <header
      data-laztek-header
      className="sticky top-0 z-50 border-b border-cyan-300/[0.10] shadow-[0_18px_54px_rgba(0,7,14,.34)] backdrop-blur-xl"
    >
      <HeaderBackdrop />

      {/* ultra-compact contact / engineering strip */}
      <div className="relative z-40 border-b border-white/[0.055] bg-black/[0.12]">
        <div className="mx-auto flex h-[42px] max-w-[1880px] items-center justify-between gap-5 px-4 sm:px-6 lg:px-8">
          <a
            href={DIRECTIONS_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-w-0 items-center gap-2.5 text-[13px] font-semibold text-white/58 transition hover:text-cyan-100"
          >
            <MapPin className="h-[17px] w-[17px] shrink-0 text-cyan-300/82" />
            <span className="truncate">{LOCATION}</span>
          </a>

          <div className="hidden flex-1 items-center justify-center gap-5 lg:flex">
            <span className="h-px w-12 bg-gradient-to-r from-transparent to-cyan-300/20" />
            <span className="text-[9px] font-semibold uppercase tracking-[0.30em] text-cyan-100/28">
              Precision · Materials · Real solutions
            </span>
            <span className="h-px w-12 bg-gradient-to-l from-transparent to-cyan-300/20" />
          </div>

          <div className="flex shrink-0 items-center gap-4 sm:gap-6">
            <ThemeToggle />

            <a
              href={PHONE_HREF}
              className="inline-flex items-center gap-2.5 text-[13px] font-bold text-white/68 transition hover:text-cyan-100"
            >
              <Phone className="h-[17px] w-[17px] text-cyan-300/82" />
              <span className="hidden sm:inline">{PHONE_DISPLAY}</span>
            </a>

            <a
              href={`mailto:${EMAIL}`}
              className="hidden items-center gap-2.5 text-[13px] font-semibold text-white/58 transition hover:text-cyan-100 md:inline-flex"
            >
              <Mail className="h-[17px] w-[17px] text-cyan-300/82" />
              <span>{EMAIL}</span>
            </a>
          </div>
        </div>
      </div>

      {/* DESKTOP 07 HEADER */}
      <div className="relative z-10 hidden min-[1760px]:block">
        <div className="mx-auto grid min-h-[128px] max-w-[1880px] grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-[10px] px-7 min-[1750px]:gap-[16px] min-[1750px]:px-9">
          <DesktopLogo brandName={brandName} href={homeHref} />

          <nav className="flex min-w-0 items-center justify-center gap-[5px] min-[1750px]:gap-[7px]">
            <Link
              href={homeHref}
              className={navButtonClass(pathname === "/")}
              style={{ clipPath: HEX }}
            >
              <HexFrame active={pathname === "/"} />
              <span className="relative z-10 flex items-center gap-2">
                <Home
                  className="h-[14px] w-[14px] min-[1750px]:h-[15px] min-[1750px]:w-[15px] text-cyan-200/90"
                  strokeWidth={2.2}
                />
                Domov
              </span>
            </Link>

            <Link
              href="/o-podjetju"
              aria-current={isActive("/o-podjetju") ? "page" : undefined}
              className={navButtonClass(isActive("/o-podjetju"))}
              style={{ clipPath: HEX }}
            >
              <HexFrame active={isActive("/o-podjetju")} />
              <span className="relative z-10 flex items-center gap-2">
                <Building2
                  className="h-[14px] w-[14px] min-[1750px]:h-[15px] min-[1750px]:w-[15px] text-cyan-100/74"
                  strokeWidth={2.1}
                />
                O podjetju
              </span>
            </Link>

            <div
              ref={dropdownRef}
              className="relative shrink-0"
              onMouseEnter={cancelCloseTimer}
              onMouseLeave={startCloseTimer}
            >
              <button
                type="button"
                onClick={() => {
                  cancelCloseTimer();
                  setServicesOpen((value) => !value);
                }}
                className={navButtonClass(
                  isActive("/storitve") || servicesOpen,
                )}
                style={{ clipPath: HEX }}
                aria-expanded={servicesOpen}
                aria-haspopup="menu"
              >
                <HexFrame active={isActive("/storitve") || servicesOpen} />
                <span className="relative z-10 flex items-center gap-2">
                  <Wrench
                    className="h-[14px] w-[14px] min-[1750px]:h-[15px] min-[1750px]:w-[15px] text-cyan-100/76"
                    strokeWidth={2.1}
                  />
                  Storitve
                  <ChevronDown
                    className={`h-[13px] w-[13px] transition-transform duration-200 ${
                      servicesOpen
                        ? "rotate-180 text-cyan-200"
                        : "text-white/56"
                    }`}
                  />
                </span>
              </button>

              {servicesOpen ? (
                <div
                  className="absolute left-1/2 top-full z-[250] w-[370px] -translate-x-1/2 pt-3"
                  onMouseEnter={cancelCloseTimer}
                  onMouseLeave={startCloseTimer}
                >
                  <div className="relative overflow-hidden rounded-[22px] border border-cyan-200/[0.14] bg-[#03131f]/[0.99] p-2.5 shadow-[0_28px_95px_rgba(0,5,12,.72),0_0_34px_rgba(49,183,201,.08)] backdrop-blur-2xl">
                    <div className="pointer-events-none absolute inset-x-[11%] top-0 h-px bg-gradient-to-r from-transparent via-cyan-200/75 to-transparent" />
                    <div className="pointer-events-none absolute -right-12 -top-12 h-32 w-32 rounded-full bg-cyan-400/[0.055] blur-3xl" />

                    <div className="grid gap-1">
                      {serviceLinks.map((item, index) => (
                        <Link
                          key={item.href}
                          href={item.href}
                          onClick={() => setServicesOpen(false)}
                          className={[
                            "group/item flex items-center justify-between rounded-xl px-4 py-3 text-sm font-bold tracking-[0.005em] transition",
                            index === 0
                              ? "bg-cyan-300/[0.08] text-cyan-100 hover:bg-cyan-300/[0.13]"
                              : "text-white/70 hover:bg-white/[0.055] hover:text-white",
                          ].join(" ")}
                        >
                          <span>{item.label}</span>
                          <ArrowRight className="h-3.5 w-3.5 -translate-x-1 text-cyan-300/0 transition group-hover/item:translate-x-0 group-hover/item:text-cyan-300/72" />
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              ) : null}
            </div>

            <Link
              href="/linex"
              aria-current={isActive("/linex") ? "page" : undefined}
              className={navButtonClass(isActive("/linex"))}
              style={{ clipPath: HEX }}
            >
              <HexFrame active={isActive("/linex")} />
              <span className="relative z-10 flex items-center gap-2">
                <Box
                  className="h-[14px] w-[14px] min-[1750px]:h-[15px] min-[1750px]:w-[15px] text-cyan-100/74"
                  strokeWidth={2.1}
                />
                LINEX HT v1
              </span>
            </Link>

            <Link
              href="/materiali"
              aria-current={isActive("/materiali") ? "page" : undefined}
              className={navButtonClass(isActive("/materiali"))}
              style={{ clipPath: HEX }}
            >
              <HexFrame active={isActive("/materiali")} />
              <span className="relative z-10 flex items-center gap-2">
                <Layers3
                  className="h-[14px] w-[14px] min-[1750px]:h-[15px] min-[1750px]:w-[15px] text-cyan-100/74"
                  strokeWidth={2.1}
                />
                Materiali
              </span>
            </Link>

            <Link
              href="/projekti"
              aria-current={isActive("/projekti") ? "page" : undefined}
              className={navButtonClass(isActive("/projekti"))}
              style={{ clipPath: HEX }}
            >
              <HexFrame active={isActive("/projekti")} />
              <span className="relative z-10 flex items-center gap-2">
                <Folder
                  className="h-[14px] w-[14px] min-[1750px]:h-[15px] min-[1750px]:w-[15px] text-cyan-100/74"
                  strokeWidth={2.1}
                />
                Projekti
              </span>
            </Link>

            <Link
              href="/galerija"
              aria-current={isActive("/galerija") ? "page" : undefined}
              className={navButtonClass(isActive("/galerija"))}
              style={{ clipPath: HEX }}
            >
              <HexFrame active={isActive("/galerija")} />
              <span className="relative z-10 flex items-center gap-2">
                <ImageIcon
                  className="h-[14px] w-[14px] min-[1750px]:h-[15px] min-[1750px]:w-[15px] text-cyan-100/74"
                  strokeWidth={2.1}
                />
                Galerija
              </span>
            </Link>

            <Link
              href="/blog"
              aria-current={isActive("/blog") ? "page" : undefined}
              className={navButtonClass(isActive("/blog"))}
              style={{ clipPath: HEX }}
            >
              <HexFrame active={isActive("/blog")} />
              <span className="relative z-10 flex items-center gap-2">
                <FileText
                  className="h-[14px] w-[14px] min-[1750px]:h-[15px] min-[1750px]:w-[15px] text-cyan-100/74"
                  strokeWidth={2.1}
                />
                Blog
              </span>
            </Link>
          </nav>

          <Link
            href="/kontakt"
            aria-current={isActive("/kontakt") ? "page" : undefined}
            className="group relative isolate inline-flex h-[54px] min-w-[214px] min-[1750px]:min-w-[238px] shrink-0 items-center justify-center overflow-hidden px-5 min-[1750px]:px-7 text-[13px] min-[1750px]:text-[14px] font-extrabold tracking-[0.01em] text-white transition hover:-translate-y-[1px]"
            style={{ clipPath: HEX }}
          >
            <HexFrame strong />
            <span className="relative z-10 flex items-center gap-2.5 [text-shadow:0_0_14px_rgba(255,255,255,.10)]">
              <Send
                className="h-[17px] w-[17px] text-cyan-50"
                strokeWidth={2.2}
              />
              Oddajte povpraševanje
              <ArrowRight className="h-[16px] w-[16px] text-cyan-100 transition-transform duration-200 group-hover:translate-x-1" />
            </span>
          </Link>
        </div>
      </div>

      {/* SMALLER DESKTOP / LARGE LAPTOP
          Same 07 design, but split into two rows so no navigation item can disappear.
      */}
      <div className="relative z-10 hidden min-[1100px]:block min-[1760px]:hidden">
        <div className="mx-auto max-w-[1500px] px-6 lg:px-8">
          {/* logo + CTA row */}
          <div className="grid min-h-[112px] grid-cols-[1fr_auto_1fr] items-center">
            <div />

            <Link
              href={homeHref}
              className="group relative flex h-[106px] w-[305px] items-center justify-center"
              aria-label={brandName || "LazTek Engineering"}
            >
              <div className="pointer-events-none absolute inset-x-[8%] bottom-[7px] h-px bg-gradient-to-r from-transparent via-cyan-300/30 to-transparent opacity-70 transition group-hover:via-cyan-200/55" />
              <Image
                src={laztekLogo}
                alt="LazTek Engineering"
                priority
                sizes="305px"
                className="relative z-10 h-full w-full object-contain drop-shadow-[0_5px_16px_rgba(0,0,0,.26)]"
              />
            </Link>

            <div className="flex justify-end">
              <Link
                href="/kontakt"
                aria-current={isActive("/kontakt") ? "page" : undefined}
                className="group relative isolate inline-flex h-[52px] min-w-[225px] items-center justify-center overflow-hidden px-6 text-[13px] font-extrabold tracking-[0.01em] text-white transition hover:-translate-y-[1px]"
                style={{ clipPath: HEX }}
              >
                <HexFrame strong />
                <span className="relative z-10 flex items-center gap-2.5">
                  <Send
                    className="h-[17px] w-[17px] text-cyan-50"
                    strokeWidth={2.2}
                  />
                  Oddajte povpraševanje
                  <ArrowRight className="h-[16px] w-[16px] text-cyan-100 transition-transform duration-200 group-hover:translate-x-1" />
                </span>
              </Link>
            </div>
          </div>

          {/* full navigation row */}
          <nav className="flex items-center justify-center gap-[7px] pb-[16px]">
            <Link
              href={homeHref}
              className={navButtonClass(pathname === "/")}
              style={{ clipPath: HEX }}
            >
              <HexFrame active={pathname === "/"} />
              <span className="relative z-10 flex items-center gap-2">
                <Home
                  className="h-[14px] w-[14px] text-cyan-200/90"
                  strokeWidth={2.2}
                />
                Domov
              </span>
            </Link>

            <Link
              href="/o-podjetju"
              aria-current={isActive("/o-podjetju") ? "page" : undefined}
              className={navButtonClass(isActive("/o-podjetju"))}
              style={{ clipPath: HEX }}
            >
              <HexFrame active={isActive("/o-podjetju")} />
              <span className="relative z-10 flex items-center gap-2">
                <Building2
                  className="h-[14px] w-[14px] text-cyan-100/74"
                  strokeWidth={2.1}
                />
                O podjetju
              </span>
            </Link>

            <div
              ref={midDropdownRef}
              className="relative shrink-0"
              onMouseEnter={cancelCloseTimer}
              onMouseLeave={startCloseTimer}
            >
              <button
                type="button"
                onClick={() => {
                  cancelCloseTimer();
                  setServicesOpen((value) => !value);
                }}
                className={navButtonClass(
                  isActive("/storitve") || servicesOpen,
                )}
                style={{ clipPath: HEX }}
                aria-expanded={servicesOpen}
                aria-haspopup="menu"
              >
                <HexFrame active={isActive("/storitve") || servicesOpen} />
                <span className="relative z-10 flex items-center gap-2">
                  <Wrench
                    className="h-[14px] w-[14px] text-cyan-100/76"
                    strokeWidth={2.1}
                  />
                  Storitve
                  <ChevronDown
                    className={`h-[13px] w-[13px] transition-transform duration-200 ${
                      servicesOpen
                        ? "rotate-180 text-cyan-200"
                        : "text-white/56"
                    }`}
                  />
                </span>
              </button>

              {servicesOpen ? (
                <div
                  className="absolute left-1/2 top-full z-[250] w-[370px] -translate-x-1/2 pt-3"
                  onMouseEnter={cancelCloseTimer}
                  onMouseLeave={startCloseTimer}
                >
                  <div className="relative overflow-hidden rounded-[22px] border border-cyan-200/[0.14] bg-[#03131f]/[0.99] p-2.5 shadow-[0_28px_95px_rgba(0,5,12,.72),0_0_34px_rgba(49,183,201,.08)] backdrop-blur-2xl">
                    <div className="pointer-events-none absolute inset-x-[11%] top-0 h-px bg-gradient-to-r from-transparent via-cyan-200/75 to-transparent" />

                    <div className="grid gap-1">
                      {serviceLinks.map((item, index) => (
                        <Link
                          key={item.href}
                          href={item.href}
                          onClick={() => setServicesOpen(false)}
                          className={[
                            "group/item flex items-center justify-between rounded-xl px-4 py-3 text-sm font-bold tracking-[0.005em] transition",
                            index === 0
                              ? "bg-cyan-300/[0.08] text-cyan-100 hover:bg-cyan-300/[0.13]"
                              : "text-white/70 hover:bg-white/[0.055] hover:text-white",
                          ].join(" ")}
                        >
                          <span>{item.label}</span>
                          <ArrowRight className="h-3.5 w-3.5 -translate-x-1 text-cyan-300/0 transition group-hover/item:translate-x-0 group-hover/item:text-cyan-300/72" />
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              ) : null}
            </div>

            <Link
              href="/linex"
              aria-current={isActive("/linex") ? "page" : undefined}
              className={navButtonClass(isActive("/linex"))}
              style={{ clipPath: HEX }}
            >
              <HexFrame active={isActive("/linex")} />
              <span className="relative z-10 flex items-center gap-2">
                <Box
                  className="h-[14px] w-[14px] text-cyan-100/74"
                  strokeWidth={2.1}
                />
                LINEX HT v1
              </span>
            </Link>

            <Link
              href="/materiali"
              aria-current={isActive("/materiali") ? "page" : undefined}
              className={navButtonClass(isActive("/materiali"))}
              style={{ clipPath: HEX }}
            >
              <HexFrame active={isActive("/materiali")} />
              <span className="relative z-10 flex items-center gap-2">
                <Layers3
                  className="h-[14px] w-[14px] text-cyan-100/74"
                  strokeWidth={2.1}
                />
                Materiali
              </span>
            </Link>

            <Link
              href="/projekti"
              aria-current={isActive("/projekti") ? "page" : undefined}
              className={navButtonClass(isActive("/projekti"))}
              style={{ clipPath: HEX }}
            >
              <HexFrame active={isActive("/projekti")} />
              <span className="relative z-10 flex items-center gap-2">
                <Folder
                  className="h-[14px] w-[14px] text-cyan-100/74"
                  strokeWidth={2.1}
                />
                Projekti
              </span>
            </Link>

            <Link
              href="/galerija"
              aria-current={isActive("/galerija") ? "page" : undefined}
              className={navButtonClass(isActive("/galerija"))}
              style={{ clipPath: HEX }}
            >
              <HexFrame active={isActive("/galerija")} />
              <span className="relative z-10 flex items-center gap-2">
                <ImageIcon
                  className="h-[14px] w-[14px] text-cyan-100/74"
                  strokeWidth={2.1}
                />
                Galerija
              </span>
            </Link>

            <Link
              href="/blog"
              aria-current={isActive("/blog") ? "page" : undefined}
              className={navButtonClass(isActive("/blog"))}
              style={{ clipPath: HEX }}
            >
              <HexFrame active={isActive("/blog")} />
              <span className="relative z-10 flex items-center gap-2">
                <FileText
                  className="h-[14px] w-[14px] text-cyan-100/74"
                  strokeWidth={2.1}
                />
                Blog
              </span>
            </Link>
          </nav>
        </div>
      </div>

      {/* TABLET + MOBILE */}
      <div className="relative z-20 min-[1100px]:hidden">
        <div className="mx-auto flex h-[88px] max-w-7xl items-center justify-between gap-3 px-4 sm:px-6 lg:px-8">
          <Link
            href={homeHref}
            onClick={closeMenus}
            className="flex h-[72px] w-[235px] items-center"
            aria-label={brandName || "LazTek Engineering"}
          >
            <Image
              src={laztekLogo}
              alt="LazTek Engineering"
              priority
              sizes="140px"
              className="h-full w-full object-contain"
            />
          </Link>

          <div className="flex items-center gap-2">
            <Link
              href="/kontakt"
              aria-current={isActive("/kontakt") ? "page" : undefined}
              className="group relative hidden h-[46px] items-center justify-center overflow-hidden px-5 text-xs font-extrabold text-white sm:inline-flex"
              style={{ clipPath: HEX }}
            >
              <HexFrame strong />
              <span className="relative z-10 flex items-center gap-2">
                <Send className="h-4 w-4" />
                Povpraševanje
              </span>
            </Link>

            <button
              type="button"
              onClick={() => setMobileOpen((value) => !value)}
              className="relative isolate flex h-[46px] w-[54px] items-center justify-center overflow-hidden text-white"
              style={{ clipPath: HEX }}
              aria-controls="laztek-mobile-navigation"
              aria-expanded={mobileOpen}
              aria-label={mobileOpen ? "Zapri meni" : "Odpri meni"}
            >
              <HexFrame active={mobileOpen} />
              <span className="relative z-10">
                {mobileOpen ? (
                  <X className="h-5 w-5" />
                ) : (
                  <Menu className="h-5 w-5" />
                )}
              </span>
            </button>
          </div>
        </div>

        {mobileOpen ? (
          <div
            id="laztek-mobile-navigation"
            className="max-h-[calc(100dvh-130px)] overflow-y-auto border-t border-cyan-200/[0.08] bg-[#03111d]/[0.985] px-4 pb-5 pt-3 shadow-[0_28px_70px_rgba(0,4,10,.6)] backdrop-blur-2xl sm:px-6 lg:px-8"
          >
            <div className="mx-auto grid max-w-7xl gap-2">
              <Link
                href={homeHref}
                onClick={closeMenus}
                className="rounded-xl border border-white/[0.07] bg-white/[0.035] px-4 py-3 text-sm font-bold text-white/82"
              >
                Domov
              </Link>

              <Link
                href="/o-podjetju"
                aria-current={isActive("/o-podjetju") ? "page" : undefined}
                onClick={closeMenus}
                className="rounded-xl border border-white/[0.07] bg-white/[0.035] px-4 py-3 text-sm font-bold text-white/82"
              >
                O podjetju
              </Link>

              <div className="rounded-xl border border-cyan-300/[0.10] bg-cyan-300/[0.035] p-2">
                <Link
                  href="/storitve"
                  onClick={closeMenus}
                  className="block px-3 py-2 text-[11px] font-extrabold uppercase tracking-[0.19em] text-cyan-200/74"
                >
                  Storitve
                </Link>

                <div className="grid gap-1">
                  {serviceLinks.slice(1).map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={closeMenus}
                      className="rounded-lg px-3 py-2.5 text-sm font-semibold text-white/64 transition hover:bg-white/[0.05] hover:text-white"
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
              </div>

              {mainLinks.slice(1).map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={closeMenus}
                  className="rounded-xl border border-white/[0.07] bg-white/[0.035] px-4 py-3 text-sm font-bold text-white/82"
                >
                  {item.label}
                </Link>
              ))}

              <Link
                href="/kontakt"
                aria-current={isActive("/kontakt") ? "page" : undefined}
                onClick={closeMenus}
                className="group relative isolate mt-1 inline-flex h-[50px] items-center justify-center overflow-hidden px-6 text-sm font-extrabold text-white sm:hidden"
                style={{ clipPath: HEX }}
              >
                <HexFrame strong />
                <span className="relative z-10 flex items-center gap-2">
                  <Send className="h-4 w-4" />
                  Oddajte povpraševanje
                  <ArrowRight className="h-4 w-4" />
                </span>
              </Link>
            </div>
          </div>
        ) : null}
      </div>
    </header>
  );
}
