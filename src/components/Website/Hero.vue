<template>
  <section class="hero">
    <!-- Orbes flottants - mieux répartis avec offsets -->
    <div class="floating-orb orb-1"></div>
    <div class="floating-orb orb-2"></div>
    <div class="floating-orb orb-3"></div>
    <div class="floating-orb orb-4"></div>
    <div class="floating-orb orb-5"></div>
    <div class="floating-orb orb-6"></div>

    <div class="hero-content">
      <div class="hero-badge">
        <span class="pulse-dot"></span>
        <span>POC Available Now</span>
      </div>

      <h1 class="hero-title">
        Deploy Infrastructure
        <span class="gradient-text">at Light Speed</span>
      </h1>

      <p class="hero-description">
        Production-grade VPS hosting with NVMe Gen4 storage, KVM isolation, 
        and deployment in under 30 seconds. Start your proof of concept today.
      </p>

      <div class="hero-actions">
        <router-link to="/register" class="btn-hero-primary">
          Start POC for €0.99
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M3 8h10M8 3l5 5-5 5" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </router-link>
        <button class="btn-hero-secondary" @click="scrollToDocs">
          View Documentation
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M14 9v5a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V9M8 2v10M8 2L4 6M8 2l4 4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </button>
      </div>

      <!-- Alternative: Lien vers connexion pour les users existants -->
      <div class="hero-signin">
        <p>Already have an account? <router-link to="/login" class="signin-link">Sign in</router-link></p>
      </div>

      <div class="stats-bar">
        <div class="stat">
          <div class="stat-icon">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/>
            </svg>
          </div>
          <div class="stat-value">7000 MB/s</div>
          <div class="stat-label">NVMe Speed</div>
        </div>
        <div class="stat-divider"></div>
        <div class="stat">
          <div class="stat-icon">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>
            </svg>
          </div>
          <div class="stat-value">99.99%</div>
          <div class="stat-label">Uptime SLA</div>
        </div>
        <div class="stat-divider"></div>
        <div class="stat">
          <div class="stat-icon">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
              <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
            </svg>
          </div>
          <div class="stat-value">KVM</div>
          <div class="stat-label">Isolation</div>
        </div>
        <div class="stat-divider"></div>
        <div class="stat">
          <div class="stat-icon">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <circle cx="12" cy="12" r="10"/>
              <polyline points="12 6 12 12 16 14"/>
            </svg>
          </div>
          <div class="stat-value">&lt;30s</div>
          <div class="stat-label">Deploy Time</div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'Hero',
  methods: {
    scrollToPricing() {
      document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' })
    },
    scrollToDocs() {
      // Redirection vers la doc ou scroll vers une section
      console.log('View documentation')
    }
  }
}
</script>

<style scoped>
.hero {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 80px 40px 40px;
  position: relative;
  overflow: hidden;
  background: #000;
}

/* Orbes flottants - mieux répartis avec offsets différents */
.floating-orb {
  position: absolute;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(64, 251, 220, 0.3), transparent);
  filter: blur(60px);
  pointer-events: none;
}

.orb-1 {
  width: 400px;
  height: 400px;
  top: 10%;
  left: 5%;
  animation: float1 20s ease-in-out infinite;
}

.orb-2 {
  width: 350px;
  height: 350px;
  top: 60%;
  right: 10%;
  animation: float2 18s ease-in-out infinite;
}

.orb-3 {
  width: 300px;
  height: 300px;
  bottom: 15%;
  left: 15%;
  animation: float3 22s ease-in-out infinite;
}

.orb-4 {
  width: 250px;
  height: 250px;
  top: 30%;
  right: 20%;
  animation: float4 19s ease-in-out infinite;
}

.orb-5 {
  width: 320px;
  height: 320px;
  bottom: 30%;
  right: 5%;
  animation: float5 21s ease-in-out infinite;
}

.orb-6 {
  width: 280px;
  height: 280px;
  top: 50%;
  left: 40%;
  animation: float6 17s ease-in-out infinite;
}

