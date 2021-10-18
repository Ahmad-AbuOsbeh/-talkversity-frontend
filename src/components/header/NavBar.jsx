import { React, useState } from 'react';

import styles from '../../styles/nav.module.css';
import Box from '@mui/material/Box';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import { MdMenuBook, MdOutlineAdminPanelSettings, MdLogin } from 'react-icons/md';
import { showHideSignInAction } from '../../store/actions';
import { useDispatch } from 'react-redux';

function NavBar() {
  const dispatch = useDispatch();
  const [value, setValue] = useState(0);

  // homePageHnadler
  function homePageHnadler() {}

  // adminPageHandler
  function adminPageHandler() {}

  // loginHandler
  function logInHandler() {
    dispatch(showHideSignInAction());
  }
  return (
    <Box sx={{ width: '100%' }}>
      <BottomNavigation
        showLabels
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
        className={styles.bigBox}
      >
        <img src='../../images/large_talkversity.png' alt='' />
        <BottomNavigationAction label='Courses' icon={<MdMenuBook className={styles.icon} />} className={styles.label} onClick={homePageHnadler} />
        <BottomNavigationAction label='Admin' icon={<MdOutlineAdminPanelSettings className={styles.icon} />} className={styles.label} onClick={adminPageHandler} />
        <BottomNavigationAction label='Login' icon={<MdLogin className={`${styles.icon} ${styles.login}`} />} className={styles.label} onClick={logInHandler} />
      </BottomNavigation>
    </Box>
  );
}

export default NavBar;
