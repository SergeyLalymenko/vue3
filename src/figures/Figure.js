class Figure {
    
    constructor(name, initialCoordinates) {
        this.name = name;
        this.coordinates = initialCoordinates;
    }

    getCoordinates() {
        return this.coordinates;
    }

    setCoordinates(newCoordinates) {
        this.coordinates = newCoordinates;
    }
    
    getMovesByDirections(
        table,
        directions,
        maxMoveLength = 8,
        canKill = true,
        canOnlyKill = false
    ) {
        const availableMoves = [];
        
        directions.forEach((direction) => {
            let x = this.coordinates.x;
            let y = this.coordinates.y;
            
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
    
                if (cell.figure.team !== this.team && canKill) {
                    availableMoves.push({ x, y });
                    break;
                }
                break;
            }
        });
        
        return availableMoves;
    }
};

export default Figure;
