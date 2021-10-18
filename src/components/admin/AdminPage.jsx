import { React, useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';

import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import { Button, TextField, InputLabel, FormControl, MenuItem, Select, ListItemIcon, ListItemText, Checkbox } from '@material-ui/core';

import styles from '../../styles/admin.module.css';
import instance from '../../API/axios';

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
  formControl: {
    width: '87%',
    marginRight: '1rem',
    position: 'relative',
    left: '0.5rem',
  },
  Savebutton: {
    margin: theme.spacing(1),
  },
  Closebutton: {
    margin: theme.spacing(1),
  },
}));

// admin page function
function AdminPage() {
  const options = ['Satarday', 'Sunday', 'Monday', 'Tuesday', 'Wedensday', 'Thursday', 'Friday'];
  const classes = useStyles();
  const [courseData, setcourseData] = useState({});
  const [selected, setSelected] = useState([]);
  const token = localStorage.getItem('token');

  //signUpHandler
  const signUpHandler = async (e) => {
    try {
      e.preventDefault();
      const response = await instance.post('/course', courseData, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      });
      e.target.reset();
      setSelected([]);
      setcourseData({});
      window.location.href = '/';
    } catch (e) {
      console.log('Log in error', e.message);
    }
  };

  // update course data object
  useEffect(() => {
    setcourseData({ ...courseData, lecture_days: selected });
  }, [selected]);

  // handleChange
  const handleChange = (e) => {
    setcourseData({ ...courseData, [e.target.name]: e.target.value });
  };
  const isAllSelected = options.length > 0 && selected.length === options.length;

  // handleChangeSelected
  const handleChangeSelected = (event) => {
    const value = event.target.value;
    if (value[value.length - 1] === 'all') {
      setSelected(selected.length === options.length ? [] : options);
      return;
    }
    setSelected(value);
  };

  return (
    <div className={styles.container}>
      <form className={classes.root} onSubmit={signUpHandler} noValidate autoComplete='off'>
        <h2 id='transition-modal-title'>Add Course Form:</h2>
        <p>please fill this form with the course information..</p>
        <div>
          <TextField id='standard-error' onChange={(e) => handleChange(e)} label='course name' name='course_name' defaultValue={''} variant='outlined' />
          <TextField id='standard-error' onChange={(e) => handleChange(e)} label='price' name='price' defaultValue={''} variant='outlined' type='number' InputProps={{ inputProps: { min: 0 } }} />

          <FormControl variant='outlined' fullWidth margin='normal' className={classes.formControl}>
            <InputLabel id='demo-simple-select-outlined-label'>lecutre place</InputLabel>
            <Select
              labelId='demo-simple-select-outlined-label'
              id='demo-simple-select-outlined'
              name='lecutres_place'
              value={courseData?.lecutres_place}
              onChange={(e) => handleChange(e)}
              label='lecutre place'
              fullWidth
              className={classes.TextField}
              InputLabelProps={{
                style: { color: '#fff' },
              }}
            >
              <MenuItem className={classes.textInputs} value='online'>
                online
              </MenuItem>
              <MenuItem className={classes.textInputs} value='on Campus'>
                on Campus
              </MenuItem>
            </Select>
          </FormControl>
        </div>
        <div>
          <FormControl className={classes.formControl}>
            <InputLabel id='mutiple-select-label'>select days</InputLabel>
            <Select labelId='mutiple-select-label' multiple value={selected} onChange={handleChangeSelected} renderValue={(selected) => selected.join(', ')}>
              <MenuItem
                value='all'
                classes={{
                  root: isAllSelected ? classes.selectedAll : '',
                }}
              >
                <ListItemIcon>
                  <Checkbox classes={{ indeterminate: classes.indeterminateColor }} checked={isAllSelected} indeterminate={selected.length > 0 && selected.length < options.length} />
                </ListItemIcon>
                <ListItemText classes={{ primary: classes.selectAllText }} primary='Select All' />
              </MenuItem>
              {options.map((option) => (
                <MenuItem key={option} value={option}>
                  <ListItemIcon>
                    <Checkbox checked={selected.indexOf(option) > -1} />
                  </ListItemIcon>
                  <ListItemText primary={option} />
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>

        <Button variant='contained' size='large' type='submit' className={classes.Savebutton} startIcon={<ArrowUpwardIcon />}>
          Submit
        </Button>
      </form>
    </div>
  );
}

export default AdminPage;
