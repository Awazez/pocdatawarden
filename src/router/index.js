import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

// Website
import WebsiteHome from '@/views/Website/Home.vue'

// Auth (LOGIN + REGISTER FUSIONNÉS)
import Auth from '@/views/Auth/Auth.vue'

// App
import AppLayout from '@/components/App/Layout/AppLayout.vue'
import Overview from '@/views/App/Dashboard/Overview.vue'
import Servers from '@/views/App/Dashboard/Servers.vue'
import ServerDetail from '@/views/App/Dashboard/ServerDetail.vue'
import Profile from '@/views/App/Settings/Profile.vue'

const routes = [
  // Website
  {
    path: '/',
    name: 'Home',
    component: WebsiteHome
  },

  // Auth (public)
  {
    path: '/auth',
    name: 'Auth',
    component: Auth,
    meta: { guest: true }
  },

  // App (protected)
  {
    path: '/app',
    component: AppLayout,
    meta: { requiresAuth: true },
    children: [
      { path: '', redirect: '/app/dashboard' },
      { path: 'dashboard', name: 'Dashboard', component: Overview },
      { path: 'servers', name: 'Servers', component: Servers },
      { path: 'servers/:id', name: 'ServerDetail', component: ServerDetail },
      { path: 'settings/profile', name: 'Profile', component: Profile }
    ]
  },

  // Nettoyage anciens chemins
  { path: '/login', redirect: '/auth' },
  { path: '/register', redirect: '/auth' }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

/**
 * 🔐 GUARD GLOBAL — SOURCE DE VÉRITÉ AUTH
 */
router.beforeEach(async (to, from, next) => {
  const auth = useAuthStore()

  // Si l'auth est en cours de chargement, attendre qu'elle se termine
  if (auth.loading) {
    // Attendre que l'init soit terminé
    while (auth.loading) {
      await new Promise(resolve => setTimeout(resolve, 50))
    }
  }

  const isAuthenticated = !!auth.user
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth)
  const isGuestRoute = to.matched.some(record => record.meta.guest)

  // Route protégée mais pas connecté
  if (requiresAuth && !isAuthenticated) {
    next('/auth')
    return
  }

  // Page d'auth mais déjà connecté
  if (isGuestRoute && isAuthenticated) {
    next('/app/dashboard')
    return
  }

  next()
})

export default router