/* Animations avec offsets différents pour chaque orbe */
@keyframes float1 {
  0%, 100% {
    transform: translate(0, 0) scale(1);
    opacity: 0.3;
  }
  25% {
    transform: translate(50px, -40px) scale(1.1);
    opacity: 0.4;
  }
  50% {
    transform: translate(-30px, 30px) scale(0.9);
    opacity: 0.25;
  }
  75% {
    transform: translate(30px, 40px) scale(1.05);
    opacity: 0.35;
  }
}

@keyframes float2 {
  0%, 100% {
    transform: translate(0, 0) scale(1);
    opacity: 0.3;
  }
  25% {
    transform: translate(-40px, 50px) scale(0.95);
    opacity: 0.35;
  }
  50% {
    transform: translate(30px, -30px) scale(1.05);
    opacity: 0.4;
  }
  75% {
    transform: translate(-20px, -40px) scale(0.9);
    opacity: 0.3;
  }
}

@keyframes float3 {
  0%, 100% {
    transform: translate(0, 0) scale(1);
    opacity: 0.3;
  }
  25% {
    transform: translate(40px, 30px) scale(1.1);
    opacity: 0.4;
  }
  50% {
    transform: translate(-50px, -20px) scale(0.85);
    opacity: 0.25;
  }
  75% {
    transform: translate(20px, -30px) scale(1.05);
    opacity: 0.35;
  }
}

@keyframes float4 {
  0%, 100% {
    transform: translate(0, 0) scale(1);
    opacity: 0.3;
  }
  25% {
    transform: translate(-30px, -50px) scale(0.9);
    opacity: 0.35;
  }
  50% {
    transform: translate(40px, 40px) scale(1.1);
    opacity: 0.4;
  }
  75% {
    transform: translate(-40px, 20px) scale(0.95);
    opacity: 0.3;
  }
}

@keyframes float5 {
  0%, 100% {
    transform: translate(0, 0) scale(1);
    opacity: 0.3;
  }
  25% {
    transform: translate(30px, 40px) scale(1.05);
    opacity: 0.4;
  }
  50% {
    transform: translate(-40px, -30px) scale(0.9);
    opacity: 0.25;
  }
  75% {
    transform: translate(50px, -20px) scale(1.1);
    opacity: 0.35;
  }
}

@keyframes float6 {
  0%, 100% {
    transform: translate(0, 0) scale(1);
    opacity: 0.3;
  }
  25% {
    transform: translate(-50px, 30px) scale(0.85);
    opacity: 0.35;
  }
  50% {
    transform: translate(40px, -40px) scale(1.15);
    opacity: 0.4;
  }
  75% {
    transform: translate(-30px, -50px) scale(0.95);
    opacity: 0.3;
  }
}

.hero-content {
  max-width: 900px;
  text-align: center;
  position: relative;
  z-index: 1;
}

.hero-badge {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 8px 16px;
  background: rgba(64, 251, 220, 0.1);
  border: 1px solid rgba(64, 251, 220, 0.3);
  border-radius: 20px;
  font-size: 13px;
  font-weight: 600;
  color: #40FBDC;
  margin-bottom: 32px;
  animation: fadeInUp 0.8s ease-out;
}

.pulse-dot {
  width: 8px;
  height: 8px;
  background: #40FBDC;
  border-radius: 50%;
  animation: pulse 2s ease-in-out infinite;
}

@keyframes pulse {
  0%, 100% {
    opacity: 1;
    transform: scale(1);
  }
  50% {
    opacity: 0.5;
    transform: scale(1.2);
  }
}

.hero-title {
  font-size: 72px;
  font-weight: 800;
  line-height: 1.1;
  margin-bottom: 24px;
  color: #fff;
  letter-spacing: -0.02em;
  animation: fadeInUp 0.8s ease-out 0.2s backwards;
}

