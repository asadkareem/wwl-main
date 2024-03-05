import { createAsyncThunk } from '@reduxjs/toolkit';
import { getRequest } from '../wwlAPI';

export const getAllIngredients = createAsyncThunk('ingredient/getAllIngredients', async () => {
  try {
    const res = await getRequest(`/ingredients/all?index=-1`, {}); //base_url should be put into the wwlAPI file
    return res.data;
  } catch (e) {
    console.error(e);
    throw e;
  }
});
