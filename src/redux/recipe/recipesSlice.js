import {createSlice} from '@reduxjs/toolkit'
import {
  getAllRecipes,
  populateRecipeDetails,
  searchRecipes,
  getRecipe,
  getFeaturedRecipes,
  getAllCollections,
  getNewlyAddedRecipes
} from './recipesThunk'
import {toast} from "react-hot-toast";

const initialRecipeState = {
  currentRecipe: {},
  featuredRecipes: [],
  newlyAddedRecipes: [],
  allRecipes: [],
  filteredRecipes: [],
  searchTag: null,
  collections: [],
  currentSearchValue: [],
  currentSearchPage: 1,
  status: null,
  gettingAllRecipesStatus: null,
  searchRecipesStatus: null,
  populatingRecipeDetailsStatus: null,
  gettingRecipeStatus: null
}

const recipesSlice = createSlice({
  name: 'recipes',
  initialState: initialRecipeState,
  reducers: {
    setCurrentSearchValue: (state, action) => {
      state.currentSearchValue = action.payload
    },
    setCurrentSearchPage: (state, action) => {
      state.currentSearchPage = action.payload
    },
    updateSingleRecipe: (state, {payload}) => {
      const {index, type} = payload;
      if (type === 'favorite' && state.allRecipes.recipes[index]) {
        state.allRecipes.recipes[index].is_favorite = !state.allRecipes.recipes[index]?.is_favorite
      } else if (state.allRecipes.recipes[index]) {
        state.allRecipes.recipes[index].is_bookmarked = !state.allRecipes.recipes[index]?.is_bookmarked
      }
    },
    updateFilteredRecipes: (state) => {
      state.filteredRecipes = []
    }
  },
  extraReducers: {
    [getAllRecipes.pending]: (state) => {
      state.gettingAllRecipesStatus = 'pending'
    },
    [getAllRecipes.fulfilled]: (state, {payload}) => {
      state.gettingAllRecipesStatus = 'success'
      state.allRecipes = payload
    },
    [getAllRecipes.rejected]: (state) => {
      state.gettingAllRecipesStatus = 'failed'
      state.allRecipes = []
    },
    [populateRecipeDetails.pending]: (state) => {
      state.populatingRecipeDetailsStatus = 'pending'
    },
    [populateRecipeDetails.fulfilled]: (state, {payload}) => {
      state.populatingRecipeDetailsStatus = 'success'
      state.currentRecipe = payload
      // let newAllRecipes = [...state.allRecipes]
      // payload.forEach((obj) => {
      //     let recipe = newAllRecipes.find((recipe) => recipe.id === obj.id)
      //     recipe && Object.assign(recipe, obj)
      // })
      // state.allRecipes = newAllRecipes
    },
    [populateRecipeDetails.rejected]: (state) => {
      state.populatingRecipeDetailsStatus = 'failed'
    },
    [searchRecipes.pending]: (state) => {
      state.searchRecipesStatus = 'pending'
    },
    [searchRecipes.fulfilled]: (state, {payload}) => {
      state.searchRecipesStatus = 'success'
      state.filteredRecipes = payload;
    },
    [searchRecipes.rejected]: (state) => {
      state.searchRecipesStatus = 'failed'
      state.filteredRecipes = []
    },
    [getRecipe.pending]: (state) => {
      state.gettingRecipeStatus = 'pending'
    },
    [getRecipe.fulfilled]: (state, {payload}) => {
      state.gettingRecipeStatus = 'success'
      state.currentRecipe = payload
    },
    [getRecipe.rejected]: (state) => {
      state.gettingRecipeStatus = 'failed'
      state.currentRecipe = {}
    },
    [getFeaturedRecipes.pending]: (state) => {
      state.status = 'pending'
    },
    [getFeaturedRecipes.fulfilled]: (state, {payload}) => {
      state.status = 'success'
      state.featuredRecipes = payload
    },
    [getFeaturedRecipes.rejected]: (state) => {
      state.status = 'failed'
      state.featuredRecipes = []
    },
    [getNewlyAddedRecipes.pending]: (state) => {
      state.status = 'pending'
    },
    [getNewlyAddedRecipes.fulfilled]: (state, {payload}) => {
      state.status = 'success'
      state.newlyAddedRecipes = payload
    },
    [getNewlyAddedRecipes.rejected]: (state) => {
      state.status = 'failed'
      state.newlyAddedRecipes = []
    },
    [getAllCollections.pending]: (state) => {
      state.status = 'pending'
    },
    [getAllCollections.fulfilled]: (state, {payload}) => {
      state.status = 'success'
     if (payload.pagination.currentPage === 1) {
        state.collections = payload
      }
     else if(payload?.recipesCollections?.length === 0){
        toast.error('No more recipes to load')
     }
     else {
        state.collections.recipesCollections = [...state.collections.recipesCollections, ...payload.recipesCollections]
      }
    },
    [getAllCollections.rejected]: (state) => {
      state.status = 'failed'
      state.collections = []
    }
  }
})

export const selectAllRecipes = (state) => state.recipe.allRecipes;
export const selectCollections = (state) => state.recipe.collections;
export const selectFilteredRecipes = (state) => state.recipe.filteredRecipes;
export const selectGettingAllRecipesStatus = (state) => state.recipe.gettingAllRecipesStatus;
export const searchRecipesStatus = (state) => state.recipe.searchRecipesStatus;
export const {updateSingleRecipe, updateFilteredRecipes} = recipesSlice.actions

export default recipesSlice.reducer
