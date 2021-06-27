import {SET_LOADER_FLAG } from '../types/loader.types';


export const setLoaderFlag = (payload) => {

    return {

        type: SET_LOADER_FLAG,
        payload

    };

};

    