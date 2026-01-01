<template>
  <div class="app-layout">
    <!-- Loading pendant l'initialisation -->
    <div v-if="loading" class="loading-screen">
      <div class="loading-spinner">
        <svg viewBox="0 0 42 42" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="21" cy="21" r="20" stroke="#40FBDC" stroke-opacity="0.8" stroke-width="2"/>
          <path d="M29.1428 20.5714L11.1428 10.6404L29.1428 10.2857V20.5714Z" fill="#40FBDC"/>
          <path d="M29.1428 20.8661L20.767 18.8571L6.85711 22.4928L14.9712 26.9515L14.0551 36L27.1984 28.6339L29.1428 20.8661Z" fill="#40FBDC"/>
        </svg>
      </div>
    </div>

    <!-- Layout principal -->
    <template v-else>
      <!-- Sidebar UNIQUEMENT si connecté -->
      <Sidebar v-if="user" />
      
      <div class="app-main" :class="{ 'no-sidebar': !user }">
        <Topbar v-if="user" />
        <main class="app-content">
          <router-view />
        </main>
      </div>
    </template>
  </div>
</template>

<script>
import { computed, onMounted } from 'vue'
import { useAuthStore } from '@/stores/auth'
import Sidebar from './Sidebar.vue'
import Topbar from './Topbar.vue'

export default {
  name: 'AppLayout',
  
  components: {
    Sidebar,
    Topbar
  },
  
  setup() {
    const auth = useAuthStore()
    
    // Initialiser l'auth au montage
    onMounted(async () => {
      await auth.init()
    })
    
    const user = computed(() => auth.user)
    const loading = computed(() => auth.loading)
    
    return {
      user,
      loading
    }
  }
}
</script>

<style scoped>
.app-layout {
  display: flex;
  min-height: 100vh;
  background: #000;
}

/* Loading screen */
.loading-screen {
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #000;
}

.loading-spinner {
  width: 80px;
  height: 80px;
  animation: spin 2s linear infinite;
}

.loading-spinner svg {
  width: 100%;
  height: 100%;
  filter: drop-shadow(0 0 20px rgba(64, 251, 220, 0.6));
}

@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

/* Main content */
.app-main {
  flex: 1;
  margin-left: 260px;
  display: flex;
  flex-direction: column;
  transition: margin-left 0.3s ease;
}

/* Quand pas connecté → pas de sidebar → pas de décalage */
.app-main.no-sidebar {
  margin-left: 0;
}

.app-content {
  flex: 1;
  padding: 24px;
  overflow-y: auto;
}
</style>