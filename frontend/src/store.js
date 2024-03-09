import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice.js';
import adminAuthReducer from './slices/adminSlice.js'
import { apiSlice } from './slices/apiSlice.js';

const store = configureStore({
    reducer: {
        auth: authReducer,
        adminAuth: adminAuthReducer,
        [apiSlice.reducerPath]: apiSlice.reducer,
    },
    middleware: (getDefaultmiddleware) => 
    getDefaultmiddleware().concat(apiSlice.middleware), // returns an array of default middlewares like 'redux-thunk' for async functions
    devTools: true // to inspect redux store, track actions, debug apllicaitons state changes
})

export default store

//Middleware is a way to extend Redux with custom functionality.