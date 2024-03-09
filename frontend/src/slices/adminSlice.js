import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    adminInfo: localStorage.getItem('adminInfo') ? 
    JSON.parse(localStorage.getItem('adminInfo')) : null
}

const adminAuthSlice = createSlice({
    name: 'adminAuth',
    initialState,
    reducers: {
        setCredentials: (state, action) => {
            state.adminInfo = action.payload;
            localStorage.setItem('adminInfo', JSON.stringify(action.payload))
        },
        logout: (state, action) => {
            state.adminInfo = null;
            localStorage.removeItem('adminInfo');
        }
    }
})

export const { setCredentials, logout } = adminAuthSlice.actions; //when it changes your state it is reducer, when we call this it is a action

export default adminAuthSlice.reducer