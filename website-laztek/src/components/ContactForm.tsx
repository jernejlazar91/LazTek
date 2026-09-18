'use client'

import {
  ChangeEvent,
  FormEvent,
  useRef,
  useState,
} from 'react'
import Script from 'next/script'
import {Send, UploadCloud, X} from 'lucide-react'

declare global {
  interface Window {
    turnstile?: {
      reset: () => void
    }
  }
}

const MAX_FILES = 5
const MAX_FILE_SIZE = 500 * 1024 * 1024
const MAX_TOTAL_SIZE = 1024 * 1024 * 1024
const CHUNK_SIZE = 8 * 1024 * 1024

const ALLOWED_EXTENSIONS = [
  'step',
  'stp',
  'stl',
  'obj',
]

const TURNSTILE_SITE_KEY =
  process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY || ''

function formatBytes(bytes: number) {
  if (bytes === 0) return '0 B'

  const units = ['B', 'KB', 'MB', 'GB']

  const index = Math.min(
    Math.floor(Math.log(bytes) / Math.log(1024)),
    units.length - 1,
  )

  return `${(bytes / 1024 ** index).toFixed(
    index >= 2 ? 1 : 0,
  )} ${units[index]}`
}

function fileKey(file: File) {
  return `${file.name}-${file.size}-${file.lastModified}`
}

function uploadChunk({
  uploadUrl,
  chunk,
  start,
  end,
  total,
  contentType,
  onProgress,
}: {
  uploadUrl: string
  chunk: Blob
  start: number
  end: number
  total: number
  contentType: string
  onProgress: (percent: number) => void
}) {
  return new Promise<void>((resolve, reject) => {
    const xhr = new XMLHttpRequest()

    xhr.open('PUT', uploadUrl, true)

    xhr.setRequestHeader(
      'Content-Type',
      contentType || 'application/octet-stream',
    )

    xhr.setRequestHeader(
      'Content-Range',
      `bytes ${start}-${end - 1}/${total}`,
    )

    xhr.upload.onprogress = (event) => {
      if (!event.lengthComputable) return

      const uploaded =
        start + event.loaded

      const percent = Math.min(
        100,
        Math.round(
          (uploaded / total) * 100,
        ),
      )

      onProgress(percent)
    }

    xhr.onload = () => {
      const isLastChunk =
        end >= total

      if (
        xhr.status === 308 ||
        xhr.status === 200 ||
        xhr.status === 201
      ) {
        if (
          isLastChunk &&
          xhr.status === 308
        ) {
          reject(
            new Error(
              'Google Drive upload ni bil dokončan.',
            ),
          )

          return
        }

        resolve()
        return
      }

      console.error(
        'Google Drive upload HTTP napaka:',
        {
          status: xhr.status,
          response: xhr.responseText,
        },
      )

      reject(
        new Error(
          `Google Drive upload ni uspel (${xhr.status}).`,
        ),
      )
    }

    xhr.onerror = () => {
      reject(
        new Error(
          'Povezava z Google Drive je bila prekinjena.',
        ),
      )
    }

    xhr.send(chunk)
  })
}

async function uploadFile(
  file: File,
  uploadUrl: string,
  onProgress: (percent: number) => void,
) {
  let start = 0

  while (start < file.size) {
    const end = Math.min(
      start + CHUNK_SIZE,
      file.size,
    )

    const chunk =
      file.slice(start, end)

    let attempt = 0
    let uploaded = false

    while (
      !uploaded &&
      attempt < 3
    ) {
      try {
        await uploadChunk({
          uploadUrl,
          chunk,
          start,
          end,
          total: file.size,

          contentType:
            file.type ||
            'application/octet-stream',

          onProgress,
        })

        uploaded = true
      } catch (error) {
        attempt += 1

        if (attempt >= 3) {
          throw error
        }

        await new Promise(
          (resolve) =>
            setTimeout(
              resolve,
              attempt * 1000,
            ),
        )
      }
    }

    start = end

    onProgress(
      Math.round(
        (start / file.size) * 100,
      ),
    )
  }
}

