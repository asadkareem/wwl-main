import {createAsyncThunk} from '@reduxjs/toolkit'
import {setNotification} from '../navigation/navigationSlice'
import {deleteRequest, getRequest, postRequest, putRequest} from '../wwlAPI'

export const getNotes = createAsyncThunk('recipe/notes', async ({id, page, notesType}, thunkAPI) => {
  try {
    const res = await getRequest(`/recipeNotes/get_${notesType}/${id}/${page}`, {})
    return [res.data, notesType]
  } catch (e) {
    console.error(e)
    thunkAPI.dispatch(setNotification({msg: 'Error getting notes!', severity: 'error'}))
    throw e
  }
})

export const postNote = createAsyncThunk('notes/postNote', async (body, thunkAPI) => {
  try {
    const res = await postRequest(`/recipeNotes`, body)
    return res.data
  } catch (e) {
    console.error(e)
    thunkAPI.dispatch(setNotification({msg: 'Error posting note!', severity: 'error'}))
    throw e
  }
})

export const updateNote = createAsyncThunk('notes/updateNote', async ({body, _id, index}, thunkAPI) => {
  try {
    const {data} = await putRequest(`/recipeNotes/update_recipenote/${_id}`, body)
    return {data, parentIndex: index}
  } catch (e) {
    console.error(e)
    thunkAPI.dispatch(setNotification({msg: 'Error updating note!', severity: 'error'}))
    throw e
  }
})

export const deleteNote = createAsyncThunk('notes/deleteNote', async ({id, note_type, isReply, index}, thunkAPI) => {
  try {
    await deleteRequest(`/recipeNotes/delete_recipenote/${id}`, {})
    return [id, note_type, isReply, index]
  } catch (e) {
    console.error(e)
    thunkAPI.dispatch(setNotification({msg: 'Error deleting note!', severity: 'error'}))
    throw e
  }
})
