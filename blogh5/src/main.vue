<template>
  <div>
    <sider-bar v-if="$route.name !=='Login' && $route.name !=='Blog' && $route.name !=='articleDetail'"></sider-bar>
    <vue-particles
        color="#dedede"
        :particleOpacity="0.7"
        :particlesNumber="80"
        shapeType="circle"
        :particleSize="4"
        linesColor="#dedede"
        :linesWidth="1"
        :lineLinked="true"
        :lineOpacity="0.4"
        :linesDistance="150"
        :moveSpeed="3"
        :hoverEffect="true"
        hoverMode="grab"
        :clickEffect="true"
        clickMode="push"
        class="particles"
      >
      </vue-particles>
      <router-view/>
  </div>
</template>

<script>
  import SiderBar from './components/SiderBar.vue'
  import { getDataByGet } from './common/js/request.js'
  import { mapState } from 'vuex'
  export default {
    name: 'App',
    components: {
      SiderBar
    },
    computed: {
      ...mapState(['isLogin'])
    },
    mounted(){
      console.log(this.$route)
    }
  }
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
