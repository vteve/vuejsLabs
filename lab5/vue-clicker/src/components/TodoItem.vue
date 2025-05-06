<template>
    <li class="todo-item" :class="{ completed: todo.completed }">
      <div class="todo-content">
        <input
          type="checkbox"
          :checked="todo.completed"
          @change="$emit('toggle', todo.id)"
          class="todo-checkbox"
        />
        <span class="todo-text">{{ todo.title }}</span>
      </div>
      <button @click="$emit('delete', todo.id)" class="delete-button">Delete</button>
    </li>
  </template>
  
  <script setup>
  defineProps({
    todo: {
      type: Object,
      required: true
    }
  })
  
  defineEmits(['toggle', 'delete'])
  </script>
  
  <style scoped>
  .todo-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 12px 15px;
    border-bottom: 1px solid #eee;
    transition: background 0.2s;
  }
  
  .todo-item:hover {
    background: #f9f9f9;
  }
  
  .todo-item.completed .todo-text {
    text-decoration: line-through;
    color: #888;
  }
  
  .todo-content {
    display: flex;
    align-items: center;
    flex: 1;
  }
  
  .todo-checkbox {
    margin-right: 15px;
    cursor: pointer;
  }
  
  .todo-text {
    flex: 1;
    word-break: break-word;
  }
  
  .delete-button {
    background: #ff6b6b;
    color: white;
    border: none;
    border-radius: 4px;
    padding: 5px 10px;
    cursor: pointer;
    margin-left: 10px;
  }
  
  .delete-button:hover {
    background: #ff5252;
  }
  </style>