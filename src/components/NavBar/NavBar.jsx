// npm modules
import { NavLink } from 'react-router-dom'
import styles from './Nav.module.css'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import {
  LOG_IN_MENU, SIGN_UP_MENU,LOG_OUT_MENU,HOME_MENU
} from '../../constants'

const publicMenuItems = [
  { menuName: LOG_IN_MENU, path: '/auth/login' }, { menuName: SIGN_UP_MENU, path: '/auth/signup' }
];

const protectedMenuItems = [
   { menuName: HOME_MENU,path: ''}
];


const NavBar = ({ user, handleLogout,activeMenu, handleMenuChange}) => {
  //const [active, setActive] = useState(activeMenu)
  
  const _handleClick = (menuItem) => {
    handleMenuChange(menuItem.menuName);
  }
  return (

    <nav className={styles.navbar}>
      {user ?
        <ul className={styles.navList}>
          <li>Welcome, {user.firstName+" "+user.lastName}</li>
          {protectedMenuItems.map((menuItem, index) =>
            <li key={index}><NavLink to={menuItem.path}
              className={activeMenu == menuItem.menuName ? styles.navbar_link_active : {}}
              onClick={_handleClick.bind(this, menuItem)}>{menuItem.menuName}</NavLink></li>
          )
          }
         <li><NavLink to="" onClick={handleLogout}>{LOG_OUT_MENU}</NavLink></li>
        </ul>
        :
        <ul className={styles.navList}>
          {publicMenuItems.map((menuItem, index) =>
            <li key={index}><NavLink to={menuItem.path}
              className={activeMenu == menuItem.menuName ? styles.navbar_link_active : {}}
              onClick={_handleClick.bind(this, menuItem)}>{menuItem.menuName}</NavLink></li>
          )}

          {/* <li><NavLink to="/auth/login" className={styles.navbar_link_active}>Log In</NavLink></li>
          <li><NavLink to="/auth/signup">Sign Up</NavLink></li> */}


        </ul>
      }
    </nav>
  )
}

export default NavBar
