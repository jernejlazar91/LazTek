'use client'

import {Mail} from 'lucide-react'

export default function EmailCard({
  email,
}: {
  email: string
}) {
  const cleanEmail = email
    .trim()
    .replace(/^mailto:/i, '')
    .replace(/\s+/g, '')

  function openEmail() {
    const subject = encodeURIComponent(
      'Povpraševanje – LazTek Engineering',
    )

    window.location.href =
      `mailto:${cleanEmail}?subject=${subject}`
  }

  return (
    <button
      type="button"
      onClick={openEmail}
      className="block h-full w-full cursor-pointer text-left"
      aria-label={`Pošlji e-pošto na ${cleanEmail}`}
    >
      <div className="h-full rounded-[1.5rem] border border-cyan-200/15 bg-[#061a2c]/66 p-5 transition hover:border-cyan-300/25 hover:bg-cyan-400/10">
        <div className="flex items-center gap-3 text-cyan-300">
          <Mail className="h-5 w-5" />

          <span className="text-xs font-semibold uppercase tracking-[0.18em] text-cyan-100/55">
            Email
          </span>
        </div>

        <div className="mt-3 break-words text-sm font-semibold text-white/85">
          {cleanEmail}
        </div>
      </div>
    </button>
  )
}