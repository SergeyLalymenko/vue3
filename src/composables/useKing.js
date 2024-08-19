import { ref } from 'vue';
import kingBlack from '@assets/icons/king-black.png';
import kingWhite from '@assets/icons/king-white.png';

export const useKing = (team) => {
    let coordinates = ref({});
    const icon = team === 'white' ? kingWhite : kingBlack;

    function getMovesByDirections(
        table,
        directions,
        maxMoveLength = 8,
        canKill = true,
        canOnlyKill = false
    ) {
        const availableMoves = [];
        
        directions.forEach((direction) => {
            let x = coordinates.x;
            let y = coordinates.y;
            
            for (let i = 0; i < maxMoveLength; i++) {
                x += direction.x;
                y += direction.y;
                
                const cell = table?.[y]?.[x];
                if (!cell) break;
    
                if (!cell.figure && !canOnlyKill) {
                    availableMoves.push({ x, y });
                    continue;
                }

                if (!cell.figure) continue;
    
                if (cell.figure.team !== team && canKill) {
                    availableMoves.push({ x, y });
                    break;
                }
                break;
            }
        });
        
        return availableMoves;
    }

    return {
        name: 'king',
        team,
        icon,
        getCoordinates() {
            return coordinates;
        },
        setCoordinates(newCoordinates) {
            coordinates = newCoordinates;
        },
        getAvailableMoves(table) {
            const directions = [
                { x: 0, y: 1 },
                { x: 0, y: -1 },
                { x: 1, y: 0 },
                { x: -1, y: 0 },
                { x: 1, y: 1 },
                { x: -1, y: -1 },
                { x: 1, y: -1 },
                { x: -1, y: 1 }
            ];
            const availableMoves = getMovesByDirections(table, directions, 1);

            return availableMoves;
        }
    }
};
