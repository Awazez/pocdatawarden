<template>
  <div class="servers-page">
    <!-- Header -->
    <div class="page-header">
      <div>
        <h1>My Servers</h1>
        <p class="subtitle">Manage your VPS instances</p>
      </div>
      <button 
        v-if="!server && !loading" 
        @click="showCreateModal = true" 
        class="btn-create"
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <line x1="12" y1="5" x2="12" y2="19"/>
          <line x1="5" y1="12" x2="19" y2="12"/>
        </svg>
        Create Server
      </button>
    </div>

    <!-- Loading -->
    <div v-if="loading" class="loading-state">
      <div class="spinner">Loading your server...</div>
    </div>

    <!-- No server -->
    <div v-else-if="!server" class="empty-state">
      <div class="empty-icon">
        <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
          <rect x="2" y="2" width="20" height="8" rx="2"/>
          <rect x="2" y="14" width="20" height="8" rx="2"/>
          <line x1="6" y1="6" x2="6.01" y2="6"/>
          <line x1="6" y1="18" x2="6.01" y2="18"/>
        </svg>
      </div>
      <h2>No server yet</h2>
      <p>Create your first VPS to get started with Almerson</p>
      <button @click="showCreateModal = true" class="btn-primary-large">
        Create Your Server
      </button>
    </div>

    <!-- Server card -->
    <div v-else class="server-card">
      <div class="server-header">
        <div class="server-info">
          <h3>{{ server.name }}</h3>
          <p class="server-hostname">{{ server.hostname }}</p>
        </div>
        <div class="server-status" :class="server.status">
          <span class="status-dot"></span>
          {{ server.status }}
        </div>
      </div>

      <div class="server-details">
        <div class="detail-item">
          <span class="detail-label">IP Address</span>
          <span class="detail-value">{{ server.ipv4 || 'Provisioning...' }}</span>
        </div>
        <div class="detail-item">
          <span class="detail-label">Region</span>
          <span class="detail-value">Frankfurt (FRA1)</span>
        </div>
        <div class="detail-item">
          <span class="detail-label">Trial Ends</span>
          <span class="detail-value">{{ formatDate(server.trial_ends_at) }}</span>
        </div>
      </div>

      <div class="server-actions">
        <button 
          v-if="server.status === 'stopped'" 
          @click="startServer" 
          class="btn-action btn-success"
          :disabled="actionLoading"
        >
          Start
        </button>
        <button 
          v-if="server.status === 'active'" 
          @click="stopServer" 
          class="btn-action btn-warning"
          :disabled="actionLoading"
        >
          Stop
        </button>
        <button 
          @click="restartServer" 
          class="btn-action"
          :disabled="actionLoading || server.status !== 'active'"
        >
          Restart
        </button>
        <button 
          @click="deleteServer" 
          class="btn-action btn-danger"
          :disabled="actionLoading"
        >
          Delete
        </button>
      </div>
    </div>

    <!-- Create Modal -->
    <div v-if="showCreateModal" class="modal-overlay" @click="showCreateModal = false">
      <div class="modal-card" @click.stop>
        <div class="modal-header">
          <h2>Create Your Server</h2>
          <button @click="showCreateModal = false" class="modal-close">×</button>
        </div>

        <form @submit.prevent="createServer" class="modal-form">
          <div class="form-group">
            <label>Server Name</label>
            <input
              v-model="serverName"
              type="text"
              placeholder="my-awesome-server"
              required
              class="input-field"
            />
          </div>

          <div class="info-box">
            <p><strong>Included in POC:</strong></p>
            <ul>
              <li>1 vCPU, 1GB RAM, 20GB SSD</li>
              <li>Ubuntu 22.04 LTS</li>
              <li>Frankfurt datacenter</li>
              <li>Daily automatic snapshots</li>
              <li>30 days free trial, then €0.99/month</li>
            </ul>
          </div>

          <div v-if="createError" class="error-message">
            {{ createError }}
          </div>

          <div class="modal-actions">
            <button type="button" @click="showCreateModal = false" class="btn-secondary">
              Cancel
            </button>
            <button type="submit" class="btn-primary" :disabled="createLoading">
              {{ createLoading ? 'Creating...' : 'Create Server' }}
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted, computed } from 'vue'
import { useAuthStore } from '@/stores/auth'
import { supabase } from '@/lib/supabase'

