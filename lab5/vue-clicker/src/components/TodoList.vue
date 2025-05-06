<template>
    <div class="todo-list">
      <div class="todo-form">
        <input
          v-model="newTodo"
          @keyup.enter="addTodo"
          placeholder="Add a new task..."
          class="todo-input"
        />
        <button @click="addTodo" class="add-button">Add</button>
      </div>
      
      <div v-if="loading" class="loading">Loading...</div>
      
      <div v-else>
        <div v-if="filteredTodos.length === 0" class="empty-message">
          No tasks found. Add one above!
        </div>
        
        <ul class="todo-items">
          <TodoItem
            v-for="todo in filteredTodos"
            :key="todo.id"
            :todo="todo"
            @toggle="toggleTodo"
            @delete="confirmDelete"
          />
        </ul>
        
        <div class="filters">
          <button
            @click="filter = 'all'"
            :class="{ active: filter === 'all' }"
          >
            All
          </button>
          <button
            @click="filter = 'active'"
            :class="{ active: filter === 'active' }"
          >
            Active
          </button>
          <button
            @click="filter = 'completed'"
            :class="{ active: filter === 'completed' }"
          >
            Completed
          </button>
        </div>
      </div>
  
      <Popup :isOpen="deletingId !== null" @close="deletingId = null" @confirm="deleteTodo">
        <h3>Delete?</h3>
        <p>Please ensure and then confirm!</p>
      </Popup>
    </div>
  </template>
  
  <script setup>
  import { ref, computed, onMounted } from 'vue'
  import TodoItem from './TodoItem.vue'
  import Popup from './Popup.vue'
  import { useTodos } from '../composables/useTodos'
  
  const { todos, loading, addTodo: apiAddTodo, toggleTodo: apiToggleTodo, deleteTodo: apiDeleteTodo, fetchTodos } = useTodos()
  
  const newTodo = ref('')
  const filter = ref('all')
  const deletingId = ref(null)
  
  const filteredTodos = computed(() => {
    switch (filter.value) {
      case 'active':
        return todos.value.filter(todo => !todo.completed)
      case 'completed':
        return todos.value.filter(todo => todo.completed)
      default:
        return todos.value
    }
  })
  
  onMounted(() => {
    fetchTodos()
  })
  
  const addTodo = async () => {
    if (newTodo.value.trim()) {
      await apiAddTodo(newTodo.value.trim())
      newTodo.value = ''
    }
  }
  
  const toggleTodo = async (id) => {
    await apiToggleTodo(id)
  }
  
  const confirmDelete = (id) => {
    deletingId.value = id
  }
  
  const deleteTodo = async () => {
    if (deletingId.value) {
      await apiDeleteTodo(deletingId.value)
      deletingId.value = null
    }
  }
  </script>
  
  <style scoped>
  .todo-list {
    background: #fff;
    border-radius: 8px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    padding: 20px;
  }
  
  .todo-form {
    display: flex;
    margin-bottom: 20px;
  }
  
  .todo-input {
    flex: 1;
    padding: 10px;
    border: 1px solid #ddd;
    border-radius: 4px;
    font-size: 16px;
  }
  
  .add-button {
    margin-left: 10px;
    padding: 10px 20px;
    background: #42b983;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-size: 16px;
  }
  
  .add-button:hover {
    background: #3aa876;
  }
  
  .todo-items {
    list-style: none;
    padding: 0;
    margin: 0;
  }
  
  .empty-message {
    text-align: center;
    padding: 20px;
    color: #777;
  }
  
  .loading {
    text-align: center;
    padding: 20px;
    color: #42b983;
  }
  
  .filters {
    display: flex;
    justify-content: center;
    margin-top: 20px;
  }
  
  .filters button {
    margin: 0 5px;
    padding: 5px 10px;
    background: #f0f0f0;
    border: 1px solid #ddd;
    border-radius: 4px;
    cursor: pointer;
  }
  
  .filters button.active {
    background: #42b983;
    color: white;
    border-color: #42b983;
  }
  </style>