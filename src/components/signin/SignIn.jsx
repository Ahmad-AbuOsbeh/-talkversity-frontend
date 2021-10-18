import { React, useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import CloseIcon from '@material-ui/icons/Close';
import LoginIcon from '@mui/icons-material/Login';

import instance from '../../API/axios';
import { useSelector, useDispatch } from 'react-redux';
import { showHideSignInAction, showHideSignUpAction, isLoggedInAction } from '../../store/actions';

const useStyles = makeStyles((theme) => ({
  root: {
    float: 'left',

    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      width: 300,
    },
    closeIcon: {
      float: 'right',
      backgroundColor: '#193498',
      color: 'secondary',
    },
  },
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#193498',
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: '0.3rem solid #193498',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },

  Savebutton: {
    margin: theme.spacing(1),
  },
  Closebutton: {
    margin: theme.spacing(1),
  },
}));

function SignIn() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const showSignInForm = useSelector((state) => state.signInReducer.showSignInForm);

  const [userCredentials, setUserCredentials] = useState({});

  //handleClose
  function handleClose() {
    dispatch(showHideSignInAction());
  }

  //logInHandler
  const logInHandler = async (e) => {
    try {
      e.preventDefault();
      const response = await instance.post(
        '/signin',
        {},
        {
          auth: userCredentials,
        }
      );
      dispatch(isLoggedInAction(response.data.user));
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('name', response.data.user.username);
      localStorage.setItem('role', response.data.user.role);
      window.location.href = '/';
      handleClose();
    } catch (e) {
      alert('username or password incorrect!');
      console.log('Log in error', e.message);
    }
  };

  // handleChange
  const handleChange = (e) => {
    setUserCredentials({ ...userCredentials, [e.target.name]: e.target.value });
  };

  // showSignUpForm
  function showSignUpForm() {
    dispatch(showHideSignInAction());
    dispatch(showHideSignUpAction());
  }
  return (
    <div>
      <Modal
        aria-labelledby='transition-modal-title'
        aria-describedby='transition-modal-description'
        className={classes.modal}
        open={showSignInForm}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={showSignInForm}>
          <div className={classes.paper}>
            <CloseIcon className={classes.closeIcon} onClick={handleClose} />
            <form className={classes.root} onSubmit={logInHandler} noValidate autoComplete='off'>
              <h2 id='transition-modal-title'>Sign In:</h2>

              <div>
                <TextField id='standard-error' onChange={(e) => handleChange(e)} label='username' name='username' defaultValue={''} variant='outlined' />
              </div>
              <div>
                <TextField id='standard-error' onChange={(e) => handleChange(e)} label='password' name='password' defaultValue={''} variant='outlined' />
              </div>

              <Button variant='contained' size='large' type='submit' className={classes.Closebutton}>
                Login
              </Button>
              <div>
                <p>you don't have an account? sign up please </p>
              </div>
              <Button variant='contained' size='large' className={classes.Savebutton} startIcon={<LoginIcon />} onClick={showSignUpForm}>
                Sign Up
              </Button>
            </form>
          </div>
        </Fade>
      </Modal>
    </div>
  );
}

export default SignIn;
