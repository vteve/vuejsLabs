<script setup>
import Clicker from './components/Clicker.vue';

const handleClick = (index) => {
    alert(`Clicker ${index + 1} clicked!`);
};
</script>

<template>
    <div class="clickers-container">
        <Clicker 
            v-for="(clicker, index) in 100" 
            :key="index" 
            :amount="1"
            @button-clicked="() => handleClick(index)"
        >
            <template #default="{ increment }">
                <button @click="increment">Custom Button {{ index + 1 }}</button>
            </template>
        </Clicker>
    </div>
</template>

<style>
.clickers-container {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    gap: 10px;
    padding: 20px;
}

.clicker {
    border: 1px solid #ccc;
    padding: 10px;
    text-align: center;
}
</style>