import Vue from 'vue'
import VueRouter from 'vue-router'
import Cliente from '@/components/Cliente'
import Credito from "@/components/Credito";
import Home from '@/components/Home'

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home
    },
    {
        path: '/cliente',
        name: 'Cliente',
        component: Cliente
    },
    {
        path: '/analise',
        name: 'Credito',
        component: Credito
    }
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

export default router
