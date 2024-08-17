import { ref } from 'vue';
import bishopBlack from '@assets/icons/bishop-black.png';
import bishopWhite from '@assets/icons/bishop-white.png';

export const useBishop = (team) => {
    let coordinates = ref({});
    const icon = team === 'white' ? bishopWhite : bishopBlack;
    
    return {
        name: 'bishop',
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
