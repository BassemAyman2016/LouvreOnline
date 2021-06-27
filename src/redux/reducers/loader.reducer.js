import { SET_LOADER_FLAG } from '../types/loader.types';

const INITIAL_STATE = {
    displayLoader: false,
};

const reducer = (state = INITIAL_STATE, action) => {

    switch (action.type) {

        case SET_LOADER_FLAG:
          console.log("in setLoaderFlag",action)
            return {
              ...state, 
              displayLoader: action.payload,
            };

        
          default: return state;

    }

};

export default reducer;