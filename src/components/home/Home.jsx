import React from 'react';
import Courses from '../ccourses/Courses';
import Footer from '../footer/Footer';
import Header from '../header/Header';
import styles from '../../styles/home.module.css';

function Home() {
  return (
    <>
      <Header />
      <Courses />
      <Footer />
    </>
  );
}

export default Home;
