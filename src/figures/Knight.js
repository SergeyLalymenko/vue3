import Figure from '@/figures/Figure.js';
import knightBlack from '@/assets/icons/knight-black.png';
import knightWhite from '@/assets/icons/knight-white.png';

class Knight extends Figure {
    constructor(team, initialCoordinates) {
        super('knight', initialCoordinates);
        
        this.team = team;
        this.icon = this.getIcon();
    }

    getIcon() {
        return this.team === 'white' ? knightWhite : knightBlack;
    }

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
        const availableMoves = this.getMovesByDirections(table, directions, 1);

        return availableMoves;
    }
};

export default Knight;
