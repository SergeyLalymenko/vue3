<script setup>
import { Teleport, Transition } from 'vue';
import Close from '@UI/Close.vue';
const props = defineProps(['modalConfig', 'isOpen']);
defineEmits(['toggleModal']);

const defaultModalConfig = {
    title: 'Modal',
    size: 'md'
};

const modalConfig = {
    ...defaultModalConfig,
    ...props.modalConfig
};
</script>

<template>
    <Teleport to="body">
        <Transition name="modal" :duration="400">
            <div class="modal" v-if="isOpen" @click="$emit('toggleModal')">
                <div class="modal__wrapper" :class="[modalConfig.size]" @click.stop>
                    <div class="modal__header">
                        <h4 class="modal__header-title">
                            {{ modalConfig.title }}
                        </h4>
                        <Close @click="$emit('toggleModal')" />
                    </div>
                    <div class="modal__content">
                        <slot />
                    </div>
                </div>
            </div>
        </Transition>
    </Teleport>
</template>

<style lang="scss" scoped>
@import '@styles/variables.scss';

.modal {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background: rgba($colorText, .2);

    &__wrapper {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        padding: 20px;
        background: $colorBackground;
        border-radius: 10px;
        width: calc(100% - 30px);

        &.sm {
            max-width: 520px;
        }

        &.md {
            max-width: 920px;
        }

        &.xl {
            max-width: 1120px;
        }
    }

    &__header {
        display: flex;
        justify-content: space-between;
        gap: 40px;
    }

    &__content {
        margin-top: 40px;
    }
}

.modal-enter-from,
.modal-leave-to {
    opacity: 0;
}

.modal-enter-active,
.modal-leave-active {
    transition: all .4s ease;
    pointer-events: none;
}

.modal-enter-from .modal__wrapper,
.modal-leave-to .modal__wrapper {
    transform: translate(-50%, -50%) scale(.5);
}

.modal-enter-active .modal__wrapper,
.modal-leave-active .modal__wrapper {
    transition: all .4s ease;
}
</style>