export default {
  name: 'Servers',

  setup() {
    const auth = useAuthStore()
    const user = computed(() => auth.user)

    const server = ref(null)
    const loading = ref(true)
    const actionLoading = ref(false)

    const showCreateModal = ref(false)
    const serverName = ref('')
    const createLoading = ref(false)
    const createError = ref(null)

    const loadServer = async () => {
      loading.value = true
      try {
        const { data, error } = await supabase
          .from('servers')
          .select('*')
          .eq('user_id', user.value.id)
          .neq('status', 'deleted')
          .single()

        if (error && error.code !== 'PGRST116') throw error

        server.value = data
        console.log('Server loaded:', data)
      } catch (err) {
        console.error('Error loading server:', err)
      } finally {
        loading.value = false
      }
    }

    const createServer = async () => {
      createLoading.value = true
      createError.value = null

      try {
        const { data, error } = await supabase.functions.invoke('provision-server', {
          body: { serverName: serverName.value }
        })

        if (error) throw error

        console.log('Server creation started:', data)
        
        showCreateModal.value = false
        serverName.value = ''
        
        // Recharger pour voir le nouveau serveur
        await loadServer()

        // Poll pour voir quand le serveur est prêt
        const pollInterval = setInterval(async () => {
          await loadServer()
          if (server.value?.status === 'active') {
            clearInterval(pollInterval)
          }
        }, 2000)

      } catch (err) {
        console.error('Error creating server:', err)
        createError.value = err.message
      } finally {
        createLoading.value = false
      }
    }

    const startServer = async () => {
      actionLoading.value = true
      try {
        // TODO: Appeler edge function server-action
        console.log('Starting server...')
      } finally {
        actionLoading.value = false
      }
    }

    const stopServer = async () => {
      actionLoading.value = true
      try {
        // TODO: Appeler edge function server-action
        console.log('Stopping server...')
      } finally {
        actionLoading.value = false
      }
    }

    const restartServer = async () => {
      actionLoading.value = true
      try {
        // TODO: Appeler edge function server-action
        console.log('Restarting server...')
      } finally {
        actionLoading.value = false
      }
    }

    const deleteServer = async () => {
      if (!confirm('Are you sure you want to delete this server? This action cannot be undone.')) return

      actionLoading.value = true
      try {
        await supabase
          .from('servers')
          .update({ status: 'deleted' })
          .eq('id', server.value.id)

        server.value = null
      } catch (err) {
        console.error('Error deleting server:', err)
        alert('Failed to delete server')
      } finally {
        actionLoading.value = false
      }
    }

    const formatDate = (date) => {
      if (!date) return 'N/A'
      return new Date(date).toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric'
      })
    }

    onMounted(() => {
      loadServer()
    })

    return {
      server,
      loading,
      actionLoading,
      showCreateModal,
      serverName,
      createLoading,
      createError,
      createServer,
      startServer,
      stopServer,
      restartServer,
      deleteServer,
      formatDate
    }
  }
}
</script>

<style scoped>
.servers-page {
  max-width: 1200px;
}

.page-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 32px;
}

.page-header h1 {
  font-size: 32px;
  font-weight: 800;
  color: #fff;
  margin-bottom: 8px;
}

.subtitle {
  font-size: 16px;
  color: rgba(255, 255, 255, 0.6);
}

.btn-create {
  background: #40FBDC;
  color: #000;
  border: none;
  padding: 12px 24px;
  border-radius: 10px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 8px;
  transition: all 0.2s;
}

.btn-create:hover {
  background: #33e8c9;
  transform: translateY(-1px);
  box-shadow: 0 8px 24px rgba(64, 251, 220, 0.3);
}

.loading-state {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 400px;
}

.spinner {
  font-size: 16px;
  color: #40FBDC;
  font-weight: 600;
}

.empty-state {
  text-align: center;
  padding: 80px 20px;
}

.empty-icon {
  margin-bottom: 24px;
  color: rgba(255, 255, 255, 0.3);
}

.empty-state h2 {
  font-size: 24px;
  font-weight: 700;
  color: #fff;
  margin-bottom: 8px;
}

.empty-state p {
  font-size: 16px;
  color: rgba(255, 255, 255, 0.6);
  margin-bottom: 32px;
}

.btn-primary-large {
  background: #40FBDC;
  color: #000;
  border: none;
  padding: 16px 32px;
  border-radius: 12px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
}

.btn-primary-large:hover {
  background: #33e8c9;
  transform: translateY(-2px);
  box-shadow: 0 12px 32px rgba(64, 251, 220, 0.4);
}

.server-card {
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 16px;
  padding: 32px;
}

