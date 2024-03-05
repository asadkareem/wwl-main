import { createAsyncThunk } from '@reduxjs/toolkit'
import { getRequest } from '../wwlAPI'

export const getAllTags = createAsyncThunk('tag/getAllTags', async () => {
  try {
    const res = await getRequest(`/tags/all`, {})
    let tags = res?.data
    tags = tags.map(({ _id, __v, ...rest }) => rest)
    return tags || []
  } catch (e) {
    console.error(e)
    throw e
  }
})

