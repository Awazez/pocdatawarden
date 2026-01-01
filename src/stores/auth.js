import { defineStore } from 'pinia'
import { supabase } from '@/lib/supabase'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null,
    loading: true
  }),

  actions: {
    async init() {
      console.log('🔧 Auth init démarré...')
      
      const { data } = await supabase.auth.getSession()
      this.user = data.session?.user || null
      this.loading = false
      
      console.log('✅ Auth init terminé:', this.user ? 'Connecté' : 'Non connecté')
      
      supabase.auth.onAuthStateChange((_event, session) => {
        console.log('🔄 Auth state changed:', session?.user ? 'Connecté' : 'Déconnecté')
        this.user = session?.user || null
      })
    },

    async logout() {
      await supabase.auth.signOut()
      this.user = null
    }
  }
})
