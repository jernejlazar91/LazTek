'use client'
import {useId, useMemo, useState} from 'react'

export type Material = {
  title: string
  subtitle: string
  properties: string[]
  bestFor: string[]
  watchOut: string[]
}
const groups = [
  'Vsi materiali',
  'Kompoziti CF / GF',
  'Zunanja uporaba',
  'Fleksibilni deli',
]
const normalize = (value: string) =>
  value
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()

export default function MaterialLibrary({materials}: {materials: Material[]}) {
  const searchId = useId()
  const [query, setQuery] = useState('')
  const [group, setGroup] = useState(groups[0])
  const [selected, setSelected] = useState<string[]>([])
  const visible = useMemo(
    () =>
      materials.filter((item) => {
        const matches = normalize(
          [item.title, item.subtitle, ...item.bestFor].join(' '),
        ).includes(normalize(query))
        const category =
          group === groups[0] ||
          (group === groups[1] && /CF|GF/.test(item.title)) ||
          (group === groups[2] && item.title === 'ASA') ||
          (group === groups[3] && /TPU|TPE/.test(item.title))
        return matches && category
      }),
    [materials, query, group],
  )
  const comparison = materials.filter((item) => selected.includes(item.title))
  function toggle(title: string) {
    setSelected((current) =>
      current.includes(title)
        ? current.filter((x) => x !== title)
        : current.length < 3
          ? [...current, title]
          : current,
    )
  }
  return (
    <div>
      <div className="lt-library-controls">
        <div>
          <label htmlFor={searchId}>Poiščite material ali namen uporabe</label>
          <input
            id={searchId}
            className="lt-input"
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="npr. PA6, ohišje, nosilec …"
          />
        </div>
        <p className="lt-muted" role="status">
          {visible.length} / {materials.length} materialnih skupin
        </p>
      </div>
      <div className="lt-filters" aria-label="Filtri materialov">
        {groups.map((item) => (
          <button
            type="button"
            key={item}
            aria-pressed={group === item}
            onClick={() => setGroup(item)}
          >
            {item}
          </button>
        ))}
      </div>
      <p className="lt-muted lt-library-hint">
        Za primerjavo označite do 3 materialne skupine. Podatki so kvalitativno
        izhodišče; konkretno formulacijo in dobavljivost potrdimo za vaš
        projekt.
      </p>
      <div className="lt-comparison-status" role="status">
        {selected.length
          ? `Izbrano za primerjavo: ${selected.length} od 3.`
          : 'Noben material še ni izbran.'}{' '}
        {selected.length > 0 && (
          <button type="button" onClick={() => setSelected([])}>
            Počisti izbor
          </button>
        )}
      </div>
      {comparison.length > 0 && (
        <section
          className="lt-comparison"
          aria-label="Primerjava izbranih materialov"
        >
          <h3>Primerjava materialov</h3>
          <div
            className="lt-table-scroll"
            role="region"
            aria-label="Primerjalna preglednica — pomaknite vodoravno"
            tabIndex={0}
          >
            <table className="lt-table">
              <caption>
                Primerjava uporabe, lastnosti in procesnih omejitev.
              </caption>
              <thead>
                <tr>
                  <th scope="col">Merilo</th>
                  {comparison.map((item) => (
                    <th scope="col" key={item.title}>
                      {item.title}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {(
                  [
                    {label: 'Primerno za', key: 'bestFor'},
                    {label: 'Ključne lastnosti', key: 'properties'},
                    {label: 'Upoštevati pri izbiri', key: 'watchOut'},
                  ] as const
                ).map((row) => (
                  <tr key={row.key}>
                    <th scope="row">{row.label}</th>
                    {comparison.map((item) => (
                      <td key={item.title}>
                        <ul>
                          {item[row.key].map((value) => (
                            <li key={value}>{value}</li>
                          ))}
                        </ul>
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      )}
      {visible.length ? (
        <div className="lt-material-grid">
          {visible.map((item) => (
            <article className="lt-material" key={item.title}>
              <div className="lt-material-top">
                <div>
                  <span className="lt-index">TEHNIČNI POLIMER</span>
                  <h3>{item.title}</h3>
                </div>
                <label>
                  <input
                    type="checkbox"
                    checked={selected.includes(item.title)}
                    disabled={
                      selected.length >= 3 && !selected.includes(item.title)
                    }
                    onChange={() => toggle(item.title)}
                    aria-label={`Primerjaj ${item.title}`}
                  />
                  Primerjaj
                </label>
              </div>
              <p>{item.subtitle}</p>
              <h4>Primerno za</h4>
              <ul>
                {item.bestFor.map((x) => (
                  <li key={x}>{x}</li>
                ))}
              </ul>
              <details>
                <summary>Lastnosti in omejitve</summary>
                <h4>Ključne lastnosti</h4>
                <ul>
                  {item.properties.map((x) => (
                    <li key={x}>{x}</li>
                  ))}
                </ul>
                <h4>Upoštevati pri izbiri</h4>
                <ul>
                  {item.watchOut.map((x) => (
                    <li key={x}>{x}</li>
                  ))}
                </ul>
              </details>
            </article>
          ))}
        </div>
      ) : (
        <div className="lt-empty">
          <p>Za izbrani filter ni rezultatov.</p>
          <button
            className="lt-text-link"
            type="button"
            onClick={() => {
              setQuery('')
              setGroup(groups[0])
            }}
          >
            Ponastavi iskanje in filtre
          </button>
        </div>
      )}
    </div>
  )
}
