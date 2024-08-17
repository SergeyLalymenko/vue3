import { ref } from 'vue';
import rookBlack from '@assets/icons/rook-black.png';
import rookWhite from '@assets/icons/rook-white.png';

export const useRook = (team) => {
    let coordinates = ref({});
    const icon = team === 'white' ? rookWhite : rookBlack;

    return {
        name: 'rook',
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
