<template>
  <div class="dashboard">
    <h2>Welcome back, {{ userName }}! 👋</h2>
    <p class="subtitle">Here's what's happening with your infrastructure today.</p>

    <!-- Loading state -->
    <div v-if="loading" class="loading-state">
      <div class="spinner">Loading your servers...</div>
    </div>

    <template v-else>
      <div class="stats-grid">
        <div class="stat-card">
          <div class="stat-icon">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#40FBDC" stroke-width="2">
              <rect x="2" y="2" width="20" height="8" rx="2"/>
              <rect x="2" y="14" width="20" height="8" rx="2"/>
            </svg>
          </div>
          <div class="stat-info">
            <div class="stat-value">{{ activeServersCount }}</div>
            <div class="stat-label">Active Servers</div>
          </div>
        </div>

        <div class="stat-card">
          <div class="stat-icon">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#40FBDC" stroke-width="2">
              <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>
            </svg>
          </div>
          <div class="stat-info">
            <div class="stat-value">{{ totalBandwidth }}</div>
            <div class="stat-label">Total Bandwidth</div>
          </div>
        </div>

        <div class="stat-card">
          <div class="stat-icon">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#40FBDC" stroke-width="2">
              <line x1="12" y1="1" x2="12" y2="23"/>
              <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>
            </svg>
          </div>
          <div class="stat-info">
            <div class="stat-value">€{{ monthlyCost }}</div>
            <div class="stat-label">Monthly Cost</div>
          </div>
        </div>

        <div class="stat-card">
          <div class="stat-icon">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#40FBDC" stroke-width="2">
              <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/>
              <polyline points="17 6 23 6 23 12"/>
            </svg>
          </div>
          <div class="stat-info">
            <div class="stat-value">{{ uptime }}%</div>
            <div class="stat-label">Uptime</div>
          </div>
        </div>
      </div>

      <div class="quick-actions">
        <h3>Quick Actions</h3>
        <div class="actions-grid">
          <button class="action-btn" @click="createServer">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <line x1="12" y1="5" x2="12" y2="19"/>
              <line x1="5" y1="12" x2="19" y2="12"/>
            </svg>
            <span>Create Server</span>
          </button>
          <button class="action-btn" @click="viewServers">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <rect x="2" y="7" width="20" height="14" rx="2"/>
              <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/>
            </svg>
            <span>View All Servers</span>
          </button>
          <button class="action-btn" @click="openDocumentation">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/>
              <polyline points="14 2 14 8 20 8"/>
            </svg>
            <span>Documentation</span>
          </button>
        </div>
      </div>
    </template>
  </div>
</template>

<script>
import { ref, computed, onMounted } from 'vue'
import { useAuthStore } from '@/stores/auth'
import { useRouter } from 'vue-router'
import { supabase } from '@/lib/supabase'

export default {
  name: 'Overview',

  setup() {
    const auth = useAuthStore()
    const router = useRouter()
    const user = computed(() => auth.user)
    
    const servers = ref([])
    const loading = ref(true)

    const userName = computed(() => {
      const firstName = user.value?.user_metadata?.first_name
      if (firstName) return firstName
      return user.value?.email?.split('@')[0] || 'there'
    })

    const activeServersCount = computed(() => {
      return servers.value.filter(s => s.status === 'active').length
    })

    const totalBandwidth = computed(() => {
      const total = servers.value.reduce((sum, s) => sum + (s.bandwidth_used || 0), 0)
      if (total >= 1000) {
        return `${(total / 1000).toFixed(1)} TB`
      }
      return `${total} GB`
    })

    const monthlyCost = computed(() => {
      const total = servers.value.reduce((sum, s) => sum + parseFloat(s.monthly_cost || 0), 0)
      return total.toFixed(2)
    })

    const uptime = computed(() => {
      // TODO: Calculer le vrai uptime depuis les metrics
      return '99.9'
    })

    const loadServers = async () => {
      loading.value = true
      try {
        const { data, error } = await supabase
          .from('servers')
          .select('*')
          .eq('user_id', user.value.id)
          .order('created_at', { ascending: false })

        if (error) throw error
        
        servers.value = data || []
        console.log('✅ Servers loaded:', servers.value)
      } catch (err) {
        console.error('❌ Error loading servers:', err)
      } finally {
        loading.value = false
      }
    }

    const createServer = () => {
      router.push('/app/servers')
    }

    const viewServers = () => {
      router.push('/app/servers')
    }

    const openDocumentation = () => {
      window.open('https://docs.almerson.com', '_blank')
    }

    onMounted(() => {
      if (user.value) {
        loadServers()
      }
    })

    return {
      userName,
      loading,
      activeServersCount,
      totalBandwidth,
      monthlyCost,
      uptime,
      createServer,
      viewServers,
      openDocumentation
    }
  }
}
</script>

<style scoped>
.dashboard h2 {
  font-size: 28px;
  font-weight: 800;
  color: #fff;
  margin-bottom: 8px;
}

.subtitle {
  font-size: 16px;
  color: rgba(255, 255, 255, 0.6);
  margin-bottom: 32px;
}

.loading-state {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 300px;
}

.spinner {
  font-size: 16px;
  color: #40FBDC;
  font-weight: 600;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
  margin-bottom: 40px;
}

.stat-card {
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 12px;
  padding: 20px;
  display: flex;
  align-items: center;
  gap: 16px;
  transition: all 0.3s;
}

.stat-card:hover {
  background: rgba(255, 255, 255, 0.05);
  border-color: rgba(64, 251, 220, 0.3);
  transform: translateY(-2px);
}

.stat-icon {
  width: 48px;
  height: 48px;
  background: rgba(64, 251, 220, 0.1);
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.stat-value {
  font-size: 24px;
  font-weight: 700;
  color: #fff;
  margin-bottom: 4px;
}

.stat-label {
  font-size: 13px;
  color: rgba(255, 255, 255, 0.5);
}

.quick-actions {
  margin-top: 32px;
}

.quick-actions h3 {
  font-size: 18px;
  font-weight: 700;
  color: #fff;
  margin-bottom: 16px;
}

.actions-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
}

.action-btn {
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 12px;
  padding: 24px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
  cursor: pointer;
  transition: all 0.3s;
  color: rgba(255, 255, 255, 0.7);
}

.action-btn:hover {
  background: rgba(64, 251, 220, 0.1);
  border-color: rgba(64, 251, 220, 0.3);
  color: #40FBDC;
  transform: translateY(-2px);
}

.action-btn svg {
  width: 32px;
  height: 32px;
}

.action-btn span {
  font-size: 14px;
  font-weight: 600;
}

@media (max-width: 1200px) {
  .stats-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 768px) {
  .stats-grid {
    grid-template-columns: 1fr;
  }

  .actions-grid {
    grid-template-columns: 1fr;
  }
}
</style>