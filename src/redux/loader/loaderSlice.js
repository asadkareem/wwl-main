import {createSlice} from '@reduxjs/toolkit'

const initialNotificationState = {
  loading: false,
}

const loaderSlice = createSlice({
  name: 'loader',
  initialState: initialNotificationState,
  reducers: {
    setLoading: (state, action) => {
      state.loading = action.payload
    }
  }
})

export const selectLoading = state => state.loader.loading
export const {setLoading} = loaderSlice.actions
export default loaderSlice.reducer
