// This is where project configuration and plugin options are located.
// Learn more: https://gridsome.org/docs/config

// Changes here require a server restart.
// To restart press CTRL + C in terminal and run `gridsome develop`

module.exports = {
  siteName: 'CodeGarden2021 Headless Unicore',
  siteUrl: 'https://cg2021-headless-unicore.azurewebsites.net',
  plugins: [{
    use: '@gridsome/source-graphql',
    options: {
      url: process.env.GRIDSOME_API_BACKEND_URL + '/umbraco/graphql',
      fieldName: 'cms',
      typeName: ''
    }
  }]
}
