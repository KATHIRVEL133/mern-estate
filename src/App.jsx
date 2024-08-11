// eslint-disable-next-line no-unused-vars
import React from 'react'
import {BrowserRouter,Route,Routes} from 'react-router-dom'
import Home from './pages/Home'
import About from './pages/About'
import Profile from './pages/profile'
import SignIn from './pages/signIn'
import SignUp from './pages/signUp'
export default function App() {
  return (
  <BrowserRouter>
  <Routes>
    <Route path='/' element={<Home/>}/>
    <Route path='/about'element={<About/>}/>
    <Route path='/profile' element={<Profile/>}/>
    <Route path='/sign-in' element={<SignIn/>}/>
    <Route path='/sign-up' element={<SignUp/>}/>
  </Routes>
  </BrowserRouter>
  )
}
