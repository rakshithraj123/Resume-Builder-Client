// npm modules
import styles from './Nav.module.css'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Image from 'react-bootstrap/Image';
import Logo from '../../assets/img/logo-white.svg';
import { Link } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';

import {
  LOG_IN_MENU, SIGN_UP_MENU, LOG_OUT_MENU, HOME_MENU
} from '../../constants'

const publicMenuItems = [
  { menuName: LOG_IN_MENU, path: '/auth/login' }, { menuName: SIGN_UP_MENU, path: '/auth/signup' }
];

const protectedMenuItems = [
  { menuName: HOME_MENU, path: '' }
];


const NavBar = ({ user, handleLogout, activeMenu, handleMenuChange }) => {
  //const [active, setActive] = useState(activeMenu)

  const _handleClick = (menuItem) => {
    handleMenuChange(menuItem.menuName);
  }
  return (
  <Navbar expand="lg" bg="primary" data-bs-theme="dark" fixed="top">
      <Container>
        <Navbar.Brand href="/"><Image src={Logo} width={40} /> <span className='text-uppercase fw-bold'>Resume Builder</span></Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
          {
              user?(
                <>
                <Nav.Link href="/">Home</Nav.Link>
                <Nav.Link href="/dashboard">Dashboard</Nav.Link>
                <div className="vr" />        
                </>           
              ):(
                <>              
                </>
              )
            }
           
           
            {
              user?(
                <Button variant="light" onClick={handleLogout}>Log Out</Button>              
              ):(
                <>
                <Nav.Link  href="/auth/login">Log In</Nav.Link>
                 <Button variant="light" as={Link} to="/auth/signup">Sign Up</Button>
                </>
              )
            }
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>













    // <nav className={styles.navbar}>
    //   <div >
    //     {
    //       user ?
    //         <ul className={styles.navList}>
    //           {protectedMenuItems.map((menuItem, index) =>
    //             <li key={index}><NavLink to={menuItem.path}
    //               className={activeMenu == menuItem.menuName ? styles.navbar_link_active : {}}
    //               onClick={_handleClick.bind(this, menuItem)}>{menuItem.menuName}</NavLink></li>
    //           )
    //           }
    //           <li><NavLink to="" onClick={handleLogout}>{LOG_OUT_MENU}</NavLink></li>
    //         </ul>
    //         :
    //         <ul className={styles.navList}>
    //           {publicMenuItems.map((menuItem, index) =>
    //             <li key={index}><NavLink to={menuItem.path}
    //               className={activeMenu == menuItem.menuName ? styles.navbar_link_active : {}}
    //               onClick={_handleClick.bind(this, menuItem)}>{menuItem.menuName}</NavLink></li>
    //           )}

    //           {/* <li><NavLink to="/auth/login" className={styles.navbar_link_active}>Log In</NavLink></li>
    //        <li><NavLink to="/auth/signup">Sign Up</NavLink></li> */}


    //         </ul>
    //     }
    //   </div>
    //   <div className={styles.logo}>

    //   </div>
    //   <div >
    //     {
    //       user ?
    //         <ul className={styles.navList}>
    //           <li>Welcome, {user.firstName + " " + user.lastName}</li>
    //         </ul>
    //         :
    //         <></>
    //     }
    //   </div>
    // </nav>
  )
}

export default NavBar
