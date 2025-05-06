<template>
    <Teleport to="body">
      <div v-if="isOpen" class="popup-overlay" @click.self="close">
        <div class="popup-content">
          <slot></slot>
          <div class="popup-buttons">
            <button @click="close" class="popup-button cancel">No, cancel!</button>
            <button @click="confirm" class="popup-button confirm">Yes, delete it!</button>
          </div>
        </div>
      </div>
    </Teleport>
  </template>
  
  <script setup>
  import { defineEmits, defineProps } from 'vue'
  
  const props = defineProps({
    isOpen: {
      type: Boolean,
      required: true
    }
  })
  
  const emit = defineEmits(['confirm', 'close'])
  
  const close = () => {
    emit('close')
  }
  
  const confirm = () => {
    emit('confirm')
  }
  </script>
  
  <style scoped>
  .popup-overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
  }
  
  .popup-content {
    background: white;
    padding: 25px;
    border-radius: 8px;
    max-width: 400px;
    width: 90%;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
    text-align: center;
  }
  
  .popup-buttons {
    display: flex;
    justify-content: center;
    margin-top: 20px;
    gap: 10px;
  }
  
  .popup-button {
    padding: 8px 16px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-weight: bold;
    transition: background 0.2s;
  }
  
  .popup-button.cancel {
    background: #f0f0f0;
    color: #333;
  }
  
  .popup-button.cancel:hover {
    background: #e0e0e0;
  }
  
  .popup-button.confirm {
    background: #ff6b6b;
    color: white;
  }
  
  .popup-button.confirm:hover {
    background: #ff5252;
  }
  </style>