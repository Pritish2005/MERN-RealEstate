import React from 'react'
import { BrowserRouter,Routes,Route } from 'react-router-dom'
import Home from './components/Home'
import Signin from './components/Signin'
import Signout from './components/Signout'
import About from './components/About'
import Profile from './components/Profile'

function App() {
  console.log('jello')
  return (
    <>
      <BrowserRouter>
      <Routes>
      <Route path='/' element={<Home/>} />
      <Route path='/sign-in' element={<Signin/>} />
      <Route path='/sign-out' element={<Signout/>} />
      <Route path='/about' element={<About/>} />
      <Route path='/profile' element={<Profile/>} />
      </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
