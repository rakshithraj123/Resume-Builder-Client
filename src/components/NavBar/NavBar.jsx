// npm modules
import { NavLink } from 'react-router-dom'
import styles from './Nav.module.css'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'

const menuItems = [
  {menuName :'Log In',path:'/auth/login'},  {menuName :'Sign Up',path:'/auth/signup'}
];




const NavBar = ({ user, handleLogout }) => {
       console.log(JSON.stringify(user))
  const [active, setActive] = useState('Log In')

  const _handleClick = (menuItem) => {
    setActive(menuItem.menuName);
  }


  return (
    <nav className={styles.navbar}>
      {user ?
        <ul className={styles.navList}>
          <li>Welcome, {user.name}</li>
          <li><NavLink to="" onClick={handleLogout}>LOG OUT</NavLink></li>
        </ul>
        :
        <ul className={styles.navList}>



           {menuItems.map((menuItem,index) =>             
            <li key={index}><NavLink  to={menuItem.path}
            className={active ==menuItem.menuName? styles.navbar_link_active : {}}
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
