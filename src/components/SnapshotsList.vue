<!-- components/SnapshotsList.vue -->
<template>
  <div class="snapshots-section">
    <div class="section-header">
      <h3>Snapshots</h3>
      <button @click="createManualSnapshot" class="btn-create" :disabled="loading">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <circle cx="12" cy="12" r="10"/>
          <line x1="12" y1="8" x2="12" y2="16"/>
          <line x1="8" y1="12" x2="16" y2="12"/>
        </svg>
        Create Snapshot
      </button>
    </div>

    <div v-if="loading" class="loading">Loading snapshots...</div>

    <div v-else-if="snapshots.length === 0" class="empty-state">
      <p>No snapshots yet. Create your first backup!</p>
    </div>

    <div v-else class="snapshots-list">
      <div v-for="snapshot in snapshots" :key="snapshot.id" class="snapshot-card">
        <div class="snapshot-icon">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <rect x="3" y="3" width="18" height="18" rx="2"/>
            <circle cx="8.5" cy="8.5" r="1.5"/>
            <polyline points="21 15 16 10 5 21"/>
          </svg>
        </div>
        
        <div class="snapshot-info">
          <div class="snapshot-name">{{ snapshot.name }}</div>
          <div class="snapshot-meta">
            <span class="snapshot-type" :class="snapshot.type">{{ snapshot.type }}</span>
            <span class="snapshot-date">{{ formatDate(snapshot.created_at) }}</span>
            <span v-if="snapshot.size_gb" class="snapshot-size">{{ snapshot.size_gb }} GB</span>
          </div>
        </div>
        
        <div class="snapshot-actions">
          <button @click="restoreSnapshot(snapshot.id)" class="btn-restore">
            Restore
          </button>
          <button @click="deleteSnapshot(snapshot.id)" class="btn-delete" v-if="snapshot.type === 'manual'">
            Delete
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue'
import { supabase } from '@/lib/supabase'

export default {
  name: 'SnapshotsList',
  
  props: {
    serverId: {
      type: String,
      required: true
    }
  },
  
  setup(props) {
    const snapshots = ref([])
    const loading = ref(true)
    
    const loadSnapshots = async () => {
      loading.value = true
      try {
        const { data, error } = await supabase
          .from('snapshots')
          .select('*')
          .eq('server_id', props.serverId)
          .order('created_at', { ascending: false })
        
        if (error) throw error
        snapshots.value = data || []
      } catch (err) {
        console.error('Error loading snapshots:', err)
      } finally {
        loading.value = false
      }
    }
    
    const createManualSnapshot = async () => {
      const name = prompt('Snapshot name:')
      if (!name) return
      
      try {
        const { data, error } = await supabase
          .from('snapshots')
          .insert({
            server_id: props.serverId,
            name,
            type: 'manual',
            proxmox_snapshot_name: `manual-${Date.now()}`
          })
          .select()
          .single()
        
        if (error) throw error
        
        snapshots.value.unshift(data)
        alert('Snapshot created!')
      } catch (err) {
        console.error('Error creating snapshot:', err)
        alert('Failed to create snapshot')
      }
    }
    
    const restoreSnapshot = async (snapshotId) => {
      if (!confirm('Are you sure you want to restore this snapshot? This will revert your server to this state.')) return
      
      try {
        const { data, error } = await supabase.functions.invoke('restore-snapshot', {
          body: { snapshotId, userId: supabase.auth.user().id }
        })
        
        if (error) throw error
        
        alert('Snapshot restored successfully!')
      } catch (err) {
        console.error('Error restoring snapshot:', err)
        alert('Failed to restore snapshot')
      }
    }
    
    const deleteSnapshot = async (snapshotId) => {
      if (!confirm('Delete this snapshot?')) return
      
      try {
        const { error } = await supabase
          .from('snapshots')
          .delete()
          .eq('id', snapshotId)
        
        if (error) throw error
        
        snapshots.value = snapshots.value.filter(s => s.id !== snapshotId)
        alert('Snapshot deleted')
      } catch (err) {
        console.error('Error deleting snapshot:', err)
        alert('Failed to delete snapshot')
      }
    }
    
    const formatDate = (date) => {
      return new Date(date).toLocaleString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      })
    }
    
    onMounted(() => {
      loadSnapshots()
    })
    
    return {
      snapshots,
      loading,
      createManualSnapshot,
      restoreSnapshot,
      deleteSnapshot,
      formatDate
    }
  }
}
</script>

<style scoped>
/* Styles pour les snapshots */
</style>