import Home from '@/pages/Home.vue';
import TodoList from '@/pages/TodoList.vue';
import Chess from '@/pages/Chess.vue';
import FormBuilder from '@/pages/FormBuilder.vue';

export const routes = [
    {
        path: '/',
        component: Home
    },
    {
        path: '/todos',
        component: TodoList
    },
    {
        path: '/chess',
        component: Chess
    },
    {
        path: '/form-builder',
        component: FormBuilder
    }
];
