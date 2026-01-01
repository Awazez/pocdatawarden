<template>
  <div v-if="show" class="modal-overlay" @click="$emit('close')">
    <div class="modal" @click.stop>
      <button class="modal-close" @click="$emit('close')">
        <svg width="20" height="20" viewBox="0 0 16 16" fill="none">
          <path d="M12 4L4 12M4 4l8 8" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
        </svg>
      </button>
      
      <div class="modal-header">
        <h2>Deploy {{ plan?.name }}</h2>
        <p>Configure your server instance</p>
      </div>

      <div class="modal-body">
        <div class="form-group">
          <label>Server Hostname</label>
          <input 
            v-model="form.hostname" 
            type="text" 
            placeholder="my-production-server"
            class="input-field"
          />
        </div>

        <div class="form-group">
          <label>Operating System</label>
          <select v-model="form.os" class="select-field">
            <option value="ubuntu">Ubuntu 24.04 LTS</option>
            <option value="debian">Debian 12</option>
            <option value="rocky">Rocky Linux 9</option>
            <option value="arch">Arch Linux</option>
          </select>
        </div>

        <div class="form-group">
          <label>Data Center Region</label>
          <select v-model="form.region" class="select-field">
            <option value="paris">🇫🇷 Paris, France</option>
            <option value="frankfurt">🇩🇪 Frankfurt, Germany</option>
            <option value="amsterdam">🇳🇱 Amsterdam, Netherlands</option>
          </select>
        </div>

        <div class="summary-box">
          <div class="summary-title">Order Summary</div>
          <div class="summary-line">
            <span>{{ plan?.name }}</span>
            <span>€{{ plan?.price }}/mo</span>
          </div>
          <div class="summary-line small">
            <span>One month (POC)</span>
            <span>€0.99</span>
          </div>
          <div class="summary-line total">
            <span>Due Today</span>
            <span>€0.99</span>
          </div>
        </div>
      </div>

      <div class="modal-footer">
        <button class="btn-modal-secondary" @click="$emit('close')">Cancel</button>
        <button class="btn-modal-primary" @click="confirmOrder">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M13 5L6 12L3 9" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
          Deploy Server
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'OrderModal',
  props: {
    show: Boolean,
    plan: Object
  },
  data() {
    return {
      form: {
        hostname: '',
        os: 'ubuntu',
        region: 'paris'
      }
    }
  },
  watch: {
    show(newVal) {
      if (!newVal) {
        this.resetForm();
      }
    }
  },
  methods: {
    async confirmOrder() {
      await new Promise(resolve => setTimeout(resolve, 1500));
      alert(`✅ Server "${this.form.hostname || 'vps-' + Date.now()}" deployed!\n\nPlan: ${this.plan.name}\nOS: ${this.form.os}\nRegion: ${this.form.region}\n\nOne month: €0.99\n\nYour server will be ready in 30 seconds.`);
      this.$emit('close');
    },
    resetForm() {
      this.form = {
        hostname: '',
        os: 'ubuntu',
        region: 'paris'
      };
    }
  }
}
</script>

<style scoped>
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
  color: #fff;
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
</style>