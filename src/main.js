import { createApp } from 'vue'

import moment from 'moment';
import VCalendar from 'v-calendar';
import vClickOutside from "click-outside-vue3"

import App from './App.vue'
import router from './router'
import store from "./store";


require('./assets/scss/index.scss')


let app = createApp(App)

app.config.globalProperties.$moment = moment;
app
.use(VCalendar, {})
.use(store)
.use(vClickOutside)
.use(router)
.mount('#app')
