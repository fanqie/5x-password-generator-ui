import {createApp} from "vue";
import './style.css'
import { createI18n } from 'vue-i18n'
import App from './App.vue'
import lang from './assets/lang/'
import './assets/scss/index.scss'
import ElementPlus from 'element-plus'

// import 'element-plus/theme-chalk/src/index.scss'

import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import router from './router.js'

/*---------挂载全局使用-----------*/
const i18n = createI18n ({
    locale: 'ZH-CN', // 语言标识
    legacy: false, // composition API
    messages:lang
});

const app=createApp(App)

app.use(i18n)
app.use(router)
app.use(ElementPlus)
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
}
app.mount('#app')

