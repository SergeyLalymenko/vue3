<script setup>
import { computed } from 'vue';
import pawnBlack from '@assets/icons/pawn-black.png';
import pawnWhite from '@assets/icons/pawn-white.png';
import rookBlack from '@assets/icons/rook-black.png';
import rookWhite from '@assets/icons/rook-white.png';
import knightBlack from '@assets/icons/knight-black.png';
import knightWhite from '@assets/icons/knight-white.png';
import bishopBlack from '@assets/icons/bishop-black.png';
import bishopWhite from '@assets/icons/bishop-white.png';
import queenBlack from '@assets/icons/queen-black.png';
import queenWhite from '@assets/icons/queen-white.png';
import kingBlack from '@assets/icons/king-black.png';
import kingWhite from '@assets/icons/king-white.png';

const { cellData, x, y } = defineProps(['cellData', 'x', 'y']);

const getFigureIcon = computed(() => {
    let icon = '';
    
    switch (cellData.figure) {
        case 'pawn': icon = cellData.team === 'white' ? pawnWhite : pawnBlack; break;
        case 'rook': icon = cellData.team === 'white' ? rookWhite : rookBlack; break;
        case 'knight': icon = cellData.team === 'white' ? knightWhite : knightBlack; break;
        case 'bishop': icon = cellData.team === 'white' ? bishopWhite : bishopBlack; break;
        case 'queen': icon = cellData.team === 'white' ? queenWhite : queenBlack; break;
        case 'king': icon = cellData.team === 'white' ? kingWhite : kingBlack; break;
    }

    return icon;
});
</script>

<template>
    <div class="cell" :class="{ white: (x + y) % 2 === 0 }">
        <img v-if="cellData.figure" class="cell__figure" :src="getFigureIcon" />
    </div>
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

    &.white {
        background: white;
    }

    &__figure {
        width: 50%;
    }
}
</style>
