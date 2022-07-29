import {createApp} from 'vue'
import App from './App.vue'
import vue3d from "@vue3d";

const app = createApp(App)
app.use(vue3d)
app.mount('#app')
