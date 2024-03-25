import React, { Component } from 'react'
import NavBar from '../NavBar/NavBar'
import Login from '../../pages/Login/Login'
import Signup from '../../pages/Signup/Signup'
import Landing from '../../pages/Landing/Landing'
import { useState } from 'react'
import { Routes, Route, useNavigate } from 'react-router-dom'
import ProtectedRoute from '../routes/ProtectedRoute'
import PublicRoute from '../routes/PublicRoute'
import { userService } from '../../services'

function AppRoutes() {
  const [user, setUser] = useState(userService.getUser())
  const navigate = useNavigate()

  const handleLogout = () => {
    userService.logout()
    setUser(null)
    navigate('/')
  }

  const handleAuthEvt = () => {
    setUser(userService.getUser())
  }
  return (
    <>
      <NavBar user={user} handleLogout={handleLogout} />
        <div>
          <Routes>
            <Route
              path="/"
              element={
                <ProtectedRoute user={user}>
                  <Landing user={user} />
                </ProtectedRoute>
              }
            />

            <Route
              path="/auth/login"
              element={
                <PublicRoute user={user}>
                  <Login handleAuthEvt={handleAuthEvt} />
                </PublicRoute>
              }
            />

           <Route
              path="/auth/signup"
              element={
                <PublicRoute user={user}>
                  <Signup handleAuthEvt={handleAuthEvt} />
                </PublicRoute>
              }
            />
          </Routes>
        </div>
    </>
  )
}


export default AppRoutes;




