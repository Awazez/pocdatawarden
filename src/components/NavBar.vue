<template>
  <nav class="navbar">
    <div class="nav-content">
      <div class="logo">
        <div class="logo-symbol">
          <div class="cube">
            <div class="cube-face"></div>
            <div class="cube-face"></div>
            <div class="cube-face"></div>
          </div>
        </div>
        <span class="logo-text">Almerson</span>
      </div>
      <div class="nav-center">
        <a href="#features">Features</a>
        <a href="#pricing">Pricing</a>
        <a href="#tech">Technology</a>
        <a href="#contact">Contact</a>
      </div>
      <div class="nav-right">
        <button class="btn-ghost">Documentation</button>
        <button class="btn-primary" @click="scrollToOffers">Get Started</button>
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
  gap: 10px;
  cursor: pointer;
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

.cube-face:nth-child(1) { 
  transform: translateZ(14px); 
}

.cube-face:nth-child(2) { 
  transform: rotateY(90deg) translateZ(14px); 
}

.cube-face:nth-child(3) { 
  transform: rotateY(180deg) translateZ(14px); 
}

.logo-text {
  font-size: 17px;
  font-weight: 700;
  letter-spacing: -0.5px;
  color: #fff;
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
}
</style>

