import React from 'react';
import Courses from '../ccourses/Courses';
import AdminPage from '../admin/AdminPage';
import Header from '../header/Header';
import styles from '../../styles/home.module.css';
import SignIn from '../signin/SignIn';
import SignUp from '../signup/SignUp';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

function Home() {
  return (
    <>
      <Router>
        <Header />
        <SignIn />
        <SignUp />
        <Switch>
          <Route exact path='/'>
            <Courses />
          </Route>
          <Route exact path='/admin'>
            <AdminPage />
          </Route>
        </Switch>
      </Router>
    </>
  );
}

export default Home;
