<script setup lang="ts">
import { useTasksStore } from '@/stores/task'
import { storeToRefs } from 'pinia'
import { onBeforeMount } from 'vue'
const tasksStore = useTasksStore()
const { tasks } = storeToRefs(tasksStore)
onBeforeMount(() => {
  tasksStore.fetchTasks()
})
const items = [
  { text: 'Задачи', icon: 'mdi-note-text', route: '/' },
  { text: 'Добавить задачу', icon: 'mdi-plus-thick', route: '/add' }
]
</script>
<template>
  <div class="wrapper">
    <div class="content">
      <v-card class="pa-2" width="250" height="140">
        <v-list>
          <v-list-item
            v-for="(item, i) in items"
            :key="i"
            :value="item"
            class="mb-2"
            rounded="xl"
            :to="item.route"
          >
            <template v-slot:prepend>
              <v-icon :icon="item.icon" color="black"></v-icon>
            </template>

            <v-list-item-title v-text="item.text" class="item-text"></v-list-item-title>
          </v-list-item>
        </v-list>
      </v-card>
      <RouterView />
    </div>
  </div>
</template>

<style scoped>
.item-text {
  font-size: 13px;
  font-weight: 700;
}
</style>
