import {createAsyncThunk} from '@reduxjs/toolkit'
// import { postRequest } from '../wwlAPI'
// import axios from 'axios'
// import * as emailjs from 'emailjs-com'
// import { setNotification } from '../navigation/navigationSlice'

//
// export const notifySlack = createAsyncThunk('notification/notifySlack', async (body, thunkAPI) => {
//   try {
//     const res = await postRequest(`/slack-notification`, body)
//     thunkAPI.dispatch(
//       setNotification({
//         msg: 'Thanks for sending us a bug report!',
//         subMessage: "We'll reach out if we need additional information."
//       })
//     )
//
//     if (!res) {
//       await emailjs.send('service_rf723un', 'template_b4q1xa4', body, `user_GZQWMLe7UdB2B37J4nwin`)
//     }
//
//     return res.data
//   } catch (e) {
//     await emailjs.send('service_rf723un', 'template_b4q1xa4', body, `user_GZQWMLe7UdB2B37J4nwin`)
//     console.error(e)
//     return null
//   }
// })
//
// export const emailShoppingList = createAsyncThunk(
//   'notification/emailShoppingList',
//   async ({ data, email }, thunkAPI) => {
//     try {
//       const emailUrl = 'https://no5vu24yy4.execute-api.us-west-2.amazonaws.com/default/emailShoppingList'
//
//       const headers = {
//         'x-api-key': process.env.REACT_APP_EMAIL_KEY
//       }
//
//       const body = {
//         sendAddress: email,
//         emailBody: data
//       }
//
//       const res = await axios.post(emailUrl, body, { headers })
//       thunkAPI.dispatch(
//         setNotification({
//           msg: 'Email sent successfully',
//           severity: 'success'
//         })
//       )
//
//       return res.data
//     } catch (e) {
//       console.error(e)
//       thunkAPI.dispatch(
//         setNotification({
//           msg: 'Failed to send email',
//           severity: 'error'
//         })
//       )
//       throw e
//     }
//   }
// )
