import {createSlice} from '@reduxjs/toolkit'
// import {createAction} from "@reduxjs/toolkit/src";
// import { emailShoppingList, notifySlack } from './notificationThunk'

const initialNotificationState = []

const notificationSlice = createSlice({
  name: 'notification',
  initialState: initialNotificationState,
  reducers: {
  }
  // extraReducers: {
  //   [notifySlack.pending]: (state) => {
  //     state.status = 'pending'
  //   },
  //   [notifySlack.fulfilled]: (state, { payload }) => {
  //     state.status = 'success'
  //     state.slackNotification = payload
  //   },
  //   [notifySlack.rejected]: (state) => {
  //     state.status = 'failed'
  //     state.slackNotification = {}
  //   },
  //   [emailShoppingList.pending]: (state) => {
  //     state.status = 'pending'
  //   },
  //   [emailShoppingList.fulfilled]: (state, { payload }) => {
  //     state.status = 'success'
  //     state.emailNotification = payload
  //   },
  //   [emailShoppingList.rejected]: (state) => {
  //     state.status = 'failed'
  //     state.emailNotification = {}
  //   }
  // }
})

// export const {} = notificationSlice.actions

export default notificationSlice.reducer
