<template>
    <div class="app">
      <h1>Vue ToDo List</h1>
      <TodoList />
    </div>
  </template>
  
  <script setup>
  import TodoList from './components/TodoList.vue'
  </script>
  
  <style>
  .app {
    max-width: 600px;
    margin: 0 auto;
    padding: 20px;
    font-family: Arial, sans-serif;
  }
  
  h1 {
    text-align: center;
    color: #2c3e50;
  }
  </style>