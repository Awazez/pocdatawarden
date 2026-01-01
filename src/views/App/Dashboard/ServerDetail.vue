<template>
  <div>
    <h2>Server Details</h2>
    <p>Server: {{ $route.params.id }}</p>
  </div>
</template>

<script>
export default {
  name: 'ServerDetail'
}
</script>

<style scoped>
h2 {
  color: #fff;
  margin-bottom: 16px;
}
p {
  color: rgba(255, 255, 255, 0.6);
}
</style>