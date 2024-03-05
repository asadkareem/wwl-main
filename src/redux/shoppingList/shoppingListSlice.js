import {createSlice} from '@reduxjs/toolkit'
import {
  checkSavedShoppingList,
  createShoppingList,
  deleteShoppingList,
  getShoppingList,
  updateShoppingList
} from './shoppingListThunk'
import {toast} from "react-hot-toast";

const initialShoppingListState = {
  shoppingListData: {},
  deletedLists: [],
  status: null
}

const shoppingListSlice = createSlice({
  name: 'shoppingList',
  initialState: initialShoppingListState,
  reducers: {
    setShoppingList: (state, action) => {
      state.shoppingList = action.payload
    },
    recoverDeletedList: (state, action) => {
      const deletedList = state.deletedLists.find(list => list._id === action.payload)
      const recipe = state.shoppingListData.data.find(recipe => recipe._id === deletedList.parentId);
      recipe.ingredients.splice(deletedList.index, 0, deletedList)
      state.deletedLists = state.deletedLists.filter(list => list._id !== action.payload)
    },
    autoDeleteToast: (state, action) => {
      state.deletedLists = state.deletedLists.filter(list => list.id !== action.payload)
    },
    selectShoppingItem: (state, action) => {
      for (let i = 0; i < state.shoppingListData.data.length; i++) {
        for (let j = 0; j < state.shoppingListData.data[i].ingredients.length; j++) {
          if (state.shoppingListData.data[i].ingredients[j]._id === action.payload) {
            state.shoppingListData.data[i].ingredients[j].checked = !state.shoppingListData.data[i].ingredients[j].checked
          }
        }
      }
    },
    resetShoppingItem: (state, action) => {
      const updatedData = state.shoppingListData.data.map(itemGroup => {
        const updatedIngredients = itemGroup.ingredients.map(item => {
          return {
            ...item,
            checked: false
          };
        });
        return {
          ...itemGroup,
          ingredients: updatedIngredients
        };
      });

      return {
        ...state,
        shoppingListData: {
          ...state.shoppingListData,
          data: updatedData
        }
      };
    },
    reorderShoppingList: (state, action) => {
      if (!action.payload.items.length > 0) {
        return
      }
      state.shoppingListData.data[action.payload.index].ingredients = action.payload.items

    },
    addItemToShoppingList: (state, action) => {
      const itemGroup = state.shoppingListData.data?.find(group => group.category === action.payload.dropDownCategory);
      if (itemGroup) {
        itemGroup.ingredients.push(action.payload);
      }
      toast.success('Item Successfully Added');
    },
    updateShoppingListItem: (state, action) => {
      const {rowIndex, data, index} = action.payload;
      state.shoppingListData.data[rowIndex].ingredients[index] = data;
    }
  },
  extraReducers: {
    [getShoppingList.pending]: (state) => {
      state.status = 'pending'
    },
    [getShoppingList.fulfilled]: (state, action) => {
      state.status = 'success'
      state.shoppingListData = {title: action.payload.title, data: action.payload.data}
    },
    [getShoppingList.rejected]: (state) => {
      state.status = 'failed'
      state.shoppingListData = {}
    },
    [checkSavedShoppingList.pending]: (state) => {
      state.status = 'pending'
    },
    [checkSavedShoppingList.fulfilled]: (state, action) => {
      state.status = 'success'
      state.shoppingListData = {title: action.payload.title, data: action.payload.data}
    },
    [checkSavedShoppingList.rejected]: (state) => {
      state.status = 'failed'
      state.shoppingListData = {}
    },
    [updateShoppingList.pending]: (state) => {
      state.status = 'pending'
    },
    [updateShoppingList.fulfilled]: (state, action) => {
      state.status = 'success'
      state.shoppingList = action.payload
    },
    [updateShoppingList.rejected]: (state) => {
      state.status = 'failed'
    },
    [createShoppingList.pending]: (state) => {
      state.status = 'pending'
    },
    [createShoppingList.fulfilled]: (state, action) => {
      state.status = 'success'
      state.shoppingListData = {...state.shoppingListData, _id: action.payload}
      toast.success('Shopping List Updates Saved!')

    },
    [createShoppingList.rejected]: (state) => {
      toast.error('Something went wrong')
      state.status = 'failed'
    },
    [deleteShoppingList.pending]: (state) => {
      state.status = 'pending'
    },
    [deleteShoppingList.fulfilled]: (state, action) => {
      state.status = 'success'
      state.shoppingListData.data = state.shoppingListData.data.map(shoppingItem => {
        return {
          ...shoppingItem,
          // eslint-disable-next-line array-callback-return
          ingredients: shoppingItem.ingredients.filter((item, index) => {
            if (item._id !== action.payload) {
              return item
            } else {
              state.deletedLists = [...state.deletedLists, {
                index,
                parentId: shoppingItem._id,
                ...item,
              }]
            }
          })
        }
      });
    },
    [deleteShoppingList.rejected]: (state) => {
      state.status = 'failed'
    },
  }
})

export const selectShoppingList = (state) => state.shoppingList.shoppingListData
export const {
  addItemToShoppingList,
  recoverDeletedList,
  autoDeleteToast,
  selectShoppingItem,
  resetShoppingItem,
  reorderShoppingList,
  updateShoppingListItem
} = shoppingListSlice.actions
export default shoppingListSlice.reducer
