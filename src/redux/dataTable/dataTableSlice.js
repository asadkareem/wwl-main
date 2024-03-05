import { createSlice } from '@reduxjs/toolkit'
import { getSortedItems } from './dataTableThunk'

const initialDataTableState = {
  headers: [],
  items: [],
  pagination: {
    currentPage: 1,
    itemsPerPage: 10,
    totalItems: 100,
  },
  status: null
}

const dataTableSlice = createSlice({
  name: 'dataTables',
  initialState: initialDataTableState,
  extraReducers: {
    [getSortedItems.pending]: (state) => {
      state.status = 'pending'
    },
    [getSortedItems.fulfilled]: (state, action) => {
      state.status = 'success'
      state.allDataTables = action.payload
    },
    [getSortedItems.rejected]: (state) => {
      state.status = 'failed'
      state.allDataTables = []
    }
  }
})

export default dataTableSlice.reducer
