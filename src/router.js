import PasswordGenerator from './components/PasswordGenerator.vue'
import {createRouter, createWebHistory} from 'vue-router'

const routes = [
    {path: '/', redirect: '/lang_EN'},
    {path: '/lang_:lang?', component: PasswordGenerator},

]
export default createRouter({
    history: createWebHistory(),
    routes
})
