import { ref, onMounted } from 'vue'
import { useLocalStorage } from '@vueuse/core'

const API_URL = 'https://jsonplaceholder.typicode.com/todos'
const USER_ID = 1

export function useTodos() {
  const todos = useLocalStorage('vue-todos', [])
  const loading = ref(false)
  const deletingId = ref(null)

  const fetchTodos = async () => {
    if (todos.value.length > 0) return
    
    loading.value = true
    try {
      const response = await fetch(`${API_URL}?userId=${USER_ID}&_limit=5`)
      const data = await response.json()
      todos.value = data
    } catch (error) {
      console.error('Error fetching todos:', error)
    } finally {
      loading.value = false
    }
  }

  const addTodo = async (title) => {
    loading.value = true
    try {
      const newTodo = {
        id: Date.now(),
        title,
        completed: false,
        userId: USER_ID
      }
      todos.value = [newTodo, ...todos.value]
      
      const response = await fetch(API_URL, {
        method: 'POST',
        body: JSON.stringify({
          title,
          completed: false,
          userId: USER_ID
        }),
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      })
      const data = await response.json()
      
      todos.value = todos.value.map(todo => 
        todo.id === newTodo.id ? { ...todo, id: data.id } : todo
      )
    } catch (error) {
      console.error('Error adding todo:', error)
      todos.value = todos.value.filter(todo => todo.id !== newTodo.id)
    } finally {
      loading.value = false
    }
  }

  const toggleTodo = async (id) => {
    const todo = todos.value.find(todo => todo.id === id)
    if (!todo) return
    
    const originalCompleted = todo.completed
    
    todos.value = todos.value.map(todo => 
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    )
    
    try {
      await fetch(`${API_URL}/${id}`, {
        method: 'PATCH',
        body: JSON.stringify({
          completed: !originalCompleted
        }),
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      })
    } catch (error) {
      console.error('Error toggling todo:', error)
      todos.value = todos.value.map(todo => 
        todo.id === id ? { ...todo, completed: originalCompleted } : todo
      )
    }
  }

  const deleteTodo = async (id) => {
    const todoIndex = todos.value.findIndex(todo => todo.id === id)
    if (todoIndex === -1) return
    
    const [deletedTodo] = todos.value.splice(todoIndex, 1)
    
    try {
      await fetch(`${API_URL}/${id}`, {
        method: 'DELETE',
      })
    } catch (error) {
      console.error('Error deleting todo:', error)
      todos.value.splice(todoIndex, 0, deletedTodo)
    }
  }

  return {
    todos,
    loading,
    deletingId,
    fetchTodos,
    addTodo,
    toggleTodo,
    deleteTodo
  }
}