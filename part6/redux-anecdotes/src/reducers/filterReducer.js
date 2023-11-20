import { createSlice } from '@reduxjs/toolkit'

const filterSlice = createSlice({
    name: 'filter',
    initialState: null,
    reducers: {
        changeFilterAct(state, action) {
            return action.payload
        }
    }
})

export const { changeFilterAct } = filterSlice.actions
export default filterSlice.reducer