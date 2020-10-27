<template>
  <div class="avatar-wrapper" @click="toLogin">
    <div class="avatar">
      {{ capitalName }}
    </div>
    <Tag color="primary">{{ username }}</Tag>
  </div>
</template>

<script>
  import { mapState } from 'vuex'
  import { getDataByGet } from '../common/js/request.js'
  export default {
    name: 'Avatar',
    computed: {
      ...mapState(['username']),
      capitalName() {
        return this.username.substring(0, 1).toUpperCase()
      }
    },
    data() {
      return {
        currentUserName: '',
        isShow: false
      }
    },
    methods:{
      toLogin(){
        if(this.username === '未登录'){
          this.$router.replace('/login');
        }
      }
    }
  }
</script>

<style lang="stylus" scoped>
  @import '../common/stylus/variables.styl';
  .avatar-wrapper
    margin 30px 0
    display flex
    flex-flow column nowrap
    align-items center
    position relative
    height 80px
    cursor pointer
    .avatar
      background-color $theme-color
      width 40px
      height 40px
      border-radius 50%
      text-align center
      line-height 40px
      font-weight 700
      color $siderbar-bg-color
      margin-bottom 6px
    .ivu-tag
     margin 0
    .tag
      margin-top 10px
      position absolute
      left 50%
      transform translateX(-50%)
</style>