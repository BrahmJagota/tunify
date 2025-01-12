import { BrowserRouter, Route, Routes, createBrowserRouter, RouterProvider, createRoutesFromElements } from 'react-router-dom'
import axios from 'axios'
import './App.css'
import Upload from './pages/Upload'
import { Music } from './pages/Music'
import Home from './pages/Home'
import Login from './pages/Login'
import { AuthContextProvider } from './context/AuthContext'
import { PrivateRoute } from './routes/ProtectedRoutes'
import { RazorPayContextProvider } from './context/RazorpayContext'
import PurchasedMusic from './pages/PurchasedMusic'
function App() {
  axios.defaults.baseURL = import.meta.env.VITE_BACKEND_URL

  return (
    
    <AuthContextProvider>
      <RazorPayContextProvider>
     <BrowserRouter>
     <Routes>
       <Route path='/upload' element={<Upload />}/>      
       <Route path='/music' element={<PrivateRoute Component={Music} />} />      
       <Route path='/' element={<Home />}/>        
       <Route path='/login' element={<Login />}/>      
     </Routes>
     </BrowserRouter>
     </RazorPayContextProvider>
    </AuthContextProvider>
  )
}

export default App
