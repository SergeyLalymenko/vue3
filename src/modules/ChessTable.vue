<script setup>
import { inject } from 'vue';
import ChessCell from '@components/ChessCell.vue';

const {
    chessState
} = inject('chessState');

</script>

<template>
    <div class="table">
        <div v-if="chessState.table?.length" class="table__inner">
            <template v-for="rowData in chessState.table">
                <ChessCell v-for="cellData in rowData" :cellData :key="`${cellData.coordinates.y}${cellData.coordinates.x}`" />
            </template>
        </div>
        <div v-else>
            Загрузка...
        </div>
    </div>
</template>

<style lang="scss" scoped>
@import '@styles/variables.scss';

.table {
    width: 100%;

    &__inner {
        display: flex;
        flex-wrap: wrap;
        width: 100%;
        max-width: 800px;
        border: 1px solid $colorBorder;
        margin: 0 auto;
    }
}
</style>
