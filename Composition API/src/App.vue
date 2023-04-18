<template>
  <div>
    <NavBar />

    <RouterView v-slot="{ Component }">
      <Transition name="route" mode="out-in">
        <component :is="Component"></component>
      </Transition>
    </RouterView>

  </div>
</template>

<script>
export default {
  name: "App",
  created() {
    if (import.meta.env.MODE === 'production') {
      console.log("Production Build URL:", import.meta.env.VITE_PRODUCTION);
    } else if (import.meta.env.MODE === 'staging') {
      console.log("Staging Build URL:", import.meta.env.VITE_STAGING);
    } else if (import.meta.env.MODE === 'development') {
      console.log("Development Build URL:", import.meta.env.VITE_DEVELOPMENT);
    }
  }
}
</script>

<style scoped>
.route-enter-from,
.route-leave-to {
  opacity: 0;
  transform: translateX(500px);
}

.route-enter-active,
.route-leave-active {
  transition: all 0.4s ease;
}
</style>