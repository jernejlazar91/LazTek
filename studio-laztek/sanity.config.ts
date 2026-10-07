import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {schemaTypes} from './schemaTypes'
import {structure} from './structure'
import {singletonActions} from './singletonTypes'
import {PublishedPage} from './components/PublishedPage'
import {websitePages} from './schemaTypes/websitePages'

const editableCollections = new Set(['project','blogPost','galleryItem'])
const pageTypes = new Set(websitePages.map(page=>page.type))

export default defineConfig({
  name:'default', title:'LazTek – urejanje spletne strani',
  projectId:'h4oa3doy', dataset:'production',
  plugins:[structureTool({
    title:'Spletna stran', structure,
    defaultDocumentNode:(S,{schemaType})=>S.document().views(
      editableCollections.has(schemaType) || pageTypes.has(schemaType)
        ? [S.view.form().title('Urejanje'),S.view.component(PublishedPage).title('Odpri stran')]
        : [S.view.form().title('Urejanje')],
    ),
  })],
  schema:{types:schemaTypes},
  document:{
    newDocumentOptions:prev=>prev.filter(item=>editableCollections.has(item.templateId)),
    actions:(prev,{schemaType})=>pageTypes.has(schemaType)||schemaType==='siteSettings'
      ? prev.filter(({action})=>action && singletonActions.has(action)) : prev,
  },
})
