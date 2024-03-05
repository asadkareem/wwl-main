import {createSlice} from '@reduxjs/toolkit'
import {toast} from 'react-hot-toast'
import {
    login,
    logout,
    getCurrentUser,
    updateCurrentUser,
    getUserFavorites,
    getUserBookmarked,
    addBookmarked,
    addFavorite,
    checkMemberfulSub, updateCurrentUserPreferences, fillSelectionData, getSavedRecipes, memberfulAccount
} from './userThunk'
import {mealTimes} from "../../utilis/generalUtilis";

const initialUserState = {
    currentUser: null,
    memberfulSub: null,
    favorite_recipes: [],
    favoritesStatus: null,
    bookmarked_recipes: [],
    bookmarkedStatus: null,
    shoppingList: null,
    SavedRecipeStatus: null,
    savedRecipes: null,
    selectionInstanceDetails: Array.from({length: 3}, (val, i) => {
        return {
            title: mealTimes[i],
            meals: Array.from({length: 6}, () => ({}))
        }
    }),
    userMealPlans: null,
    prevLocation: null,
    status: null,
    unitPreference: 'Metric',
    primaryDiet: 'Omnivore',
    isGlutenFree: false,
    isDairyFree: true,
    clickedOutside: false,
    updateEmptyCardIndex: null
    , savedShoppingList: null,
}


