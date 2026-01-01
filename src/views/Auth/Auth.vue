<template>
  <div class="auth-page">
    <!-- Orbes d'arrière-plan -->
    <div class="floating-orb orb-1"></div>
    <div class="floating-orb orb-2"></div>
    <div class="floating-orb orb-3"></div>

    <div class="auth-container">
      <div class="auth-card">
        <!-- Logo -->
        <div class="auth-logo">
          <div class="logo-symbol">
            <svg viewBox="0 0 42 42" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="21" cy="21" r="20" stroke="#40FBDC" stroke-opacity="0.8" stroke-width="2"/>
              <path d="M29.1428 20.5714L11.1428 10.6404L29.1428 10.2857V20.5714Z" fill="#40FBDC"/>
              <path d="M29.1428 20.8661L20.767 18.8571L6.85711 22.4928L14.9712 26.9515L14.0551 36L27.1984 28.6339L29.1428 20.8661Z" fill="#40FBDC"/>
            </svg>
          </div>
          <span class="logo-text">Almerson</span>
        </div>

        <!-- Header -->
        <div class="auth-header">
          <h1>{{ step === 1 ? 'Get started' : 'Almost there!' }}</h1>
          <p v-if="step === 1">
            Enter your email to continue with a magic link
          </p>
          <p v-else>
            Tell us a bit about yourself
          </p>
        </div>

        <!-- Form -->
        <form v-if="!sent" @submit.prevent="handleSubmit" class="auth-form">
          <!-- Step 1: Email -->
          <div v-if="step === 1">
            <div class="form-group">
              <label>Email address</label>
              <input
                v-model="email"
                type="email"
                placeholder="you@example.com"
                required
                class="input-field"
              />
            </div>
          </div>

          <!-- Step 2: Prénom et Nom -->
          <div v-else>
            <div class="form-row">
              <div class="form-group">
                <label>First name</label>
                <input
                  v-model="firstName"
                  type="text"
                  placeholder="John"
                  required
                  class="input-field"
                />
              </div>

              <div class="form-group">
                <label>Last name</label>
                <input
                  v-model="lastName"
                  type="text"
                  placeholder="Doe"
                  required
                  class="input-field"
                />
              </div>
            </div>

            <!-- Rappel de l'email -->
            <div class="email-reminder">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                <polyline points="22,6 12,13 2,6"/>
              </svg>
              {{ email }}
            </div>
          </div>

          <!-- Error message -->
          <div v-if="error" class="error-message">
            {{ error }}
          </div>

          <!-- Buttons -->
          <div class="form-actions">
            <button
              v-if="step === 2"
              type="button"
              @click="step = 1"
              class="btn-back"
              :disabled="loading"
            >
              ← Back
            </button>

            <button
              type="submit"
              class="btn-submit"
              :disabled="loading"
            >
              <span v-if="!loading">
                {{ step === 1 ? 'Continue' : 'Send magic link' }}
              </span>
              <span v-else>
                {{ step === 1 ? 'Checking…' : 'Sending…' }}
              </span>
            </button>
          </div>
        </form>

        <!-- Confirmation -->
        <div v-else class="auth-confirmation">
          <div class="confirmation-icon">✨</div>
          <h2>Magic link sent!</h2>
          <p>
            We've sent a magic link to<br />
            <strong>{{ email }}</strong>
          </p>
          <p class="confirmation-note">
            Check your inbox and click the link to sign in.
          </p>
        </div>
      </div>

      <!-- Back to website -->
      <div class="back-link">
        <router-link to="/" class="link-back">
          ← Back to website
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import { supabase } from '@/lib/supabase'

export default {
  name: 'Auth',

  data() {
    return {
      step: 1,
      email: '',
      firstName: '',
      lastName: '',
      loading: false,
      sent: false,
      error: null
    }
  },

  methods: {
    async handleSubmit() {
      this.loading = true
      this.error = null

      try {
        if (this.step === 1) {
          // Vérifier si l'utilisateur existe déjà dans auth.users
          const { data: { users }, error: usersError } = await supabase.auth.admin.listUsers()
          
          // Chercher l'utilisateur par email
          const existingUser = users?.find(u => u.email === this.email)

          if (existingUser?.user_metadata?.first_name && existingUser?.user_metadata?.last_name) {
            // ✅ Utilisateur existant avec nom/prénom
            console.log('✅ Existing user found, sending magic link directly')
            await this.sendMagicLink()
          } else {
            // ❌ Nouvel utilisateur
            console.log('🆕 New user, requesting name')
            this.step = 2
          }
        } else {
          // Step 2 : Envoyer le magic link avec les métadonnées
          await this.sendMagicLink()
        }
      } catch (err) {
        console.error('Auth error:', err)
        this.error = err.message
      } finally {
        this.loading = false
      }
    },

    async sendMagicLink() {
      const { error } = await supabase.auth.signInWithOtp({
        email: this.email,
        options: {
          emailRedirectTo: window.location.origin + '/app/dashboard',
          data: {
            first_name: this.firstName || null,
            last_name: this.lastName || null
          }
        }
      })

      if (error) throw error

      console.log('✨ Magic link sent to:', this.email)
      this.sent = true
    }
  }
}
</script>

