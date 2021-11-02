import * as firestore from 'watchout-common-functions/lib/firestore'
import * as util from 'watchout-common-functions/lib/util'
import * as watchout from 'watchout-common-functions/lib/watchout'
import config from 'watchout-common-functions/config/config'
const info = require('./data/info')

function getFavicon(projectID) {
  return 'https://raw.githubusercontent.com/watchout-tw/watchout-common-assets/master/images/logo/' + projectID + '/small.png'
}
function getProjectLogo(projectID) {
  return 'https://raw.githubusercontent.com/watchout-tw/watchout-common-assets/master/images/logo/' + projectID + '/large.png'
}

async function getSitemap() {
  let routes = []
  let pubDest = info.CHANNEL_ID
  await firestore.sys.init({})
  let docs = await firestore.bunko.getDocs({ pubDest, limit: -1 })
  routes = routes.concat(docs.map(doc => {
    return {
      url: `/read/${doc.id}`,
      changefreq: 'monthly',
      lastmod: util.fsTSToDateObj(doc.contentUpdatedAt || doc.publishedAt)
    }
  }))
  let latestDoc = docs.reduce((prev, curr) => {
    return util.fsTSCompare(prev.contentUpdatedAt || prev.publishedAt, curr.contentUpdatedAt || curr.publishedAt) > 0 ? prev : curr
  })

  return {
    hostname: watchout.getBaseURL('uc'),
    gzip: true,
    exclude: [],
    defaults: {
      changefreq: 'weekly',
      lastmod: util.fsTSToDateObj(latestDoc.contentUpdatedAt || latestDoc.publishedAt)
    },
    routes: routes
  }
}

function getMeta() {
  let meta = [
    { charset: 'utf-8' },
    { name: 'viewport', content: 'width=device-width, initial-scale=1' },
    { hid: 'description', name: 'description', content: info.SITE_DESCRIPTION }
  ]
  if(config.env !== 'production') {
    meta.push({ name: 'robots', content: 'noindex' })
  }
  return meta
}

module.exports = {
  head: {
    title: info.SITE_TITLE,
    meta: getMeta(),
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
    ]
  },
  plugins: [
    '~/plugins/firestore.js'
  ],
  modules: [
    '@nuxtjs/gtm',
    '@nuxtjs/robots',
    '@nuxtjs/sitemap'
  ],
  gtm: {
    id: 'GTM-TTFPLQ3'
  },
  robots: {
    UserAgent: '*',
    Allow: '/', // accepts function
    Sitemap: watchout.getBaseURL('uc')
  },
  sitemap: async function() {
    return await getSitemap()
  }
  // NOTE: Add Markdown loader <https://github.com/nuxt/nuxt.js/issues/1072>
}
