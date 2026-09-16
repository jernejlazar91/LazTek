import type {StructureResolver} from 'sanity/structure'

export const structure: StructureResolver = (S) =>
  S.list()
    .title('LazTek vsebina')
    .items([
      S.listItem()
        .title('Osnovne nastavitve')
        .child(S.document().schemaType('siteSettings').documentId('siteSettings')),

      S.divider(),

      S.listItem()
        .title('Strani')
        .child(
          S.list()
            .title('Strani')
            .items([
              S.listItem()
                .title('Domov')
                .child(S.document().schemaType('homePage').documentId('homePage')),
              S.listItem()
                .title('Storitve - pregled')
                .child(S.document().schemaType('serviceSection').documentId('serviceSection')),
              S.listItem()
                .title('Strani storitev')
                .child(
                  S.documentTypeList('servicePage')
                    .title('Strani storitev')
                    .defaultOrdering([{field: 'title', direction: 'asc'}]),
                ),
              S.listItem()
                .title('Materiali - uvod')
                .child(S.document().schemaType('materialsSection').documentId('materialsSection')),
              S.listItem()
                .title('LINEX')
                .child(S.document().schemaType('linexPage').documentId('linexPage')),
              S.listItem()
                .title('O podjetju')
                .child(S.document().schemaType('aboutSection').documentId('aboutSection')),
              S.listItem()
                .title('Kontakt')
                .child(S.document().schemaType('contactSection').documentId('contactSection')),
            ]),
        ),

      S.listItem()
        .title('Materiali')
        .child(
          S.documentTypeList('materialGroup')
            .title('Materialne skupine')
            .defaultOrdering([{field: 'sortOrder', direction: 'asc'}]),
        ),

      S.listItem()
        .title('Projekti')
        .child(
          S.documentTypeList('project')
            .title('Projekti / case studies')
            .defaultOrdering([{field: 'publishedAt', direction: 'desc'}]),
        ),

      S.listItem()
        .title('Galerija')
        .child(
          S.documentTypeList('galleryItem')
            .title('Galerija')
            .defaultOrdering([{field: 'sortOrder', direction: 'asc'}]),
        ),

      S.listItem()
        .title('Blog')
        .child(
          S.documentTypeList('blogPost')
            .title('Blog objave')
            .defaultOrdering([{field: 'publishedAt', direction: 'desc'}]),
        ),

      S.divider(),

      S.listItem()
        .title('Stare sekcije / arhiv homepagea')
        .child(
          S.list()
            .title('Stare sekcije')
            .items([
              S.listItem()
                .title('3D tisk - stara sekcija')
                .child(S.document().schemaType('printingSection').documentId('printingSection')),
              S.listItem()
                .title('Industrijska platforma - stara sekcija')
                .child(S.document().schemaType('platformSection').documentId('platformSection')),
              S.listItem()
                .title('Konstruiranje in razvoj - stara sekcija')
                .child(S.document().schemaType('engineeringSection').documentId('engineeringSection')),
              S.listItem()
                .title('3D skeniranje - stara sekcija')
                .child(S.document().schemaType('scanningSection').documentId('scanningSection')),
              S.documentTypeListItem('serviceItem').title('Kartice storitev'),
            ]),
        ),
    ])
