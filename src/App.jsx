import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import UserList from './pages/UserList'

function App() {

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/list" element={<UserList/>}/>
   </Routes>
  )
}

export default App
