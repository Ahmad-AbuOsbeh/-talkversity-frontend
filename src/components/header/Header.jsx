import React from 'react';
import NavBar from './NavBar';
import styles from '../../styles/header.module.css';
function Header() {
  return (
    <div className={styles.header}>
      <NavBar />
    </div>
  );
}

export default Header;
