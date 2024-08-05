import { createSlice } from "@reduxjs/toolkit";

const miscSlice = createSlice({
    name: "misc",
    initialState: {
        isAddOpen:false,
        isMenuOpen:false
    },
    reducers: {
        toggleAdd:(state,action) => {
            state.isAddOpen = action.payload;
        },
        setIsMenuOpen:(state,action) => {
            state.isMenuOpen = action.payload;
        }
    }
})

export const { toggleAdd ,setIsMenuOpen} = miscSlice.actions;
export default miscSlice.reducer;