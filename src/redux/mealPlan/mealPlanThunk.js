import {createAsyncThunk} from '@reduxjs/toolkit'
import {deleteRequest, getRequest, postRequest, putRequest} from '../wwlAPI'
import {setNotification} from '../navigation/navigationSlice'

//CURRENTWORK
export const getWwlMealPlans = createAsyncThunk('mealPlan/getWwlMealPlans', async (page) => {
    try {
        const res = await getRequest(`/mealplans/all/${page}`, {})
        return res.data
    } catch (e) {
        console.error(e)
        throw e
    }
})

export const getUserMealPlans = createAsyncThunk('mealPlan/getUserMealPlans', async (page) => {
    try {
        const res = await getRequest(`/mealplans`, {})
        return res.data
    } catch (e) {
        console.error(e)
        throw e
    }
})

export const getWeeklyMealPlan = createAsyncThunk('mealPlan/getWeeklyMealPlan', async () => {
    try {
        const res = await getRequest(`/plans/weekly`, {})

        return res.data
    } catch (e) {
        console.error(e)
        throw e
    }
})

export const getAllAdminMealPlans = createAsyncThunk('mealPlan/getAllAdminMealPlans', async () => {
    try {
        const res = await getRequest(`/plans/admin`, {})
        return res.data
    } catch (e) {
        console.error(e)
        throw e
    }
})

export const getAllUserMealPlans = createAsyncThunk('mealPlan/getAllUserMealPlans', async () => {
    try {
        const res = await getRequest(`/plans/user`, {})
        return res.data
    } catch (e) {
        console.error(e)
        throw e
    }
})

export const getUserMealPlan = createAsyncThunk(
    'mealPlan/getUserMealPlan',
    async (pageNumber) => {
        // try {
        //     const res = shouldIncludeIngredients
        //         ? await getRequest(`/plans/${id}?includeIngredients`)
        //         : await getRequest(`/plans/${id}`)
        //
        //     return res.data
        // } catch (e) {
        //     console.error(e)
        //     throw e
        // }
        try {
            const res = await getRequest(`/mealplans/user/${pageNumber}`, {})
            //TODO : Add Pagination from component
            return res.data
        } catch (e) {
            console.error(e)
            throw e
        }
    }
)

export const updateMealPlan = createAsyncThunk('mealPlan/updateMealPlan', async ({id, ...body}) => {
    try {
        const res = await putRequest(`/mealplans/update_mealplan/${id}`, body)
        return res.data
    } catch (e) {
        console.error(e)
        throw e
    }
})

export const deleteMealPlan = createAsyncThunk('mealPlan/deleteMealPlan', async (id) => {
    try {
        const res = await deleteRequest(`/plans/${id}`, {})

        return res.data
    } catch (e) {
        console.error(e)
        throw e
    }
})

export const createMealPlan = createAsyncThunk('mealPlan/createMealPlan', async ({...body}, thunkAPI) => {
    try {
        const res = await postRequest(`/mealplans`, body)
        thunkAPI.dispatch(setNotification({msg: 'Saved meal plan!'}))
        return res.data
    } catch (e) {
        console.error(e)
        thunkAPI.dispatch(
            setNotification({
                msg: 'Error saving meal plan',
                subMessage: 'standard error',
                severity: 'error'
            })
        )
        throw e
    }
})
