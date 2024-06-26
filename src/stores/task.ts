import type { Task } from '@/types/Task'
import axios from 'axios'
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useTasksStore = defineStore('task', () => {
  // states
  const tasks = ref<Task[]>([])
  const task = ref<Task | null>(null)

  //actions
  async function fetchTasks() {
    const { data } = await axios(`http://localhost:3000/tasks`)

    tasks.value = data

    //Сохранить в localStorage
    const jsonString = JSON.stringify(tasks.value)
    localStorage.setItem('Tasks', jsonString)
  }

  async function getTaskById(id: number) {
    const { data } = await axios(`http://localhost:3000/tasks/${id}`)
    task.value = data
  }

  async function addTask(task: Task) {
    await axios.post('http://localhost:3000/tasks', task)
    tasks.value.push(task)
  }

  async function updateTask(id: number, updatedData: object) {
    await axios.patch(`http://localhost:3000/tasks/${id}`, updatedData)
  }

  async function deleteTask(id: number) {
    await axios.delete(`http://localhost:3000/tasks/${id}`)
  }

  return {
    tasks,
    task,
    fetchTasks,
    getTaskById,
    addTask,
    updateTask,
    deleteTask
  }
})
