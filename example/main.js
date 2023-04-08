import {createApp} from 'vue'
import App from './App.vue'
import vue3d from "../src";

const app = createApp(App)
app.use(vue3d)
app.mount('#app')
