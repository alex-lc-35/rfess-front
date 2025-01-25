import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { setupFontAwesome } from './plugins/fontawesome'
import App from './App.vue'
import router from './router'

import 'leaflet/dist/leaflet.css'
import './assets/app.css'

const app = createApp(App)
setupFontAwesome(app)

app.use(router)
app.use(createPinia())
app.mount('#app')
