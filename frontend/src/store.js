import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice.js';

const store = configureStore({
    reducer: {
        auth: authReducer,
    },
    middleware: (getDefaultmiddleware) => getDefaultmiddleware(), // returns an array of default middlewares like 'redux-thunk' for async functions
    devTools: true // to inspect redux store, track actions, debug apllicaitons state changes
})

export default store

//Middleware is a way to extend Redux with custom functionality.