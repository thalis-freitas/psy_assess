import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { createVuestic } from 'vuestic-ui'
import 'vuestic-ui/css'
import 'material-design-icons-iconfont/dist/material-design-icons.min.css'
import './index.css'

const app = createApp(App)

app.use(router)

app.use(createVuestic({
  config: {
    colors: {
      variables: {
        primary: '#242258',
        secondary: '#7777ff'
      },
    },
  },
}))

app.mount('#app')
