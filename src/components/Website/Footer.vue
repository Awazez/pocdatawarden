<template>
  <footer class="footer">
    <div class="footer-content">
      <div class="footer-main">
        <div class="footer-brand">
          <div class="footer-logo">
            <div class="logo-symbol">
              <svg viewBox="0 0 42 42" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="21" cy="21" r="20" stroke="#40FBDC" stroke-opacity="0.8" stroke-width="2"/>
                <path d="M29.1428 20.5714L11.1428 10.6404L29.1428 10.2857V20.5714Z" fill="#40FBDC"/>
                <path d="M29.1428 20.8661L20.767 18.8571L6.85711 22.4928L14.9712 26.9515L14.0551 36L27.1984 28.6339L29.1428 20.8661Z" fill="#40FBDC"/>
              </svg>
            </div>
            <span class="logo-text">Almerson</span>
          </div>
          <p class="footer-tagline">Infrastructure at the speed of thought</p>
          <div class="footer-social">
            <a 
              v-for="social in socialLinks" 
              :key="social.name"
              :href="social.url" 
              class="social-link"
              :aria-label="social.name"
              target="_blank"
              rel="noopener noreferrer"
            >
              <div v-html="social.icon"></div>
            </a>
          </div>
        </div>

        <div class="footer-links">
          <div class="footer-col" v-for="column in footerColumns" :key="column.title">
            <h4>{{ column.title }}</h4>
            <a 
              v-for="link in column.links" 
              :key="link.name"
              :href="link.url"
            >
              {{ link.name }}
            </a>
          </div>
        </div>
      </div>

      <div class="footer-bottom">
        <p>© {{ currentYear }} Almerson. All rights reserved.</p>
        <div class="footer-meta">
          <span>Built with ⚡ by developers, for developers</span>
        </div>
      </div>
    </div>
  </footer>
</template>

<script>
export default {
  name: 'Footer',
  data() {
    return {
      currentYear: new Date().getFullYear(),
      socialLinks: [
        {
          name: 'Twitter',
          url: 'https://twitter.com',
          icon: '<svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"/></svg>'
        },
        {
          name: 'GitHub',
          url: 'https://github.com',
          icon: '<svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 00-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0020 4.77 5.07 5.07 0 0019.91 1S18.73.65 16 2.48a13.38 13.38 0 00-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 005 4.77a5.44 5.44 0 00-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 009 18.13V22"/></svg>'
        },
        {
          name: 'Discord',
          url: 'https://discord.com',
          icon: '<svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M20.317 4.37a19.791 19.791 0 00-4.885-1.515.074.074 0 00-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 00-5.487 0 12.64 12.64 0 00-.617-1.25.077.077 0 00-.079-.037A19.736 19.736 0 003.677 4.37a.07.07 0 00-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 00.031.057 19.9 19.9 0 005.993 3.03.078.078 0 00.084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 00-.041-.106 13.107 13.107 0 01-1.872-.892.077.077 0 01-.008-.128 10.2 10.2 0 00.372-.292.074.074 0 01.077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 01.078.01c.12.098.246.198.373.292a.077.077 0 01-.006.127 12.299 12.299 0 01-1.873.892.077.077 0 00-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 00.084.028 19.839 19.839 0 006.002-3.03.077.077 0 00.032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 00-.031-.03z"/></svg>'
        }
      ],
      footerColumns: [
        {
          title: 'Product',
          links: [
            { name: 'Features', url: '#features' },
            { name: 'Pricing', url: '#pricing' },
            { name: 'Enterprise', url: '#' },
            { name: 'Roadmap', url: '#' }
          ]
        },
        {
          title: 'Resources',
          links: [
            { name: 'Documentation', url: '#' },
            { name: 'API Reference', url: '#' },
            { name: 'Guides', url: '#' },
            { name: 'Status', url: '#' }
          ]
        },
        {
          title: 'Company',
          links: [
            { name: 'About', url: '#' },
            { name: 'Blog', url: '#' },
            { name: 'Careers', url: '#' },
            { name: 'Contact', url: '#contact' }
          ]
        },
        {
          title: 'Legal',
          links: [
            { name: 'Privacy', url: '#' },
            { name: 'Terms', url: '#' },
            { name: 'Security', url: '#' },
            { name: 'SLA', url: '#' }
          ]
        }
      ]
    }
  }
}
</script>

<style scoped>
/* Footer */
.footer {
  border-top: 1px solid rgba(255, 255, 255, 0.08);
  padding: 80px 40px 40px;
  background: #000;
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
  gap: 12px;
  margin-bottom: 16px;
}

.logo-symbol {
  width: 36px;
  height: 36px;
  animation: logoFloat 4s ease-in-out infinite;
}

.logo-symbol svg {
  width: 100%;
  height: 100%;
  filter: drop-shadow(0 0 8px rgba(64, 251, 220, 0.4));
}

@keyframes logoFloat {
  0%, 100% { 
    transform: translateY(0) rotate(0deg); 
  }
  50% { 
    transform: translateY(-4px) rotate(2deg); 
  }
}

.logo-text {
  font-family: "Montserrat", sans-serif;
  font-weight: 700;
  font-style: normal;
  font-size: 18px;
  letter-spacing: -0.5px;
  color: #fff;
  text-shadow: 0 0 20px rgba(64, 251, 220, 0.3);
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
  cursor: pointer;
}

.social-link:hover {
  background: rgba(64, 251, 220, 0.2);
  border-color: rgba(64, 251, 220, 0.4);
  color: #40FBDC;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(64, 251, 220, 0.3);
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
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.footer-col a {
  display: block;
  color: rgba(255, 255, 255, 0.5);
  text-decoration: none;
  font-size: 14px;
  margin-bottom: 12px;
  transition: all 0.2s;
  position: relative;
  padding-left: 0;
}

.footer-col a::before {
  content: '';
  position: absolute;
  left: -12px;
  top: 50%;
  transform: translateY(-50%);
  width: 0;
  height: 2px;
  background: #40FBDC;
  transition: width 0.3s;
}

.footer-col a:hover {
  color: #40FBDC;
  padding-left: 12px;
}

.footer-col a:hover::before {
  width: 6px;
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

/* Responsive */
@media (max-width: 1024px) {
  .footer-main {
    grid-template-columns: 1fr;
    gap: 60px;
  }

  .footer-brand {
    max-width: 100%;
  }

  .footer-links {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 768px) {
  .footer {
    padding: 60px 24px 40px;
  }

  .footer-links {
    grid-template-columns: 1fr;
    gap: 32px;
  }

  .footer-bottom {
    flex-direction: column;
    gap: 16px;
    text-align: center;
  }
}
</style>