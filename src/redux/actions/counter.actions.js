import { INCREMENT, DECREMENT } from '../types/counter.types';


    export const increaseCounter = () => {

        return {

            type: INCREMENT,

        };

    };

    export const decreaseCounter = () => {

        return {

           type: DECREMENT,

        };

    };