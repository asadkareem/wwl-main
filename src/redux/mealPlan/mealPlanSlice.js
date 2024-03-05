import {createSlice} from '@reduxjs/toolkit'
import {
    getWeeklyMealPlan,
    createMealPlan,
    deleteMealPlan,
    getAllAdminMealPlans,
    getAllUserMealPlans,
    getUserMealPlan,
    updateMealPlan,
    getWwlMealPlans
} from './mealPlanThunk'

const initialMealPlanState = {
    wwlMealPlans: null,
    weeklyMealPlan: null,
    allAdminMealPlans: [],
    allUserMealPlans: [],
    currentMealPlan: null,
    status: 'init',
    creatingMealPlanStatus: null
}

const mealPlanSlice = createSlice({
    name: 'mealPlan',
    initialState: initialMealPlanState,
    reducers: {
        setCreatingMealPlanStatus: (state, {payload}) => {
            state.creatingMealPlanStatus = payload
        },
    },
    extraReducers: {
        [getWwlMealPlans.pending]: (state) => {
            state.status = 'pending'
        },
        [getWwlMealPlans.fulfilled]: (state, {payload}) => {
            state.status = 'success'
            state.wwlMealPlans = payload
        },
        [getWwlMealPlans.rejected]: (state) => {
            state.status = 'failed'
            state.wwlMealPlans = null
        },
        [getWeeklyMealPlan.pending]: (state) => {
            state.status = 'pending'
        },
        [getWeeklyMealPlan.fulfilled]: (state, {payload}) => {
            state.status = 'success'
            state.weeklyMealPlan = payload
        },
        [getWeeklyMealPlan.rejected]: (state) => {
            state.status = 'failed'
            state.weeklyMealPlan = null
        },
        [getAllAdminMealPlans.pending]: (state) => {
            state.status = 'pending'
        },
        [getAllAdminMealPlans.fulfilled]: (state, {payload}) => {
            state.status = 'success'
            state.allAdminMealPlans = payload
        },
        [getAllAdminMealPlans.rejected]: (state) => {
            state.status = 'failed'
            state.allAdminMealPlans = []
        },
        [getAllUserMealPlans.pending]: (state) => {
            state.status = 'pending'
        },
        [getAllUserMealPlans.fulfilled]: (state, {payload}) => {
            state.status = 'success'
            state.allUserMealPlans = payload
        },
        [getAllUserMealPlans.rejected]: (state) => {
            state.status = 'failed'
            state.allUserMealPlans = null
        },
        [getUserMealPlan.pending]: (state) => {
            state.status = 'pending'
        },
        [getUserMealPlan.fulfilled]: (state, {payload}) => {
            state.status = 'success'
            state.currentMealPlan = payload
        },
        [getUserMealPlan.rejected]: (state) => {
            state.status = 'failed'
            state.currentMealPlan = null
        },
        [updateMealPlan.pending]: (state) => {
            state.status = 'pending'
        },
        [updateMealPlan.fulfilled]: (state, {payload}) => {
            state.status = 'success'
            state.currentMealPlan = payload
        },
        [updateMealPlan.rejected]: (state) => {
            state.status = 'failed'
        },
        [deleteMealPlan.pending]: (state) => {
            state.status = 'pending'
        },
        [deleteMealPlan.fulfilled]: (state, {payload}) => {
            state.status = 'success'
            state.allAdminMealPlans = payload.filter(({isAdmin}) => isAdmin === true)
            state.allUserMealPlans = payload.filter(({isAdmin}) => isAdmin === false)
        },
        [deleteMealPlan.rejected]: (state) => {
            state.status = 'failed'
        },
        [createMealPlan.pending]: (state) => {
            state.creatingMealPlanStatus = 'pending'
        },
        [createMealPlan.fulfilled]: (state, {payload}) => {
            state.creatingMealPlanStatus = 'success'
            state.currentMealPlan = payload
        },
        [createMealPlan.rejected]: (state) => {
            state.creatingMealPlanStatus = 'failed'
            state.currentMealPlan = null
        }
    }
})

export const selectStatus = (state) => state.mealPlan.status
export const selectWeeklyMealPlan = (state) => state.mealPlan.weeklyMealPlan
export const selectWwlMealPlans = (state) => state.mealPlan.wwlMealPlans
export const selectAllUserMealPlans = (state) => state.mealPlan.allUserMealPlans
export const selectAllAdminMealPlans = (state) => state.mealPlan.allAdminMealPlans
export const selectCurrentMealPlan = (state) => state.mealPlan.currentMealPlan
export const selectCreatingMealPlanStatus = (state) => state.mealPlan.creatingMealPlanStatus
export const {setCreatingMealPlanStatus} = mealPlanSlice.actions
export default mealPlanSlice.reducer
