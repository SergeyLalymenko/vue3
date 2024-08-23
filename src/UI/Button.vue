<script setup>
const props = defineProps(['buttonConfig']);

const defaultButtonConfig = {
    visualType: 'primary',
    type: 'text',
    size: 'sm'
};

const buttonConfig = {
    ...defaultButtonConfig,
    ...props.buttonConfig
};
</script>

<template>
    <button class="button" :class="[buttonConfig.size, buttonConfig.visualType]" :type="buttonConfig.type">
        <slot />
    </button>
</template>

<style lang="scss" scoped>
@import '@/styles/variables.scss';

.button {
    background: none;
    border: none;
    transition: .2s;
    cursor: pointer;

    &.sm {
        padding: 10px 20px;
        font-size: 16px;
    }
    
    &.md {
        padding: 15px 25px;
        font-size: 20px;
    }

    &.xl {
        padding: 20px 30px;
        font-size: 24px;
    }
    
    &.primary {
        background: $colorActive;
        color: $colorText;
        border-radius: 5px;
        transition: .2s;
        cursor: pointer;

        &:hover {
            background: $colorActiveHighlight;
        }
    }

    &.secondary {
        border: 1px solid $colorBorder;
        color: $colorText;
        border-radius: 5px;

        &:hover {
            border-color: $colorActive;
        }
    }
}
</style>
