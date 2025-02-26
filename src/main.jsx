import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { AuthProvider } from "../auth/authorizer.jsx";
import './index.css'
import App from './App.jsx'
import { CookiesProvider } from "react-cookie";
import store from './app/store'
import { Provider } from 'react-redux'
createRoot(document.getElementById('root')).render(
  <StrictMode>
     <Provider store={store}>
    <CookiesProvider>
    <AuthProvider>
    <App />
    </AuthProvider>
    </CookiesProvider>
    </Provider>
  </StrictMode>,
)
