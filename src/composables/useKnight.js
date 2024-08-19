import { ref } from 'vue';
import knightBlack from '@assets/icons/knight-black.png';
import knightWhite from '@assets/icons/knight-white.png';

export const useKnight = (team) => {
    let coordinates = ref({});
    const icon = team === 'white' ? knightWhite : knightBlack;

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
        name: 'knight',
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
                { x: 1, y: 2 },
                { x: 2, y: 1 },
                { x: -1, y: 2 },
                { x: -2, y: 1 },
                { x: 1, y: -2 },
                { x: 2, y: -1 },
                { x: -1, y: -2 },
                { x: -2, y: -1 },
            ];
            const availableMoves = getMovesByDirections(table, directions, 1);

            return availableMoves;
        }
    }
};
