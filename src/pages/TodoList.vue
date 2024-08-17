<script setup>
import { ref, onMounted, TransitionGroup } from 'vue';
import { BASE_API_URL } from '@/api/api';
import TodoItem from '@/components/TodoItem.vue';
import Modal from '@/components/Modal.vue';
import Button from '@/UI/Button.vue';
import Input from '@/UI/Input.vue';

const todos = ref([]);
const isOpenModal = ref(false);
const inputValue = ref('');

const modalConfig = {
    title: 'Add Todo',
    size: 'xl'
};
const toggleModalButtonConfig = {
    visualType: 'secondary',
    type: 'text',
    size: 'sm'
};
const addTodoButtonConfig = {
    visualType: 'primary',
    type: 'submit',
    size: 'md'
};

async function toggleTodo(id) {
    const selectedTodo = todos.value.find((todo) => todo.id === id);
    const newTodo = {
        ...selectedTodo,
        isCompleted: !selectedTodo.isCompleted
    };

    try {
        const res = await fetch(`${BASE_API_URL}todos/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newTodo)
        });
        if(res.ok) {
            const returnedTodo = await res.json();
            todos.value = todos.value.map((todo) => todo.id === returnedTodo.id ? returnedTodo : todo);
        }
    } catch(err) {
        console.log(err);
    }
}

async function deleteTodo(id) {
    try {
        const res = await fetch(`${BASE_API_URL}todos/${id}`, {
            method: 'DELETE'
        });
        if(res.ok) {
            const returnedTodo = await res.json();
            todos.value = todos.value.filter((todo) => todo.id !== returnedTodo.id);
        }
    } catch(err) {
        console.log(err);
    }
}

function toggleModal() {
    isOpenModal.value = !isOpenModal.value;
}

async function onSubmit() {
    if(!inputValue.value.trim()) return;

    isOpenModal.value = false;

    const newTodo = {
        title: inputValue.value,
        isCompleted: false
    };
    inputValue.value = '';

    try {
        const res = await fetch(`${BASE_API_URL}todos`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newTodo)
        });
        if(res.ok) {
            const returnedTodo = await res.json();
            todos.value.push(returnedTodo);
        }
    } catch(err) {
        console.log(err);
    }
}

onMounted(async () => {
    try {
        const res = await fetch(`${BASE_API_URL}todos`);
        if(res.ok) {
            todos.value = await res.json();
        }
    } catch(err) {
        console.log(err);
    }
});
</script>

<template>
    <div class="todo-list">
        <div class="todo-list__wrapper wrapper">
            <Button
                @click="toggleModal"
                :buttonConfig="toggleModalButtonConfig"
            >
                Add Todo
            </Button>
            <div class="todo-list__todos-box" v-if="todos.length">
                <TransitionGroup class="todo-list__todos" name="todos" tag="ul" appear>
                    <TodoItem
                        v-for="todo in todos"
                        :key="todo.id"
                        :todo
                        @toggleTodo="toggleTodo"
                        @deleteTodo="deleteTodo"
                        class="todo-list__todo"
                    />
                </TransitionGroup>
            </div>
            <div v-else class="todo-list__loader">
                Loading...
            </div>
            <Modal :modalConfig :isOpen="isOpenModal" @toggleModal="toggleModal">
                <form class="todo-list__form" @submit.prevent="onSubmit">
                    <Input v-model="inputValue" />
                    <Button class="todo-list__button" :buttonConfig="addTodoButtonConfig">
                        Submit
                    </Button>
                </form>
            </Modal>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.todo-list {
    margin-top: 60px;
    
    &__wrapper {
        flex-direction: column;
        align-items: flex-start;
    }

    &__todos-box {
        margin-top: 20px;
        width: 100%;
    }

    &__todos {
        position: relative;
    }

    &__todo {
        margin-top: 5px;

        &:first-child {
            margin-top: 0;
        }
    }

    &__form {
        display: flex;
        flex-direction: column;
    }

    &__button {
        margin: 40px auto 0;
    }

    .todos-move,
    .todos-enter-active,
    .todos-leave-active {
        transition: all .2s ease;
    }

    .todos-enter-from,
    .todos-leave-to {
        opacity: 0;
    }

    .todos-leave-active {
        position: absolute;
    }
}
</style>
