<template>
  <header class="topbar">
    <div class="topbar-left">
      <h1 class="page-title">{{ pageTitle }}</h1>
    </div>
    
    <div class="topbar-right">
      <!-- Notifications -->
      <button class="topbar-btn">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/>
          <path d="M13.73 21a2 2 0 0 1-3.46 0"/>
        </svg>
        <span class="notification-badge">3</span>
      </button>

      <!-- Settings -->
      <button class="topbar-btn">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <circle cx="12" cy="12" r="3"/>
          <path d="M12 1v6m0 6v6"/>
          <path d="m4.2 4.2 4.2 4.2m5.6 5.6 4.2 4.2"/>
          <path d="M1 12h6m6 0h6"/>
          <path d="m4.2 19.8 4.2-4.2m5.6-5.6 4.2-4.2"/>
        </svg>
      </button>

      <!-- New Server Button -->
      <button class="btn-primary" @click="createServer">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <line x1="12" y1="5" x2="12" y2="19"/>
          <line x1="5" y1="12" x2="19" y2="12"/>
        </svg>
        New Server
      </button>

      <!-- User Menu -->
      <div class="user-menu" @click="toggleMenu" v-if="user">
        <div class="user-avatar">
          {{ userInitials }}
        </div>
        
        <!-- Dropdown -->
        <div v-if="menuOpen" class="user-dropdown">
          <div class="dropdown-header">
            <div class="dropdown-user-info">
              <div class="dropdown-name">{{ userName }}</div>
              <div class="dropdown-email">{{ user.email }}</div>
            </div>
          </div>
          
          <div class="dropdown-divider"></div>
          
          <router-link to="/app/settings/profile" class="dropdown-item" @click="menuOpen = false">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
              <circle cx="12" cy="7" r="4"/>
            </svg>
            Profile Settings
          </router-link>
          
          <div class="dropdown-divider"></div>
          
          <button @click="handleLogout" class="dropdown-item dropdown-logout">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/>
              <polyline points="16 17 21 12 16 7"/>
              <line x1="21" y1="12" x2="9" y2="12"/>
            </svg>
            Logout
          </button>
        </div>
      </div>
    </div>
  </header>
</template>

<script>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useAuthStore } from '@/stores/auth'
import { useRouter } from 'vue-router'

export default {
  name: 'Topbar',

  setup() {
    const auth = useAuthStore()
    const router = useRouter()
    const user = computed(() => auth.user)
    const menuOpen = ref(false)

    const userName = computed(() => {
      const firstName = user.value?.user_metadata?.first_name
      const lastName = user.value?.user_metadata?.last_name
      
      if (firstName && lastName) {
        return `${firstName} ${lastName}`
      }
      return user.value?.email?.split('@')[0] || 'User'
    })

    const userInitials = computed(() => {
      const firstName = user.value?.user_metadata?.first_name
      const lastName = user.value?.user_metadata?.last_name
      
      if (firstName && lastName) {
        return firstName.charAt(0) + lastName.charAt(0)
      }
      return user.value?.email?.charAt(0).toUpperCase() || '?'
    })

    const toggleMenu = () => {
      menuOpen.value = !menuOpen.value
    }

    const closeMenu = (e) => {
      if (!e.target.closest('.user-menu')) {
        menuOpen.value = false
      }
    }

    const handleLogout = async () => {
      menuOpen.value = false
      await auth.logout()
      router.push('/auth')
    }

    const createServer = () => {
      router.push('/app/servers')
      // TODO: Ouvrir une modal de création de serveur
    }

    onMounted(() => {
      document.addEventListener('click', closeMenu)
    })

    onUnmounted(() => {
      document.removeEventListener('click', closeMenu)
    })

    return {
      user,
      userName,
      userInitials,
      menuOpen,
      toggleMenu,
      handleLogout,
      createServer
    }
  },

  computed: {
    pageTitle() {
      const titles = {
        'Dashboard': 'Dashboard',
        'Servers': 'My Servers',
        'ServerDetail': 'Server Details',
        'Profile': 'Profile Settings'
      }
      return titles[this.$route.name] || 'Almerson'
    }
  }
}
</script>

<style scoped>
.topbar {
  height: 64px;
  background: rgba(0, 0, 0, 0.4);
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
  padding: 0 24px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  backdrop-filter: blur(20px);
  position: sticky;
  top: 0;
  z-index: 10;
}

.page-title {
  font-size: 20px;
  font-weight: 700;
  color: #fff;
}

.topbar-right {
  display: flex;
  align-items: center;
  gap: 12px;
}

.topbar-btn {
  width: 40px;
  height: 40px;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: rgba(255, 255, 255, 0.6);
  cursor: pointer;
  transition: all 0.2s;
  position: relative;
}

.topbar-btn:hover {
  background: rgba(255, 255, 255, 0.1);
  color: #fff;
}

.notification-badge {
  position: absolute;
  top: -4px;
  right: -4px;
  background: #40FBDC;
  color: #000;
  font-size: 10px;
  font-weight: 700;
  padding: 2px 6px;
  border-radius: 10px;
  min-width: 18px;
  text-align: center;
}

.btn-primary {
  background: #40FBDC;
  color: #000;
  border: none;
  padding: 10px 20px;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 8px;
  transition: all 0.3s;
  box-shadow: 0 4px 12px rgba(64, 251, 220, 0.3);
}

.btn-primary:hover {
  transform: translateY(-1px);
  box-shadow: 0 6px 20px rgba(64, 251, 220, 0.5);
}

/* User Menu */
.user-menu {
  position: relative;
  cursor: pointer;
}

.user-avatar {
  width: 40px;
  height: 40px;
  background: linear-gradient(135deg, #40FBDC, #00D9FF);
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  color: #000;
  font-size: 14px;
  transition: all 0.2s;
}

.user-avatar:hover {
  transform: scale(1.05);
  box-shadow: 0 4px 12px rgba(64, 251, 220, 0.4);
}

.user-dropdown {
  position: absolute;
  top: calc(100% + 8px);
  right: 0;
  width: 240px;
  background: rgba(10, 10, 10, 0.95);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  padding: 8px;
  backdrop-filter: blur(20px);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.5);
  z-index: 1000;
}

.dropdown-header {
  padding: 12px;
}

.dropdown-name {
  font-size: 14px;
  font-weight: 600;
  color: #fff;
  margin-bottom: 2px;
}

.dropdown-email {
  font-size: 12px;
  color: rgba(255, 255, 255, 0.5);
}

.dropdown-divider {
  height: 1px;
  background: rgba(255, 255, 255, 0.08);
  margin: 8px 0;
}

.dropdown-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 10px 12px;
  border-radius: 8px;
  color: rgba(255, 255, 255, 0.8);
  text-decoration: none;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
  background: transparent;
  border: none;
  width: 100%;
  text-align: left;
}

.dropdown-item:hover {
  background: rgba(255, 255, 255, 0.05);
  color: #fff;
}

.dropdown-logout {
  color: #ff4040;
}

.dropdown-logout:hover {
  background: rgba(255, 64, 64, 0.1);
}
</style>