import { createSlice } from '@reduxjs/toolkit'
import { getAllRatings, rateRecipe } from './ratingThunk'

const initialRatingState = {
  allRatings: [],
  ratedRecipe: {},
  status: null
}

const ratingSlice = createSlice({
  name: 'rating',
  initialState: initialRatingState,
  extraReducers: {
    [getAllRatings.pending]: (state) => {
      state.status = 'pending'
    },
    [getAllRatings.fulfilled]: (state, { payload }) => {
      state.status = 'success'
      state.allRatings = payload
    },
    [getAllRatings.rejected]: (state) => {
      state.status = 'failed'
      state.allRatings = []
    },
    [rateRecipe.pending]: (state) => {
      state.status = 'pending'
    },
    [rateRecipe.fulfilled]: (state, { payload }) => {
      state.status = 'success'
      state.ratedRecipe = payload
    },
    [rateRecipe.rejected]: (state) => {
      state.status = 'failed'
      state.ratedRecipe = {}
    }
  }
})

export const selectStatus = (state) => state.rating.status

export default ratingSlice.reducer
