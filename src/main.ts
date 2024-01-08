import './scss/style.scss'

import { createApp } from 'vue'
import PrimeVue from 'primevue/config'
import App from './App.vue'
import router from './router'
import Tooltip from 'primevue/tooltip'

const app = createApp(App)

app.use(PrimeVue)

app.use(router)

app.directive('tooltip', Tooltip)

app.mount('#app')
