<script setup lang="ts">
import { RouterLink } from 'vue-router'
import type { Task } from '@/types/Task'
import { ref } from 'vue'
import { useTasksStore } from '@/stores/task'
import { storeToRefs } from 'pinia'
import { onBeforeMount } from 'vue'
const tasksStore = useTasksStore()
const { tasks } = storeToRefs(tasksStore)

const text = ref('Все')

const doneTasks = ref(tasks.value.filter((task) => task.status === 'Выполнен'))
const addedTasks = ref(tasks.value.filter((task) => task.status === 'Добавлено в список задач'))
const employeeTasks = ref(tasks.value.filter((task) => task.status === 'Передан сотруднику'))
const clientTasks = ref(tasks.value.filter((task) => task.status === 'Передан клиенту'))

onBeforeMount(() => {
  tasksStore.fetchTasks()
})
</script>
<template>
  <div class="main">
    <h1 class="main-text">Задачи</h1>
    <v-container>
      <v-row>
        <v-col class="py-2" cols="12">
          <v-btn-toggle v-model="text" rounded="1" style="padding: 3px">
            <v-btn value="Все" color="grey-darken-4" class="text-body-2 font-weight-bold">
              Все
            </v-btn>

            <v-btn value="Выполненные" color="green-lighten-2" class="text-body-2 font-weight-bold">
              Выполненные
            </v-btn>

            <v-btn
              value="Переданные сотруднику"
              color="light-blue-lighten-2"
              class="text-body-2 font-weight-bold"
            >
              Переданные сотруднику
            </v-btn>

            <v-btn
              value="Переданные клиенту"
              color="lime-lighten-2"
              class="text-body-2 font-weight-bold"
            >
              Переданные клиенту
            </v-btn>

            <v-btn value="Добавленные" color="grey-lighten-1" class="text-body-2 font-weight-bold">
              Добавленные
            </v-btn>
          </v-btn-toggle>
        </v-col>
      </v-row>
    </v-container>

    <div v-if="text == 'Все'">
      <div v-if="tasks.length > 0">
        <ul class="tasks">
          <router-link
            tag="li"
            v-for="(task, index) in tasks"
            :to="`/tasks/${task.id}`"
            class="route"
          >
            <h1 class="index">{{ index + 1 }}</h1>
            <v-card class="mx-auto card" prepend-icon="mdi-application-edit" width="400">
              <template v-slot:title>
                <span class="font-weight-black">{{ task.title }}</span>
              </template>
              <v-card-text style="font-weight: 600"> Статус: {{ task.status }} </v-card-text>
              <v-card-text
                v-if="task.status == 'Добавлено в список задач'"
                class="bg-grey-lighten-1 pt-4"
                style="font-weight: 600"
              >
                {{ task.body }}
              </v-card-text>
              <v-card-text
                v-else-if="task.status == 'Передан сотруднику'"
                class="bg-light-blue-lighten-2 pt-4"
                style="font-weight: 600"
              >
                {{ task.body }}
              </v-card-text>
              <v-card-text
                v-else-if="task.status == 'Передан клиенту'"
                class="bg-lime-lighten-2 pt-4"
                style="font-weight: 600"
              >
                {{ task.body }}
              </v-card-text>
              <v-card-text
                v-else-if="task.status == 'Выполнен'"
                class="bg-green-lighten-2 pt-4"
                style="font-weight: 600"
              >
                {{ task.body }}
              </v-card-text>
              <p class="task-at">
                <i>{{ task.at }}</i>
              </p>
            </v-card>
          </router-link>
        </ul>
      </div>
      <div v-else>
        <h1 class="no-tasks">Нету задач <v-icon icon="mdi-emoticon-sad"></v-icon></h1>
      </div>
    </div>

    <div v-else-if="text == 'Выполненные'">
      <div v-if="doneTasks.length > 0">
        <ul class="tasks">
          <router-link
            tag="li"
            v-for="(task, index) in doneTasks"
            :to="`/tasks/${task.id}`"
            class="route"
          >
            <h1 class="index">{{ index + 1 }}</h1>
            <v-card class="mx-auto card" prepend-icon="mdi-application-edit" width="400">
              <template v-slot:title>
                <span class="font-weight-black">{{ task.title }}</span>
              </template>
              <v-card-text style="font-weight: 600"> Статус: {{ task.status }} </v-card-text>
              <v-card-text
                v-if="task.status == 'Добавлено в список задач'"
                class="bg-grey-lighten-1 pt-4"
                style="font-weight: 600"
              >
                {{ task.body }}
              </v-card-text>
              <v-card-text
                v-else-if="task.status == 'Передан сотруднику'"
                class="bg-light-blue-lighten-2 pt-4"
                style="font-weight: 600"
              >
                {{ task.body }}
              </v-card-text>
              <v-card-text
                v-else-if="task.status == 'Передан клиенту'"
                class="bg-lime-lighten-2 pt-4"
                style="font-weight: 600"
              >
                {{ task.body }}
              </v-card-text>
              <v-card-text
                v-else-if="task.status == 'Выполнен'"
                class="bg-green-lighten-2 pt-4"
                style="font-weight: 600"
              >
                {{ task.body }}
              </v-card-text>
              <p class="task-at">
                <i>{{ task.at }}</i>
              </p>
            </v-card>
          </router-link>
        </ul>
      </div>
      <div v-else>
        <h1 class="no-tasks">Нету задач <v-icon icon="mdi-emoticon-sad"></v-icon></h1>
      </div>
    </div>
    <div v-else-if="text == 'Переданные сотруднику'">
      <div v-if="employeeTasks.length > 0">
        <ul class="tasks">
          <router-link
            tag="li"
            v-for="(task, index) in employeeTasks"
            :to="`/tasks/${task.id}`"
            class="route"
          >
            <h1 class="index">{{ index + 1 }}</h1>
            <v-card class="mx-auto card" prepend-icon="mdi-application-edit" width="400">
              <template v-slot:title>
                <span class="font-weight-black">{{ task.title }}</span>
              </template>
              <v-card-text style="font-weight: 600"> Статус: {{ task.status }} </v-card-text>
              <v-card-text
                v-if="task.status == 'Добавлено в список задач'"
                class="bg-grey-lighten-1 pt-4"
                style="font-weight: 600"
              >
                {{ task.body }}
              </v-card-text>
              <v-card-text
                v-else-if="task.status == 'Передан сотруднику'"
                class="bg-light-blue-lighten-2 pt-4"
                style="font-weight: 600"
              >
                {{ task.body }}
              </v-card-text>
              <v-card-text
                v-else-if="task.status == 'Передан клиенту'"
                class="bg-lime-lighten-2 pt-4"
                style="font-weight: 600"
              >
                {{ task.body }}
              </v-card-text>
              <v-card-text
                v-else-if="task.status == 'Выполнен'"
                class="bg-green-lighten-2 pt-4"
                style="font-weight: 600"
              >
                {{ task.body }}
              </v-card-text>
              <p class="task-at">
                <i>{{ task.at }}</i>
              </p>
            </v-card>
          </router-link>
        </ul>
      </div>
      <div v-else>
        <h1 class="no-tasks">Нету задач <v-icon icon="mdi-emoticon-sad"></v-icon></h1>
      </div>
    </div>

    <div v-else-if="text == 'Переданные клиенту'">
      <div v-if="clientTasks.length > 0">
        <ul class="tasks">
          <router-link
            tag="li"
            v-for="(task, index) in clientTasks"
            :to="`/tasks/${task.id}`"
            class="route"
          >
            <h1 class="index">{{ index + 1 }}</h1>
            <v-card class="mx-auto card" prepend-icon="mdi-application-edit" width="400">
              <template v-slot:title>
                <span class="font-weight-black">{{ task.title }}</span>
              </template>
              <v-card-text style="font-weight: 600"> Статус: {{ task.status }} </v-card-text>
              <v-card-text
                v-if="task.status == 'Добавлено в список задач'"
                class="bg-grey-lighten-1 pt-4"
                style="font-weight: 600"
              >
                {{ task.body }}
              </v-card-text>
              <v-card-text
                v-else-if="task.status == 'Передан сотруднику'"
                class="bg-light-blue-lighten-2 pt-4"
                style="font-weight: 600"
              >
                {{ task.body }}
              </v-card-text>
              <v-card-text
                v-else-if="task.status == 'Передан клиенту'"
                class="bg-lime-lighten-2 pt-4"
                style="font-weight: 600"
              >
                {{ task.body }}
              </v-card-text>
              <v-card-text
                v-else-if="task.status == 'Выполнен'"
                class="bg-green-lighten-2 pt-4"
                style="font-weight: 600"
              >
                {{ task.body }}
              </v-card-text>
              <p class="task-at">
                <i>{{ task.at }}</i>
              </p>
            </v-card>
          </router-link>
        </ul>
      </div>
      <div v-else>
        <h1 class="no-tasks">Нету задач <v-icon icon="mdi-emoticon-sad"></v-icon></h1>
      </div>
    </div>

    <div v-else-if="text == 'Добавленные'">
      <div v-if="addedTasks.length > 0">
        <ul class="tasks">
          <router-link
            tag="li"
            v-for="(task, index) in addedTasks"
            :to="`/tasks/${task.id}`"
            class="route"
          >
            <h1 class="index">{{ index + 1 }}</h1>
            <v-card class="mx-auto card" prepend-icon="mdi-application-edit" width="400">
              <template v-slot:title>
                <span class="font-weight-black">{{ task.title }}</span>
              </template>
              <v-card-text style="font-weight: 600"> Статус: {{ task.status }} </v-card-text>
              <v-card-text
                v-if="task.status == 'Добавлено в список задач'"
                class="bg-grey-lighten-1 pt-4"
                style="font-weight: 600"
              >
                {{ task.body }}
              </v-card-text>
              <v-card-text
                v-else-if="task.status == 'Передан сотруднику'"
                class="bg-light-blue-lighten-2 pt-4"
                style="font-weight: 600"
              >
                {{ task.body }}
              </v-card-text>
              <v-card-text
                v-else-if="task.status == 'Передан клиенту'"
                class="bg-lime-lighten-2 pt-4"
                style="font-weight: 600"
              >
                {{ task.body }}
              </v-card-text>
              <v-card-text
                v-else-if="task.status == 'Выполнен'"
                class="bg-green-lighten-2 pt-4"
                style="font-weight: 600"
              >
                {{ task.body }}
              </v-card-text>
              <p class="task-at">
                <i>{{ task.at }}</i>
              </p>
            </v-card>
          </router-link>
        </ul>
      </div>
      <div v-else>
        <h1 class="no-tasks">Нету задач <v-icon icon="mdi-emoticon-sad"></v-icon></h1>
      </div>
    </div>
  </div>
</template>
<style scoped>
.main {
  margin-bottom: 100px;
}
.main-text {
  color: aliceblue;
  margin: 40px 0 20px 0;
}

.task-at {
  color: #aaaaaa;
  font-weight: 700;
  font-size: 13px;
  padding: 5px 10px;
  text-align: end;
}
.tasks {
  margin-top: 50px;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 40px;
}
.index {
  color: #fff;
}
.route {
  text-decoration: none;
  display: flex;
  gap: 10px;
}
.card:hover {
  transition: 0.2s linear;
  box-shadow: 0 0 20px #fff;
}

.no-tasks {
  margin: 0 auto;
  color: #525252;
}
</style>
