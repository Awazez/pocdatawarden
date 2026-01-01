<template>
  <aside class="sidebar">
    <!-- Header -->
    <div class="sidebar-header">
      <div class="logo">
        <div class="logo-symbol">
          <svg viewBox="0 0 42 42" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="21" cy="21" r="20" stroke="#40FBDC" stroke-opacity="0.8" stroke-width="2"/>
            <path d="M29.1428 20.5714L11.1428 10.6404L29.1428 10.2857V20.5714Z" fill="#40FBDC"/>
            <path d="M29.1428 20.8661L20.767 18.8571L6.85711 22.4928L14.9712 26.9515L14.0551 36L27.1984 28.6339L29.1428 20.8661Z" fill="#40FBDC"/>
          </svg>
        </div>
        <span class="logo-text">Almerson</span>
      </div>
    </div>

    <!-- Navigation -->
    <nav class="sidebar-nav">
      <div class="nav-section">
        <div class="nav-section-title">Main</div>

        <router-link
          v-for="item in mainMenu"
          :key="item.path"
          :to="item.path"
          class="nav-item"
          :class="{ active: isActive(item.path) }"
        >
          <div class="nav-icon" v-html="item.icon"></div>
          <span>{{ item.name }}</span>
        </router-link>
      </div>

      <div class="nav-section">
        <div class="nav-section-title">Settings</div>

        <router-link
          v-for="item in settingsMenu"
          :key="item.path"
          :to="item.path"
          class="nav-item"
          :class="{ active: isActive(item.path) }"
        >
          <div class="nav-icon" v-html="item.icon"></div>
          <span>{{ item.name }}</span>
        </router-link>

        <!-- Logout -->
        <a @click.prevent="handleLogout" class="nav-item nav-item-logout" href="#">
          <div class="nav-icon">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/>
              <polyline points="16 17 21 12 16 7"/>
              <line x1="21" y1="12" x2="9" y2="12"/>
            </svg>
          </div>
          <span>Logout</span>
        </a>
      </div>
    </nav>

    <!-- User (PROTÉGÉ) -->
    <div class="sidebar-footer" v-if="user">
      <div class="user-profile">
        <div class="user-avatar">
          {{ user.email.charAt(0).toUpperCase() }}
        </div>

        <div class="user-info">
          <div class="user-name">
            {{ user.email.split('@')[0] }}
          </div>
          <div class="user-email">
            {{ user.email }}
          </div>
        </div>
      </div>
    </div>
  </aside>
</template>

<script>
import { useAuthStore } from '@/stores/auth'

export default {
  name: 'Sidebar',

  computed: {
    auth() {
      return useAuthStore()
    },
    user() {
      return this.auth.user
    }
  },

  data() {
    return {
      mainMenu: [
        {
          name: 'Dashboard',
          path: '/app/dashboard',
          icon: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg>'
        },
        {
          name: 'Servers',
          path: '/app/servers',
          icon: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="2" width="20" height="8" rx="2"/><rect x="2" y="14" width="20" height="8" rx="2"/><line x1="6" y1="6" x2="6.01" y2="6"/><line x1="6" y1="18" x2="6.01" y2="18"/></svg>'
        }
      ],
      settingsMenu: [
        {
          name: 'Profile',
          path: '/app/settings/profile',
          icon: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>'
        }
      ]
    }
  },

  methods: {
    isActive(path) {
      return this.$route.path === path
    },
    async handleLogout() {
      await this.auth.logout()
      this.$router.push('/login')
    }
  }
}
</script>


<style scoped>
.sidebar {
  width: 260px;
  height: 100vh;
  background: rgba(0, 0, 0, 0.4);
  border-right: 1px solid rgba(255, 255, 255, 0.08);
  display: flex;
  flex-direction: column;
  position: fixed;
  left: 0;
  top: 0;
  backdrop-filter: blur(20px);
}

.sidebar-header {
  padding: 20px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
}

.logo {
  display: flex;
  align-items: center;
  gap: 12px;
}

.logo-symbol {
  width: 32px;
  height: 32px;
}

.logo-symbol svg {
  width: 100%;
  height: 100%;
  filter: drop-shadow(0 0 8px rgba(64, 251, 220, 0.4));
}

.logo-text {
  font-size: 18px;
  font-weight: 700;
  color: #fff;
}

.sidebar-nav {
  flex: 1;
  padding: 20px 12px;
  overflow-y: auto;
}

.nav-section {
  margin-bottom: 32px;
}

.nav-section-title {
  font-size: 11px;
  font-weight: 700;
  color: rgba(255, 255, 255, 0.4);
  text-transform: uppercase;
  letter-spacing: 1px;
  padding: 0 12px 12px;
}

.nav-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 10px 12px;
  border-radius: 8px;
  color: rgba(255, 255, 255, 0.6);
  text-decoration: none;
  transition: all 0.2s;
  margin-bottom: 4px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  border: none;
  background: transparent;
  width: 100%;
  text-align: left;
}

.nav-item:hover {
  background: rgba(255, 255, 255, 0.05);
  color: #fff;
}

.nav-item.active {
  background: rgba(64, 251, 220, 0.1);
  color: #40FBDC;
  border-left: 3px solid #40FBDC;
}

.nav-item-logout:hover {
  background: rgba(255, 64, 64, 0.1);
  color: #ff4040;
}

.nav-icon {
  display: flex;
  align-items: center;
  justify-content: center;
}

.sidebar-footer {
  padding: 16px;
  border-top: 1px solid rgba(255, 255, 255, 0.08);
}

.user-profile {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 8px;
  border-radius: 8px;
  cursor: pointer;
  transition: background 0.2s;
}

.user-profile:hover {
  background: rgba(255, 255, 255, 0.05);
}

.user-avatar {
  width: 36px;
  height: 36px;
  background: linear-gradient(135deg, #40FBDC, #00D9FF);
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  color: #000;
  font-size: 14px;
}

.user-info {
  flex: 1;
}

.user-name {
  font-size: 13px;
  font-weight: 600;
  color: #fff;
  margin-bottom: 2px;
}

.user-email {
  font-size: 11px;
  color: rgba(255, 255, 255, 0.5);
}

.sidebar-nav::-webkit-scrollbar {
  width: 6px;
}

.sidebar-nav::-webkit-scrollbar-track {
  background: transparent;
}

.sidebar-nav::-webkit-scrollbar-thumb {
  background: rgba(255, 255, 255, 0.1);
  border-radius: 3px;
}

.sidebar-nav::-webkit-scrollbar-thumb:hover {
  background: rgba(255, 255, 255, 0.2);
}
</style>