// initial State
const initialState = {
  showSignInForm: false,
  showSignUp: false,
};

// signIn Reducer
const signInReducer = (state = initialState, action) => {
  const { type } = action;

  switch (type) {
    case 'SHOW_HIDE_SIGN_IN_FORM':
      return {
        showSignInForm: !state.showSignInForm,
        showSignUp: state.showSignUp,
      };

    case 'SHOW_HIDE_SIGN_UP_FORM':
      return {
        showSignInForm: state.showSignInForm,
        showSignUp: !state.showSignUp,
      };

    default:
      return state;
  }
};

export default signInReducer;
