<template>
  <div class="profile-page">
    <!-- Loading state -->
    <div v-if="initialLoading" class="loading-container">
      <div class="loading-spinner">Loading...</div>
    </div>

    <template v-else>
      <!-- Header -->
      <div class="profile-header">
        <h1>Profile Settings</h1>
        <p>Manage your account information</p>
      </div>

      <!-- Profile Card -->
      <div class="profile-card">
        <!-- Avatar Section -->
        <div class="avatar-section">
          <div class="avatar-large">
            {{ initials }}
          </div>
          <div class="avatar-info">
            <h3>{{ fullName || 'User' }}</h3>
            <p>{{ user?.email }}</p>
          </div>
        </div>

        <!-- Form -->
        <form @submit.prevent="updateProfile" class="profile-form">
          <!-- First Name & Last Name -->
          <div class="form-row">
            <div class="form-group">
              <label>First name</label>
              <input
                v-model="firstName"
                type="text"
                placeholder="John"
                class="input-field"
                required
              />
            </div>

            <div class="form-group">
              <label>Last name</label>
              <input
                v-model="lastName"
                type="text"
                placeholder="Doe"
                class="input-field"
                required
              />
            </div>
          </div>

          <!-- Email (read-only) -->
          <div class="form-group">
            <label>Email address</label>
            <input
              :value="user?.email"
              type="email"
              class="input-field"
              disabled
            />
            <span class="field-hint">Your email cannot be changed</span>
          </div>

          <!-- Account Info -->
          <div class="account-info">
            <div class="info-item">
              <span class="info-label">Member since</span>
              <span class="info-value">{{ memberSince }}</span>
            </div>
            <div class="info-item">
              <span class="info-label">Account ID</span>
              <span class="info-value">{{ user?.id?.slice(0, 8) }}...</span>
            </div>
          </div>

          <!-- Success/Error Messages -->
          <div v-if="successMessage" class="success-message">
            ✓ {{ successMessage }}
          </div>
          <div v-if="errorMessage" class="error-message">
            {{ errorMessage }}
          </div>

          <!-- Actions -->
          <div class="form-actions">
            <button
              type="button"
              @click="resetForm"
              class="btn-secondary"
              :disabled="loading"
            >
              Reset
            </button>
            <button
              type="submit"
              class="btn-primary"
              :disabled="loading || !hasChanges"
            >
              <span v-if="!loading">Save changes</span>
              <span v-else>Saving...</span>
            </button>
          </div>
        </form>
      </div>

      <!-- Danger Zone -->
      <div class="danger-zone">
        <div class="danger-header">
          <h3>Danger Zone</h3>
          <p>Irreversible actions</p>
        </div>
        <button @click="confirmDelete" class="btn-danger">
          Delete Account
        </button>
      </div>
    </template>
  </div>
</template>

<script>
import { ref, computed, onMounted, watch } from 'vue'
import { useAuthStore } from '@/stores/auth'
import { supabase } from '@/lib/supabase'

export default {
  name: 'Profile',

  setup() {
    const auth = useAuthStore()
    const user = computed(() => auth.user)

    const firstName = ref('')
    const lastName = ref('')
    const loading = ref(false)
    const initialLoading = ref(true)
    const successMessage = ref('')
    const errorMessage = ref('')

    const originalFirstName = ref('')
    const originalLastName = ref('')

    // Computed
    const fullName = computed(() => {
      if (firstName.value && lastName.value) {
        return `${firstName.value} ${lastName.value}`
      }
      return ''
    })

    const initials = computed(() => {
      const first = firstName.value?.charAt(0)?.toUpperCase() || ''
      const last = lastName.value?.charAt(0)?.toUpperCase() || ''
      return first + last || user.value?.email?.charAt(0)?.toUpperCase() || '?'
    })

    const memberSince = computed(() => {
      if (!user.value?.created_at) return 'Unknown'
      const date = new Date(user.value.created_at)
      return date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })
    })

    const hasChanges = computed(() => {
      return (
        firstName.value !== originalFirstName.value ||
        lastName.value !== originalLastName.value
      )
    })

    // Methods
    const loadProfile = () => {
      console.log('🔍 Loading profile...')
      console.log('👤 User:', user.value)
      console.log('📦 user_metadata:', user.value?.user_metadata)

      if (!user.value) {
        console.warn('⚠️ No user found')
        initialLoading.value = false
        return
      }

      // Récupérer directement depuis user_metadata
      firstName.value = user.value.user_metadata?.first_name || ''
      lastName.value = user.value.user_metadata?.last_name || ''
      
      originalFirstName.value = firstName.value
      originalLastName.value = lastName.value

      console.log('✅ Profile loaded:', { 
        firstName: firstName.value, 
        lastName: lastName.value 
      })

      initialLoading.value = false
    }

    const updateProfile = async () => {
      loading.value = true
      successMessage.value = ''
      errorMessage.value = ''

      try {
        console.log('💾 Updating profile...')

        // Mettre à jour dans la table profiles
        const { error } = await supabase
          .from('profiles')
          .upsert({
            id: user.value.id,
            email: user.value.email,
            first_name: firstName.value,
            last_name: lastName.value,
            updated_at: new Date().toISOString()
          })

        if (error) throw error

        originalFirstName.value = firstName.value
        originalLastName.value = lastName.value

        successMessage.value = 'Profile updated successfully!'
        console.log('✅ Profile updated')

        setTimeout(() => {
          successMessage.value = ''
        }, 3000)
      } catch (err) {
        console.error('❌ Error updating profile:', err)
        errorMessage.value = err.message
      } finally {
        loading.value = false
      }
    }

    const resetForm = () => {
      firstName.value = originalFirstName.value
      lastName.value = originalLastName.value
      successMessage.value = ''
      errorMessage.value = ''
    }

    const confirmDelete = () => {
      if (confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
        alert('Account deletion not implemented yet')
      }
    }

    // Watch user pour recharger quand l'user change
    watch(user, (newUser) => {
      if (newUser) {
        console.log('👀 User changed, reloading profile')
        loadProfile()
      }
    })

    // Lifecycle
    onMounted(() => {
      console.log('🚀 Profile component mounted')
      if (user.value) {
        loadProfile()
      } else {
        console.warn('⚠️ No user on mount, waiting...')
        initialLoading.value = false
      }
    })

    return {
      user,
      firstName,
      lastName,
      loading,
      initialLoading,
      successMessage,
      errorMessage,
      fullName,
      initials,
      memberSince,
      hasChanges,
      updateProfile,
      resetForm,
      confirmDelete
    }
  }
}
</script>

