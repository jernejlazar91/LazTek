type TechnicalData = {
  clientIndustry?: string
  material?: string
  technology?: string
  specs?: {label?: string; value?: string; _key?: string}[]
}

export default function ProjectTechnicalData({project}: {project: TechnicalData}) {
  const rows = new Map<string, string>()
  for (const [label, value] of [
    ['Panoga', project.clientIndustry], ['Material', project.material], ['Postopek', project.technology],
    ...(project.specs || []).map(row => [row.label, row.value]),
  ]) {
    if (label?.trim() && value?.trim()) rows.set(label.trim(), value.trim())
  }
  return rows.size ? <section className="lt-article-body">
    <h2>Tehnični podatki projekta</h2>
    <div className="lt-table-scroll"><table className="lt-table" aria-label="Tehnični podatki projekta"><tbody>{Array.from(rows, ([label, value]) => <tr key={label}><th scope="row">{label}</th><td>{value}</td></tr>)}</tbody></table></div>
  </section> : null
}
