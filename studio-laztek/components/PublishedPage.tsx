import type {SanityDocument} from 'sanity'

type Props = {document: {displayed: SanityDocument | null}}
export function PublishedPage({document}:Props) {
  const item=document.displayed
  if(!item) return <p>Najprej odpri vsebino.</p>
  const slug=typeof item.slug==='object'&&item.slug!==null&&'current' in item.slug ? String(item.slug.current||'') : ''
  const prefixes:Record<string,string>={project:'/projekti/',blogPost:'/blog/'}
  const path=typeof item.path==='string' ? item.path : item._type==='galleryItem' ? '/galerija/'+encodeURIComponent(item._id.replace(/^drafts\./,'')) : prefixes[item._type]&&slug ? prefixes[item._type]+encodeURIComponent(slug) : ''
  return <div style={{padding:24,maxWidth:700,lineHeight:1.6}}>
    <h2>{String(item.title||'Pregled objave')}</h2>
    <p>Spremembe se shranjujejo kot osnutek. Z gumbom Publish jih objaviš.</p>
    {path && <>
      <p><a href={'https://laztek.si'+path} target="_blank" rel="noopener noreferrer">Odpri stran na laztek.si ↗</a></p>
      <p><a href={'http://localhost:3000'+path} target="_blank" rel="noopener noreferrer">Odpri lokalno stran ↗</a></p>
    </>}
    <p>Povezavi prikažeta objavljeno vsebino. Po objavi lahko osvežitev traja približno minuto in naslednji obisk strani.</p>
  </div>
}
