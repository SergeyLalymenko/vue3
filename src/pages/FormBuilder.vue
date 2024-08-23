<script setup>
import { useTestStore } from '@/stores/test';

const testStore = useTestStore();
</script>

<template>
    Form Builder Page!
    <p>
        Count: {{ testStore.count }}
    </p>
    <p>
        Double count: {{ testStore.doubleCount }}
    </p>
    <button @click="testStore.increment">
        Increment
    </button>
</template>
