import React from 'react'
import 'bootstrap/dist/css/bootstrap.css'
import OTPLogin from './pages/Register'
import HomePage from './pages/HomePage'
import { BrowserRouter , Routes , Route } from 'react-router-dom'
import FeedbackFormPage from './pages/FeedbackFormPage'
import UploadVideoPage from './component/UploadVideoPage'
import UserDetailsPage from './component/UserDetailsPage'
import ProfilePage from './pages/ProfilePage'


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
    </Routes>
    </BrowserRouter>
    </>
  )
}

export default App