<style scoped>
.profile-page {
  max-width: 800px;
}

.loading-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 400px;
}

.loading-spinner {
  font-size: 18px;
  color: #40FBDC;
  font-weight: 600;
}

.profile-header {
  margin-bottom: 32px;
}

.profile-header h1 {
  font-size: 32px;
  font-weight: 800;
  color: #fff;
  margin-bottom: 8px;
}

.profile-header p {
  font-size: 15px;
  color: rgba(255, 255, 255, 0.6);
}

/* Profile Card */
.profile-card {
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 16px;
  padding: 32px;
  margin-bottom: 24px;
}

.avatar-section {
  display: flex;
  align-items: center;
  gap: 20px;
  padding-bottom: 32px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
  margin-bottom: 32px;
}

.avatar-large {
  width: 80px;
  height: 80px;
  background: linear-gradient(135deg, #40FBDC, #00D9FF);
  border-radius: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  color: #000;
  font-size: 32px;
  box-shadow: 0 8px 24px rgba(64, 251, 220, 0.3);
}

.avatar-info h3 {
  font-size: 20px;
  font-weight: 700;
  color: #fff;
  margin-bottom: 4px;
}

.avatar-info p {
  font-size: 14px;
  color: rgba(255, 255, 255, 0.6);
}

/* Form */
.profile-form {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.form-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
}

.form-group {
  display: flex;
  flex-direction: column;
}

.form-group label {
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

.input-field:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.field-hint {
  font-size: 12px;
  color: rgba(255, 255, 255, 0.4);
  margin-top: 6px;
}

/* Account Info */
.account-info {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
  padding: 20px;
  background: rgba(0, 0, 0, 0.2);
  border-radius: 10px;
}

.info-item {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.info-label {
  font-size: 12px;
  color: rgba(255, 255, 255, 0.5);
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.info-value {
  font-size: 14px;
  font-weight: 600;
  color: #fff;
}

/* Messages */
.success-message {
  background: rgba(64, 251, 220, 0.1);
  border: 1px solid rgba(64, 251, 220, 0.3);
  color: #40FBDC;
  padding: 12px 16px;
  border-radius: 10px;
  font-size: 14px;
}

.error-message {
  background: rgba(255, 64, 64, 0.1);
  border: 1px solid rgba(255, 64, 64, 0.3);
  color: #ff4040;
  padding: 12px 16px;
  border-radius: 10px;
  font-size: 14px;
}

/* Actions */
.form-actions {
  display: flex;
  gap: 12px;
  justify-content: flex-end;
  padding-top: 8px;
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

.btn-secondary:hover:not(:disabled) {
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
  box-shadow: 0 8px 24px rgba(64, 251, 220, 0.3);
}

.btn-primary:disabled,
.btn-secondary:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

/* Danger Zone */
.danger-zone {
  background: rgba(255, 64, 64, 0.05);
  border: 1px solid rgba(255, 64, 64, 0.2);
  border-radius: 16px;
  padding: 24px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.danger-header h3 {
  font-size: 16px;
  font-weight: 700;
  color: #ff4040;
  margin-bottom: 4px;
}

.danger-header p {
  font-size: 13px;
  color: rgba(255, 255, 255, 0.5);
}

.btn-danger {
  padding: 10px 20px;
  background: rgba(255, 64, 64, 0.1);
  border: 1px solid rgba(255, 64, 64, 0.3);
  color: #ff4040;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
}

.btn-danger:hover {
  background: rgba(255, 64, 64, 0.2);
  border-color: #ff4040;
}
</style>