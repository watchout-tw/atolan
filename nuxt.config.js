const nodeExternals = require('webpack-node-externals')
function getFavicon(projectID) {
  return 'https://raw.githubusercontent.com/watchout-tw/watchout-common-assets/master/images/logo/' + projectID + '/small.png'
}
function getProjectLogo(projectID) {
  return 'https://raw.githubusercontent.com/watchout-tw/watchout-common-assets/master/images/logo/' + projectID + '/large.png'
}
module.exports = {
  head: {
    title: '沃草公民學院',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { name: 'description', content: '沃草公民學院是⋯', hid: 'description' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: getFavicon('uc') },
      { rel: 'apple-touch-icon', sizes: '256x256', href: getProjectLogo('uc') }
    ]
  },
  loading: {
    color: '#A4DB56',
    height: '4px'
  },
  build: {
    vender: ['axios', 'vuex'],
    transpile: [
      'watchout-common-assets',
      'watchout-common-functions'
    ],
  },
  plugins: [
    '~/plugins/firestore.js'
  ],
  modules: [
    '@nuxtjs/gtm',
  ],
  gtm: {
    id: 'GTM-TTFPLQ3'
  },
  // NOTE: Add Markdown loader <https://github.com/nuxt/nuxt.js/issues/1072>
}
