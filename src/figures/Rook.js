import Figure from '@/figures/Figure.js';
import rookBlack from '@/assets/icons/rook-black.png';
import rookWhite from '@/assets/icons/rook-white.png';

class Rook extends Figure {
    constructor(team, initialCoordinates) {
        super('rook', initialCoordinates);
        
        this.team = team;
        this.icon = this.getIcon();
    }

    getIcon() {
        return this.team === 'white' ? rookWhite : rookBlack;
    }

    getAvailableMoves(table) {
        const directions = [
            { x: 0, y: 1 },
            { x: 0, y: -1 },
            { x: 1, y: 0 },
            { x: -1, y: 0 }
        ];
        const availableMoves = this.getMovesByDirections(table, directions);

        return availableMoves;
    }
};

export default Rook;
