<template>
  <div class="login">
    <div class="login-container">
      <div class="login-register-wrapper">
        <Collapse v-model="collapseValue" accordion>
          <Panel name="1">
            创建账户
            <p slot="content">
              <Form ref="login" :model="register" :rules="registerRule" inline>
                <FormItem prop="user_name">
                  <Input class="input-username" type="text" v-model="register.user_name" placeholder="用户名">
                  <Icon type="ios-person-outline" slot="prepend"></Icon>
                  </Input>
                </FormItem>
                 <FormItem prop="email">
                  <Input class="input-username" type="text" v-model="register.email" placeholder="邮箱">
                  <Icon type="ios-person-outline" slot="prepend"></Icon>
                  </Input>
                </FormItem>
                <FormItem prop="password">
                  <Input class="input-password" type="password" v-model="register.password" placeholder="密码" @on-enter="onRegister">
                  <Icon type="ios-locked-outline" slot="prepend"></Icon>
                  </Input>
                </FormItem>
                <FormItem>
                  <div class="button-group">
                    <Button @click="onRegister" class="login-button" type="primary" style="margin-right: 10px;">注册</Button>
                    <Button @click="registerCancel" class="cancel-button" type="error">取消</Button>
                  </div>
                </FormItem>
              </Form>
            </p>
          </Panel>
          <Panel name="2">
            登陆
            <p slot="content">
              <Form ref="login" :model="login" :rules="loginRule" inline>
                <FormItem prop="user_name">
                  <Input class="input-username" type="text" v-model="login.user_name" placeholder="用户名">
                  <Icon type="ios-person-outline" slot="prepend"></Icon>
                  </Input>
                </FormItem>
                <FormItem prop="password">
                  <Input class="input-password" type="password" v-model="login.password" placeholder="密码" @on-enter="onLogin">
                  <Icon type="ios-locked-outline" slot="prepend"></Icon>
                  </Input>
                </FormItem>
                <FormItem>
                  <div class="button-group">
                    <Button @click="onLogin" class="login-button" type="primary" style="margin-right: 10px;">登陆</Button>
                    <Button @click="loginCancel" class="cancel-button" type="error">取消</Button>
                  </div>
                </FormItem>
              </Form>
            </p>
          </Panel>
        </Collapse>
      </div>
    </div>
  </div>
</template>

<script>
  import Cookies from 'js-cookie';
  import { getDataByPost, getDataByGet } from '../../common/js/request.js'
  import { API_LOGIN, API_REGISTER } from '../../common/js/apis.js'

  export default {
    name: 'Login',
    data() {
      return {
        carouselValue: 0,
        collapseValue: "2",
        autoplaySpeed: 5000,
        login: {
          user_name: '',
          password: ''
        },
        register: {
          user_name: '',
          email: '',
          password: '',
        },
        loginRule: {
          user_name: [{
            required: true,
            message: '用户名不能为空',
            trigger: 'blur'
          }],
          password: [{
              required: true,
              message: '密码不能为空.',
              trigger: 'blur'
            },
            {
              type: 'string',
              min: 3,
              max: 15,
              message: ' 密码长度应在3-15之间',
              trigger: 'blur'
            }
          ]
        },
        registerRule: {
          user_name: [{
            required: true,
            message: '用户名不能为空',
            trigger: 'blur'
          }],
          email: [{
            required: true,
            message: '邮箱不能为空',
            trigger: 'blur'
          }],
          password: [{
            required: true,
            message: '密码不能为空.',
            trigger: 'blur'
          }]
        }
      }
    },
    methods: {
      onLogin() {
        getDataByPost(API_LOGIN, {
          user_name: this.login.user_name,
          password: this.login.password
        }).then(({ data }) => {
          this.$Message.success(data.msg)
          console.log('data', data)
          this.$store.commit('setUsername', data.data.user_name)
          this.$store.commit('setUser', data.data)
          localStorage.setItem('username', data.data.user_name);
          localStorage.setItem('token', data.data.token);
          localStorage.setItem('userid', data.data.user_id);

          this._clearLogin()
          this.$router.push({
            name: 'Note'
          })          
        })
      },
      onRegister() {
        getDataByPost(API_REGISTER, {
          user_name: this.register.user_name,
          email: this.register.email,
          password: this.register.password
        }).then(({data}) => {
          this.$Message.success('注册成功');
          this._clearRegister()
        }).catch(err => {
          this.$Message.error('注册失败')
        })
      },
      loginCancel() {
        this._clearLogin()
        this.$Message.error('取消登陆');
      },
      registerCancel() {
        this._clearRegister()
        this.$Message.error('取消注册')
      },
      _clearLogin() {
        this.login.user_name = ''
        this.login.password = ''
      },
      _clearRegister() {
        this.register.user_name = ''
        this.register.password = ''
        this.register.email = ''
      }
    }
  }
</script>

<style lang="stylus" scoped>
  @import '../../common/stylus/variables.styl';
  .login >>> .ivu-collapse-header
    color $theme-text-color
    background-color #fff

  .input-username, .input-password
    width 230px
    margin-bottom 10px
  .button-group
    width 220px
    text-align center

  .login
    width 100%
    height 100%
    // background-color $mask-color
    z-index 100
    .login-container
      display flex
      flex-flow wrap
      width 700px
      height 400px
      position absolute
      left 50%
      top 40%
      transform translate(-50%, -50%)
      .carousel-wrapper
        width 430px
        height 100%
        background-color $theme-color
        border-radius 4px 0 0 4px
        img
          width 310px
          height 400px
          border-radius 4px
          position relative
          left 60px
          padding 10px 0
      .login-register-wrapper
        width 270px
        height 100%
        margin 0 auto
        background-color #fff
        border-radius 0 4px 4px 0
</style>