const userSlice = createSlice({
    name: 'user',
    initialState: initialUserState,
    reducers: {
        updateFavoriteRecipes: (state, action) => {
            state.favorite_recipes.recipes = state.favorite_recipes.recipes.filter(recipe => recipe._id !== action.payload)
            toast.success('Recipe removed from favorites')
        },
        updateBookmarkedRecipes: (state, action) => {
            state.bookmarked_recipes.recipes = state.bookmarked_recipes.recipes.filter(recipe => recipe._id !== action.payload)
            toast.success('Recipe removed from bookmarks')
        },
        updateUnitPreference: (state, action) => {
            state.unitPreference = action.payload
        },
        updatePrimaryDiet: (state, action) => {
            state.primaryDiet = action.payload
        },
        updateIsGlutenFree: (state, action) => {
            state.isGlutenFree = action.payload
        },
        updateIsDairyFree: (state, action) => {
            state.isDairyFree = action.payload
        },
        addSelectionDetails: (state, {payload}) => {
            state.selectionInstanceDetails[payload.rowIndex].meals[payload.itemIndex] = {...payload.recipe, servings: 1}
        },
        updateClickedOutside: (state, action) => {
            state.clickedOutside = action.payload
        },
        updateEmptyCardIndex: (state, action) => {
            state.updateEmptyCardIndex = action.payload
        },
        updateEmptyCardRecipe: (state, action) => {
            state.selectionInstanceDetails[state.updateEmptyCardIndex.rowIndex].meals[state.updateEmptyCardIndex.itemIndex] = action.payload
        },
        updateMicroViewRecipe: (state, {payload}) => {
            state.selectionInstanceDetails[payload.rowIndex].meals[payload.itemIndex] = payload.mealPlanRecipeData
        },
        deleteSelectionData: (state, {payload}) => {
            state.selectionInstanceDetails = payload.map((title) => ({
                title,
                meals: Array.from({length: 6}, () => ({})),
            }))
        },
        updateRecipeCardOptions: (state, action) => {
            const {rowIndex, itemIndex, options} = action.payload
            const targetArr = state.selectionInstanceDetails[rowIndex].meals[itemIndex]

            targetArr.diet = options[0]?.value || 'Omnivore';
            targetArr.details.diet = options[0]?.value || 'Omnivore';

            targetArr.isDairyFree = options[1].selected || false;
            targetArr.details.isDairyFree = options[1].selected || false;
            targetArr.isGlutenFree = options[2].selected || false;
            targetArr.details.isGlutenFree = options[2].selected || false;
        },
        updateServingsCount: (state, action) => {
            const {rowIndex, itemIndex, servings} = action.payload
            const targetArr = state.selectionInstanceDetails[rowIndex].meals[itemIndex]
            targetArr.servings = servings
        },
        setShoppingListId: (state, action) => {
            state.savedShoppingList = action.payload
        },
        reorderGrid: (state, {payload}) => {
            const firstSix = payload.slice(0, 6);
            const middleSix = payload.slice(6, 12);
            const lastSix = payload.slice(12);
            state.selectionInstanceDetails = [
                {title: "Breakfast", meals: firstSix},
                {title: "Lunch", meals: middleSix},
                {title: "Dinner", meals: lastSix}
            ]
        },
        removeMealPanRecipe: (state, {payload}) => {
            const {rowIndex = null, itemIndex = null, type = null} = payload;
            if (type) {
                state.selectionInstanceDetails[state.updateEmptyCardIndex.rowIndex].meals[[state.updateEmptyCardIndex.itemIndex]] = {}
            } else {
                state.selectionInstanceDetails[rowIndex].meals[itemIndex] = {}
            }
        },
        updateSavedRecipes: (state, {payload}) => {
            const {index, type} = payload;
            if (type === 'favorite') {
                state.savedRecipes.recipes[index].is_favorite = !state.savedRecipes.recipes[index].is_favorite
            } else {
                state.savedRecipes.recipes[index].is_bookmarked = !state.savedRecipes.recipes[index].is_bookmarked
            }
            if (state.savedRecipes.recipes[index].is_favorite === false && state.savedRecipes.recipes[index].is_bookmarked === false) {
                state.savedRecipes.recipes.splice(index, 1)
            }
        },
        updateLikedRecipes: (state, {payload}) => {
            const {index, type} = payload;
            if (type === 'favorite' && state.favorite_recipes.recipes[index]) {
                state.favorite_recipes.recipes[index].is_favorite = !state.favorite_recipes.recipes[index].is_favorite
            } else if (type === 'bookmarked' && state.bookmarked_recipes.recipes[index]) {
                state.bookmarked_recipes.recipes[index].is_bookmarked = !state.bookmarked_recipes.recipes[index].is_bookmarked
            }
        }
    },
    extraReducers: {
        // --------
        // login
        // --------
        [login.pending]: (state) => {
            state.status = 'logging-in'
        },
        [login.fulfilled]: (state, action) => {
            state.status = 'success'
            state.currentUser = action.payload
        },
        [login.rejected]: (state) => {
            state.status = 'failed'
            state.currentUser = null
        },

        // logout
        [logout.pending]: (state) => {
            state.status = 'pending'
        },
        [logout.fulfilled]: (state, action) => {
            state.status = 'success'
            state.currentUser = null
        },
        [logout.rejected]: (state) => {
            state.status = 'failed'
        },

        // --------
        // updateCurrentUserPreferences
        // --------
        [updateCurrentUserPreferences.pending]: (state) => {
            state.status = 'pending'
        },
        [updateCurrentUserPreferences.fulfilled]: (state, action) => {
            state.currentUser.unit_preference = action.payload.unit_preference;
            state.currentUser.primary_diet = action.payload.primary_diet;
            state.currentUser.is_gluten_free = action.payload.is_gluten_free;
            state.currentUser.is_dairy_free = action.payload.is_dairy_free;
            state.status = 'success';
        },
        [updateCurrentUserPreferences.rejected]: (state) => {
            state.status = 'failed'
            state.unitPreference = 'Metric'
            state.primaryDiet = 'Omnivore'
            state.isGlutenFree = false
            state.isDairyFree = false
        },

        // --------
        // checkMemberfulSub
        // --------
        [checkMemberfulSub.pending]: (state) => {
            state.status = 'pending'
            state.memberfulSub = null
        },
        [checkMemberfulSub.fulfilled]: (state, action) => {
            state.status = 'success'
            state.memberfulSub = action.payload
        },
        [checkMemberfulSub.rejected]: (state) => {
            state.status = 'failed'
            state.memberfulSub = null
        },

        [getCurrentUser.pending]: (state) => {
            state.status = 'pending'
        },
        [getCurrentUser.fulfilled]: (state, action) => {
            state.status = 'success'
            state.currentUser = action.payload
        },
        [getCurrentUser.rejected]: (state) => {
            state.status = 'failed'
            state.currentUser = {}
        },
        [updateCurrentUser.pending]: (state) => {
            state.status = 'pending'
        },
        [updateCurrentUser.fulfilled]: (state, action) => {
            state.status = 'success'
            state.currentUser = action.payload
        },
        [updateCurrentUser.rejected]: (state) => {
            state.status = 'failed'
            state.currentUser = {}
        },
        [getUserFavorites.pending]: (state) => {
            state.favoritesStatus = 'pending'
        },
        [getUserFavorites.fulfilled]: (state, action) => {
            state.favoritesStatus = 'success'
            state.favorite_recipes = action.payload
        },
        [getUserFavorites.rejected]: (state) => {
            state.favoritesStatus = 'failed'
            toast.error("Something went wrong!")
            state.favorite_recipes = []
        },
        [addFavorite.pending]: (state) => {
            state.favoritesStatus = 'pending'
        },
        [addFavorite.fulfilled]: (state, {payload}) => {
            const index = state.currentUser.favorite_recipes.indexOf(payload);
            if (index === -1) {
                state.currentUser.favorite_recipes.push(payload);
            } else {
                state.currentUser.favorite_recipes.splice(index, 1);
            }
            state.favoritesStatus = 'success'
        },
        [addFavorite.rejected]: (state) => {
            state.favoritesStatus = 'failed'
            state.currentUser = {}
        },
        [getUserBookmarked.pending]: (state) => {
            state.bookmarkedStatus = 'pending'
        },
        [getUserBookmarked.fulfilled]: (state, action) => {
            state.bookmarkedStatus = 'success'
            state.bookmarked_recipes = action.payload
        },
        [getUserBookmarked.rejected]: (state) => {
            state.bookmarkedStatus = 'failed'
            state.bookmarked_recipes = []
        },
        [getSavedRecipes.pending]: (state) => {
            state.SavedRecipeStatus = 'pending'
        },
        [getSavedRecipes.fulfilled]: (state, action) => {
            state.SavedRecipeStatus = 'success'
            state.savedRecipes = action.payload
        },
        [getSavedRecipes.rejected]: (state) => {
            state.SavedRecipeStatus = 'failed'
            state.savedRecipes = []
        },
        [addBookmarked.pending]: (state) => {
            state.bookmarkedStatus = 'pending'
        },
        [addBookmarked.fulfilled]: (state, {payload}) => {
            let index = state.currentUser.bookmarked_recipes.indexOf(payload);
            if (index === -1) {
                state.currentUser.bookmarked_recipes.push(payload);
            } else {
                state.currentUser.bookmarked_recipes.splice(index, 1);
            }
            state.bookmarkedStatus = 'success'
        },
        [addBookmarked.rejected]: (state) => {
            state.bookmarkedStatus = 'failed'
            state.currentUser = {}
        },
        [fillSelectionData.pending]: (state) => {
            state.status = 'pending'

        }, [fillSelectionData.fulfilled]: (state, {payload}) => {
            state.status = 'success'
            state.selectionInstanceDetails = payload.plan_data

        }, [fillSelectionData.rejected]: (state) => {
            state.status = 'failed'
        },
        [memberfulAccount.pending]: (state) => {
            state.status = 'pending'
        },
        [memberfulAccount.fulfilled]: (state, {payload}) => {
            state.status = 'success'
            state.currentUser.memberful = payload
        },
        [memberfulAccount.rejected]: (state) => {
            state.status = 'failed'
        }
    }
})