.gradient-text {
  background: linear-gradient(135deg, #40FBDC, #00D9FF);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  display: block;
}

.hero-description {
  font-size: 20px;
  line-height: 1.6;
  color: rgba(255, 255, 255, 0.7);
  margin-bottom: 40px;
  max-width: 700px;
  margin-left: auto;
  margin-right: auto;
  animation: fadeInUp 0.8s ease-out 0.4s backwards;
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.hero-actions {
  display: flex;
  gap: 16px;
  justify-content: center;
  margin-bottom: 20px;
  animation: fadeInUp 0.8s ease-out 0.6s backwards;
}

.btn-hero-primary {
  background: #40FBDC;
  color: #000;
  border: none;
  padding: 16px 32px;
  border-radius: 12px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 10px;
  transition: all 0.3s;
  box-shadow: 0 8px 24px rgba(64, 251, 220, 0.35);
  text-decoration: none;
}

.btn-hero-primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 12px 32px rgba(64, 251, 220, 0.5);
}

.btn-hero-secondary {
  background: rgba(255, 255, 255, 0.05);
  color: #fff;
  border: 1px solid rgba(255, 255, 255, 0.15);
  padding: 16px 32px;
  border-radius: 12px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 10px;
  transition: all 0.3s;
  backdrop-filter: blur(10px);
}

.btn-hero-secondary:hover {
  background: rgba(255, 255, 255, 0.1);
  border-color: rgba(255, 255, 255, 0.3);
}

/* Sign in link */
.hero-signin {
  text-align: center;
  margin-bottom: 40px;
  animation: fadeInUp 0.8s ease-out 0.7s backwards;
}

.hero-signin p {
  font-size: 14px;
  color: rgba(255, 255, 255, 0.6);
}

.signin-link {
  color: #40FBDC;
  text-decoration: none;
  font-weight: 600;
  transition: opacity 0.2s;
}

.signin-link:hover {
  opacity: 0.8;
  text-decoration: underline;
}

.stats-bar {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 32px;
  padding: 24px;
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 16px;
  backdrop-filter: blur(10px);
  animation: fadeInUp 0.8s ease-out 0.8s backwards;
}

.stat {
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  transition: all 0.3s;
}

.stat-icon {
  width: 48px;
  height: 48px;
  background: linear-gradient(135deg, rgba(64, 251, 220, 0.15), rgba(64, 251, 220, 0.05));
  border: 1px solid rgba(64, 251, 220, 0.2);
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 12px;
  transition: all 0.3s;
}

.stat-icon svg {
  color: #40FBDC;
  stroke: #40FBDC;
}

.stat:hover .stat-icon {
  background: linear-gradient(135deg, rgba(64, 251, 220, 0.25), rgba(64, 251, 220, 0.1));
  border-color: rgba(64, 251, 220, 0.4);
  transform: translateY(-2px);
  box-shadow: 0 8px 20px rgba(64, 251, 220, 0.2);
}

.stat-value {
  font-size: 20px;
  font-weight: 700;
  color: #fff;
  margin-bottom: 4px;
}

.stat-label {
  font-size: 12px;
  color: rgba(255, 255, 255, 0.5);
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.stat-divider {
  width: 1px;
  height: 80px;
  background: rgba(255, 255, 255, 0.1);
}

/* Responsive */
@media (max-width: 768px) {
  .hero {
    padding: 100px 24px 40px;
  }

  .hero-title {
    font-size: 42px;
  }

  .hero-description {
    font-size: 16px;
  }

  .hero-actions {
    flex-direction: column;
  }

  .btn-hero-primary,
  .btn-hero-secondary {
    width: 100%;
    justify-content: center;
  }

  .stats-bar {
    flex-wrap: wrap;
    gap: 20px;
  }

  .stat-divider {
    display: none;
  }

  .floating-orb {
    filter: blur(40px);
  }
  
  .orb-1 { width: 250px; height: 250px; }
  .orb-2 { width: 220px; height: 220px; }
  .orb-3 { width: 200px; height: 200px; }
  .orb-4 { width: 180px; height: 180px; }
  .orb-5 { width: 200px; height: 200px; }
  .orb-6 { width: 190px; height: 190px; }
}
</style>