<script setup>
import { ref, provide, onMounted } from 'vue';
import { useRook } from '@composables/useRook.js';
import { useKnight } from '@composables/useKnight.js';
import { useBishop } from '@composables/useBishop.js';
import { useQueen } from '@composables/useQueen.js';
import { useKing } from '@composables/useKing.js';
import { usePawn } from '@composables/usePawn.js';
import ChessTable from '@modules/ChessTable.vue';

const chessState = ref({});

const defaultCell = {
    figure: null,
    coordinates: {},
    selected: false
};
const figures = [
    useRook,
    useKnight,
    useBishop,
    useQueen,
    useKing,
    useBishop,
    useKnight,
    useRook
];

provide('chessState', {
    chessState,
    moveFigure,
    unselectCell
});

function moveFigure(figure, from, to) {
    chessState.value.table[from.y][from.x].figure = null;
    chessState.value.table[to.y][to.x].figure = figure;
};

function unselectCell({ x, y }) {
    chessState.value.table[y][x].selected = false;
}

onMounted(() => {
    const table = [];

    for (let y = 0; y < 8; y++) {
        const tableRow = [];
        
        for (let x = 0; x < 8; x++) {
            tableRow.push({
                ...defaultCell,
                coordinates: { x, y }
            });
        }

        const uniqueTableRow = tableRow.map((cell) => ({ ...cell }));
        table.push(uniqueTableRow);
    }

    table[0] = table[0].map((emptyCell, i) => {
        return {
            ...emptyCell,
            figure: figures[i]('black', { x: i, y: 0 })
        };
    });

    table[1] = table[1].map((emptyCell, i) => {
        return {
            ...emptyCell,
            figure: usePawn('black', { x: i, y: 1 })
        };
    });

    table[6] = table[6].map((emptyCell, i) => {
        return {
            ...emptyCell,
            figure: usePawn('white', { x: i, y: 6 })
        };
    });

    table[7] = table[1].map((emptyCell, i) => {
        return {
            ...emptyCell,
            figure: figures[i]('white', { x: i, y: 7 })
        };
    });

    chessState.value.table = table;
});
</script>

<template>
    <div class="chess">
        <div class="chess__wrapper wrapper">
            <ChessTable />
        </div>
    </div>
</template>

<style lang="scss" scoped>
.chess {
    margin-top: 60px;
}
</style>
