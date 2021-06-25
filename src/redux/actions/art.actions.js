import {SET_DISPLAY_ARTS, SET_PAGE_ARTS, CLEAR_ARTS,SET_SINGLE_ART} from "../types/art.types"

export const setDisplayArt = (payload) => {
    return {
        type: SET_DISPLAY_ARTS,
        payload
    };
};
export const setPageArts = (payload) => {
    return {
        type: SET_PAGE_ARTS,
        payload
    };
};
export const clearArts = () => {
    return {
        type: CLEAR_ARTS
    };
};
export const setSingleArt = (payload) => {
    return {
        type: SET_SINGLE_ART,
        payload
    };
};
