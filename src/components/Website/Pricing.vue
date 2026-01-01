<template>
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
          Only one month
        </div>

        <router-link to="/register" class="plan-cta-poc">
          Start POC Now
          <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
            <path d="M3 8h10M8 3l5 5-5 5" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </router-link>

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

      <!-- Sign in link -->
      <div class="pricing-signin">
        <p>Already have an account? <router-link to="/login" class="signin-link">Sign in to deploy</router-link></p>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'Pricing',
  data() {
    return {
      pocPlan: {
        id: 'poc',
        name: 'VPS Starter POC',
        price: '0.99',
        features: [
          '1 vCPU Core',
          '2 GB RAM',
          '20 GB NVMe SSD',
          '1 TB Bandwidth',
          'Native IPv4',
          'KVM Isolation',
          'Daily Snapshot'
        ]
      }
    }
  }
}
</script>

<style scoped>
.pricing-section {
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
  transition: all 0.4s;
  margin-bottom: 24px;
}

.pricing-card-poc:hover {
  transform: translateY(-4px);
  box-shadow: 0 24px 70px rgba(64, 251, 220, 0.25);
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
  color: #fff;
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
  color: #fff;
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
  text-decoration: none;
}

.plan-cta-poc:hover {
  transform: translateY(-2px);
  box-shadow: 0 12px 32px rgba(64, 251, 220, 0.5);
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

/* Sign in link */
.pricing-signin {
  text-align: center;
  margin-top: 24px;
}

.pricing-signin p {
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

@media (max-width: 768px) {
  .pricing-section {
    padding: 80px 24px;
  }

  .section-header h2 {
    font-size: 36px;
  }

  .plan-price-poc {
    font-size: 60px;
  }
}
</style>