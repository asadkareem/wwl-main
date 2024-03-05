import React from 'react'
import {persistor} from './redux/store';
import {PersistGate} from 'redux-persist/integration/react';

import {createRoot} from 'react-dom/client'
import {Provider} from 'react-redux'
import store from './redux/store'
import App from './App'
import './index.css'

const container = document.getElementById('root')
const root = createRoot(container)

root.render(
  // <React.StrictMode>
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
        <App/>
    </PersistGate>
  </Provider>
  // </React.StrictMode>
)

