import { React, useState, useEffect } from 'react';

import instance from '../../API/axios';
import { useSelector, useDispatch } from 'react-redux';
import { isLoggedInAction } from '../../store/actions';
import styles from '../../styles/courses.module.css';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { showHideSignInAction } from '../../store/actions';
import Button from '@material-ui/core/Button';

function Courses() {
  const state = useSelector((state) => state.authReducer);
  const dispatch = useDispatch();

  const [allCourses, setAllCourses] = useState([]);

  const token = localStorage.getItem('token');
  const user = {
    username: localStorage.getItem('name'),
    role: localStorage.getItem('role'),
  };
  // fetch courses
  async function fetchCourses() {
    console.log('token', token);
    const response = await instance.get(`/courses`, {
      headers: {
        authorization: `Bearer ${token}`,
      },
    });
    console.log('response.data', response.data);
    setAllCourses(response.data);
  }

  // did mount
  useEffect(() => {
    if (localStorage.getItem('token')) {
      dispatch(isLoggedInAction(user));
    }
    fetchCourses();
  }, []);

  // deleteHandler
  async function deleteHandler(id) {
    const response = await instance.delete(`/course/${id}`, {
      headers: {
        authorization: `Bearer ${token}`,
      },
    });
    fetchCourses();
  }

  // logInHandler
  function logInHandler() {
    dispatch(showHideSignInAction());
  }

  return (
    <div className={styles.bigContainer}>
      {!state.isLoggedIn && (
        <div className={styles.welcomingMsg}>
          <h1>Welcome To Talkversity</h1>
          <h2>Please Sign-in to continue..</h2>
          <Button onClick={logInHandler} variant='contained'>
            Join us
          </Button>
        </div>
      )}
      {state.isLoggedIn && (
        <>
          <h1>welcome {state.user?.username} ! </h1>
          <p>your role is {state.user?.role}</p>
          <div className={styles.container}>
            {allCourses.map((course) => (
              <div className={styles.card} key={course.course_name}>
                <section className={styles.section}>
                  <h3 className={styles.name}>{course.course_name}</h3>
                  {state.user.role === 'admin' && (
                    <span onClick={() => deleteHandler(course._id)} className={styles.spandelete}>
                      <DeleteForeverIcon />
                    </span>
                  )}
                </section>
                <h4 className={styles.place}> {course.lecutres_place} </h4>

                <ul className={styles.ulList}>
                  {course.lecture_days.map((day) => (
                    <li className={styles.dayItem}>{day}</li>
                  ))}
                </ul>
                <h5 className={styles.price}>
                  price: <span className={styles.priceSpan}>{course.price} $</span>
                </h5>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export default Courses;
