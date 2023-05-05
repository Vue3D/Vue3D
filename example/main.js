import {createApp} from 'vue'
import App from './App.vue'
import vue3d from "../src";
import router from "./router.js"

const app = createApp(App)

app.use(router)
app.use(vue3d)

app.mount('#app')
