import pawnBlack from '@assets/icons/pawn-black.png';
import pawnWhite from '@assets/icons/pawn-white.png';

export const usePawn = (team) => {
    let coordinates = {};
    let isFirstStep = true;
    const icon = team === 'white' ? pawnWhite : pawnBlack;

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
        name: 'pawn',
        team,
        icon,
        getCoordinates() {
            return coordinates;
        },
        setCoordinates(newCoordinates) {
            coordinates = newCoordinates;
        },
        getAvailableMoves(table) {
            const stepDirection = team === 'white' ? -1 : 1;
            const maxMoveLength = isFirstStep ? 2 : 1;
            const moveDirections = [
                { x: 0, y: stepDirection }
            ];
            const killDirections = [
                { x: -1, y: stepDirection },
                { x: 1, y: stepDirection }
            ];
            const availableMoves = [
                ...getMovesByDirections(table, moveDirections, maxMoveLength, false),
                ...getMovesByDirections(table, killDirections, 1, true, true)
            ];

            isFirstStep = false;

            return availableMoves;
        }
    }
};
