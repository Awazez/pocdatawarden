<template>
  <div>
    <NavBar/>
    <Hero/>
    <Feature/>
    <Pricing :ordering-plan="orderingPlan" @select-plan="selectPlan"/>
    <TechStack/>
    <CTA @scroll-to-pricing="scrollToOffers"/>
    <Footer/>
    
    <OrderModal 
      :show="showModal" 
      :plan="selectedPlan" 
      @close="closeModal"
    />
  </div>
</template>

<script>
import NavBar from '../../components/Website/NavBar.vue'
import Hero from '../../components/Website/Hero.vue'
import Feature from '../../components/Website/Feature.vue'
import Pricing from '../../components/Website/Pricing.vue'
import TechStack from '../../components/Website/TechStack.vue'
import CTA from '../../components/Website/CTA.vue'
import Footer from '../../components/Website/Footer.vue'
import OrderModal from '../../components/Website/OrderModal.vue'
export default {
  name: 'WebsiteHome',
  components: {
    NavBar,
    Hero,
    Feature,
    Pricing,
    TechStack,
    CTA,
    Footer,
    OrderModal
  },
  data() {
    return {
      orderingPlan: null,
      showModal: false,
      selectedPlan: null
    }
  },
  methods: {
    scrollToOffers() {
      document.getElementById('pricing').scrollIntoView({ behavior: 'smooth' })
    },
    selectPlan(plan) {
      this.selectedPlan = plan
      this.showModal = true
    },
    closeModal() {
      this.showModal = false
      this.selectedPlan = null
    }
  }
}
</script>


