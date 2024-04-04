import React, { Component } from 'react'
import NavBar from '../NavBar/NavBar'
import Login from '../../pages/Login/Login'
import Signup from '../../pages/Signup/Signup'
import Landing from '../../pages/Landing/Landing'
import CreateResume  from '../../pages/CreateResume/CreateResume'
import { useState } from 'react'
import { Routes, Route, useNavigate } from 'react-router-dom'
import ProtectedRoute from '../routes/ProtectedRoute'
import PublicRoute from '../routes/PublicRoute'
import { userService } from '../../services'
import { useLocation } from 'react-router-dom'
import {
  LOG_IN_MENU, SIGN_UP_MENU,HOME_MENU,CREATE_RESUME_MENU,
  LOG_IN_PATH, SIGN_UP_PATH,HOME_PATH,CREATE_RESUME_PATH
} from '../../constants'
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function AppRoutes() {
  const [user, setUser] = useState(userService.getUser())
  const navigate = useNavigate()


  const handleLogout = () => {
    userService.logout()
    setUser(null)
    handleNavigation(LOG_IN_MENU)
  }

  const handleNavigation = (menu) => {
    setActiveMenu(menu)
    switch(menu){
      case LOG_IN_MENU : return  navigate("/auth/login")
      case SIGN_UP_MENU : return  navigate("/auth/signup")           
      case HOME_MENU : return  navigate("/")
      case CREATE_RESUME_MENU : return  navigate("/createResume")
      default: return  navigate("/")
    }
  }

  const handleMenuChange = (menu) => {
    setActiveMenu(menu)
  }

  const handleAuthEvt = () => {
    setUser(userService.getUser())
  }
 

  const getIntialMenu = () => {
    const location = useLocation();
    switch(location.pathname){
      case LOG_IN_PATH :  return LOG_IN_MENU
      case SIGN_UP_PATH:  return SIGN_UP_MENU       
      case HOME_PATH:  return user? HOME_MENU : LOG_IN_MENU
      case CREATE_RESUME_PATH:  return user? CREATE_RESUME_MENU : LOG_IN_MENU
      default : return HOME_MENU
    }
  }
  const [activeMenu, setActiveMenu] = useState(getIntialMenu())
  
  return (
    <>
      <ToastContainer />
      <NavBar user={user} handleLogout={handleLogout}  activeMenu={activeMenu}  handleMenuChange={handleMenuChange}/>
        <div > 
          <Routes>
            <Route
              path="/"
              element={
                <ProtectedRoute user={user}>
                  <Landing user={user} handleNavigation={handleNavigation}/>
                </ProtectedRoute>
              }
            />

            <Route
              path="/createResume"
              element={
                <ProtectedRoute user={user}>
                  <CreateResume />
                </ProtectedRoute>
              }
            />

            <Route
              path="/auth/login"
              element={
                <PublicRoute user={user}>
                  <Login handleAuthEvt={handleAuthEvt}  handleNavigation={handleNavigation}/>
                </PublicRoute>
              }
            />

           <Route
              path="/auth/signup"
              element={
                <PublicRoute user={user}>
                  <Signup handleAuthEvt={handleAuthEvt} handleNavigation={handleNavigation}/>
                </PublicRoute>
              }
            />
          </Routes>
        </div>
    </>
  )
}


export default AppRoutes;




