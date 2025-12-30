<template>
  <div class="page">
  <NavBar/>

    <!-- Hero -->
    <section class="hero">
      <div class="hero-background">
        <div class="gradient-orb orb-1"></div>
        <div class="gradient-orb orb-2"></div>
        <div class="gradient-orb orb-3"></div>
      </div>
      
      <div class="hero-content">
        <div class="hero-badge">
          <span class="pulse-dot"></span>
          <span>POC Offer • Starting at €0.99/mo</span>
        </div>
        
        <h1 class="hero-title">
          Infrastructure that
          <span class="gradient-text">scales with speed</span>
        </h1>
        
        <p class="hero-subtitle">
          Deploy KVM-isolated virtual servers in seconds. Built for developers who demand performance, security, and simplicity.
        </p>

        <div class="hero-actions">
          <button class="btn-hero-primary" @click="scrollToOffers">
            <span>Deploy Now</span>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M3 8h10M8 3l5 5-5 5" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </button>
          <button class="btn-hero-secondary">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
              <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="2"/>
              <path d="M10 8l6 4-6 4V8z" fill="currentColor"/>
            </svg>
            <span>Watch Demo</span>
          </button>
        </div>

        <!-- Stats Bar -->
        <div class="stats-bar">
          <div class="stat-item">
            <div class="stat-icon">⚡</div>
            <div class="stat-content">
              <div class="stat-value">7000 MB/s</div>
              <div class="stat-label">NVMe Speed</div>
            </div>
          </div>
          <div class="stat-divider"></div>
          <div class="stat-item">
            <div class="stat-icon">🌍</div>
            <div class="stat-content">
              <div class="stat-value">99.99%</div>
              <div class="stat-label">Uptime SLA</div>
            </div>
          </div>
          <div class="stat-divider"></div>
          <div class="stat-item">
            <div class="stat-icon">🔒</div>
            <div class="stat-content">
              <div class="stat-value">KVM</div>
              <div class="stat-label">Full Isolation</div>
            </div>
          </div>
          <div class="stat-divider"></div>
          <div class="stat-item">
            <div class="stat-icon">⏱️</div>
            <div class="stat-content">
              <div class="stat-value">&lt;30s</div>
              <div class="stat-label">Deploy Time</div>
            </div>
          </div>
        </div>
      </div>

      <!-- Floating Terminal -->
      <div class="terminal-container">
        <div class="terminal">
          <div class="terminal-header">
            <div class="terminal-dots">
              <span class="dot red"></span>
              <span class="dot yellow"></span>
              <span class="dot green"></span>
            </div>
            <div class="terminal-title">deployment.log</div>
            <div class="terminal-actions">
              <svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor" opacity="0.5">
                <path d="M4 6h8v1H4zM4 9h8v1H4z"/>
              </svg>
            </div>
          </div>
          <div class="terminal-body">
            <div class="log-line">
              <span class="timestamp">[12:34:56]</span>
              <span class="log-info">🚀 Initializing deployment...</span>
            </div>
            <div class="log-line">
              <span class="timestamp">[12:34:57]</span>
              <span class="log-success">✓ NVMe storage allocated</span>
            </div>
            <div class="log-line">
              <span class="timestamp">[12:34:58]</span>
              <span class="log-success">✓ KVM instance provisioned</span>
            </div>
            <div class="log-line">
              <span class="timestamp">[12:35:01]</span>
              <span class="log-success">✓ IPv6 network configured</span>
            </div>
            <div class="log-line">
              <span class="timestamp">[12:35:02]</span>
              <span class="log-highlight">🎉 Server ready at vps-prod-7x8k.cloudvps.io</span>
            </div>
            <div class="log-line cursor">
              <span class="prompt">root@cloudvps:~$</span>
              <span class="cursor-blink">_</span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Features -->
    <section id="features" class="features-section">
      <div class="section-header">
        <div class="section-tag">FEATURES</div>
        <h2>Built for modern infrastructure</h2>
        <p>Everything you need to run production workloads at scale</p>
      </div>

      <div class="features-grid">
        <div 
          class="feature-card" 
          v-for="(feature, idx) in features" 
          :key="feature.id"
          :style="{ animationDelay: `${idx * 0.1}s` }"
        >
          <div class="feature-icon-wrapper">
            <div class="feature-icon">{{ feature.icon }}</div>
          </div>
          <h3>{{ feature.title }}</h3>
          <p>{{ feature.description }}</p>
          <div class="feature-shine"></div>
        </div>
      </div>
    </section>

    <!-- Pricing -->
    <section id="pricing" class="pricing-section">
      <div class="section-header">
        <div class="section-tag">PRICING</div>
        <h2>Proof of Concept</h2>
        <p>Limited availability. Test our infrastructure for less than a coffee.</p>
      </div>

      <div class="pricing-single">
        <div class="pricing-card-poc">
          <div class="poc-badge">
            <svg width="12" height="12" viewBox="0 0 16 16" fill="currentColor">
              <path d="M8 0l2.5 5.5L16 6.5l-4 4 1 6-5-2.5L3 16.5l1-6-4-4 5.5-1L8 0z"/>
            </svg>
            POC Offer
          </div>

          <div class="plan-header">
            <div class="plan-name">VPS Starter POC</div>
            <div class="plan-description">Limited time proof of concept offer</div>
          </div>

          <div class="plan-price-poc">
            <span class="price-symbol">€</span>
            <span class="price-amount">0.99</span>
            <span class="price-period">/mo</span>
          </div>

          <div class="price-notice">
            First month only • Then €4.99/mo or cancel anytime
          </div>

          <button 
            class="plan-cta-poc"
            @click="selectPlan(pocPlan)"
            :disabled="orderingPlan === 'poc'"
          >
            {{ orderingPlan === 'poc' ? 'Processing...' : 'Start POC Now' }}
            <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
              <path d="M3 8h10M8 3l5 5-5 5" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </button>

          <div class="plan-features">
            <div class="feature-group-title">Included</div>
            <div class="feature-item" v-for="(feature, idx) in pocPlan.features" :key="idx">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <circle cx="8" cy="8" r="7" stroke="currentColor" stroke-width="1.5" opacity="0.3"/>
                <path d="M5 8l2 2 4-4" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
              <span>{{ feature }}</span>
            </div>
          </div>

          <div class="poc-footer">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" opacity="0.5">
              <path d="M8 0a8 8 0 100 16A8 8 0 008 0zm1 12H7V7h2v5zm0-6H7V4h2v2z"/>
            </svg>
            <span>Limited slots available • Cancel anytime</span>
          </div>
        </div>
      </div>
    </section>

    <!-- Tech Stack -->
    <section id="tech" class="tech-section">
      <div class="section-header">
        <div class="section-tag">TECHNOLOGY</div>
        <h2>Enterprise-grade stack</h2>
        <p>Powered by industry-leading open source technologies</p>
      </div>

      <div class="tech-showcase">
        <div class="tech-item" v-for="tech in technologies" :key="tech.name">
          <div class="tech-icon-bg">
            <div class="tech-icon">{{ tech.icon }}</div>
          </div>
          <div class="tech-name">{{ tech.name }}</div>
          <div class="tech-description">{{ tech.description }}</div>
        </div>
      </div>
    </section>

    <!-- CTA -->
    <section class="cta-section">
      <div class="cta-card">
        <div class="cta-content">
          <h2>Ready to deploy?</h2>
          <p>Start building on infrastructure that scales with your ambitions</p>
          <div class="cta-actions">
            <button class="btn-cta-primary" @click="scrollToOffers">
              Deploy Your First Server
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M3 8h10M8 3l5 5-5 5" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </button>
            <button class="btn-cta-secondary">
              Talk to Sales
            </button>
          </div>
        </div>
        <div class="cta-visual">
          <div class="stats-grid-cta">
            <div class="stat-card">
              <div class="stat-number">10k+</div>
              <div class="stat-text">Active Servers</div>
            </div>
            <div class="stat-card">
              <div class="stat-number">50ms</div>
              <div class="stat-text">Avg Latency</div>
            </div>
            <div class="stat-card">
              <div class="stat-number">24/7</div>
              <div class="stat-text">Support</div>
            </div>
            <div class="stat-card">
              <div class="stat-number">100%</div>
              <div class="stat-text">SSD NVMe</div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Footer -->
    <footer class="footer">
      <div class="footer-content">
        <div class="footer-main">
          <div class="footer-brand">
            <div class="footer-logo">
              <div class="logo-symbol">
                <div class="cube">
                  <div class="cube-face"></div>
                  <div class="cube-face"></div>
                  <div class="cube-face"></div>
                </div>
              </div>
              <span>CloudVPS</span>
            </div>
            <p class="footer-tagline">Infrastructure at the speed of thought</p>
            <div class="footer-social">
              <a href="#" class="social-link">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"/>
                </svg>
              </a>
              <a href="#" class="social-link">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 00-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0020 4.77 5.07 5.07 0 0019.91 1S18.73.65 16 2.48a13.38 13.38 0 00-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 005 4.77a5.44 5.44 0 00-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 009 18.13V22"/>
                </svg>
              </a>
              <a href="#" class="social-link">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M20.317 4.37a19.791 19.791 0 00-4.885-1.515.074.074 0 00-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 00-5.487 0 12.64 12.64 0 00-.617-1.25.077.077 0 00-.079-.037A19.736 19.736 0 003.677 4.37a.07.07 0 00-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 00.031.057 19.9 19.9 0 005.993 3.03.078.078 0 00.084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 00-.041-.106 13.107 13.107 0 01-1.872-.892.077.077 0 01-.008-.128 10.2 10.2 0 00.372-.292.074.074 0 01.077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 01.078.01c.12.098.246.198.373.292a.077.077 0 01-.006.127 12.299 12.299 0 01-1.873.892.077.077 0 00-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 00.084.028 19.839 19.839 0 006.002-3.03.077.077 0 00.032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 00-.031-.03z"/>
                </svg>
              </a>
            </div>
          </div>

          <div class="footer-links">
            <div class="footer-col">
              <h4>Product</h4>
              <a href="#">Features</a>
              <a href="#">Pricing</a>
              <a href="#">Enterprise</a>
              <a href="#">Roadmap</a>
            </div>
            <div class="footer-col">
              <h4>Resources</h4>
              <a href="#">Documentation</a>
              <a href="#">API Reference</a>
              <a href="#">Guides</a>
              <a href="#">Status</a>
            </div>
            <div class="footer-col">
              <h4>Company</h4>
              <a href="#">About</a>
              <a href="#">Blog</a>
              <a href="#">Careers</a>
              <a href="#">Contact</a>
            </div>
            <div class="footer-col">
              <h4>Legal</h4>
              <a href="#">Privacy</a>
              <a href="#">Terms</a>
              <a href="#">Security</a>
              <a href="#">SLA</a>
            </div>
          </div>
        </div>

        <div class="footer-bottom">
          <p>© 2024 CloudVPS. All rights reserved.</p>
          <div class="footer-meta">
            <span>Built with ⚡ by developers, for developers</span>
          </div>
        </div>
      </div>
    </footer>

    <!-- Order Modal -->
    <div v-if="showModal" class="modal-overlay" @click="closeModal">
      <div class="modal" @click.stop>
        <button class="modal-close" @click="closeModal">
          <svg width="20" height="20" viewBox="0 0 16 16" fill="none">
            <path d="M12 4L4 12M4 4l8 8" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
          </svg>
        </button>
        
        <div class="modal-header">
          <h2>Deploy {{ selectedPlan?.name }}</h2>
          <p>Configure your server instance</p>
        </div>

        <div class="modal-body">
          <div class="form-group">
            <label>Server Hostname</label>
            <input 
              v-model="orderForm.hostname" 
              type="text" 
              placeholder="my-production-server"
              class="input-field"
            />
          </div>

          <div class="form-group">
            <label>Operating System</label>
            <select v-model="orderForm.os" class="select-field">
              <option value="ubuntu">Ubuntu 24.04 LTS</option>
              <option value="debian">Debian 12</option>
              <option value="rocky">Rocky Linux 9</option>
              <option value="arch">Arch Linux</option>
            </select>
          </div>

          <div class="form-group">
            <label>Data Center Region</label>
            <select v-model="orderForm.region" class="select-field">
              <option value="paris">🇫🇷 Paris, France</option>
              <option value="frankfurt">🇩🇪 Frankfurt, Germany</option>
              <option value="amsterdam">🇳🇱 Amsterdam, Netherlands</option>
            </select>
          </div>

          <div class="summary-box">
            <div class="summary-title">Order Summary</div>
            <div class="summary-line">
              <span>{{ selectedPlan?.name }}</span>
              <span>€{{ selectedPlan?.price }}/mo</span>
            </div>
            <div class="summary-line small">
              <span>First month (POC)</span>
              <span>€0.99</span>
            </div>
            <div class="summary-line total">
              <span>Due Today</span>
              <span>€0.99</span>
            </div>
          </div>
        </div>

        <div class="modal-footer">
          <button class="btn-modal-secondary" @click="closeModal">Cancel</button>
          <button class="btn-modal-primary" @click="confirmOrder">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M13 5L6 12L3 9" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
            Deploy Server
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import NavBar from './components/NavBar.vue'


