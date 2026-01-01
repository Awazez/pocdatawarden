<template>
  <nav class="navbar">
    <div class="nav-content">
      <router-link to="/" class="logo">
        <div class="logo-symbol">
          <svg viewBox="0 0 42 42" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="21" cy="21" r="20" stroke="#40FBDC" stroke-opacity="0.8" stroke-width="2"/>
            <path d="M29.1428 20.5714L11.1428 10.6404L29.1428 10.2857V20.5714Z" fill="#40FBDC"/>
            <path d="M29.1428 20.8661L20.767 18.8571L6.85711 22.4928L14.9712 26.9515L14.0551 36L27.1984 28.6339L29.1428 20.8661Z" fill="#40FBDC"/>
          </svg>
        </div>
        <span class="logo-text">Almerson</span>
      </router-link>

      <div class="nav-center">
        <a href="#features">Features</a>
        <a href="#pricing">Pricing</a>
        <a href="#tech">Technology</a>
        <a href="#contact">Contact</a>
      </div>

      <div class="nav-right">
        <button class="btn-ghost">Documentation</button>
        <router-link to="/login" class="btn-login">Sign in</router-link>
        <router-link to="/register" class="btn-primary">Get Started</router-link>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  name: 'Navbar',
  methods: {
    scrollToOffers() {
      const pricingSection = document.getElementById('pricing');
      if (pricingSection) {
        pricingSection.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100..900;1,100..900&display=swap');

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

/* Logo */
.logo {
  display: flex;
  align-items: center;
  gap: 12px;
  cursor: pointer;
  text-decoration: none;
}

.logo-symbol {
  width: 38px;
  height: 38px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.logo-symbol svg {
  width: 100%;
  height: 100%;
  filter: drop-shadow(0 0 8px rgba(64, 251, 220, 0.4));
  transition: filter 0.3s;
}

.logo:hover .logo-symbol svg {
  filter: drop-shadow(0 0 16px rgba(64, 251, 220, 0.8));
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

/* Navigation Center */
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

/* Navigation Right */
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

.btn-login {
  background: transparent;
  border: 1px solid rgba(255, 255, 255, 0.2);
  color: rgba(255, 255, 255, 0.9);
  padding: 8px 18px;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
  text-decoration: none;
  display: inline-flex;
  align-items: center;
}

.btn-login:hover {
  background: rgba(255, 255, 255, 0.1);
  border-color: rgba(255, 255, 255, 0.3);
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
  text-decoration: none;
  display: inline-flex;
  align-items: center;
}

.btn-primary:hover {
  transform: translateY(-1px);
  box-shadow: 0 6px 20px rgba(64, 251, 220, 0.5);
}

/* Responsive */
@media (max-width: 768px) {
  .nav-content {
    padding: 14px 24px;
  }

  .nav-center {
    display: none;
  }

  .btn-ghost {
    display: none;
  }

  .logo-symbol {
    width: 32px;
    height: 32px;
  }

  .logo-text {
    font-size: 16px;
  }
}
</style>

