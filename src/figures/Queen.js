import Figure from '@figures/Figure.js';
import queenBlack from '@assets/icons/queen-black.png';
import queenWhite from '@assets/icons/queen-white.png';

class Queen extends Figure {
    constructor(team) {
        super('queen');
        
        this.team = team;
        this.icon = this.getIcon();
    }

    getIcon() {
        return this.team === 'white' ? queenWhite : queenBlack;
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
        const availableMoves = this.getMovesByDirections(table, directions);

        return availableMoves;
    }
};

export default Queen;
