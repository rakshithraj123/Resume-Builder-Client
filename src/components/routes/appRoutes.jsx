import React, { Component } from 'react'
import NavBar from '../NavBar/NavBar'
import Login from '../../pages/Login/Login'
import Signup from '../../pages/Signup/Signup'
import Landing from '../../pages/Landing/Landing'
import CreateResume from '../../pages/CreateResume/CreateResume'
import PreviewResume from '../../pages/PreviewResume/PreviewResume'
import { useState } from 'react'
import { Routes, Route, useNavigate } from 'react-router-dom'
import ProtectedRoute from '../routes/ProtectedRoute'
import PublicRoute from '../routes/PublicRoute'
import { userService } from '../../services'
import { useLocation } from 'react-router-dom'
import {
  LOG_IN_MENU, SIGN_UP_MENU, HOME_MENU, CREATE_RESUME_MENU, PREVIEW_RESUME_MENU,
  LOG_IN_PATH, SIGN_UP_PATH, HOME_PATH, CREATE_RESUME_PATH, PREVIEW_RESUME_PATH
} from '../../constants'
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import App from '../../pages/admin/Admin'
import { getResumeIdState,getIsAdminState,getLoggInStateState} from '../../redux/'
import { useSelector } from 'react-redux';
import CustomPopupDialog from '../CustomPopupDialog';
import Footer from '../Footer/Footer'

function AppRoutes() {
 // const [user, setUser] = useState(userService.getUser())
  const isAdmin = useSelector(state => getIsAdminState(state)); 
  const resumeId = useSelector(state => getResumeIdState(state)); 
  var showNav = true;
  console.log(resumeId)
  const isLoggedIn = useSelector(state => getLoggInStateState(state)); 
  const [showLogoutDialog, setShowLogoutDialog] = useState(false);

  console.log("resumeId " +resumeId)
  const navigate = useNavigate()
  const location = useLocation();

  const handleLogout = () => {
    setShowLogoutDialog(true)
  }

  const logout = () => {
    userService.logout()
    //setUser(null)  
    handleNavigation(LOG_IN_MENU)
  }

  const handleNavigation = (menu, data = {}) => {
    setActiveMenu(menu)
    switch (menu) {
      case LOG_IN_MENU: return navigate("/auth/login")
      case SIGN_UP_MENU: return navigate("/auth/signup")
      case HOME_MENU: return navigate("/")
      case CREATE_RESUME_MENU: {
        if(isLoggedIn){
          return navigate("/createResume", { state: data, replace: true })
        }else{
          return handleNavigation(LOG_IN_MENU)
        }
      }
      case PREVIEW_RESUME_MENU: 
      {
        if(isLoggedIn){
          return navigate("/previewResume", { state: data, replace: true })
        }else{
          return handleNavigation(LOG_IN_MENU)
        }
      }   
      default: return navigate("/")
    }
  }

  const handleMenuChange = (menu) => {
    setActiveMenu(menu)
  }

  const handleAuthEvt = () => {
   // setUser(userService.getUser())
  }


  const getIntialMenu = () => {
    switch (location.pathname) {
      case LOG_IN_PATH:  {
        showNav = false
        return LOG_IN_MENU}
      case SIGN_UP_PATH: {
        showNav = false
        return SIGN_UP_MENU}
      case HOME_PATH: return isLoggedIn ? HOME_MENU : LOG_IN_MENU
      case CREATE_RESUME_PATH: return isLoggedIn ? HOME_MENU : LOG_IN_MENU
      case PREVIEW_RESUME_PATH: return isLoggedIn ? HOME_MENU : LOG_IN_MENU
      default: return HOME_MENU
    }
  }
  const [activeMenu, setActiveMenu] = useState(getIntialMenu())

  return (
    <>
      <ToastContainer />
      {showNav && <NavBar user={userService.getUser()} handleLogout={handleLogout} activeMenu={activeMenu} handleMenuChange={handleMenuChange} />}
      <div >
        <Routes>
         {
          isLoggedIn?
          (
            isAdmin ?
              <Route
                path="/"
                element={
                  <ProtectedRoute isLoggedIn={isLoggedIn}>
                    <App handleNavigation={handleNavigation} />
                  </ProtectedRoute>
                }
              />
              :
              (resumeId?
                <Route
                  path="/"
                  element={
                    <ProtectedRoute isLoggedIn={isLoggedIn}>
                      <PreviewResume handleNavigation={handleNavigation} savedResumeId ={resumeId} />
                    </ProtectedRoute>
                  }
                /> :
               <Route
            path="/"
            element={
              <Landing isLoggedIn={isLoggedIn} handleNavigation={handleNavigation} />
            }
          /> )
          )
          :
            <Route
            path="/"
            element={
              <PublicRoute isLoggedIn={isLoggedIn}>
                  <Landing isLoggedIn={isLoggedIn} handleNavigation={handleNavigation} />
              </PublicRoute>
            }
          />       
         }

          <Route
            path="/createResume"
            element={
              <ProtectedRoute isLoggedIn={isLoggedIn}>
                <CreateResume handleNavigation={handleNavigation} />
              </ProtectedRoute>
            }
          />

          <Route
            path="/previewResume"
            element={
              <ProtectedRoute isLoggedIn={isLoggedIn}>
                <PreviewResume handleNavigation={handleNavigation} />
              </ProtectedRoute>
            }
          />

          <Route
            path="/auth/login"
            element={
              <PublicRoute isLoggedIn={isLoggedIn}>
                <Login handleAuthEvt={handleAuthEvt} handleNavigation={handleNavigation} />
              </PublicRoute>
            }
          />

          <Route
            path="/auth/signup"
            element={
              <PublicRoute isLoggedIn={isLoggedIn}>
                <Signup handleAuthEvt={handleAuthEvt} handleNavigation={handleNavigation} />
              </PublicRoute>
            }
          />
        </Routes>
      </div>
      {showNav && <Footer user={userService.getUser()}/>}
      {showLogoutDialog && <CustomPopupDialog 
      handleOkClick={()=>{
          setShowLogoutDialog(false)
          logout()
      }}
      handleCancelClick={()=>{
        setShowLogoutDialog(false)
    }}
      title={"Resume Builder"}
      message={"Confirm Your Logout, By clicking OK"}
      />}
    </>
  )
}


export default AppRoutes;




