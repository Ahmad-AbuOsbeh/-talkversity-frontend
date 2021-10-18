import { React, useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';

import CloseIcon from '@material-ui/icons/Close';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import { Button, TextField, InputLabel, FormControl, MenuItem, Select } from '@material-ui/core';

import instance from '../../API/axios';
import { useSelector, useDispatch } from 'react-redux';
import { showHideSignUpAction, isLoggedInAction } from '../../store/actions';

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

function SignUp() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const showSignUp = useSelector((state) => state.signInReducer.showSignUp);

  const [userData, setUserData] = useState({ role: 'user' });

  //handleClose
  function handleClose() {
    dispatch(showHideSignUpAction());
  }

  //signUpHandler
  const signUpHandler = async (e) => {
    try {
      e.preventDefault();
      const response = await instance.post('/signup', userData);
      console.log('response', response.data);
      dispatch(isLoggedInAction(response.data.user));

      handleClose();
    } catch (e) {
      console.log('Log in error', e.message);
    }
  };
  useEffect(() => {
    console.log('userData', userData);
  }, [userData]);

  // handleChange
  const handleChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };
  return (
    <div>
      <Modal
        aria-labelledby='transition-modal-title'
        aria-describedby='transition-modal-description'
        className={classes.modal}
        open={showSignUp}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={showSignUp}>
          <div className={classes.paper}>
            <CloseIcon className={classes.closeIcon} onClick={handleClose} />
            <form className={classes.root} onSubmit={signUpHandler} noValidate autoComplete='off'>
              <h2 id='transition-modal-title'>Sign Up Form:</h2>
              <p>please fill this form with your information..</p>
              <div>
                <TextField id='standard-error' onChange={(e) => handleChange(e)} label='username' name='username' defaultValue={''} variant='outlined' />
                <TextField id='standard-error' onChange={(e) => handleChange(e)} label='password' name='password' defaultValue={''} variant='outlined' />
              </div>
              <div>
                <FormControl variant='outlined' fullWidth margin='normal'>
                  <InputLabel id='demo-simple-select-outlined-label'>role</InputLabel>
                  <Select
                    labelId='demo-simple-select-outlined-label'
                    id='demo-simple-select-outlined'
                    name='role'
                    value={userData.role}
                    onChange={(e) => handleChange(e)}
                    label='role'
                    fullWidth
                    className={classes.TextField}
                    InputLabelProps={{
                      style: { color: '#fff' },
                    }}
                  >
                    <MenuItem className={classes.textInputs} value='user'>
                      User
                    </MenuItem>
                    <MenuItem className={classes.textInputs} value='admin'>
                      Admin
                    </MenuItem>
                  </Select>
                </FormControl>
              </div>

              <Button onClick={handleClose} variant='contained' size='large' className={classes.Closebutton} startIcon={<CloseIcon />}>
                Cancel
              </Button>

              <Button variant='contained' size='large' type='submit' className={classes.Savebutton} startIcon={<ArrowUpwardIcon />}>
                Submit
              </Button>
            </form>
          </div>
        </Fade>
      </Modal>
    </div>
  );
}

export default SignUp;
