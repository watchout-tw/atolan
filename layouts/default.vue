<template>
<main>
  <nav-bar :channel="channel" />
  <nuxt />
  <footer-standard />
  <modal-manager />
</main>
</template>

<script>
import { env } from 'watchout-common-assets'
import { knowsWindowManagement } from 'watchout-common-functions/interfaces'
import NavBar from 'watchout-common-functions/components/NavBar'
import FooterStandard from 'watchout-common-functions/components/FooterStandard'
import ModalManager from 'watchout-common-functions/components/ModalManager'

export default {
  mixins: [knowsWindowManagement],
  data() {
    return {
      channel: env.channels.uc
    }
  },
  components: {
    NavBar,
    FooterStandard,
    ModalManager
  }
}
</script>

<style lang="scss">
@import '~watchout-common-assets/styles/resources';
@import '~watchout-common-assets/styles/common';
</style>
