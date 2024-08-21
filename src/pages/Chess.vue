<script setup>
import { ref, provide, onMounted, watch } from 'vue';
import { _ } from 'lodash';
import Rook from '@figures/Rook.js';
import Knight from '@figures/Knight.js';
import Bishop from '@figures/Bishop.js';
import Queen from '@figures/Queen.js';
import King from '@figures/King.js';
import Pawn from '@figures/Pawn.js';
import ChessTable from '@modules/ChessTable.vue';

const chessState = ref({
    teamMove: 'white',
    table: [],
});

const defaultCell = {
    figure: null,
    coordinates: {},
    selected: false
};
const figures = [
    Rook,
    Knight,
    Bishop,
    Queen,
    King,
    Bishop,
    Knight,
    Rook
];

provide('chessState', {
    chessState,
    moveSelectedFigure,
    selectCell,
    unselectCell
});

function moveSelectedFigure({ x, y }) {
    const selectedCellCoordinates = getSelectedCellCoordinates();
    const selectedFigure = chessState.value.table[selectedCellCoordinates.y][selectedCellCoordinates.x].figure;
    chessState.value.table[selectedCellCoordinates.y][selectedCellCoordinates.x].figure = null;
    chessState.value.table[y][x].figure = selectedFigure;

    applyForEveryCell((cell) => {
        cell.active = false;
        cell.selected = false;
    });
    toggleTeamMove();
}

function selectCell({ x, y }, availableMoves) {
    applyForEveryCell((cell) => {
        cell.active = false,
        cell.selected = false
    });
    const selectedCell = chessState.value.table[y][x];
    selectedCell.selected = true;
    
    const enemyTeam = selectedCell.figure.team === 'white' ? 'black' : 'white';
    const filteredMoves = selectedCell.figure.name === 'king' ? availableMoves.filter((availableMove) => isAvailableKingMove(enemyTeam, availableMove, { x, y })) : availableMoves;
    
    applyForSomeCells(filteredMoves, (cell) => {
        cell.active = true;
    });
}

function unselectCell({ x, y }) {
    chessState.value.table[y][x].selected = false;
    applyForEveryCell((cell) => {
        cell.active = false;
    });
}

function isAvailableKingMove(enemyTeam, coordinatesTo, coordinatesFrom) {
    let isAvailable = true;

    const copyTable = _.cloneDeep(chessState.value.table);
    const selectedFigure = copyTable[coordinatesFrom.y][coordinatesFrom.x].figure;
    copyTable[coordinatesFrom.y][coordinatesFrom.x].figure = null;
    copyTable[coordinatesTo.y][coordinatesTo.x].figure = selectedFigure;
    
    applyForEveryCell((cell) => {
        const enemyAvailableMoves = cell.figure?.team === enemyTeam && cell.figure?.getAvailableMoves(copyTable, true);
        if (!enemyAvailableMoves) return;

        enemyAvailableMoves.forEach((enemyAvailableMove) => {
            if (enemyAvailableMove.x === coordinatesTo.x && enemyAvailableMove.y === coordinatesTo.y) {
                isAvailable = false;
            }
        });
    });
    
    return isAvailable;
}

function getKingCoordinates(team, table = chessState.value.table) {
    let kingCoordinates = {};

    applyForEveryCell((cell) => {
        if (cell.figure?.name === 'king' && cell.figure.team === team) {
            kingCoordinates = { ...cell.coordinates };
        }
    }, table);

    return kingCoordinates;
}

function checkGameStatus() {
    const isKingUnderAttack = getIsKingUnderAttack();
    if (!isKingUnderAttack) {
        checkStalemate();
        return;
    };

    const isVariantToMove = getIsVariantToMove();
    if (!isVariantToMove) {
        const winner = chessState.value.teamMove === 'white' ? 'Black' : 'White';
        alert(`${winner} win!`);
    }
}

