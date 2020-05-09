import Vue from 'vue'
import App from './App'
import api from '@/common/vmeitime-http/'
import isVip from '@/common/vip/vip.js'
import HeadLogo from '@/common/headLogo/HeadLogo'
import VipLevel from '@/common/vipLevel/vipLevel'
import VipNumber from '@/common/vipNumber'
import Url from "@/static/utils.js"
Vue.config.productionTip = false
Vue.prototype.$url = Url
Vue.prototype.$api = api
Vue.prototype.$vip = isVip
Vue.component('head-logo', HeadLogo)
Vue.component('level', VipLevel)
Vue.component('vip', VipNumber)
App.mpType = 'app'

const app = new Vue({
    ...App
})
app.$mount()
