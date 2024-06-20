import React from 'react'
import { BrowserRouter,Routes,Route } from 'react-router-dom'
import Home from './pages/Home'
import Signin from './pages/Signin'
import Signout from './pages/Signout'
import About from './pages/About'
import Profile from './pages/Profile'
import Header from './components/Header'
import Signup from './pages/Signup'
import PrivateRoute from './components/PrivateProfile'
import CreateListing from './pages/CreateListing'

function App() {
  return (
    <>
      <BrowserRouter>
      <Header/>
      <Routes>
      <Route path='/' element={<Home/>} />
      <Route path='/sign-in' element={<Signin/>} />
      <Route path='/signout' element={<Signout/>} />
      <Route path='/sign-up' element={<Signup/>} />
      <Route path='/about' element={<About/>} />
      <Route element={<PrivateRoute/>}>
        <Route path='/profile' element={<Profile/>} />
        <Route path='/create-listing' element={<CreateListing/>} />
      </Route>
      </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
