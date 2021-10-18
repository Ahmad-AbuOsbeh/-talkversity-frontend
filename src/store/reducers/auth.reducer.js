const initialState = {
  isLoggedIn: false,
  user: null,
};

const authReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case 'SIGN_UP_IN':
      return {
        isLoggedIn: true,
        user: payload,
      };
    case 'LOG_OUT':
      return {
        isLoggedIn: false,
        user: null,
      };
    default:
      return state;
  }
};

export default authReducer;
