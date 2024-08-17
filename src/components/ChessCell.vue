<script setup>
import { inject, onMounted, onUpdated } from 'vue';

const { cellData } = defineProps(['cellData']);
const {
    moveFigure,
    unselectCell
} = inject('chessState');

function sayFigureCoordinates() {
    console.log(cellData.figure?.getCoordinates());
}

function onCellClick() {
    if (cellData.selected) {
        unselectCell(cellData.coordinates);
        return;
    }
    moveFigure(cellData.figure, cellData.coordinates, { x: 3, y: 2 });
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
            selected: cellData.selected
        }"
        @click="onCellClick"
    >
        <img class="cell__figure" :src="cellData.figure.icon" />
        <p class="coor">
            {{ cellData.coordinates.x }} {{ cellData.coordinates.y }}
        </p>
    </div>
    <div
        v-else
        class="cell"
        :class="{ white: (cellData.coordinates.x + cellData.coordinates.y) % 2 === 0 }"
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

    &.selected {
        border-color: $colorActive;
    }

    &__figure {
        width: 50%;
    }

    .coor {
        color: red;
        font-size: 12px;
    }
}
</style>
