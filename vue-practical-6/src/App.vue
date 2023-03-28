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