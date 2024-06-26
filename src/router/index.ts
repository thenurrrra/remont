import { createRouter, createWebHistory } from 'vue-router'
import MainView from '@/views/MainView/MainView.vue'
import AddTaskView from '@/views/AddTaskView/AddTaskView.vue'
import TaskView from '@/views/TaskView/TaskView.vue'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'main',
      component: MainView
    },
    {
      path: '/add',
      name: 'add',
      component: AddTaskView
    },
    {
      path: '/tasks/:id',
      name: 'tasks',
      component: TaskView,
      props: true
    }
  ]
})

export default router
