<template>
  <section id="tech" class="tech-section">
    <div class="section-header">
      <div class="section-tag">TECHNOLOGY</div>
      <h2>Enterprise-grade stack</h2>
      <p>Powered by industry-leading open source technologies</p>
    </div>
    <div class="tech-showcase">
      <div class="tech-item" v-for="tech in technologies" :key="tech.name">
        <div class="tech-icon-bg">
          <div class="tech-icon" v-html="tech.icon"></div>
        </div>
        <div class="tech-name">{{ tech.name }}</div>
        <div class="tech-description">{{ tech.description }}</div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'TechStack',
  data() {
    return {
      technologies: [
        { 
          name: 'KVM', 
          icon: '<svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="3" width="20" height="14" rx="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg>',
          description: 'Hypervisor' 
        },
        { 
          name: 'NVMe', 
          icon: '<svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/></svg>',
          description: 'Storage' 
        },
        { 
          name: 'Linux', 
          icon: '<svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M12 2v20M2 12h20"/></svg>',
          description: 'OS' 
        },
        { 
          name: 'Docker', 
          icon: '<svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 7h-3m0 0V4m0 3v3m0-3h3m-3 0h-3M7 7V4m0 3v3m0-3h3M7 7H4m13 6h-3m0 0v-3m0 3v3m0-3h3m-3 0h-3M7 13v-3m0 3v3m0-3h3M7 13H4"/></svg>',
          description: 'Containers' 
        },
        { 
          name: 'Kubernetes', 
          icon: '<svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="3"/><path d="M12 1v6m0 6v6"/><path d="m4.2 4.2 4.2 4.2m5.6 5.6 4.2 4.2"/><path d="M1 12h6m6 0h6"/><path d="m4.2 19.8 4.2-4.2m5.6-5.6 4.2-4.2"/></svg>',
          description: 'Orchestration' 
        },
        { 
          name: 'Terraform', 
          icon: '<svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/><polyline points="14 2 14 8 20 8"/><line x1="9" y1="15" x2="15" y2="15"/></svg>',
          description: 'IaC' 
        }
      ]
    }
  }
}
</script>

<style scoped>
.tech-section {
  padding: 120px 40px;
  max-width: 1400px;
  margin: 0 auto;
}

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
  text-transform: uppercase;
}

.section-header h2 {
  font-size: 48px;
  font-weight: 800;
  margin-bottom: 16px;
  letter-spacing: -0.02em;
  color: #fff;
}

.section-header p {
  font-size: 18px;
  color: rgba(255, 255, 255, 0.6);
  max-width: 600px;
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
  box-shadow: 0 12px 40px rgba(64, 251, 220, 0.15);
}

.tech-item:hover .tech-icon-bg {
  background: linear-gradient(135deg, rgba(64, 251, 220, 0.2), rgba(64, 251, 220, 0.1));
  border-color: rgba(64, 251, 220, 0.4);
  box-shadow: 0 8px 20px rgba(64, 251, 220, 0.2);
}

.tech-item:hover .tech-icon {
  transform: scale(1.1);
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
  transition: all 0.3s;
}

.tech-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  color: #40FBDC;
  transition: transform 0.3s;
}

.tech-icon svg {
  stroke: #40FBDC;
  filter: drop-shadow(0 0 6px rgba(64, 251, 220, 0.3));
}

.tech-name {
  font-size: 16px;
  font-weight: 700;
  margin-bottom: 4px;
  color: #fff;
}

.tech-description {
  font-size: 12px;
  color: rgba(255, 255, 255, 0.5);
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

@media (max-width: 1200px) {
  .tech-showcase {
    grid-template-columns: repeat(3, 1fr);
  }
}

@media (max-width: 768px) {
  .tech-section {
    padding: 80px 24px;
  }

  .section-header h2 {
    font-size: 36px;
  }

  .tech-showcase {
    grid-template-columns: repeat(2, 1fr);
    gap: 16px;
  }

  .tech-item {
    padding: 24px 16px;
  }
}
</style>