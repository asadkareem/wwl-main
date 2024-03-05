import { createAsyncThunk } from '@reduxjs/toolkit'
import { setNotification } from '../navigation/navigationSlice'
import { getRequest, postRequest } from '../wwlAPI'

export const getAllRatings = createAsyncThunk('rating/getAllRatings', async ({ recipeId }) => {
  try {
    const res = await getRequest(`/recipes/ratings/${recipeId}`, {})

    return res?.data || []
  } catch (e) {
    console.error(e)
    throw e
  }
})

export const rateRecipe = createAsyncThunk('rating/rateRecipe', async ({ recipeId, score }, thunkAPI) => {
  try {
    const res = await postRequest(`/recipes/ratings/${recipeId}`, { score })
    return res?.data || null
  } catch (e) {
    console.error(e)
    thunkAPI.dispatch(setNotification({ msg: 'Error saving rating!', severity: 'error' }))
    throw e
  }
})
