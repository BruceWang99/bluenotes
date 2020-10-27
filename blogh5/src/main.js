// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue/dist/vue';
import App from './App';
import router from './router';
import store from './store';
import ViewUI from 'view-design';
import iEditor from 'iview-editor';
import mavonEditor from 'mavon-editor';
import VueParticles from 'vue-particles';
import 'iview-editor/dist/iview-editor.css';
import './common/css/reset.css';
import 'mavon-editor/dist/css/index.css';
import infiniteScroll from 'vue-infinite-scroll';
import 'view-design/dist/styles/iview.css';

Vue.use(ViewUI);
Vue.use(iEditor);
Vue.use(mavonEditor);
Vue.use(VueParticles);
Vue.use(infiniteScroll);

Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>',
});
