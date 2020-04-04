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

/*
Vanilla js and css imports
*/
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

// Add mutli-element remove function to array
Array.prototype.remove = function(){
  let args = Array.apply(null, arguments);
  let indices = [];
  for(let i = 0; i < args.length; i++){
      let arg = args[i];
      let index = this.indexOf(arg);
      while(index > -1){
          indices.push(index);
          index = this.indexOf(arg, index + 1);
      }
  }
  indices.sort();
  for(let i = 0; i < indices.length; i++){
      let index = indices[i] - i;
      this.splice(index, 1);
  }    
}

/* eslint-disable no-new */
Vue.config.productionTip = false

export const bus = new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App),
  components: { App }
})