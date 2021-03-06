import { createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage/session' // defaults to localStorage for web
import rootReducer from './rootReducer';

const persistConfig = {
    key: 'root',
    storage,
}

const persistedReducer = persistReducer(persistConfig, rootReducer)
let store = createStore(persistedReducer, composeWithDevTools())

const config = () => {
    
    let persistor = persistStore(store)
    return { store, persistor }
}

// const store = createStore(rootReducer,,);


export default config;