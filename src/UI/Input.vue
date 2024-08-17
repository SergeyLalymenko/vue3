<script setup>
const inputValue = defineModel();

</script>

<template>
    <input class="input" type="text" v-model="inputValue" />
</template>

<style lang="scss" scoped>
.input {
    width: 100%;
    border: 1px solid black;
    border-radius: 5px;
    padding: 10px;
    transition: .2s;
}
</style>
