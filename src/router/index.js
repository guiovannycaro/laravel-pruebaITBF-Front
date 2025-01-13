import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const routes = [{
        path: '/',
        name: 'home',
        component: HomeView
    },
    {
        path: '/about',
        name: 'about',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () =>
            import ( /* webpackChunkName: "about" */ '../views/AboutView.vue')
    },
    {
        path: '/hoteles',
        name: 'hoteles',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () =>
            import ( /* webpackChunkName: "about" */ '../views/SGH/Hoteles/HotelesView.vue')
    },
    {
        path: '/hotelesCrear',
        name: 'hotelesCrear',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () =>
            import ( /* webpackChunkName: "about" */ '../views/SGH/Hoteles/Crud/CrearView.vue')
    },
    {
        path: '/hotelesEdit/:idhotel', // Use dynamic segment for idhotel
        name: 'hotelesEdit',
        component: () =>
            import ( /* webpackChunkName: "hotelesEdit" */ '../views/SGH/Hoteles/Crud/EditarView.vue'),
    },
    {
        path: '/hotelesDetalle/:idhotel',
        name: 'hotelesDetalle',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () =>
            import ( /* webpackChunkName: "about" */ '../views/SGH/Hoteles/Crud/DetalleView.vue')
    },
    {
        path: '/habitaciones',
        name: 'habitaciones',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () =>
            import ( /* webpackChunkName: "about" */ '../views/SGH/Hoteles/habitaciones/AsignarView.vue')
    },


    {
        path: '/reservas',
        name: 'reservas',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () =>
            import ( /* webpackChunkName: "about" */ '../views/SGH/Reservas/ReservasView.vue')
    }
]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
})

export default router