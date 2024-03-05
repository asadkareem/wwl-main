import { createAsyncThunk } from '@reduxjs/toolkit';
import { getRequest } from '../wwlAPI';

export const getSortedItems = createAsyncThunk(
    "dataTable/getSortedItems",
    async (
      { tableType, filterDirection, filterKey, query, pageNum },
      { dispatch, getState }
    ) => {

      const direction = filterDirection === "asc" ? 1 : -1;
      
      if (tableType === 'recipes') {
        const response = await getRequest(
            `/dataTable/paginated_recipes/sorted/${filterKey}/${direction}/${pageNum}/10/${query}`
          );
      }

      if (tableType === 'meal-plans') {
        const response = await getRequest(
            `/dataTable/paginated_mealplans/sorted/${filterKey}/${direction}/${pageNum}/10/${query}`
          );
      }
      
      
      if (response.data.toString().indexOf("!doctype html") > 0) {
        throw new Error("error getting dataTable");
      }
      return response.data;
    }
  );