export const selectCurrentUser = (state) => state.user.currentUser;
export const currentUserFavorites = (state) => state.user.currentUser?.favorite_recipes;
export const currentUserBookmarks = (state) => state.user.currentUser?.bookmarked_recipes;
export const selectCurrentStatus = (state) => state.user.status
export const selectFavoriteRecipes = (state) => state.user.favorite_recipes
export const selectFavoritesStatus = (state) => state.user.favoritesStatus
export const selectBookmarkedRecipes = (state) => state.user.bookmarked_recipes
export const selectBookmarkedStatus = (state) => state.user.bookmarkedStatus
export const selectSavedStatus = (state) => state.user.SavedRecipeStatus;
export const selectSavedRecipe = (state) => state.user.savedRecipes;
export const selectPrimaryDiet = (state) => state.user.primaryDiet
export const selectSelectionDetails = (state) => state.user.selectionInstanceDetails
export const selectClickedOutside = (state) => state.user.clickedOutside
export const selectUser = (state) => state.user
export const selectSavedShoppingList = (state) => state.user.savedShoppingList;
export const hasShoppingList = (state) => state.user.currentUser?.memberful?.hasShoppingListEditor;
export const hasMealPlaner = (state) => state.user.currentUser?.memberful?.hasMealPlanner;
export const hasBasicPlan = (state) => state.user.currentUser?.memberful?.title?.includes('Basic');
export const {
    updateFavoriteRecipes,
    updateBookmarkedRecipes,
    updatePrimaryDiet,
    updateUnitPreference,
    updateIsDairyFree,
    updateIsGlutenFree,
    addSelectionDetails,
    updateClickedOutside,
    updateEmptyCardIndex,
    updateEmptyCardRecipe,
    updateRecipeCardOptions,
    updateServingsCount,
    deleteSelectionData,
    updateMicroViewRecipe,
    setShoppingListId, removeMealPanRecipe, updateSavedRecipes, updateLikedRecipes
} = userSlice.actions
export default userSlice.reducer
