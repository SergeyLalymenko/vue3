<script setup>
import { inject } from 'vue';
import ChessCell from '@components/ChessCell.vue';

const {
    chessData
} = inject('chessData');

</script>

<template>
    <div class="table">
        <div v-if="Object.keys(chessData).length" class="table__inner">
            <template v-for="(rowData, x) in chessData.table">
                <ChessCell v-for="(cellData, y) in rowData" :cellData :x :y :key="`${x}${y}`" />
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
