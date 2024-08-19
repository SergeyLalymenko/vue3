import { ref } from 'vue';
import bishopBlack from '@assets/icons/bishop-black.png';
import bishopWhite from '@assets/icons/bishop-white.png';

export const useBishop = (team) => {
    let coordinates = ref({});
    const icon = team === 'white' ? bishopWhite : bishopBlack;

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
        name: 'bishop',
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
                { x: 1, y: 1 },
                { x: -1, y: -1 },
                { x: 1, y: -1 },
                { x: -1, y: 1 }
            ];
            const availableMoves = getMovesByDirections(table, directions);

            return availableMoves;
        }
    }
};
