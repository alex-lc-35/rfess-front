import { library } from '@fortawesome/fontawesome-svg-core'
import { faFacebook, faInstagram, faXTwitter } from '@fortawesome/free-brands-svg-icons'
import { faGlobe, faPen } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { App } from 'vue'

export function setupFontAwesome(app: App) {
  library.add(faFacebook, faInstagram, faXTwitter)
  library.add(faGlobe, faPen)
  app.component('FontAwesomeIcon', FontAwesomeIcon)
}