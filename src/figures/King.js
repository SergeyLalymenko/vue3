import Figure from '@/figures/Figure.js';
import kingBlack from '@/assets/icons/king-black.png';
import kingWhite from '@/assets/icons/king-white.png';

class King extends Figure {
    constructor(team, initialCoordinates) {
        super('king', initialCoordinates);
        
        this.team = team;
        this.icon = this.getIcon();
    }

    getIcon() {
        return this.team === 'white' ? kingWhite : kingBlack;
    }

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
        const availableMoves = this.getMovesByDirections(table, directions, 1);

        return availableMoves;
    }
};

export default King;
