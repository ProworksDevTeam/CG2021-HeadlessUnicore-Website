// Server API makes it possible to hook into various parts of Gridsome
// on server-side and add custom data to the GraphQL data layer.
// Learn more: https://gridsome.org/docs/server-api/

// Changes here require a server restart.
// To restart press CTRL + C in terminal and run `gridsome develop`

function createVuePages(createPage, nodes) {
  nodes.forEach(function (node) {
    if (node && node._url && node._url.length && node._template && node._template.length) {
      const template = node._template[0].toUpperCase() + node._template.substring(1);
      createPage({
        path: `/${node._url.slice(1, -1)}`,
        component: `./src/templates/${template}.vue`,
        context: node
      })
    }
  });
}

module.exports = function (api) {
  api.loadSource(({ addCollection }) => {
    // Use the Data Store API here: https://gridsome.org/docs/data-store-api/
  })

  api.createPages(async ({ createPage, graphql }) => {
    // Use the Pages API here: https://gridsome.org/docs/pages-api/
    const { data } = await graphql(`
    query {
      cms {
        umbraco {
          content {
            byType {
              home { items { _id _level _name _sortOrder _template _url title showInMenu content { contentUdi content { ... on cms_BannerImagePublishedElement { _contentType { alias } title breakBeforeSection image { ... on cms_ImagePublishedMedia { _name _url } } } ... on cms_TextBlockPublishedElement { _contentType { alias } title breakBeforeSection content } } } } }
              contentPage { items { _id _level _name _sortOrder _template _url title showInMenu content { contentUdi content { ... on cms_BannerImagePublishedElement { _contentType { alias } title breakBeforeSection image { ... on cms_ImagePublishedMedia { _name _url } } } ... on cms_TextBlockPublishedElement { _contentType { alias } title breakBeforeSection content } } } } }
              search { items { _id _level _name _sortOrder _template _url title showInMenu foundResultsHeader noResultsHeader } }
            }
          }
        }
      }
    }`);

    var sets = data.cms.umbraco.content.byType;
    for (var child in sets) {
      var pageSet = sets[child];

      if (pageSet && pageSet.items && pageSet.items.length) createVuePages(createPage, pageSet.items);
    }
  })
}
