import {configureStore} from '@reduxjs/toolkit';
import {persistStore} from "redux-persist";
import allReducers from './reducers.js';

const store = configureStore({
  reducer: allReducers,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
})

export default store
export const persistor = persistStore(store)

