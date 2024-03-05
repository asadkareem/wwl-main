import { createAsyncThunk } from '@reduxjs/toolkit'
import { setNotification } from "../navigation/navigationSlice";
import { getRequest, postRequest, putRequest } from '../wwlAPI'
import { toast } from "react-hot-toast";

export const logout = createAsyncThunk('user/logout', async (_, thunkAPI) => {
  localStorage.removeItem('wwl-mpp-token')
  localStorage.removeItem('state')
  localStorage.removeItem('persist:root-user')
  return null
})

export const updateCurrentUserPreferences = createAsyncThunk('user/updateCurrentUserPreferences', async (payload, thunkAPI) => {
  try {
    const { data } = await putRequest(`/users/update_user/${payload.userId}`, payload)
    return data
  } catch (e) {
    console.error(e)
    toast.error('Failed to update preferences')
    // thunkAPI.dispatch(
    //   setNotification({
    //     msg: 'Something went wrong',
    //     subMessage: 'Please try again or contact support',
    //   })
    // )
  }
})


export const login = createAsyncThunk('user/login', async (payload, thunkAPI) => {
  // const localState = localStorage.getItem('state');
  // if (payload.state !== localState) {
  //   return
  // }
  try {
    let bypassMemberful = false
    if (process.env.REACT_APP_CUSTOM_ENV === 'local') bypassMemberful = true

    if (bypassMemberful) {
      payload.email = process.env.REACT_APP_ADMIN_EMAIL
      payload.adminPassword = process.env.REACT_APP_ADMIN_PASSWORD

      const res = await postRequest(`/users/login/admin`, payload)
      if (res.data.token) {
        localStorage.setItem('wwl-mpp-token', res.data.token)
      }

      return res.data
    } else {
      const res = await postRequest(`/users/login`, payload)
      if (res.data.token) {
        localStorage.setItem('wwl-mpp-token', res.data.token)
      }
      return res.data.user
    }
  } catch (e) {
    localStorage.removeItem('wwl-mpp-token')
    localStorage.removeItem('state')
    localStorage.removeItem('persist:root-user')
    toast.error('Something went wrong during login')
    throw e
  }
})

export const getCurrentUser = createAsyncThunk('user/getCurrentUser', async (_, thunkAPI) => {
  try {
    const res = await getRequest(`/users`, {})

    return res.data
  } catch (e) {
    console.error(e)
    throw e
  }
})


export const checkMemberfulSub = createAsyncThunk('user/checkMemberfulSub', async (_, thunkAPI) => {
  try {
    const res = await postRequest(`/memberful/permissionCheck`, {})

    return res.data
  } catch (e) {
    console.error(e)
    throw e
  }
})

export const updateCurrentUser = createAsyncThunk('user/updateCurrentUser', async (params, thunkAPI) => {
  try {
    const res = await putRequest(`/users`, params)
    thunkAPI.dispatch(setNotification({ msg: 'Successfully saved!' }))

    return res.data
  } catch (e) {
    console.error(e)
    thunkAPI.dispatch(
      setNotification({
        msg: 'Something went wrong!',
        severity: 'error'
      })
    )
    throw e
  }
})

export const getUserFavorites = createAsyncThunk('recipe/getUserFavorites', async (data, thunkAPI) => {
  try {
    let res;
    if (data.filter && data.selectedSort) res = await getRequest(`/recipes/favorites/${data.pageNumber}?filter=${data.filter.name}&sortOrder=${data.selectedSort.value}`, {})
    else res = await getRequest(`/recipes/favorites/${data.pageNumber}`, {})
    return res.data
  } catch (e) {
    console.error(e)
    thunkAPI.dispatch(setNotification({ msg: `Error loading favorite recipes`, severity: 'error' }))
    throw e
  }
})

export const addFavorite = createAsyncThunk('recipe/addFavorite', async (id, thunkAPI) => {
  try {
    await putRequest(`/users/add_favorite`, { id })
    return id
  } catch (e) {
    console.error(e)
    thunkAPI.dispatch(setNotification({ msg: `Error saving favorite recipe`, severity: 'error' }))
    throw e
  }
})

export const getUserBookmarked = createAsyncThunk('recipe/getUserBookmarked', async (data, thunkAPI) => {
  try {
    let res;
    if (data.filter && data.selectedSort) res = await getRequest(`/recipes/bookmarked/${data.pageNumber}?filter=${data.filter.name}&sortOrder=${data.selectedSort.value}`, {})
    else res = await getRequest(`/recipes/bookmarked/${data.pageNumber}`, {})
    return res.data
  } catch (e) {
    console.error(e)
    thunkAPI.dispatch(setNotification({ msg: `Error loading bookmarked recipes`, severity: 'error' }))
    throw e
  }
})

export const fillSelectionData = createAsyncThunk('user/fillSelectionData', async (id) => {
  try {
    const { data } = await getRequest(`/mealplans/get_mealplan/${id}`, {})
    return data
  } catch (e) {
    console.error(e)
  }
})

export const addBookmarked = createAsyncThunk(
  'recipe/addBookmarked',
  async (id, thunkAPI) => {
    try {
      await putRequest(`/users/add_bookmark`, { id })
      return id
    } catch (e) {
      console.error(e)
      thunkAPI.dispatch(setNotification({ msg: `Error saving bookmarked recipe`, severity: 'error' }))
      throw e
    }
  }
)

export const getSavedRecipes = createAsyncThunk('recipe/getSavedRecipes', async (data, thunkAPI) => {
  try {
    let res;
    if (data.filter && data.selectedSort) res = await getRequest(`/recipes/getUserFavAndBookmarkedRecipes/${data.pageNumber}?filter=${data.filter.name}&sortOrder=${data.selectedSort.value}`, {})
    else res = await getRequest(`/recipes/getUserFavAndBookmarkedRecipes/${data.pageNumber}`, {})
    return res.data
  } catch (e) {
    console.error(e)
    thunkAPI.dispatch(setNotification({ msg: `Error loading bookmarked recipes`, severity: 'error' }))
    throw e
  }
})

export const memberfulAccount = createAsyncThunk('recipe/memberfulAccount', async (data, thunkAPI) => {
  try {
    const { data } = await postRequest(`/memberful/permissionCheck`, {})
    return data
  } catch (e) {
    console.error(e)
    thunkAPI.dispatch(setNotification({ msg: `Error loading bookmarked recipes`, severity: 'error' }))
    throw e
  }
})

//TODO : Dunno if its still needed;

// export const updateCurrentUserDiet = createAsyncThunk('user/updateCurrentUserDiet', async (params, thunkAPI) => {
//     try {
//         const res = await putRequest(`/users`, params)
//         thunkAPI.dispatch(setNotification({msg: 'Successfully saved!'}))
//
//         return res.data
//     } catch (e) {
//         console.error(e)
//         thunkAPI.dispatch(
//             setNotification({
//                 msg: 'Something went wrong!',
//                 severity: 'error'
//             })
//         )
//         throw e
//     }
// })
