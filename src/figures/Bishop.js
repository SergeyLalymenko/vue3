import Figure from '@figures/Figure.js';
import bishopBlack from '@assets/icons/bishop-black.png';
import bishopWhite from '@assets/icons/bishop-white.png';

class Bishop extends Figure {
    constructor(team, initialCoordinates) {
        super('bishop', initialCoordinates);
        
        this.team = team;
        this.icon = this.getIcon();
    }

    getIcon() {
        return this.team === 'white' ? bishopWhite : bishopBlack;
    }

    getAvailableMoves(table) {
        const directions = [
            { x: 1, y: 1 },
            { x: -1, y: -1 },
            { x: 1, y: -1 },
            { x: -1, y: 1 }
        ];
        const availableMoves = this.getMovesByDirections(table, directions);

        return availableMoves;
    }
};

export default Bishop;