export default function ContactForm() {
  const fileInputRef =
    useRef<HTMLInputElement | null>(null)

  const [sending, setSending] =
    useState(false)

  const [success, setSuccess] =
    useState(false)

  const [error, setError] =
    useState('')

  const [
    selectedFiles,
    setSelectedFiles,
  ] = useState<File[]>([])

  const [
    uploadProgress,
    setUploadProgress,
  ] = useState<Record<string, number>>({})

  const [
    statusText,
    setStatusText,
  ] = useState('')

  function resetTurnstile() {
    try {
      window.turnstile?.reset()
    } catch {
      // Ni kritično.
    }
  }

  function handleFileChange(
    event: ChangeEvent<HTMLInputElement>,
  ) {
    setError('')
    setSuccess(false)

    const files = Array.from(
      event.target.files || [],
    )

    if (files.length > MAX_FILES) {
      setError(
        `Izberete lahko največ ${MAX_FILES} datotek.`,
      )

      event.target.value = ''
      return
    }

    for (const file of files) {
      const extension =
        file.name
          .split('.')
          .pop()
          ?.toLowerCase() || ''

      if (
        !ALLOWED_EXTENSIONS.includes(
          extension,
        )
      ) {
        setError(
          `Datoteka "${file.name}" ni dovoljena. Dovoljeni formati so STEP, STP, STL in OBJ.`,
        )

        event.target.value = ''
        return
      }

      if (
        file.size >
        MAX_FILE_SIZE
      ) {
        setError(
          `Datoteka "${file.name}" je večja od 500 MB.`,
        )

        event.target.value = ''
        return
      }
    }

    const totalSize =
      files.reduce(
        (sum, file) =>
          sum + file.size,
        0,
      )

    if (
      totalSize >
      MAX_TOTAL_SIZE
    ) {
      setError(
        'Skupna velikost datotek je lahko največ 1 GB.',
      )

      event.target.value = ''
      return
    }

    setSelectedFiles(files)
    setUploadProgress({})
  }

  function removeFile(
    index: number,
  ) {
    if (sending) return

    setSelectedFiles(
      (current) =>
        current.filter(
          (_, currentIndex) =>
            currentIndex !== index,
        ),
    )

    setUploadProgress({})

    if (fileInputRef.current) {
      fileInputRef.current.value =
        ''
    }
  }

  async function handleSubmit(
    event: FormEvent<HTMLFormElement>,
  ) {
    event.preventDefault()

    setSending(true)
    setSuccess(false)
    setError('')

    setStatusText(
      'Pripravljam povpraševanje ...',
    )

    const form =
      event.currentTarget

    const formData =
      new FormData(form)

    const data = {
      name: String(
        formData.get('name') || '',
      ).trim(),

      company: String(
        formData.get('company') || '',
      ).trim(),

      email: String(
        formData.get('email') || '',
      ).trim(),

      phone: String(
        formData.get('phone') || '',
      ).trim(),

      message: String(
        formData.get('message') || '',
      ).trim(),

      website: String(
        formData.get('website') || '',
      ).trim(),
    }

    try {
      let driveFolderUrl = ''

      const uploadedFiles: {
        name: string
        size: number
      }[] = []

      /*
       * Če so izbrane CAD datoteke:
       * 1. preverimo Turnstile
       * 2. pridobimo LazTek upload token
       * 3. šele nato odpremo Google upload seje
       */
      if (
        selectedFiles.length > 0 &&
        !data.website
      ) {
        const turnstileToken =
          String(
            formData.get(
              'cf-turnstile-response',
            ) || '',
          ).trim()

        if (!turnstileToken) {
          throw new Error(
            'Počakajte, da se varnostno preverjanje dokonča, nato poskusite ponovno.',
          )
        }

        setStatusText(
          'Preverjam varnost ...',
        )

        const authorizeResponse =
          await fetch(
            '/api/upload-authorize',
            {
              method: 'POST',

              headers: {
                'Content-Type':
                  'application/json',
              },

              body: JSON.stringify({
                turnstileToken,

                files:
                  selectedFiles.map(
                    (file) => ({
                      name: file.name,
                      size: file.size,
                    }),
                  ),
              }),
            },
          )

        const authorizeResult =
          await authorizeResponse.json()

        /*
         * Turnstile token je po preverjanju porabljen.
         * Reset takoj pripravi nov token,
         * če bi kasnejši upload padel in bi uporabnik
         * moral poskusiti ponovno.
         */
        resetTurnstile()

        if (!authorizeResponse.ok) {
          throw new Error(
            authorizeResult.error ||
              'Varnostno preverjanje ni uspelo.',
          )
        }

        if (
          !authorizeResult.uploadToken ||
          !authorizeResult.uploadGroup
        ) {
          throw new Error(
            'Varnostni sistem ni vrnil dovoljenja za nalaganje.',
          )
        }

        const uploadToken =
          String(
            authorizeResult.uploadToken,
          )

        for (
          let index = 0;
          index <
          selectedFiles.length;
          index += 1
        ) {
          const file =
            selectedFiles[index]

          setStatusText(
            `Nalagam datoteko ${
              index + 1
            } od ${
              selectedFiles.length
            }: ${file.name}`,
          )

          const sessionResponse =
            await fetch(
              '/api/google/upload-session',
              {
                method: 'POST',

                headers: {
                  'Content-Type':
                    'application/json',
                },

                body: JSON.stringify({
                  uploadToken,

                  slot: index,

                  fileName:
                    file.name,

                  fileSize:
                    file.size,

                  fileType:
                    file.type ||
                    'application/octet-stream',

                  customerName:
                    data.name,

                  company:
                    data.company,

                  origin:
                    window.location
                      .origin,
                }),
              },
            )

          const sessionResult =
            await sessionResponse.json()

          if (
            !sessionResponse.ok
          ) {
            throw new Error(
              sessionResult.error ||
                'Google Drive nalaganja ni bilo mogoče pripraviti.',
            )
          }

          if (
            !sessionResult.uploadUrl ||
            !sessionResult.folderUrl
          ) {
            throw new Error(
              'Google Drive ni vrnil podatkov za nalaganje.',
            )
          }

          driveFolderUrl =
            sessionResult.folderUrl

          const key =
            fileKey(file)

          setUploadProgress(
            (current) => ({
              ...current,
              [key]: 0,
            }),
          )

          await uploadFile(
            file,
            sessionResult.uploadUrl,
            (percent) => {
              setUploadProgress(
                (current) => ({
                  ...current,
                  [key]:
                    percent,
                }),
              )
            },
          )

          uploadedFiles.push({
            name: file.name,
            size: file.size,
          })
        }
      }

      setStatusText(
        'Pošiljam povpraševanje ...',
      )

      const response =
        await fetch(
          '/api/contact',
          {
            method: 'POST',

            headers: {
              'Content-Type':
                'application/json',
            },

            body: JSON.stringify({
              ...data,
              driveFolderUrl,
              uploadedFiles,
            }),
          },
        )

      const result =
        await response.json()

      if (!response.ok) {
        throw new Error(
          result.error ||
            'Pošiljanje ni uspelo.',
        )
      }

      form.reset()

      if (fileInputRef.current) {
        fileInputRef.current.value =
          ''
      }

      resetTurnstile()

      setSelectedFiles([])
      setUploadProgress({})
      setStatusText('')
      setSuccess(true)
    } catch (err) {
      console.error(err)

      setError(
        err instanceof Error
          ? err.message
          : 'Prišlo je do napake. Poskusite ponovno.',
      )
    } finally {
      setSending(false)
      setStatusText('')
    }
  }

  return (
    <>
      <Script
        src="https://challenges.cloudflare.com/turnstile/v0/api.js"
        strategy="afterInteractive"
      />

      <form
        aria-busy={sending}
        onSubmit={handleSubmit}
        className="rounded-[2rem] border border-cyan-200/15 bg-[#061a2c]/72 p-6 shadow-[0_26px_90px_rgba(0,18,32,0.30)] backdrop-blur-2xl sm:p-8"
      >
        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <label
              htmlFor="name"
              className="mb-2 block text-sm font-medium text-white/75"
            >
              Ime in priimek *
            </label>

            <input
              id="name"
              name="name"
              type="text"
              required
              maxLength={100}
              autoComplete="name"
              placeholder="Janez Novak"
              disabled={sending}
              className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3.5 text-white outline-none transition placeholder:text-white/25 focus:border-cyan-300/50 focus:bg-white/[0.07] disabled:opacity-60"
            />
          </div>

          <div>
            <label
              htmlFor="company"
              className="mb-2 block text-sm font-medium text-white/75"
            >
              Podjetje
            </label>

            <input
              id="company"
              name="company"
              type="text"
              maxLength={120}
              autoComplete="organization"
              placeholder="Podjetje d.o.o."
              disabled={sending}
              className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3.5 text-white outline-none transition placeholder:text-white/25 focus:border-cyan-300/50 focus:bg-white/[0.07] disabled:opacity-60"
            />
          </div>

          <div>
            <label
              htmlFor="email"
              className="mb-2 block text-sm font-medium text-white/75"
            >
              E-pošta *
            </label>

            <input
              id="email"
              name="email"
              type="email"
              required
              maxLength={160}
              autoComplete="email"
              placeholder="ime@podjetje.si"
              disabled={sending}
              className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3.5 text-white outline-none transition placeholder:text-white/25 focus:border-cyan-300/50 focus:bg-white/[0.07] disabled:opacity-60"
            />
          </div>

          <div>
            <label
              htmlFor="phone"
              className="mb-2 block text-sm font-medium text-white/75"
            >
              Telefon
            </label>

            <input
              id="phone"
              name="phone"
              type="tel"
              maxLength={50}
              autoComplete="tel"
              placeholder="+386 ..."
              disabled={sending}
              className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3.5 text-white outline-none transition placeholder:text-white/25 focus:border-cyan-300/50 focus:bg-white/[0.07] disabled:opacity-60"
            />
          </div>
        </div>

        <div className="mt-5">
          <label
            htmlFor="message"
            className="mb-2 block text-sm font-medium text-white/75"
          >
            Opišite projekt ali povpraševanje *
          </label>

          <textarea
            id="message"
            name="message"
            required
            minLength={10}
            maxLength={5000}
            rows={8}
            disabled={sending}
            placeholder="Opišite kos, problem, namen uporabe, material, količino, dimenzije in druge pomembne zahteve ..."
            className="w-full resize-y rounded-2xl border border-white/10 bg-white/5 px-4 py-3.5 text-white outline-none transition placeholder:text-white/25 focus:border-cyan-300/50 focus:bg-white/[0.07] disabled:opacity-60"
          />
        </div>

        {/* CAD DATOTEKE */}
        <div className="mt-5">
          <div className="mb-2 text-sm font-medium text-white/75">
            3D model / CAD datoteke
          </div>

          <label
            htmlFor="cad-files"
            className={`flex cursor-pointer flex-col items-center justify-center rounded-2xl border border-dashed border-cyan-300/25 bg-cyan-400/[0.04] px-6 py-7 text-center transition hover:border-cyan-300/50 hover:bg-cyan-400/[0.07] ${
              sending
                ? 'pointer-events-none opacity-60'
                : ''
            }`}
          >
            <UploadCloud
              size={28}
              className="mb-3 text-cyan-300"
            />

            <span className="text-sm font-semibold text-white/90">
              Izberite STEP, STP, STL ali OBJ
            </span>

            <span className="mt-1 text-xs leading-5 text-white/45">
              Največ 5 datotek · 500 MB na datoteko · največ 1 GB skupaj
            </span>
          </label>

          <input
            ref={fileInputRef}
            id="cad-files"
            type="file"
            multiple
            accept=".step,.stp,.stl,.obj"
            disabled={sending}
            onChange={handleFileChange}
            className="sr-only"
          />

          {selectedFiles.length > 0 ? (
            <div className="mt-4 space-y-2">
              {selectedFiles.map(
                (file, index) => {
                  const key =
                    fileKey(file)

                  const progress =
                    uploadProgress[key]

                  return (
                    <div
                      key={key}
                      className="rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3"
                    >
                      <div className="flex items-center gap-3">
                        <div className="min-w-0 flex-1">
                          <div className="truncate text-sm font-medium text-white/85">
                            {file.name}
                          </div>

                          <div className="mt-0.5 text-xs text-white/40">
                            {formatBytes(
                              file.size,
                            )}
                          </div>
                        </div>

                        {!sending ? (
                          <button
                            type="button"
                            onClick={() =>
                              removeFile(
                                index,
                              )
                            }
                            className="flex h-8 w-8 items-center justify-center rounded-full border border-white/10 text-white/45 transition hover:border-red-300/30 hover:bg-red-400/10 hover:text-red-200"
                            aria-label={`Odstrani ${file.name}`}
                          >
                            <X size={15} />
                          </button>
                        ) : null}
                      </div>

                      {typeof progress ===
                      'number' ? (
                        <div className="mt-3">
                          <div className="mb-1 flex items-center justify-between text-xs text-white/45">
                            <span>
                              Nalaganje
                            </span>

                            <span>
                              {progress} %
                            </span>
                          </div>

                          <div className="h-1.5 overflow-hidden rounded-full bg-white/10">
                            <div
                              className="h-full rounded-full bg-gradient-to-r from-cyan-400 via-sky-500 to-blue-600 transition-all"
                              style={{
                                width: `${progress}%`,
                              }}
                            />
                          </div>
                        </div>
                      ) : null}
                    </div>
                  )
                },
              )}
            </div>
          ) : null}
        </div>

        {/* TURNSTILE */}
        <div className="mt-6 rounded-2xl border border-white/10 bg-white/[0.03] p-4">
          <div className="mb-3 text-xs leading-5 text-white/45">
            Varnostno preverjanje preprečuje zlorabo nalaganja datotek.
          </div>

          {TURNSTILE_SITE_KEY ? (
            <div
              className="cf-turnstile"
              data-sitekey={
                TURNSTILE_SITE_KEY
              }
              data-theme="dark"
              data-size="flexible"
              data-action="contact_upload"
            />
          ) : (
            <div className="text-sm text-red-200">
              Turnstile Site Key ni nastavljen.
            </div>
          )}
        </div>

        {/* HONEYPOT */}
        <div
          className="hidden"
          aria-hidden="true"
        >
          <label htmlFor="website">
            Website
          </label>

          <input
            id="website"
            name="website"
            type="text"
            tabIndex={-1}
            autoComplete="off"
          />
        </div>

        <p className="mt-4 text-xs leading-5 text-white/40">
          Z oddajo obrazca se posredovani podatki in priložene datoteke uporabijo samo za obravnavo in odgovor na vaše povpraševanje.
        </p>

        {success ? (
          <div role="status" className="mt-5 rounded-2xl border border-emerald-300/20 bg-emerald-400/10 px-5 py-4 text-sm leading-6 text-emerald-100">
            <strong>
              Povpraševanje je bilo uspešno poslano.
            </strong>

            <br />

            Hvala za vaše sporočilo. Odgovorili vam bomo v najkrajšem možnem času.
          </div>
        ) : null}

        {error ? (
          <div role="alert" className="mt-5 rounded-2xl border border-red-300/20 bg-red-400/10 px-5 py-4 text-sm leading-6 text-red-100">
            {error}
          </div>
        ) : null}

        <button
          type="submit"
          disabled={sending}
          className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-cyan-400 via-sky-500 to-blue-600 px-6 py-4 text-sm font-semibold text-slate-950 transition hover:scale-[1.01] disabled:cursor-not-allowed disabled:opacity-60"
        >
          <Send size={17} />

          {sending
            ? statusText ||
              'Pošiljam povpraševanje ...'
            : 'Pošlji povpraševanje'}
        </button>
      </form>
    </>
  )
}