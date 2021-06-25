import { SET_DISPLAY_USERS,SET_PAGE_USERS,CLEAR_USERS} from "../types/user.types";

const INITIAL_STATE = {
  displayUsers: [],
  pageUsers: {}
//   singleArt:{}
};

const reducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case SET_DISPLAY_USERS:
            return {
                ...state,
                displayUsers:action.payload
            };
        case SET_PAGE_USERS:
            const newState = state;
            newState["pageUsers"][action.payload.page] = action.payload.data;
            return newState;
            
        case CLEAR_USERS:
            return INITIAL_STATE;
            
        default: return state;

    }
};
export default reducer;