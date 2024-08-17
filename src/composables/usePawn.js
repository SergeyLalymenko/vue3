import pawnBlack from '@assets/icons/pawn-black.png';
import pawnWhite from '@assets/icons/pawn-white.png';

export const usePawn = (team) => {
    let coordinates = {};
    const icon = team === 'white' ? pawnWhite : pawnBlack;

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
        sayHi() {
            console.log('Hi!');
        }
    }
};
