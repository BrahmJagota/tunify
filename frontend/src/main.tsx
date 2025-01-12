import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { GoogleOAuthProvider } from '@react-oauth/google'
import './index.css'
import App from './App.js'
createRoot(document.getElementById('root') as HTMLElement).render(

  <GoogleOAuthProvider clientId={import.meta.env.VITE_CLIENT_ID }>
  <StrictMode>
    <App />
  </StrictMode>
  </GoogleOAuthProvider>
)
