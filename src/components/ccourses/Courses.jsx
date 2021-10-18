import React from 'react';

import instance from '../../API/axios';
import { useSelector, useDispatch } from 'react-redux';
import { isLoggedInAction } from '../../store/actions';
function Courses() {
  const state = useSelector((state) => state.authReducer);
  console.log('sataaaaaaate', state);
  return (
    <div>
      {!state.isLoggedIn && <h1>Please Sign-in to continue..</h1>}
      {state.isLoggedIn && (
        <>
          <h1>welcome {state.user?.username} ! </h1>
          <p>your role is {state.user?.role}</p>
          <ul>
            <li>course 1</li>
            <li>course 2</li>
          </ul>
        </>
      )}
    </div>
  );
}

export default Courses;
