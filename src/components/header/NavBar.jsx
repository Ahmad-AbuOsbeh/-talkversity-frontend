import { React, useState } from 'react';

import styles from '../../styles/nav.module.css';
import Box from '@mui/material/Box';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import { MdMenuBook, MdOutlineAdminPanelSettings, MdLogin } from 'react-icons/md';
import LogoutIcon from '@mui/icons-material/Logout';
import { showHideSignInAction, logOutAction } from '../../store/actions';
import { useDispatch, useSelector } from 'react-redux';
import { Link, BrowserRouter } from 'react-router-dom';
import logo from '../../images/large_talkversity.png';

function NavBar() {
  const dispatch = useDispatch();
  const [value, setValue] = useState(0);

  const state = useSelector((state) => state.authReducer);

  // homePageHnadler
  function homePageHnadler() {
    // window.location.href = '/';
  }

  // adminPageHandler
  function adminPageHandler() {
    // window.location.href = '/admin';
  }

  // loginHandler
  function logInHandler() {
    dispatch(showHideSignInAction());
  }

  // logOutHandler
  function logOutHandler() {
    dispatch(logOutAction());
    localStorage.clear();
  }
  return (
    <BrowserRouter>
      <Box sx={{ width: '100%' }}>
        <BottomNavigation
          showLabels
          value={value}
          onChange={(event, newValue) => {
            setValue(newValue);
          }}
          className={styles.bigBox}
        >
          <img src={logo} alt='' className={styles.image} />

          <BottomNavigationAction href='/' label='Courses' icon={<MdMenuBook className={styles.icon} />} className={styles.label} onClick={homePageHnadler}>
            <Link to='/'></Link>
          </BottomNavigationAction>

          {state.user?.role === 'admin' && (
            <BottomNavigationAction href='/admin' label='Admin' icon={<MdOutlineAdminPanelSettings className={styles.icon} />} className={styles.label} onClick={adminPageHandler}>
              <Link to='/admin'></Link>
            </BottomNavigationAction>
          )}

          {!state.isLoggedIn ? (
            <BottomNavigationAction label='Login' icon={<MdLogin className={`${styles.icon} ${styles.login}`} />} className={styles.label} onClick={logInHandler} />
          ) : (
            <BottomNavigationAction label='Log out' icon={<LogoutIcon className={`${styles.icon} ${styles.login}`} />} className={styles.label} onClick={logOutHandler} />
          )}
        </BottomNavigation>
      </Box>
    </BrowserRouter>
  );
}

export default NavBar;
