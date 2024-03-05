import {createAsyncThunk} from '@reduxjs/toolkit'
import {setNotification} from '../navigation/navigationSlice'
import {getRequest, postRequest} from '../wwlAPI'
import {setLoading} from "../loader/loaderSlice";

export const getAllRecipes = createAsyncThunk('recipe/getAllRecipes', async (data) => {
    try {
        let res;
        if (data.filter || data.selectedSort) {
            //recipes/all/1?filter=Date&sortOrder=desc
            res = await getRequest(`/recipes/all/${data.pageNumber}?filter=${data.filter.name}&sortOrder=${data.selectedSort.value}`)
        } else {
            res = await getRequest(`/recipes/all/${data.pageNumber}`)
        }
        return res.data
    } catch (e) {
        console.error(e)
        throw e
    }
})

export const searchRecipes = createAsyncThunk('recipe/searchRecipes', async ({page, searchTags, filter, selectedSort}, thunkAPI) => {
    try {
        let res;
        if (filter && selectedSort) {
            res = await postRequest(`/recipes/sorted/title/${selectedSort}/9/${Number(page)}?filter=${filter.name}`, {searchTags: searchTags})
        } else {
            res = await postRequest(`/recipes/sorted/title/desc/9/${Number(page)}`, {searchTags: searchTags})
        }
        return res.data
    } catch (e) {
        console.error(e)
        thunkAPI.dispatch(setNotification({msg: `Error searching recipes`, severity: 'error'}))
        thunkAPI.dispatch(setLoading(false))
        throw e
    }
})

export const populateRecipeDetails = createAsyncThunk('recipe/populateRecipeDetails', async ({id, userId, primaryDiet, isGlutenFree}, thunkAPI) => {
    try {
        const {data} = await getRequest(`/recipes/get_recipe/${id}?userId=${userId}&diet=${primaryDiet.toLowerCase()}&is_gluten_free=${
          isGlutenFree}`, {})
        return data
    } catch (e) {
        console.error(e)
        thunkAPI.dispatch(setNotification({msg: e.response.data.message, severity: 'error'}))
        throw e
    }
})

export const getFeaturedRecipes = createAsyncThunk('recipe/getFeaturedRecipes', async () => {
    try {
        const {data} = await getRequest(`/recipes/featured_recipes`, {})
        return data
    } catch (e) {
        console.error(e)
        throw e
    }
})

export const getNewlyAddedRecipes = createAsyncThunk('recipe/getNewlyAddedRecipes', async () => {
    try {
        const {data} = await getRequest(`/recipes/new_recipes`, {})
        return data
    } catch (e) {
        console.error(e)
        throw e
    }
})


export const getRecipe = createAsyncThunk('recipe/getRecipe', async (id, thunkAPI) => {
    try {
        const token = localStorage.getItem('wwl-mpp-token')

        const headers = {
            Authorization: `Bearer ${token}`
        }

        if (!token) {
            const res = await getRequest(`/recipes/public/${id}`)
            return res.data
        } else {
            const res = await getRequest(`/recipes/${id}`, {headers})
            return res.data
        }
    } catch (e) {
        console.error(e)
        thunkAPI.dispatch(setNotification({msg: e.response.data.message, severity: 'error'}))
        throw e
    }
})

export const getAllCollections = createAsyncThunk('recipe/getAllCollections', async (page) => {
    try {
        const {data} = await getRequest(`/recipeCollections/recipes/${page}`, {})
        return data
    } catch (e) {
        console.error(e)
        throw e
    }
})
