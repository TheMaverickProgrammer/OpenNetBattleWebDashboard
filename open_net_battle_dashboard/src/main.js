import Vue from 'vue'
import App from './App.vue'
import router  from './router'
import store from './store/'

// API handles Open Net Battle Web Data API requests and interfaces directly with the store
import api from './api/'
Vue.use(api, {store});

// This imports all the layout components such as <b-container>, <b-row>, <b-col>:
import { LayoutPlugin } from 'bootstrap-vue'
Vue.use(LayoutPlugin)

// This imports <b-modal> as well as the v-b-modal directive as a plugin:
import { ModalPlugin } from 'bootstrap-vue'
Vue.use(ModalPlugin)

// This imports <b-card> along with all the <b-card-*> sub-components as a plugin:
import { CardPlugin } from 'bootstrap-vue'
Vue.use(CardPlugin)

// This imports directive v-b-scrollspy as a plugin:
import { VBScrollspyPlugin } from 'bootstrap-vue'
Vue.use(VBScrollspyPlugin)

// This imports the dropdown and table plugins
import { DropdownPlugin, TablePlugin } from 'bootstrap-vue'
Vue.use(DropdownPlugin)
Vue.use(TablePlugin)

import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
Vue.use(BootstrapVue);
Vue.use(IconsPlugin);

import VueScreenSize from 'vue-screen-size'
Vue.use(VueScreenSize);

/*
Vanilla js and css imports
*/
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

/* eslint-disable no-new */
Vue.config.productionTip = false

export const bus = new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App),
  components: { App }
})

Array.prototype.duplicates = function() {
  var len=this.length,
      out=[],
      counts={};

  for (var i=0;i<len;i++) {
    var item = this[i];
    counts[item] = counts[item] >= 1 ? counts[item] + 1 : 1;
    if (counts[item] === 2) {
      out.push(item);
    }
  }

  return out;
}

Array.prototype.unique = function() {
  return [...new Set(this)];
}