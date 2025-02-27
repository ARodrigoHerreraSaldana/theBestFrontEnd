import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { AuthProvider } from "../auth/authorizer.jsx";
import './index.css'
import App from './App.jsx'
import { CookiesProvider } from "react-cookie";
import store from './app/store'
import { Provider } from 'react-redux'

import { PersistGate } from 'redux-persist/integration/react';
import { persistStore } from 'redux-persist';

let persistor = persistStore(store);

createRoot(document.getElementById('root')).render(
  <StrictMode>
     <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
    <CookiesProvider>
    <AuthProvider>
    <App />
    </AuthProvider>
    </CookiesProvider>
    </PersistGate>
    </Provider>
  </StrictMode>,
)
