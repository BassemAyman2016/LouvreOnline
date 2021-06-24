import { combineReducers } from 'redux';


import counterReducer from './reducers/counter.reducer';
import sessionReducer from "./reducers/session.reducer"
import artReducer from "./reducers/art.reducer"
import userReducer from "./reducers/user.reducer"
import loaderReducer from "./reducers/loader.reducer"
const rootReducer = combineReducers({
    session:sessionReducer,
    // counter: counterReducer,    
    loader:loaderReducer
    // artModule:artReducer
    

});

export default rootReducer;