import { createSlice } from '@reduxjs/toolkit'
import { getAllTags } from './tagThunk'

const initialRatingState = {
  tags: [],
  searchTags:null,
  status: null
}

const tagSlice = createSlice({
  name: 'tags',
  initialState: initialRatingState,
  reducers: {
    updateSearchTags: (state, action) => {
      state.searchTags = action.payload
    }
  },
  extraReducers: {
    [getAllTags.pending]: (state) => {
      state.status = 'pending'
    },
    [getAllTags.fulfilled]: (state, { payload }) => {
      state.status = 'success'
      state.tags = payload
    },
    [getAllTags.rejected]: (state) => {
      state.status = 'failed'
      state.tags = []
    }
  }
})

export const selectAllTags = (state) => state.tags.tags
export const selectTagsStatus = (state) => state.tags.status
export const {updateSearchTags} = tagSlice.actions


export default tagSlice.reducer
