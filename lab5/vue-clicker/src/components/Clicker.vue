<script setup>
import { ref } from 'vue';

const props = defineProps({
    amount: {
        type: Number,
        default: 1
    }
});

const emit = defineEmits(['button-clicked']);

const count = ref(0);

const increment = () => {
    count.value += props.amount;
    emit('button-clicked');
};
</script>

<template>
    <div class="clicker">
        <slot>
            <button @click="increment">Click me!</button>
        </slot>
        <p>Count: {{ count }}</p>
    </div>
</template>