<style scoped>
/* ... (styles identiques) ... */
.auth-page {
  min-height: 100vh;
  background: #000;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 40px 24px;
  position: relative;
  overflow: hidden;
}

.floating-orb {
  position: absolute;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(64, 251, 220, 0.3), transparent);
  filter: blur(60px);
  pointer-events: none;
  animation: float 20s ease-in-out infinite;
}

.orb-1 {
  width: 400px;
  height: 400px;
  top: -100px;
  left: -100px;
}

.orb-2 {
  width: 350px;
  height: 350px;
  bottom: -100px;
  right: -100px;
  animation-delay: 5s;
}

.orb-3 {
  width: 300px;
  height: 300px;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  animation-delay: 10s;
}

@keyframes float {
  0%, 100% {
    transform: translate(0, 0) scale(1);
    opacity: 0.3;
  }
  50% {
    transform: translate(30px, -30px) scale(1.1);
    opacity: 0.4;
  }
}

.auth-container {
  position: relative;
  z-index: 1;
  width: 100%;
  max-width: 440px;
}

.auth-card {
  background: rgba(10, 10, 10, 0.8);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 24px;
  padding: 48px;
  backdrop-filter: blur(20px);
  box-shadow: 0 24px 60px rgba(0, 0, 0, 0.5);
}

.auth-logo {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  margin-bottom: 40px;
}

.logo-symbol {
  width: 40px;
  height: 40px;
}

.logo-symbol svg {
  width: 100%;
  height: 100%;
  filter: drop-shadow(0 0 12px rgba(64, 251, 220, 0.5));
}

.logo-text {
  font-size: 24px;
  font-weight: 700;
  color: #fff;
}

.auth-header {
  text-align: center;
  margin-bottom: 40px;
}

.auth-header h1 {
  font-size: 32px;
  font-weight: 800;
  color: #fff;
  margin-bottom: 8px;
}

.auth-header p {
  font-size: 15px;
  color: rgba(255, 255, 255, 0.6);
}

.auth-form {
  margin-bottom: 24px;
}

.form-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
  margin-bottom: 24px;
}

.form-group {
  margin-bottom: 24px;
}

.form-row .form-group {
  margin-bottom: 0;
}

.form-group label {
  display: block;
  font-size: 14px;
  font-weight: 600;
  color: rgba(255, 255, 255, 0.9);
  margin-bottom: 8px;
}

.input-field {
  width: 100%;
  padding: 12px 16px;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 10px;
  color: #fff;
  font-size: 15px;
  transition: all 0.2s;
}

.input-field:focus {
  outline: none;
  border-color: #40FBDC;
  background: rgba(255, 255, 255, 0.08);
}

.input-field::placeholder {
  color: rgba(255, 255, 255, 0.4);
}

.email-reminder {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 12px 16px;
  background: rgba(64, 251, 220, 0.05);
  border: 1px solid rgba(64, 251, 220, 0.2);
  border-radius: 10px;
  color: #40FBDC;
  font-size: 14px;
  margin-bottom: 24px;
}

.error-message {
  background: rgba(255, 64, 64, 0.1);
  border: 1px solid rgba(255, 64, 64, 0.3);
  color: #ff4040;
  padding: 12px 16px;
  border-radius: 10px;
  font-size: 14px;
  margin-bottom: 24px;
}

.form-actions {
  display: flex;
  gap: 12px;
}

.btn-back {
  padding: 14px 24px;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  color: rgba(255, 255, 255, 0.8);
  border-radius: 10px;
  font-size: 15px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
}

.btn-back:hover:not(:disabled) {
  background: rgba(255, 255, 255, 0.08);
}

.btn-submit {
  flex: 1;
  background: #40FBDC;
  color: #000;
  border: none;
  padding: 14px 24px;
  border-radius: 10px;
  font-size: 15px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
}

.btn-submit:hover:not(:disabled) {
  background: #33e8c9;
  transform: translateY(-1px);
  box-shadow: 0 8px 24px rgba(64, 251, 220, 0.3);
}

.btn-submit:disabled,
.btn-back:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.auth-confirmation {
  text-align: center;
  padding: 20px 0;
}

.confirmation-icon {
  font-size: 48px;
  margin-bottom: 16px;
}

.auth-confirmation h2 {
  font-size: 24px;
  font-weight: 700;
  color: #fff;
  margin-bottom: 12px;
}

.auth-confirmation p {
  font-size: 15px;
  color: rgba(255, 255, 255, 0.6);
  line-height: 1.6;
}

.auth-confirmation strong {
  color: #40FBDC;
  font-weight: 600;
}

.confirmation-note {
  margin-top: 16px;
  padding-top: 16px;
  border-top: 1px solid rgba(255, 255, 255, 0.08);
  font-size: 14px !important;
}

.back-link {
  text-align: center;
  margin-top: 24px;
}

.link-back {
  color: rgba(255, 255, 255, 0.6);
  text-decoration: none;
  font-size: 14px;
  transition: color 0.2s;
}

.link-back:hover {
  color: #40FBDC;
}
</style>
