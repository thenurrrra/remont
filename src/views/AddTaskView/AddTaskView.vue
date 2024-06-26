<script setup>
import { ref } from 'vue'
import { RouterLink } from 'vue-router'
import { useTasksStore } from '@/stores/task'
import { storeToRefs } from 'pinia'
import { onBeforeMount } from 'vue'
const tasksStore = useTasksStore()
const { tasks } = storeToRefs(tasksStore)

//at
function padZero(num) {
  return num.toString().padStart(2, '0')
}

const currentDate = new Date()

const day = padZero(currentDate.getDate()) // Получаем текущий день месяца с ведущим нулем при необходимости
const month = padZero(currentDate.getMonth() + 1) // Получаем текущий месяц с ведущим нулем при необходимости
const year = currentDate.getFullYear() // Получаем текущий год (полный год, например, 2024)
const hours = padZero(currentDate.getHours()) // Получаем текущее количество часов с ведущим нулем при необходимости
const minutes = padZero(currentDate.getMinutes()) // Получаем текущее количество минут с ведущим нулем при необходимости

const formattedTime = `${day}/${month}/${year} ${hours}:${minutes}`

const title = ref('')
const body = ref('')

function addTask() {
  if (title.value.length == 0 || body.value.length == 0) {
    return
  }
  let randomId = Math.random().toString(16).substr(2)
  tasksStore.addTask({
    id: String(randomId),
    title: title.value,
    body: body.value,
    status: 'Добавлено в список задач',
    at: formattedTime
  })
  title.value = ''
  body.value = ''
  alert('Задача добавлена!')
}

function clearInputs() {
  title.value = ''
  body.value = ''
}

onBeforeMount(() => {
  tasksStore.fetchTasks()
})
</script>
<template>
  <div class="main">
    <h1 class="main-text">Добавить новую задачу</h1>
    <div class="form">
      <form @submit.prevent="addTask">
        <label for="title"></label>
        <v-text-field
          type="text"
          hide-details="auto"
          id="title"
          label="Название"
          v-model="title"
        ></v-text-field>
        <br />
        <label for="body"></label>
        <v-text-field
          type="text"
          hide-details="auto"
          id="body"
          label="Что нужно сделать?"
          v-model="body"
        ></v-text-field>
        <br />
        <div class="btn">
          <button type="submit" class="submit-btn">Добавить задачу</button>
        </div>
      </form>

      <button class="clear-btn" @click="clearInputs">Очистить</button>
    </div>
  </div>
</template>
<style scoped>
.main {
  margin-bottom: 100px;
}
.main-text {
  color: aliceblue;
  margin: 40px 0;
}
div {
  color: #fff;
  width: 500px;
}

.form {
  display: flex;
  align-items: center;
  gap: 40px;
}

.btn {
  display: flex;
  justify-content: center;
}
.submit-btn {
  border: 1px solid #fff;
  padding: 10px 20px;
  color: #000;
  background-color: #fff;
  border-radius: 20px;
  font-weight: 600;
  transition: 0.2s linear;
}
.submit-btn:hover {
  color: #fff;
  background-color: #000;
}

.clear-btn {
  font-size: 12px;
  font-weight: 600;
  border-radius: 20px;
  border: 2px solid #fff;
  padding: 7px 15px;
  transition: 0.2s linear;
  margin-bottom: 50px;
}

.clear-btn:hover {
  color: #000;
  background-color: #fff;
}
</style>
