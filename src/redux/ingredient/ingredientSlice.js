import { createSlice } from '@reduxjs/toolkit'
import { getAllIngredients } from './ingredientThunk'

const initialIngredientState = {
  allIngredients: [],
  status: null
}

const ingredientSlice = createSlice({
  name: 'ingredients',
  initialState: initialIngredientState,
  extraReducers: {
    [getAllIngredients.pending]: (state) => {
      state.status = 'pending'
    },
    [getAllIngredients.fulfilled]: (state, action) => {
      state.status = 'success'
      state.allIngredients = action.payload
    },
    [getAllIngredients.rejected]: (state) => {
      state.status = 'failed'
      state.allIngredients = []
    }
  }
})

export const selectAllIngredients = (state) => state.ingredients.allIngredients

export default ingredientSlice.reducer
