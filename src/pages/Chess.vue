<script setup>
import { ref, provide, onMounted, watch, nextTick } from 'vue';
import { _ } from 'lodash';
import Rook from '@figures/Rook.js';
import Knight from '@figures/Knight.js';
import Bishop from '@figures/Bishop.js';
import Queen from '@figures/Queen.js';
import King from '@figures/King.js';
import Pawn from '@figures/Pawn.js';
import ChessTable from '@modules/ChessTable.vue';
import Button from '@UI/Button.vue';
import Modal from '@components/Modal.vue';

const chessState = ref({});
const modal = ref({
    isOpen: false,
    text: ''
});

const modalConfig = {
    title: 'Game over!',
    size: 'sm'
};
const buttonConfig = {
    visualType: 'primary',
    type: 'text',
    size: 'xl'
};
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
    selectedFigure.name === 'pawn' && selectedFigure.setIsFirstStep(false);
    chessState.value.table[selectedCellCoordinates.y][selectedCellCoordinates.x].figure = null;
    chessState.value.table[y][x].figure = selectedFigure;

    applyForEveryCell((cell) => {
        cell.active = false;
        cell.selected = false;
    });
    toggleTeams();
}

function selectCell(coordinatesFrom, availableMoves) {
    applyForEveryCell((cell) => {
        cell.active = false,
        cell.selected = false
    });
    chessState.value.table[coordinatesFrom.y][coordinatesFrom.x].selected = true;
    
    const filteredMoves = availableMoves.filter((availableMove) => isAvailableMove(coordinatesFrom, availableMove));
    
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

function createTableCopy(coordinatesFrom, coordinatesTo) {
    const tableCopy = _.cloneDeep(chessState.value.table);
    const selectedFigure = tableCopy[coordinatesFrom.y][coordinatesFrom.x].figure;
    selectedFigure.setCoordinates(coordinatesTo);
    tableCopy[coordinatesFrom.y][coordinatesFrom.x].figure = null;
    tableCopy[coordinatesTo.y][coordinatesTo.x].figure = selectedFigure;

    return tableCopy;
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
        const winner = chessState.value.currentTeam === 'white' ? 'Black' : 'White';
        gameOver(`${winner} win!`);
    }
}

function checkStalemate() {
    let isStalemate = true;

    applyForEveryCell((cell) => {
        const availableMoves = cell.figure?.team === chessState.value.currentTeam && cell.figure.getAvailableMoves(chessState.value.table);
        if (!availableMoves) return;
        
        availableMoves.forEach((availableMove) => {
            const tableCopy = createTableCopy(cell.coordinates, availableMove);
            const isKingUnderAttack = getIsKingUnderAttack(tableCopy);
            if (isKingUnderAttack) return;

            isStalemate = false;
        });
    });

    if (!isStalemate) return;

    gameOver('Stalemate!');
}

function getIsVariantToMove() {
    let isVariantToMove = false;

    applyForEveryCell((cell) => {
        const availableMoves = cell.figure?.team === chessState.value.currentTeam && cell.figure.getAvailableMoves(chessState.value.table);
        if (!availableMoves) return;

        availableMoves.forEach((availableMove) => {
            const tableCopy = createTableCopy(cell.coordinates, availableMove);
            const isKingUnderAttack = getIsKingUnderAttack(tableCopy);
            if (isKingUnderAttack) return;

            isVariantToMove = true;
        });
    });

    return isVariantToMove;
}

function isAvailableMove(coordinatesFrom, coordinatesTo) {
    let isAvailable = true;

    const tableCopy = createTableCopy(coordinatesFrom, coordinatesTo);
    const kingCoordinates = getKingCoordinates(chessState.value.currentTeam, tableCopy);

    applyForEveryCell((cell) => {
        const enemyAvailableMoves = cell.figure?.team === chessState.value.enemyTeam && cell.figure?.getAvailableMoves(tableCopy);
        if (!enemyAvailableMoves) return;

        enemyAvailableMoves.forEach((enemyAvailableMove) => {
            if (enemyAvailableMove.x === kingCoordinates.x && enemyAvailableMove.y === kingCoordinates.y) {
                isAvailable = false;
            }
        });
    }, tableCopy);
    
    return isAvailable;
}

function getIsKingUnderAttack(table = chessState.value.table) {
    let isUnderAttack = false;

    const kingCoordinates = getKingCoordinates(chessState.value.currentTeam, table);

    applyForEveryCell((cell) => {
        const availableMoves = cell.figure?.team === chessState.value.enemyTeam && cell.figure?.getAvailableMoves(table);
        if (!availableMoves) return;

        availableMoves.forEach((availableMove) => {
            if (availableMove.x === kingCoordinates.x && availableMove.y === kingCoordinates.y) {
                isUnderAttack = true;
            }
        });
    }, table);

    return isUnderAttack;
}

function toggleTeams() {
    if (chessState.value.currentTeam === 'white') {
        chessState.value.currentTeam = 'black';
        chessState.value.enemyTeam = 'white';
        return;
    }

    chessState.value.currentTeam = 'white';
    chessState.value.enemyTeam = 'black';
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

function gameOver(text) {
    chessState.value.isActiveGame = false;
    modal.value.text = text;
    toggleModal();
}

function toggleModal() {
    modal.value.isOpen = !modal.value.isOpen;
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

async function initNewGame() {
    const currentTeam = 'white';
    const enemyTeam = 'black';
    const isActiveGame = true;
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

    chessState.value = {};

    await nextTick();

    chessState.value = {
        currentTeam,
        enemyTeam,
        isActiveGame,
        table
    };
}

onMounted(initNewGame);

watch(
    () => chessState.value.table,
    () => {
        if (!Object.keys(chessState.value).length) return;
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
            <Modal :modalConfig :isOpen="modal.isOpen" @toggleModal="toggleModal">
                <h5>
                    {{ modal.text }}
                </h5>
            </Modal>
            <Button
                class="chess__new-game"
                :buttonConfig
                @click="initNewGame"
            >
                New Game
            </Button>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.chess {
    margin-top: 60px;
    margin-bottom: 60px;

    &__wrapper {
        flex-direction: column;
        align-items: center;
    }

    &__new-game {
        margin-top: 40px;
    }
}
</style>