.server-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 24px;
  padding-bottom: 24px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
}

.server-info h3 {
  font-size: 20px;
  font-weight: 700;
  color: #fff;
  margin-bottom: 4px;
}

.server-hostname {
  font-size: 14px;
  color: rgba(255, 255, 255, 0.6);
  font-family: 'Courier New', monospace;
}

.server-status {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 16px;
  border-radius: 20px;
  font-size: 13px;
  font-weight: 600;
  text-transform: capitalize;
}

.server-status.provisioning {
  background: rgba(255, 165, 0, 0.1);
  color: #ffa500;
}

.server-status.active {
  background: rgba(64, 251, 220, 0.1);
  color: #40FBDC;
}

.server-status.stopped {
  background: rgba(255, 255, 255, 0.1);
  color: rgba(255, 255, 255, 0.6);
}

.status-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: currentColor;
}

.server-details {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;
  margin-bottom: 24px;
}

.detail-item {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.detail-label {
  font-size: 12px;
  color: rgba(255, 255, 255, 0.5);
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.detail-value {
  font-size: 16px;
  font-weight: 600;
  color: #fff;
}

.server-actions {
  display: flex;
  gap: 12px;
}

.btn-action {
  padding: 10px 20px;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  color: rgba(255, 255, 255, 0.8);
  border-radius: 8px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
}

.btn-action:hover:not(:disabled) {
  background: rgba(255, 255, 255, 0.08);
}

.btn-action:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.btn-success:hover:not(:disabled) {
  background: rgba(64, 251, 220, 0.1);
  border-color: #40FBDC;
  color: #40FBDC;
}

.btn-warning:hover:not(:disabled) {
  background: rgba(255, 165, 0, 0.1);
  border-color: #ffa500;
  color: #ffa500;
}

.btn-danger:hover:not(:disabled) {
  background: rgba(255, 64, 64, 0.1);
  border-color: #ff4040;
  color: #ff4040;
}

/* Modal */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.8);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  backdrop-filter: blur(4px);
}

.modal-card {
  background: rgba(10, 10, 10, 0.95);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 16px;
  padding: 32px;
  max-width: 500px;
  width: 90%;
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
}

.modal-header h2 {
  font-size: 24px;
  font-weight: 700;
  color: #fff;
}

.modal-close {
  background: none;
  border: none;
  color: rgba(255, 255, 255, 0.6);
  font-size: 32px;
  cursor: pointer;
  line-height: 1;
}

.modal-form .form-group {
  margin-bottom: 20px;
}

.modal-form label {
  display: block;
  font-size: 14px;
  font-weight: 600;
  color: rgba(255, 255, 255, 0.9);
  margin-bottom: 8px;
}

.input-field {
  width: 100%;
  padding: 12px 16px;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 10px;
  color: #fff;
  font-size: 15px;
  transition: all 0.2s;
}

.input-field:focus {
  outline: none;
  border-color: #40FBDC;
  background: rgba(255, 255, 255, 0.08);
}

.info-box {
  background: rgba(64, 251, 220, 0.05);
  border: 1px solid rgba(64, 251, 220, 0.2);
  border-radius: 10px;
  padding: 16px;
  margin-bottom: 20px;
}

.info-box p {
  color: rgba(255, 255, 255, 0.8);
  font-size: 14px;
  margin-bottom: 8px;
}

.info-box ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.info-box li {
  color: rgba(255, 255, 255, 0.6);
  font-size: 13px;
  padding: 4px 0;
  padding-left: 20px;
  position: relative;
}

.info-box li:before {
  content: "✓";
  position: absolute;
  left: 0;
  color: #40FBDC;
}

.error-message {
  background: rgba(255, 64, 64, 0.1);
  border: 1px solid rgba(255, 64, 64, 0.3);
  color: #ff4040;
  padding: 12px 16px;
  border-radius: 10px;
  font-size: 14px;
  margin-bottom: 20px;
}

.modal-actions {
  display: flex;
  gap: 12px;
  justify-content: flex-end;
}

.btn-secondary {
  padding: 12px 24px;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  color: rgba(255, 255, 255, 0.8);
  border-radius: 10px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
}

.btn-secondary:hover {
  background: rgba(255, 255, 255, 0.08);
}

.btn-primary {
  padding: 12px 24px;
  background: #40FBDC;
  color: #000;
  border: none;
  border-radius: 10px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
}

.btn-primary:hover:not(:disabled) {
  background: #33e8c9;
  transform: translateY(-1px);
}

.btn-primary:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}
</style>