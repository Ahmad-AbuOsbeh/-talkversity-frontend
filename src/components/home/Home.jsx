import React from 'react';
import Courses from '../ccourses/Courses';
import Footer from '../footer/Footer';
import Header from '../header/Header';
import styles from '../../styles/home.module.css';
import SignIn from '../signin/SignIn';
import SignUp from '../signup/SignUp';

function Home() {
  return (
    <>
      <Header />
      <SignIn />
      <SignUp />
      <Courses />
      <Footer />
    </>
  );
}

export default Home;
