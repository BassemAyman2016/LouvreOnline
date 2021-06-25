import { SET_DISPLAY_ARTS, SET_PAGE_ARTS, CLEAR_ARTS, SET_SINGLE_ART } from '../types/art.types';

const INITIAL_STATE = {
  displayArts: [],
  pageArts: {},
  singleArt:{}
};

const reducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case SET_DISPLAY_ARTS:
            return {
                ...state,
                displayArts:action.payload
            };
        case SET_PAGE_ARTS:
            const newState = state;
            newState["pageArts"][action.payload.page] = action.payload.data;
            return newState;
            
        case CLEAR_ARTS:
            return INITIAL_STATE;
            
        case SET_SINGLE_ART:
            return {
                ...state,
                singleArt:action.payload
            };

       
        default: return state;

    }
};
export default reducer;