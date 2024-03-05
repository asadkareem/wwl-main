import notesSlice from './notes/notesSlice'
import userSlice from './user/userSlice'
import recipeSlice from './recipe/recipesSlice'
import ingredientSlice from './ingredient/ingredientSlice'
import mealPlanSlice from './mealPlan/mealPlanSlice'
import shoppingListSlice from './shoppingList/shoppingListSlice'
import ratingSlice from './rating/ratingSlice'
import notificationSlice from './notification/notificationSlice'
import navigationSlice from './navigation/navigationSlice'
import loaderSlice from "./loader/loaderSlice";
import tagSlice from "./tags/tagSlice";
import {persistCombineReducers} from "redux-persist";
import storage from "redux-persist/lib/storage";
import {encryptTransform} from "redux-persist-transform-encrypt";


const allReducers = persistCombineReducers({
  key: 'root-user',
  storage,
  transforms: [
    encryptTransform({
      secretKey: 'my-super-secret-key',
      onError: function (error) {
        // Handle the error.
      },
    }),
  ],
  whitelist: ['user'],
},{
  navigation: navigationSlice,
  mealPlan: mealPlanSlice,
  notes: notesSlice,
  user: userSlice,
  recipe: recipeSlice,
  ingredients: ingredientSlice,
  shoppingList: shoppingListSlice,
  rating: ratingSlice,
  notification: notificationSlice,
  tags: tagSlice,
  loader: loaderSlice
})

export default allReducers
