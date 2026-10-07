import type {StructureResolver} from 'sanity/structure'
import {websitePages} from './schemaTypes/websitePages'
import {PublishedPage} from './components/PublishedPage'

export const structure: StructureResolver = (S) => {
  const page = (path: string, title?: string) => {
    const item = websitePages.find(p=>p.path===path)!
    return S.listItem().title(title || item.title).child(
      S.document().schemaType(item.type).documentId(item.id).title(item.title)
        .views([S.view.form().title('Urejanje'),S.view.component(PublishedPage).title('Odpri stran')]),
    )
  }
  return S.list().title('LazTek – urejanje spletne strani').items([
    page('/'),
    S.listItem().title('Storitve').child(S.list().title('Storitve').items([
      page('/storitve','Pregled storitev'),
      ...websitePages.filter(p=>p.path.startsWith('/storitve/')).map(p=>page(p.path)),
    ])),
    page('/linex'),
    page('/materiali'),
    S.listItem().title('Projekti').child(S.list().title('Projekti').items([
      page('/projekti','Uvodna stran projektov'),
      ...websitePages.filter(p=>p.path.startsWith('/projekti/')).map(p=>page(p.path)),
      S.documentTypeListItem('project').title('Drugi projekti / dodaj nov projekt').child(
        S.documentTypeList('project').title('Drugi projekti').filter('_type == "project" && !(slug.current in $slugs)')
          .params({slugs:websitePages.filter(p=>p.path.startsWith('/projekti/')).map(p=>p.path.split('/').pop())})
          .defaultOrdering([{field:'publishedAt',direction:'desc'}]),
      ),
    ])),
    S.listItem().title('Galerija').child(S.list().title('Galerija').items([
      page('/galerija','Uvodna stran galerije'),
      S.documentTypeListItem('galleryItem').title('Fotografije in videi').child(S.documentTypeList('galleryItem').title('Fotografije in videi').defaultOrdering([{field:'sortOrder',direction:'asc'}])),
    ])),
    S.listItem().title('Članki').child(S.list().title('Članki').items([
      page('/blog','Uvodna stran člankov'),
      S.documentTypeListItem('blogPost').title('Članki / dodaj članek').child(S.documentTypeList('blogPost').title('Članki').defaultOrdering([{field:'publishedAt',direction:'desc'}])),
    ])),
    page('/o-podjetju'),
    page('/kontakt'),
    S.divider(),
    S.listItem().title('Podatki podjetja').child(S.document().schemaType('siteSettings').documentId('siteSettings').title('Podatki podjetja')),
    page('/politika-zasebnosti'),
  ])
}
