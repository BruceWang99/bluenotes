<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
import SiderBar from '@/components/SiderBar.vue';
import { getDataByGet } from '@/common/js/request.js';
import { mapState } from 'vuex';
export default {
  name: 'App',
  components: {
    SiderBar,
  },
  computed: {
    ...mapState(['isLogin']),
  },
  mounted() {},
};
</script>

<style lang="stylus">
html, body, #app
  height 100%

.particles
  z-index -100
  position absolute
  left 0
  top 0
  bottom 0
  right 0
</style>
