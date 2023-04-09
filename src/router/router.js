import { createRouter, createWebHashHistory } from "vue-router";
import isAuthenticatedGuard from './auth-guard'

// import AboutPage from "../modules/pokemon/pages/AboutPage"
// import ListPage from "../modules/pokemon/pages/ListPage"
// import PokemonPage from "../modules/pokemon/pages/PokemonPage"
// import NoPageFound from "../modules/shared/pages/NoPageFound"

// const routes = [
//     { path: '/', component: ListPage },
//     { path: '/about', component: AboutPage },
//     { path: '/id', component: PokemonPage },
//     { path: '/:pathMatch(.*)*', component: NoPageFound }
// ]

const routes = [
    // El comentario con el parámetro 'webpackChunkName' nos permite identificar
    // el archivo que se va a generar tras llamar la función de importación. La 
    // función se lanzará en el momento en que se requiera la página en cuestión
    {
        path: '/',
        redirect: '/pokemon'
    },

    {
        path: '/pokemon',
        name: 'pokemon',
        component: () => import(/* webpackChunkName: "PokemonLayout" */ '@/modules/pokemon/layouts/PokemonLayout'),
        // al pasar a ser hijas, las rutas pierden el slash inicial ya que necesitamos usar la ruta absoluta

        children: [
            { 
                // podemos dejar el path en blanco para indicar que esta es la ruta por defecto al entrar a pokemon
                // también podemos usar una redirección, que es la opción que finalmente hemos usado
                path: 'home', 
                name: 'pokemon-home', 
                component: () => import(/* webpackChunkName: "ListPage" */ '@/modules/pokemon/pages/ListPage') 
            },
            { 
                path: 'about',
                name: 'pokemon-about', 
                component: () => import(/* webpackChunkName: "AboutPage" */ '@/modules/pokemon/pages/AboutPage') 
            },
            { 
                path: 'pokemonid/:id', 
                name: 'pokemon-id',
                component: () => import(/* webpackChunkName: "PokemonPage" */ '@/modules/pokemon/pages/PokemonPage'),
                props: (route) => {
                    const id = Number(route.params.id)
                    return isNaN(id) ? { id: 1 } : { id } // Si no es un número se manda 1. En caso contrario, el id
                },
                 
            },
            // esta es la redirección de la que hablábamos en el comentario de arriba
            // la identificamos utilizando el nombre, así aunque cambien las rutas seguirá entrando a algún sitio
            {
                path: '',
                //name: 'redirect-pokemon-about',
                redirect: { name: 'pokemon-about' }
            }
        ]
    },

    // DBZ Layout
    {
        path: '/dbz',
        name: 'dbz',
        beforeEnter: [ isAuthenticatedGuard ],
        component: () => import(/* webpackChunkName: "DragonBallLayout" */ '@/modules/dbz/layouts/DragonBallLayout'),

        children: [
            { 
                path: 'characters', 
                name: 'dbz-characters', 
                component: () => import(/* webpackChunkName: "Characters" */ '@/modules/dbz/pages/Characters') 
            },
            { 
                path: 'about', 
                name: 'dbz-about', 
                component: () => import(/* webpackChunkName: "About" */ '@/modules/dbz/pages/About') 
            },
            {
                path: '',
                redirect: { name: 'dbz-characters' }
            }
        ]
    },
    
    { 
        path: '/:pathMatch(.*)*', 
        component: () => import(/* webpackChunkName: "NoPageFound" */ '@/modules/shared/pages/NoPageFound') 
        // redirect: '/home'
    }
]

const router = createRouter({
    history: createWebHashHistory(),
    routes, // short for `routes: routes`
})

// Guard Global - Síncrono
// router.beforeEach( (to, from, next) => {
//     console.log({ to, from, next })

//     const random = Math.random() * 100
//     if (random > 50) {
//         console.log('autenticado')
//         next()
//     } else {
//         console.log(random, 'bloqueado por el beforeEach Guard')
//         next({ name: 'pokemon-home' })
//     }
// })

// GuardGlobal - Asíncrono
// const canAccess = () => {
//     return new Promise( resolve => {
//         const random = Math.random() * 100
//         if (random > 50) {
//             console.log('Autenticado - canAccess')
//             resolve(true)
//         } else {
//             console.log(random, 'bloqueado por el beforeEach Guard - canAccess')
//             resolve(false)
//         }
//     })
// }

// router.beforeEach( async(to, from, next) => {
//     const authorized = await canAccess(to, from, next)

//     authorized
//         ? next()
//         : next({ name: 'pokemon-home' })
// })

export default router