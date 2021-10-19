// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import { codemirror } from 'vue-codemirror'
import 'codemirror/lib/codemirror.css'
import jsonlint from 'jsonlint'
import 'xe-utils'
import VXETable from 'vxe-table'
import 'vxe-table/lib/style.css'
Vue.use(codemirror)
Vue.config.productionTip = false
Vue.use(ElementUI)
Vue.use(VXETable)
window.jsonlint = jsonlint // 全局化
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
