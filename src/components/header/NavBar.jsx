import { React, useState } from 'react';

import styles from '../../styles/nav.module.css';
import Box from '@mui/material/Box';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import { MdMenuBook, MdOutlineAdminPanelSettings, MdLogin } from 'react-icons/md';

function NavBar() {
  const [value, setValue] = useState(0);

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
        <BottomNavigationAction label='Courses' icon={<MdMenuBook className={styles.icon} />} className={styles.label} />
        <BottomNavigationAction label='Admin' icon={<MdOutlineAdminPanelSettings className={styles.icon} />} className={styles.label} />
        <BottomNavigationAction label='Login' icon={<MdLogin className={`${styles.icon} ${styles.login}`} />} className={styles.label} />
      </BottomNavigation>
    </Box>
  );
}

export default NavBar;
