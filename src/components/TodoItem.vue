<script setup>
import Close from '@/UI/Close.vue';

defineProps(['todo']);
defineEmits(['toggleTodo', 'deleteTodo']);
</script>

<template>
    <li
        class="todo"
        :class="{ completed: todo.isCompleted }"
        @click="$emit('toggleTodo', todo.id)"
        >
        <p class="todo__text">
            {{ todo.title }}
        </p>
        <Close @click.stop="$emit('deleteTodo', todo.id)" size="sm" />
    </li>
</template>

<style lang="scss" scoped>
@import '@/styles/variables.scss';

.todo {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 40px;
    width: 100%;
    padding: 10px;
    border: 1px solid $colorBorder;
    transition: .2s;
    cursor: pointer;

    &.completed {
        border-color: $colorActive;
    }
}
</style>
