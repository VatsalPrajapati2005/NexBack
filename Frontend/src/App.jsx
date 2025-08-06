import React from 'react'
import 'bootstrap/dist/css/bootstrap.css'
import 'react-toastify/dist/ReactToastify.css';
import OTPLogin from './pages/Register'
import HomePage from './pages/HomePage'
import { BrowserRouter , Routes , Route } from 'react-router-dom'
import FeedbackFormPage from './pages/FeedbackFormPage'
import UploadVideoPage from './component/UploadVideoPage'
import UserDetailsPage from './component/UserDetailsPage'
import ProfilePage from './pages/ProfilePage'
import WalletPage from './pages/WalletPage'
import LinkAccountPage from './pages/LinkAccountPage'


const App = () => {
  return (
    <>
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<OTPLogin/>}/>
      <Route path='/home' element={<HomePage/>}/>
      <Route path='/feedback' element={<FeedbackFormPage/>}/>
      <Route path='/upload' element={<UploadVideoPage/>}/>
      <Route path='/user' element={<UserDetailsPage/>}/>
      <Route path='/profile' element={<ProfilePage/>}/>
      <Route path='/wallet' element={<WalletPage/>}/>
      <Route path='/linkaccount' element={<LinkAccountPage/>}/>
    </Routes>
    </BrowserRouter>
    </>
  )
}

export default App