<script setup>
import { ref, provide, onMounted } from 'vue';
import ChessTable from '@modules/ChessTable.vue';

const chessData = ref({});

const defaultCell = {
    figure: null,
    team: null,
    active: false
};
const figures = [
    {
        figure: 'rook'
    },
    {
        figure: 'knight'
    },
    {
        figure: 'bishop'
    },
    {
        figure: 'queen'
    },
    {
        figure: 'king'
    },
    {
        figure: 'bishop'
    },
    {
        figure: 'knight'
    },
    {
        figure: 'rook'
    }
];

provide('chessData', {
    chessData
});

setTimeout(() => {
    chessData.value.table[0][0].figure = 'pawn';
}, 5000);

onMounted(() => {
    const tableRow = [];
    const table = [];

    for (let i = 0; i < 8; i++) {
        tableRow.push({ ...defaultCell });
    }
    for (let i = 0; i < 8; i++) {
        table.push([...tableRow]);
    }

    table[0] = table[0].map((emptyCell, i) => {
        return {
            ...emptyCell,
            ...figures[i],
            team: 'black'
        };
    });

    table[1] = table[1].map((emptyCell, i) => {
        return {
            ...emptyCell,
            figure: 'pawn',
            team: 'black'
        };
    });

    table[6] = table[1].map((emptyCell, i) => {
        return {
            ...emptyCell,
            figure: 'pawn',
            team: 'white'
        };
    });

    table[7] = table[7].map((emptyCell, i) => {
        return {
            ...emptyCell,
            ...figures[i],
            team: 'white'
        };
    });

    chessData.value.table = table;
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
