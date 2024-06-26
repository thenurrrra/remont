<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useTasksStore } from '@/stores/task'
import { storeToRefs } from 'pinia'
import { onBeforeMount } from 'vue'

const tasksStore = useTasksStore()
const { tasks } = storeToRefs(tasksStore)
const { task } = storeToRefs(tasksStore)
const title = ref('')
const body = ref('')
const status = ref('')
const editBtn = ref(false)
const editBtnText = ref('Редактировать')

const router = useRouter()

const props = defineProps({
  id: {
    type: Number,
    required: true
  }
})

console.log(props.id)

function deleteTask() {
  tasksStore.deleteTask(props.id)
  router.back()
}

function updateTask() {
  if (title.value.length == 0 || body.value.length == 0) {
    return
  }
  tasksStore.updateTask(props.id, { title: title.value, body: body.value })
  router.back()
}

function updateStatus() {
  tasksStore.updateTask(props.id, { status: status.value })
  router.back()
}

function showEditBtn() {
  editBtn.value = !editBtn.value
  if (editBtn.value == true) {
    editBtnText.value = 'Отменить'
  } else editBtnText.value = 'Редактировать'
}

let items = ['Добавлено в список задач', 'Передан сотруднику', 'Передан клиенту', 'Выполнен']

onBeforeMount(() => {
  tasksStore.getTaskById(props.id)
})
</script>
<template>
  <div class="main">
    <div class="task-selects">
      <div class="task-status">
        <p class="task-status" v-if="task?.status == 'Передан сотруднику'">
          Статус: <span class="status-value__blue">{{ task?.status }}</span>
        </p>
        <p class="task-status" v-else-if="task?.status == 'Передан клиенту'">
          Статус: <span class="status-value__yellow">{{ task?.status }}</span>
        </p>
        <p class="task-status" v-else-if="task?.status == 'Добавлено в список задач'">
          Статус: <span class="status-value__white">{{ task?.status }}</span>
        </p>
        <p class="task-status" v-else-if="task?.status == 'Выполнен'">
          Статус: <span class="status-value__green">{{ task?.status }}</span>
        </p>
      </div>
      <div class="status-select">
        <v-select
          v-model="status"
          :items="items"
          chips
          variant="outlined"
          density="comfortable"
          label="Статус"
        ></v-select>
        <v-btn icon="mdi-check-outline" @click="updateStatus"></v-btn>
      </div>
    </div>
    <div style="width: 450px">
      <div v-if="tasks && tasks.length > 0 && tasks">
        <div class="task-inputs">
          <div class="task-title main-text">
            <h1>Название: {{ task?.title }}</h1>
          </div>
          <v-text-field
            v-if="editBtn"
            v-model="title"
            class="task__input"
            hide-details="auto"
            label="Новое название задачи"
          ></v-text-field>
          <div class="task-body">
            <p class="task-body">Описание: {{ task?.body }}</p>
          </div>
          <v-text-field
            v-if="editBtn"
            v-model="body"
            class="task__input"
            hide-details="auto"
            label="Новое название описания"
          ></v-text-field>
        </div>
      </div>
      <div v-else>
        <p>Loading...</p>
      </div>
      <div class="btns">
        <div class="edit-btn">
          <div v-if="editBtn == false">
            <v-btn append-icon="mdi-pencil" @click="showEditBtn">{{ editBtnText }}</v-btn>
          </div>
          <div v-else>
            <v-btn append-icon="mdi-close-thick" @click="showEditBtn">{{ editBtnText }}</v-btn>
          </div>
        </div>
        <div class="edit-btn__second" v-if="editBtn == true">
          <v-btn icon="mdi-check-outline" size="x-large" @click="updateTask"></v-btn>
        </div>
        <div class="delete-btn">
          <v-btn append-icon="mdi-trash-can" @click="deleteTask">Удалить</v-btn>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.main {
  margin-bottom: 100px;
  width: 1000px;
}
.main-text {
  color: aliceblue;
  margin-top: 50px;
}

.task-title,
.task-body,
.task-status {
  display: flex;
  gap: 30px;
  margin-bottom: 20px;
}

.task-body {
  color: #fff;
}

.task-status {
  color: #fff;
  font-weight: 700;
}

.status-value__blue {
  background-color: #4fc3f7;
  border-radius: 10px;
  padding: 3px 10px;
  color: #000;
}
.status-value__yellow {
  background-color: #dce775;
  border-radius: 10px;
  padding: 3px 10px;
  color: #000;
}
.status-value__white {
  background-color: #bdbdbd;
  border-radius: 10px;
  padding: 3px 10px;
  width: 252px;
  color: #000;
}
.status-value__green {
  background-color: #81c784;
  border-radius: 10px;
  padding: 3px 10px;
  color: #000;
}

.btns {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.task-title__btn {
  color: #fff;
  /* border: 1px solid #fff; */
  border-radius: 10px;
  padding: 5px;
  transition: 0.2s linear;
}

.task-title__btn:hover {
  font-size: 20px;
}
.delete-btn,
.edit-btn {
  text-align: center;
  color: #fff;
  transition: 0.2s linear;
}

.task__input {
  color: #fff;
  margin-bottom: 50px;
}

.task-selects {
  width: 330px;
  margin-top: 50px;
}

.status-select {
  color: #fff;
  height: 50px;
  display: flex;
  gap: 20px;
}
</style>
