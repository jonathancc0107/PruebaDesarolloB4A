import Vue from 'vue'
import App from './App.vue'
import router from './router'
import Parse from 'parse'
Vue.use(Parse)

Vue.config.productionTip = false

// var Parse = require('parse/node');

Parse.initialize("fznfFD6q0jAEdKMYKF5VF8Fz4tdWJUnd8uo72DSg","GKbretzIa8gzbsRCn5Tbl22YKbrQBxGy4twOY02s"); //PASTE HERE YOUR Back4App APPLICATION ID AND YOUR JavaScript KEY
Parse.serverURL = 'https://parseapi.back4app.com/'

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
