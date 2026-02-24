<script setup>
import { RouterLink, RouterView } from 'vue-router'
import Notification from '@/components/general/notification.vue'
import Loading from '@/components/general/loading.vue'
</script>

<template>
  <Notification />
  <Loading />

  <RouterView />
</template>

<style scoped></style>
