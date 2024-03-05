import {createAsyncThunk} from '@reduxjs/toolkit'
import {setNotification} from '../navigation/navigationSlice'
import {getRequest, postRequest, putRequest} from '../wwlAPI'
import {autoDeleteToast} from "./shoppingListSlice";

export const getShoppingList = createAsyncThunk('shoppingList/getShoppingList', async ({mpId, reset=false}) => {
  try {
    let res;
    if (reset) {
      res = await getRequest(`/shoppingLists/get_mealplan_shoppinglist/${mpId}?reset=${reset}`, {})
    } else {
      res = await getRequest(`/shoppingLists/get_mealplan_shoppinglist/${mpId}`, {})
    }
    return res.data
  } catch (e) {
    console.error(e)
    throw e
  }
})

export const updateShoppingList = createAsyncThunk('shoppingList/updateShoppingList', async (data, thunkAPI) => {
  try {
    const res = await putRequest(`/shopping-list`, {data})
    localStorage.setItem('wwl-mpp-shopping-list', JSON.stringify(res?.data.data))
    thunkAPI.dispatch(setNotification({msg: 'Saved shopping list!'}))

    return res?.data.data || []
  } catch (e) {
    console.error(e)
    thunkAPI.dispatch(
      setNotification({
        msg: 'Error saving shopping list',
        subMessage: 'standard error',
        severity: 'error'
      })
    )
    throw e
  }
})

export const createShoppingList = createAsyncThunk('shoppingList/createShoppingList', async (data, thunkAPI) => {
  try {
    const res = await postRequest(`/shoppingLists`, data)
    return res?.data._id
  } catch (e) {
    console.error(e)
    thunkAPI.dispatch(setNotification({msg: 'Error creating shopping list!', severity: 'error'}))
    throw e
  }
})

export const deleteShoppingList = createAsyncThunk('shoppingList/deleteShoppingList', async (id, thunkAPI) => {
  try {
    return id
    //   const res = await deleteRequest(`/shopping-list`)
    //   return res?.data.data || []
  } catch (e) {
    console.error(e)
    thunkAPI.dispatch(setNotification({msg: "We couldn't delete your list", severity: 'error'}))
    throw e
  }
})

export const autoDeleteShoppingList = createAsyncThunk('shoppingList/autoDeleteShoppingList', async (id, thunkAPI) => {
  setTimeout(() => {
    thunkAPI.dispatch(autoDeleteToast(id))
  }, 4000);
})

export const sendShoppingMail = createAsyncThunk('shoppingList/sendShoppingMail', async (body, thunkAPI) => {
  const res = await postRequest(`/users/email`, body)
  return res?.data.message;
})

// export const addItemToShoppingList = createAsyncThunk('shoppingList/addItem', async (data, thunkAPI) => {
//   try {
//       return data;
//   } catch (e) {
//     thunkAPI.dispatch(setNotification({ msg: 'Error Adding to shopping list!', severity: 'error' }))
//     throw e
//   }
// })

export const checkSavedShoppingList = createAsyncThunk('shoppingList/checkSavedShoppingList', async (data, thunkAPI) => {
    try {
      const res = await getRequest(`/shoppingLists/user/${data.ownerId}/${data.mealplanId}`)
      return res?.data
    } catch (e) {
      console.error(e)
      thunkAPI.dispatch(setNotification({msg: 'Error checking shopping list!', severity: 'error'}))
      throw e
    }
  }
)