export default {
  name: 'CloudVpsPOC',
  components: {
    NavBar  
  },
  data() {
    return {
      orderingPlan: null,
      showModal: false,
      selectedPlan: null,
      orderForm: {
        hostname: '',
        os: 'ubuntu',
        region: 'paris'
      },
      pocPlan: {
        id: 'poc',
        name: 'VPS Starter POC',
        price: '0.99',
        features: [
          '1 vCPU Core',
          '2 GB RAM',
          '20 GB NVMe SSD',
          '1 TB Bandwidth',
          'Native IPv6',
          'KVM Isolation',
          'Weekly Snapshots'
        ]
      },
      features: [
        {
          id: 1,
          icon: '⚡',
          title: 'Ultra-fast NVMe',
          description: 'NVMe Gen4 storage with speeds up to 7000 MB/s for maximum performance and low latency'
        },
        {
          id: 2,
          icon: '🔒',
          title: 'KVM Isolation',
          description: 'Full hardware virtualization with dedicated resources and enterprise-grade security'
        },
        {
          id: 3,
          icon: '🌍',
          title: 'Native IPv6',
          description: 'Native IPv6 support with optional IPv4. Future-proof your infrastructure today'
        },
        {
          id: 4,
          icon: '📊',
          title: '24/7 Monitoring',
          description: 'Real-time server monitoring with intelligent alerts and performance insights'
        },
        {
          id: 5,
          icon: '🔄',
          title: 'Auto Snapshots',
          description: 'Automated daily backups with instant restore. Never lose your data again'
        },
        {
          id: 6,
          icon: '🚀',
          title: 'Full API',
          description: 'Complete REST API with CLI tools. Automate everything from deployment to scaling'
        }
      ],
      technologies: [
        { name: 'KVM', icon: '🖥️', description: 'Hypervisor' },
        { name: 'NVMe', icon: '⚡', description: 'Storage' },
        { name: 'Linux', icon: '🐧', description: 'OS' },
        { name: 'Docker', icon: '🐳', description: 'Containers' },
        { name: 'Kubernetes', icon: '☸️', description: 'Orchestration' },
        { name: 'Terraform', icon: '🏗️', description: 'IaC' }
      ]
    }
  },
  methods: {
    scrollToOffers() {
      document.getElementById('pricing').scrollIntoView({ behavior: 'smooth' });
    },
    async selectPlan(plan) {
      this.selectedPlan = plan;
      this.showModal = true;
    },
    closeModal() {
      this.showModal = false;
      this.selectedPlan = null;
      this.orderForm = {
        hostname: '',
        os: 'ubuntu',
        region: 'paris'
      };
    },
    async confirmOrder() {
      this.orderingPlan = this.selectedPlan.id;
      
      try {
        await new Promise(resolve => setTimeout(resolve, 1500));
        alert(`✅ Server "${this.orderForm.hostname || 'vps-' + Date.now()}" deployed!\n\nPlan: ${this.selectedPlan.name}\nOS: ${this.orderForm.os}\nRegion: ${this.orderForm.region}\n\nFirst month: €0.99\nThen: €4.99/mo\n\nYour server will be ready in 30 seconds.`);
        this.closeModal();
      } finally {
        this.orderingPlan = null;
      }
    }
  }
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.page {
  min-height: 100vh;
  background: #000;
  color: #fff;
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
  overflow-x: hidden;
}

/* Navbar */
.navbar {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  background: rgba(0, 0, 0, 0.6);
  backdrop-filter: blur(20px) saturate(180%);
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
  z-index: 100;
}

.nav-content {
  max-width: 1400px;
  margin: 0 auto;
  padding: 14px 40px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.logo {
  display: flex;
  align-items: center;
  gap: 10px;
}

.logo-symbol {
  width: 28px;
  height: 28px;
  position: relative;
}

.cube {
  width: 100%;
  height: 100%;
  position: relative;
  transform-style: preserve-3d;
  animation: rotateCube 8s infinite linear;
}

@keyframes rotateCube {
  0% { transform: rotateX(0deg) rotateY(0deg); }
  100% { transform: rotateX(360deg) rotateY(360deg); }
}

.cube-face {
  position: absolute;
  width: 100%;
  height: 100%;
  background: linear-gradient(135deg, rgba(64, 251, 220, 0.3), rgba(64, 251, 220, 0.1));
  border: 1px solid rgba(64, 251, 220, 0.5);
  backdrop-filter: blur(10px);
}

.cube-face:nth-child(1) { transform: translateZ(14px); }
.cube-face:nth-child(2) { transform: rotateY(90deg) translateZ(14px); }
.cube-face:nth-child(3) { transform: rotateY(180deg) translateZ(14px); }

.logo-text {
  font-size: 17px;
  font-weight: 700;
  letter-spacing: -0.5px;
}

.nav-center {
  display: flex;
  gap: 32px;
}

.nav-center a {
  color: rgba(255, 255, 255, 0.7);
  text-decoration: none;
  font-size: 14px;
  font-weight: 500;
  transition: color 0.2s;
  position: relative;
}

.nav-center a::after {
  content: '';
  position: absolute;
  bottom: -6px;
  left: 0;
  width: 0;
  height: 2px;
  background: #40FBDC;
  transition: width 0.3s;
}

.nav-center a:hover {
  color: #fff;
}

.nav-center a:hover::after {
  width: 100%;
}

.nav-right {
  display: flex;
  gap: 12px;
  align-items: center;
}

.btn-ghost {
  background: transparent;
  border: none;
  color: rgba(255, 255, 255, 0.8);
  padding: 8px 16px;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
}

.btn-ghost:hover {
  background: rgba(255, 255, 255, 0.1);
  color: #fff;
}

.btn-primary {
  background: #40FBDC;
  color: #000;
  border: none;
  padding: 8px 18px;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s;
  box-shadow: 0 4px 12px rgba(64, 251, 220, 0.3);
}

.btn-primary:hover {
  transform: translateY(-1px);
  box-shadow: 0 6px 20px rgba(64, 251, 220, 0.5);
}

/* Hero */
.hero {
  padding: 140px 40px 100px;
  max-width: 1400px;
  margin: 0 auto;
  position: relative;
}

.hero-background {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 800px;
  overflow: hidden;
  pointer-events: none;
}

.gradient-orb {
  position: absolute;
  border-radius: 50%;
  filter: blur(80px);
  opacity: 0.4;
  animation: float 20s infinite ease-in-out;
}

.orb-1 {
  width: 500px;
  height: 500px;
  background: radial-gradient(circle, #40FBDC, transparent);
  top: -100px;
  left: -100px;
}

.orb-2 {
  width: 400px;
  height: 400px;
  background: radial-gradient(circle, #40FBDC, transparent);
  top: 200px;
  right: -50px;
  animation-delay: -7s;
}

.orb-3 {
  width: 600px;
  height: 600px;
  background: radial-gradient(circle, #40FBDC, transparent);
  bottom: -200px;
  left: 50%;
  animation-delay: -14s;
}

@keyframes float {
  0%, 100% { transform: translate(0, 0) scale(1); }
  33% { transform: translate(50px, -50px) scale(1.1); }
  66% { transform: translate(-50px, 50px) scale(0.9); }
}

.hero-content {
  position: relative;
  z-index: 1;
  max-width: 900px;
}

.hero-badge {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  padding: 8px 18px;
  border-radius: 24px;
  font-size: 13px;
  font-weight: 500;
  color: rgba(255, 255, 255, 0.9);
  margin-bottom: 32px;
  backdrop-filter: blur(10px);
}

.pulse-dot {
  width: 8px;
  height: 8px;
  background: #40FBDC;
  border-radius: 50%;
  position: relative;
  animation: pulse-ring 2s infinite;
}

@keyframes pulse-ring {
  0% { box-shadow: 0 0 0 0 rgba(64, 251, 220, 0.7); }
  70% { box-shadow: 0 0 0 10px rgba(64, 251, 220, 0); }
  100% { box-shadow: 0 0 0 0 rgba(64, 251, 220, 0); }
}

.hero-title {
  font-size: 72px;
  font-weight: 800;
  line-height: 1.1;
  margin-bottom: 24px;
  letter-spacing: -0.03em;
}

.gradient-text {
  background: linear-gradient(135deg, #40FBDC 0%, #00D9FF 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  display: block;
}

.hero-subtitle {
  font-size: 20px;
  line-height: 1.7;
  color: rgba(255, 255, 255, 0.6);
  margin-bottom: 40px;
  max-width: 600px;
}

.hero-actions {
  display: flex;
  gap: 16px;
  margin-bottom: 60px;
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
  border-color: rgba(255, 255, 255, 0.25);
}

/* Stats Bar */
.stats-bar {
  display: flex;
  align-items: center;
  gap: 32px;
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.08);
  padding: 24px 32px;
  border-radius: 16px;
  backdrop-filter: blur(20px);
}

.stat-item {
  display: flex;
  align-items: center;
  gap: 12px;
}

.stat-icon {
  font-size: 24px;
}

.stat-value {
  font-size: 20px;
  font-weight: 700;
  color: #fff;
  line-height: 1;
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
  height: 32px;
  background: rgba(255, 255, 255, 0.1);
}

/* Terminal */
.terminal-container {
  position: absolute;
  right: 40px;
  top: 200px;
  width: 520px;
  animation: fadeInUp 0.8s ease-out 0.3s backwards;
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

.terminal {
  background: rgba(0, 0, 0, 0.6);
  border: 1px solid rgba(255, 255, 255, 0.12);
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(20px);
}

.terminal-header {
  background: rgba(255, 255, 255, 0.05);
  padding: 12px 16px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
}

.terminal-dots {
  display: flex;
  gap: 8px;
}

.dot {
  width: 12px;
  height: 12px;
  border-radius: 50%;
}

.dot.red { background: #ff5f56; }
.dot.yellow { background: #ffbd2e; }
.dot.green { background: #27c93f; }

.terminal-title {
  font-size: 12px;
  color: rgba(255, 255, 255, 0.5);
  font-family: 'SF Mono', Monaco, monospace;
}

.terminal-body {
  padding: 20px;
  font-family: 'SF Mono', Monaco, monospace;
  font-size: 13px;
  line-height: 1.8;
}

.log-line {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 8px;
}

.timestamp {
  color: rgba(255, 255, 255, 0.3);
  font-size: 11px;
}

.log-info { color: rgba(255, 255, 255, 0.7); }
.log-success { color: #40FBDC; }
.log-highlight { 
  color: #40FBDC;
  font-weight: 600;
}

.cursor {
  margin-top: 12px;
}

.prompt {
  color: #40FBDC;
  font-weight: 600;
}

.cursor-blink {
  color: #fff;
  animation: blink 1s infinite;
}

@keyframes blink {
  0%, 49% { opacity: 1; }
  50%, 100% { opacity: 0; }
}

/* Sections */
.section-header {
  text-align: center;
  margin-bottom: 80px;
}

.section-tag {
  display: inline-block;
  padding: 6px 14px;
  background: rgba(64, 251, 220, 0.1);
  border: 1px solid rgba(64, 251, 220, 0.3);
  border-radius: 20px;
  font-size: 12px;
  font-weight: 700;
  color: #40FBDC;
  letter-spacing: 1px;
  margin-bottom: 20px;
}

.section-header h2 {
  font-size: 48px;
  font-weight: 800;
  margin-bottom: 16px;
  letter-spacing: -0.02em;
}

.section-header p {
  font-size: 18px;
  color: rgba(255, 255, 255, 0.6);
  max-width: 600px;
  margin: 0 auto;
}

/* Features */
.features-section {
  padding: 120px 40px;
  max-width: 1400px;
  margin: 0 auto;
}

.features-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 32px;
}

.feature-card {
  background: rgba(255, 255, 255, 0.02);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 16px;
  padding: 36px;
  position: relative;
  overflow: hidden;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  animation: fadeInUp 0.6s ease-out backwards;
}

.feature-card:hover {
  background: rgba(255, 255, 255, 0.04);
  border-color: rgba(64, 251, 220, 0.3);
  transform: translateY(-4px);
}

.feature-card:hover .feature-shine {
  transform: translateX(100%);
}

.feature-shine {
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.1), transparent);
  transition: transform 0.6s;
}

.feature-icon-wrapper {
  width: 56px;
  height: 56px;
  background: linear-gradient(135deg, rgba(64, 251, 220, 0.1), rgba(64, 251, 220, 0.05));
  border: 1px solid rgba(64, 251, 220, 0.2);
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 20px;
}

.feature-icon {
  font-size: 28px;
}

.feature-card h3 {
  font-size: 20px;
  font-weight: 700;
  margin-bottom: 12px;
  color: #fff;
}

.feature-card p {
  color: rgba(255, 255, 255, 0.6);
  line-height: 1.7;
  font-size: 15px;
}

/* Pricing POC */
.pricing-section {
  padding: 120px 40px;
  max-width: 1400px;
  margin: 0 auto;
}

.pricing-single {
  max-width: 520px;
  margin: 0 auto;
}

.pricing-card-poc {
  background: rgba(255, 255, 255, 0.02);
  border: 1px solid rgba(64, 251, 220, 0.3);
  border-radius: 24px;
  padding: 48px 40px;
  position: relative;
  box-shadow: 0 20px 60px rgba(64, 251, 220, 0.15);
}

.poc-badge {
  position: absolute;
  top: -14px;
  left: 50%;
  transform: translateX(-50%);
  background: #40FBDC;
  color: #000;
  padding: 6px 16px;
  border-radius: 20px;
  font-size: 12px;
  font-weight: 700;
  display: flex;
  align-items: center;
  gap: 6px;
  box-shadow: 0 4px 12px rgba(64, 251, 220, 0.4);
}

.plan-header {
  text-align: center;
  margin-bottom: 32px;
}

.plan-name {
  font-size: 28px;
  font-weight: 700;
  margin-bottom: 8px;
}

.plan-description {
  color: rgba(255, 255, 255, 0.6);
  font-size: 15px;
}

.plan-price-poc {
  display: flex;
  align-items: baseline;
  justify-content: center;
  margin-bottom: 12px;
}

.price-symbol {
  font-size: 32px;
  font-weight: 700;
  color: rgba(255, 255, 255, 0.8);
}

.price-amount {
  font-size: 72px;
  font-weight: 800;
  line-height: 1;
}

.price-period {
  color: rgba(255, 255, 255, 0.5);
  font-size: 20px;
  margin-left: 4px;
}

.price-notice {
  text-align: center;
  color: rgba(255, 255, 255, 0.5);
  font-size: 13px;
  margin-bottom: 32px;
  padding: 12px;
  background: rgba(64, 251, 220, 0.05);
  border-radius: 8px;
  border: 1px solid rgba(64, 251, 220, 0.1);
}

.plan-cta-poc {
  width: 100%;
  padding: 16px 24px;
  border-radius: 12px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  transition: all 0.3s;
  margin-bottom: 32px;
  background: #40FBDC;
  color: #000;
  border: none;
  box-shadow: 0 8px 24px rgba(64, 251, 220, 0.35);
}

.plan-cta-poc:hover {
  transform: translateY(-2px);
  box-shadow: 0 12px 32px rgba(64, 251, 220, 0.5);
}

.plan-cta-poc:disabled {
  opacity: 0.6;
  cursor: not-allowed;
  transform: none;
}

.plan-features {
  border-top: 1px solid rgba(255, 255, 255, 0.08);
  padding-top: 24px;
}

.feature-group-title {
  font-size: 12px;
  font-weight: 700;
  color: rgba(255, 255, 255, 0.5);
  text-transform: uppercase;
  letter-spacing: 1px;
  margin-bottom: 16px;
}

.feature-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 10px 0;
  color: rgba(255, 255, 255, 0.8);
  font-size: 15px;
}

.feature-item svg {
  color: rgba(64, 251, 220, 0.8);
  flex-shrink: 0;
}

.poc-footer {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  margin-top: 24px;
  padding-top: 24px;
  border-top: 1px solid rgba(255, 255, 255, 0.08);
  color: rgba(255, 255, 255, 0.5);
  font-size: 13px;
}

/* Tech Stack */
.tech-section {
  padding: 120px 40px;
  max-width: 1400px;
  margin: 0 auto;
}

.tech-showcase {
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  gap: 24px;
}

.tech-item {
  background: rgba(255, 255, 255, 0.02);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 16px;
  padding: 32px 24px;
  text-align: center;
  transition: all 0.3s;
}

.tech-item:hover {
  background: rgba(255, 255, 255, 0.04);
  border-color: rgba(64, 251, 220, 0.3);
  transform: translateY(-4px);
}

.tech-icon-bg {
  width: 64px;
  height: 64px;
  background: linear-gradient(135deg, rgba(64, 251, 220, 0.1), rgba(64, 251, 220, 0.05));
  border: 1px solid rgba(64, 251, 220, 0.2);
  border-radius: 14px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 16px;
}

.tech-icon {
  font-size: 32px;
}

.tech-name {
  font-size: 16px;
  font-weight: 700;
  margin-bottom: 4px;
}

.tech-description {
  font-size: 12px;
  color: rgba(255, 255, 255, 0.5);
}

/* CTA */
.cta-section {
  padding: 120px 40px;
  max-width: 1400px;
  margin: 0 auto;
}

.cta-card {
  background: linear-gradient(135deg, rgba(64, 251, 220, 0.1), rgba(64, 251, 220, 0.05));
  border: 1px solid rgba(64, 251, 220, 0.3);
  border-radius: 24px;
  padding: 80px 60px;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 60px;
  align-items: center;
  position: relative;
  overflow: hidden;
}

.cta-card::before {
  content: '';
  position: absolute;
  top: -50%;
  right: -50%;
  width: 100%;
  height: 100%;
  background: radial-gradient(circle, rgba(64, 251, 220, 0.2), transparent);
  pointer-events: none;
}

.cta-content h2 {
  font-size: 48px;
  font-weight: 800;
  margin-bottom: 16px;
  letter-spacing: -0.02em;
}

.cta-content p {
  font-size: 18px;
  color: rgba(255, 255, 255, 0.6);
  margin-bottom: 32px;
  line-height: 1.6;
}

.cta-actions {
  display: flex;
  gap: 16px;
}

.btn-cta-primary {
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
}

.btn-cta-primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 12px 32px rgba(64, 251, 220, 0.5);
}

.btn-cta-secondary {
  background: rgba(255, 255, 255, 0.05);
  color: #fff;
  border: 1px solid rgba(255, 255, 255, 0.15);
  padding: 16px 32px;
  border-radius: 12px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s;
}

.btn-cta-secondary:hover {
  background: rgba(255, 255, 255, 0.1);
}

.stats-grid-cta {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px;
}

.stat-card {
  background: rgba(0, 0, 0, 0.3);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  padding: 24px;
  text-align: center;
  backdrop-filter: blur(10px);
}

.stat-number {
  font-size: 32px;
  font-weight: 800;
  background: linear-gradient(135deg, #fff, rgba(255, 255, 255, 0.6));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  margin-bottom: 8px;
}

.stat-text {
  font-size: 13px;
  color: rgba(255, 255, 255, 0.5);
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

/* Footer */
.footer {
  border-top: 1px solid rgba(255, 255, 255, 0.08);
  padding: 80px 40px 40px;
}

.footer-content {
  max-width: 1400px;
  margin: 0 auto;
}

.footer-main {
  display: grid;
  grid-template-columns: 2fr 3fr;
  gap: 80px;
  margin-bottom: 60px;
}

.footer-brand {
  max-width: 350px;
}

.footer-logo {
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 18px;
  font-weight: 700;
  margin-bottom: 16px;
}

.footer-tagline {
  color: rgba(255, 255, 255, 0.5);
  font-size: 15px;
  line-height: 1.6;
  margin-bottom: 24px;
}

.footer-social {
  display: flex;
  gap: 12px;
}

.social-link {
  width: 40px;
  height: 40px;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: rgba(255, 255, 255, 0.6);
  transition: all 0.3s;
}

.social-link:hover {
  background: rgba(64, 251, 220, 0.2);
  border-color: rgba(64, 251, 220, 0.4);
  color: #40FBDC;
  transform: translateY(-2px);
}

.footer-links {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 40px;
}

.footer-col h4 {
  font-size: 14px;
  font-weight: 700;
  margin-bottom: 16px;
  color: rgba(255, 255, 255, 0.9);
}

.footer-col a {
  display: block;
  color: rgba(255, 255, 255, 0.5);
  text-decoration: none;
  font-size: 14px;
  margin-bottom: 12px;
  transition: color 0.2s;
}

.footer-col a:hover {
  color: #40FBDC;
}

.footer-bottom {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 40px;
  border-top: 1px solid rgba(255, 255, 255, 0.08);
}

.footer-bottom p {
  color: rgba(255, 255, 255, 0.4);
  font-size: 14px;
}

.footer-meta span {
  color: rgba(255, 255, 255, 0.4);
  font-size: 14px;
}

/* Modal */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.85);
  backdrop-filter: blur(8px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 24px;
  animation: fadeIn 0.2s ease-out;
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

.modal {
  background: rgba(10, 10, 10, 0.95);
  border: 1px solid rgba(255, 255, 255, 0.15);
  border-radius: 20px;
  padding: 40px;
  max-width: 560px;
  width: 100%;
  position: relative;
  box-shadow: 0 24px 60px rgba(0, 0, 0, 0.5);
  animation: slideUp 0.3s ease-out;
}

@keyframes slideUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.modal-close {
  position: absolute;
  top: 20px;
  right: 20px;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  width: 36px;
  height: 36px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: rgba(255, 255, 255, 0.6);
  cursor: pointer;
  transition: all 0.2s;
}

.modal-close:hover {
  background: rgba(255, 255, 255, 0.1);
  color: #fff;
}

.modal-header {
  margin-bottom: 32px;
}

.modal-header h2 {
  font-size: 28px;
  font-weight: 800;
  margin-bottom: 8px;
}

.modal-header p {
  color: rgba(255, 255, 255, 0.6);
  font-size: 15px;
}

.modal-body {
  margin-bottom: 32px;
}

.form-group {
  margin-bottom: 24px;
}

.form-group label {
  display: block;
  font-size: 14px;
  font-weight: 600;
  color: rgba(255, 255, 255, 0.8);
  margin-bottom: 8px;
}

.input-field,
.select-field {
  width: 100%;
  padding: 12px 16px;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.15);
  border-radius: 10px;
  color: #fff;
  font-size: 15px;
  font-family: inherit;
  transition: all 0.2s;
}

.input-field:focus,
.select-field:focus {
  outline: none;
  background: rgba(255, 255, 255, 0.08);
  border-color: rgba(64, 251, 220, 0.5);
  box-shadow: 0 0 0 3px rgba(64, 251, 220, 0.1);
}

.select-field {
  cursor: pointer;
}

.summary-box {
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  padding: 20px;
  margin-top: 24px;
}

.summary-title {
  font-size: 14px;
  font-weight: 700;
  color: rgba(255, 255, 255, 0.8);
  margin-bottom: 16px;
}

.summary-line {
  display: flex;
  justify-content: space-between;
  padding: 8px 0;
  color: rgba(255, 255, 255, 0.6);
  font-size: 14px;
}

.summary-line.small {
  font-size: 13px;
  color: rgba(255, 255, 255, 0.5);
}

.summary-line.total {
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  margin-top: 12px;
  padding-top: 16px;
  font-weight: 700;
  color: #fff;
  font-size: 16px;
}

.modal-footer {
  display: flex;
  gap: 12px;
  justify-content: flex-end;
}

.btn-modal-secondary {
  background: rgba(255, 255, 255, 0.05);
  color: rgba(255, 255, 255, 0.8);
  border: 1px solid rgba(255, 255, 255, 0.15);
  padding: 12px 24px;
  border-radius: 10px;
  font-size: 15px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
}

.btn-modal-secondary:hover {
  background: rgba(255, 255, 255, 0.1);
  color: #fff;
}

.btn-modal-primary {
  background: #40FBDC;
  color: #000;
  border: none;
  padding: 12px 28px;
  border-radius: 10px;
  font-size: 15px;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 8px;
  transition: all 0.3s;
  box-shadow: 0 8px 20px rgba(64, 251, 220, 0.3);
}

.btn-modal-primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 12px 28px rgba(64, 251, 220, 0.5);
}

/* Responsive */
@media (max-width: 1200px) {
  .terminal-container {
    position: static;
    width: 100%;
    margin-top: 60px;
  }

  .features-grid {
    grid-template-columns: repeat(2, 1fr);
  }

  .tech-showcase {
    grid-template-columns: repeat(3, 1fr);
  }
}

@media (max-width: 768px) {
  .nav-center {
    display: none;
  }

  .hero {
    padding: 120px 24px 80px;
  }

  .hero-title {
    font-size: 48px;
  }

  .hero-subtitle {
    font-size: 18px;
  }

  .hero-actions {
    flex-direction: column;
  }

  .stats-bar {
    flex-wrap: wrap;
    gap: 20px;
  }

  .stat-divider {
    display: none;
  }

  .features-grid {
    grid-template-columns: 1fr;
  }

  .tech-showcase {
    grid-template-columns: repeat(2, 1fr);
  }

  .cta-card {
    grid-template-columns: 1fr;
    padding: 60px 40px;
  }

  .footer-main {
    grid-template-columns: 1fr;
    gap: 40px;
  }

  .footer-links {
    grid-template-columns: repeat(2, 1fr);
  }

  .footer-bottom {
    flex-direction: column;
    gap: 16px;
    text-align: center;
  }
}
</style>