function checkStalemate() {
    let isStalemate = true;

    applyForEveryCell((cell) => {
        const availableMoves = cell.figure?.team === chessState.value.teamMove && cell.figure.getAvailableMoves(chessState.value.table, true);
        if (!availableMoves) return;

        availableMoves.forEach((availableMove) => {
            const copyTable = _.cloneDeep(chessState.value.table);
            const selectedFigure = copyTable[cell.coordinates.y][cell.coordinates.x].figure;
            selectedFigure.coordinates = { x: availableMove.x, y: availableMove.y };
            copyTable[cell.coordinates.y][cell.coordinates.x].figure = null;
            copyTable[availableMove.y][availableMove.x].figure = selectedFigure;
            
            const isKingUnderAttack = getIsKingUnderAttack(copyTable);
            if (isKingUnderAttack) return;

            isStalemate = false;
        });
    });

    console.log(isStalemate);

    if (!isStalemate) return;

    alert('Stalemate!');
}

function getIsVariantToMove() {
    let isVariantToMove = false;

    applyForEveryCell((cell) => {
        const availableMoves = cell.figure?.team === chessState.value.teamMove && cell.figure.getAvailableMoves(chessState.value.table, true);
        if (!availableMoves) return;

        availableMoves.forEach((availableMove) => {
            const copyTable = _.cloneDeep(chessState.value.table);
            const selectedFigure = copyTable[cell.coordinates.y][cell.coordinates.x].figure;
            selectedFigure.coordinates = { x: availableMove.x, y: availableMove.y };
            copyTable[cell.coordinates.y][cell.coordinates.x].figure = null;
            copyTable[availableMove.y][availableMove.x].figure = selectedFigure;

            const isKingUnderAttack = getIsKingUnderAttack(copyTable);
            if (isKingUnderAttack) return;

            isVariantToMove = true;
        });
    });

    return isVariantToMove;
}

function getIsKingUnderAttack(table = chessState.value.table) {
    let isUnderAttack = false;

    const enemyTeam = chessState.value.teamMove === 'white' ? 'black' : 'white';
    const kingCoordinates = getKingCoordinates(chessState.value.teamMove, table);

    applyForEveryCell((cell) => {
        const availableMoves = cell.figure?.team === enemyTeam && cell.figure?.getAvailableMoves(table, true);
        if (!availableMoves) return;

        availableMoves.forEach((availableMove) => {
            if (availableMove.x === kingCoordinates.x && availableMove.y === kingCoordinates.y) {
                isUnderAttack = true;
            }
        });
    }, table);

    return isUnderAttack;
}

function toggleTeamMove() {
    chessState.value.teamMove = chessState.value.teamMove === 'white' ? 'black' : 'white';
}

function getSelectedCellCoordinates() {
    let selectedCellCoordinates = {};

    chessState.value.table.forEach((row) => {
        row.forEach(({ selected, coordinates}) => {
            if (!selected) return;
            selectedCellCoordinates = coordinates;
        });
    });

    return selectedCellCoordinates;
}

function applyForEveryCell(callback, table = chessState.value.table) {
    table.forEach((row) => {
        row.forEach((cell) => {
            callback(cell);
        });
    });
}

function applyForSomeCells(cells, callback) {
    cells.forEach(({ x, y }) => {
        callback(chessState.value.table[y][x]);
    });
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
            figure: new figures[i]('black', { x: i, y: 0 })
        };
    });

    table[1] = table[1].map((emptyCell, i) => {
        return {
            ...emptyCell,
            figure: new Pawn('black', { x: i, y: 1 })
        };
    });

    table[6] = table[6].map((emptyCell, i) => {
        return {
            ...emptyCell,
            figure: new Pawn('white', { x: i, y: 6 })
        };
    });

    table[7] = table[7].map((emptyCell, i) => {
        return {
            ...emptyCell,
            figure: new figures[i]('white', { x: i, y: 7 })
        };
    });

    chessState.value.table = table;
});

watch(
    () => chessState.value.table,
    () => {
        if (!chessState.value.table.length) return;
        checkGameStatus();
    },
    {
        deep: true
    }
);
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
