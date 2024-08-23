<script setup>
const props = defineProps(['size']);
const size = props.size || 'md';
</script>

<template>
    <div class="close" :class="[size]">
        <div></div>
        <div></div>
    </div>
</template>

<style lang="scss" scoped>
@import '@/styles/variables.scss';

.close {
    position: relative;
    border-radius: 50%;
    border: 1px solid $colorBorder;
    padding: 5px;
    transition: .2s;
    cursor: pointer;

    &.sm {
        width: 20px;
        height: 20px;

        div {
            width: 10px;
            height: 2px;
        }
    }

    &.md {
        width: 30px;
        height: 30px;

        div {
            width: 16px;
            height: 2px;
        }
    }

    &.xl {
        width: 40px;
        height: 40px;

        div {
            width: 20px;
            height: 2px;
        }
    }

    &:hover {
        border-color: $colorDanger;

        div {
            background: $colorDanger;
        }
    }

    div {
        position: absolute;
        top: 50%;
        left: 50%;
        background: $colorBorder;
        transition: .2s;

        &:nth-child(1) {
            transform: translate(-50%, -50%) rotate(45deg);
        }

        &:nth-child(2) {
            transform: translate(-50%, -50%) rotate(-45deg);
        }
    }
}
</style>
