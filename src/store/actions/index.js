// showHideSignInAction
export const showHideSignInAction = () => {
  return {
    type: 'SHOW_HIDE_SIGN_IN_FORM',
  };
};

// showHideSignUpAction
export const showHideSignUpAction = () => {
  return {
    type: 'SHOW_HIDE_SIGN_UP_FORM',
  };
};

// isLoggedInAction
export const isLoggedInAction = (userData) => {
  return {
    type: 'SIGN_UP_IN',
    payload: userData,
  };
};

// logOutAction
export const logOutAction = () => {
  return {
    type: 'LOG_OUT',
  };
};
