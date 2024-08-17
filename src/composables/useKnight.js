import { ref } from 'vue';
import knightBlack from '@assets/icons/knight-black.png';
import knightWhite from '@assets/icons/knight-white.png';

export const useKnight = (team) => {
    let coordinates = ref({});
    const icon = team === 'white' ? knightWhite : knightBlack;

    return {
        name: 'knight',
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
