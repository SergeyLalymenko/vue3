<script setup>

</script>

<template>
    <header class="header">
        <div class="header__wrapper wrapper">
            <ul class="header__nav">
                <RouterLink to="/" class="header__nav-link" exact-active-class="active">
                    Home
                </RouterLink>
                <RouterLink to="/todos" class="header__nav-link" exact-active-class="active">
                    Todos
                </RouterLink>
                <RouterLink to="/chess" class="header__nav-link" exact-active-class="active">
                    Chess
                </RouterLink>
                <RouterLink to="/form-builder" class="header__nav-link" exact-active-class="active">
                    Form Builder
                </RouterLink>
            </ul>
        </div>
    </header>
</template>

<style lang="scss" scoped>
@import '@/styles/variables.scss';

.header {
    display: flex;
    width: 100%;
    border-bottom: 1px solid $colorDivider;

    &__wrapper {
        padding-top: 20px;
        padding-bottom: 20px;
    }

    &__nav {
        display: flex;
        align-items: center;
        justify-content: center;
        flex-wrap: wrap;
        gap: 20px;
        width: 100%;
    }
}
</style>
