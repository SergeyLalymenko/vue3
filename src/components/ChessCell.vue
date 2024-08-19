<script setup>
import { inject, onMounted, onUpdated } from 'vue';

const { cellData } = defineProps(['cellData']);
const {
    chessState,
    moveSelectedFigure,
    selectCell,
    unselectCell
} = inject('chessState');

function sayFigureCoordinates() {
    console.log(cellData.figure?.getCoordinates());
}

function onCellClick() {
    if (!isCurrentTeamMove() && !cellData.active) return;
    
    if (cellData.selected) {
        unselectCell(cellData.coordinates);
        return;
    }

    if (cellData.active) {
        moveSelectedFigure(cellData.coordinates);
        return;
    }

    if (!cellData.selected) {
        const availableMoves = cellData.figure.getAvailableMoves(chessState.value.table);
        selectCell(cellData.coordinates, availableMoves);
        return;
    }
}

function onEmptyCellClick() {
    if (cellData.active) {
        moveSelectedFigure(cellData.coordinates);
        return;
    }
}

function isCurrentTeamMove() {
    return chessState.value.teamMove === cellData.figure.team;
}

function setFigureCoordinates() {
    cellData.figure?.setCoordinates(cellData.coordinates);
}

onMounted(() => {
    setFigureCoordinates();
});

onUpdated(() => {
    setFigureCoordinates();
});
</script>

<template>
    <div
        v-if="cellData.figure"
        class="cell"
        :class="{
            white: (cellData.coordinates.x + cellData.coordinates.y) % 2 === 0,
            active: cellData.active,
            selected: cellData.selected,
            currentTeamMove: chessState.teamMove === cellData.figure.team
        }"
        @click="onCellClick"
    >
        <img class="cell__figure" :src="cellData.figure.icon" />
    </div>
    <div
        v-else
        class="cell empty"
        :class="{
            white: (cellData.coordinates.x + cellData.coordinates.y) % 2 === 0,
            active: cellData.active
        }"
        @click="onEmptyCellClick"
    ></div>
</template>

<style lang="scss" scoped>
@import '@styles/variables.scss';

.cell {
    display: flex;
    align-items: center;
    justify-content: center;
    aspect-ratio: 1 / 1;
    width: calc(100% / 8);
    background: rgb(54, 51, 51);
    border: 5px solid transparent;

    &.white {
        background: white;
    }

    &.active {
        border-color: $colorActive;
        cursor: pointer;

        &:not(.currentTeamMove):not(.empty) {
            border-color: $colorDanger;
        }
    }

    &.selected {
        border-color: $colorActive;
    }

    &.currentTeamMove {
        cursor: pointer;
    }

    &__figure {
        width: 50%;
    }
}
</style>
