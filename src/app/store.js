import { configureStore } from '@reduxjs/toolkit'
import storage from 'redux-persist/lib/storage'
import stringReducer from '../components/stringSlice.js'
import { persistReducer } from 'redux-persist';
import { combineReducers } from '@reduxjs/toolkit';
const reducers = combineReducers({
    stringS:stringReducer
})
const persistConfig = {
    key: 'root',
    storage,
  };

const persistedReducer = persistReducer(persistConfig,reducers); 
export const store = configureStore({
    reducer:persistedReducer,
    middleware:() => [] // middleware takes callback as a function
});

  export default store;