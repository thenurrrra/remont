<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import Header from './layouts/Header/Header.vue'
import Sidebar from './layouts/Sidebar/Sidebar.vue'
</script>

<template>
  <Header class="header" />
  <Sidebar />
</template>

<style scoped>
.header {
  margin-top: 15px;
  margin-bottom: 20px;
}
</style>
