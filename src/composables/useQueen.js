import { ref } from 'vue';
import queenBlack from '@assets/icons/queen-black.png';
import queenWhite from '@assets/icons/queen-white.png';

export const useQueen = (team) => {
    let coordinates = ref({});
    const icon = team === 'white' ? queenWhite : queenBlack;

    return {
        name: 'queen',
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
