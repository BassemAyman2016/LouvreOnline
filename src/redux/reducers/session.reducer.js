import { SET_USER_INFO, CLEAR_USER_INFO, SET_TOKEN, CLEAR_TOKEN } from '../types/session.types';

const INITIAL_STATE = {
  token: null,
  user_info: null
};

const reducer = (state = INITIAL_STATE, action) => {

  switch (action.type) {
      case CLEAR_TOKEN:
        return {
          ...state,
          token:null
        };
        case CLEAR_USER_INFO:
          return {
            ...state,
            user_info:null
          };
      case SET_TOKEN:
          return {
            ...state, 
            token: action.payload,
          };
      case SET_USER_INFO:
            return {
              ...state, 
              user_info: action.payload,
            };

      
        default: return state;

  }

};
export default reducer;