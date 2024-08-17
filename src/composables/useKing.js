import { ref } from 'vue';
import kingBlack from '@assets/icons/king-black.png';
import kingWhite from '@assets/icons/king-white.png';

export const useKing = (team) => {
    let coordinates = ref({});
    const icon = team === 'white' ? kingWhite : kingBlack;

    return {
        name: 'king',
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
