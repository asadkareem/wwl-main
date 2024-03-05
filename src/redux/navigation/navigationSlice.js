import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  currentPage: 'recipes',
  sidebarIsOpen: false,
  notification: {
    msg: '',
    subMessage: '',
    severity: ''
  },
  isTouchScreen: true,
}

const navigationSlice = createSlice({
  name: 'navigation',
  initialState: initialState,
  reducers: {
    setCurrentPage: (state, { payload }) => {
      state.currentPage = payload
    },
    toggleSidebar: (state, { payload }) => {
      state.sidebarIsOpen = payload
    },
    setNotification: (state, { payload }) => {
      state.notification = payload
    },
    setIsTouchScreen: (state, { payload }) => {
      state.isTouchScreen = payload
    }
  }
})

export const selectCurrentPage = (state) => state.navigation.currentPage
export const selectSidebarIsOpen = (state) => state.navigation.sidebarIsOpen
export const selectNotification = (state) => state.navigation.notification

export const selectIsTouchScreen = (state) => state.navigation.isTouchScreen

export const { setCurrentPage, toggleSidebar, setNotification, setIsTouchScreen } = navigationSlice.actions

export default navigationSlice.reducer
