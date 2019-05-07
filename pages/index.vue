<template>
<div class="page index">
  <div class="tcl-container">
    <div class="tcl-panel full-width with-padding">
      <no-ssr><welcome /></no-ssr>
    </div>
  </div>
  <div class="docs first-doc margin-top-bottom-8">
    <reference-preview :reference="docRefs[0]" :data="dataOnReferences" display="tcl" :show-pub-dest="true" :cachedAuthors="cachedAuthors" />
  </div>
  <div class="docs tcl-container margin-top-bottom-4">
    <div class="doc tcl-panel tcl-left-right-margin with-top-bottom-margin" :class="{ 'half-width': index >= 4 }" v-for="(docRef, index) of docRefs" :key="index" v-if="index > 0">
      <reference-preview :reference="docRef" :data="dataOnReferences" display="vertical" :show-pub-dest="true" :cachedAuthors="cachedAuthors" />
    </div>
    <div class="tcl-panel half-width"></div>
    <div class="tcl-panel half-width"></div>
    <div class="tcl-panel half-width"></div>
  </div>
</div>
</template>

<script>
import * as firestore from 'watchout-common-functions/lib/firestore'
import * as info from '~/data/info'
import { knowsCaching, knowsWatchout } from 'watchout-common-functions/interfaces'
import { makeReference } from 'watchout-common-functions/lib/watchout'
import Welcome from 'watchout-common-functions/components/Welcome'
import ReferencePreview from 'watchout-common-functions/components/ReferencePreview'
import defaultCoverImage from 'watchout-common-assets/images/default-cover-images/uc-2-1.jpg'

export default {
  mixins: [knowsCaching, knowsWatchout],
  async asyncData() {
    // get docs with pub-dest uc
    let docs = await firestore.bunko.getDocs({ pubDest: 'uc' })
    let docRefs = docs.map(doc => makeReference('doc', doc.id, { publishedTo: doc.publishedTo }))
    let dataOnReferences = {}
    for(let i = 0; i < docRefs.length; i++) {
      dataOnReferences[docRefs[i].url] = docs[i]
    }

    return {
      docRefs,
      dataOnReferences
    }
  },
  head() {
    let pageTitle = info.SITE_TITLE
    let pageDescription = info.SITE_DESCRIPTION
    return {
      title: pageTitle,
      meta: this.generateMeta('uc', pageTitle, pageDescription, defaultCoverImage)
    }
  },
  methods: {
    getModule(id) {
      return this.modules.find(module => module.id === id)
    }
  },
  components: {
    Welcome,
    ReferencePreview
  }
}
</script>
