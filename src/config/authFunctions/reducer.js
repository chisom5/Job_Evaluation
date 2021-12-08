import update from "immutability-helper";
import AUTH_CONSTANT from "./constant";

const initialState = {
  isLogin: false,
  isRequesting: false,
  activeUser: null,
  success: null,
  error: null,
};

const requestingHome = (state, loading) =>
  update(state, {
    [loading]: {
      $set: true,
    },
  });

const handleAuthentication = (state, { payload }) =>
  update(state, {
    activeUser: {
      $set: payload,
    },
    isLogin: {
      $set: false,
    },
  });

const handleUserDetailed = (state, { payload }) =>
  update(state, {
    userDetails: {
      $set: payload,
    },
    isRequesting: {
      $set: false,
    },
  });
const setErrorAction = (state, { payload }) =>
  update(state, {
    error: {
      $set: payload,
    },
  });

const handleError = (state, { error }) => {
  return update(state, {
    isLogin: {
      $set: false,
    },
    isRequesting: {
      $set: false,
    },
    error: {
      $set: error,
    },
  });
};

const clearError = (state) => {
  return update(state, {
    error: {
      $set: null,
    },
  });
};

const clearSuccessMessage = (state) =>
  update(state, {
    success: {
      $set: null,
    },
  });

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    // case AUTH_CONSTANT.emailofUserRequested:
    //   return requestingHome(state, "isRequesting");
    // case AUTH_CONSTANT.emailofUserError:
    //   return handleError(state, action);
    // case AUTH_CONSTANT.emailofUserSuccess:
    //   return handleUserDetailed(state, action);

    case AUTH_CONSTANT.loginUserRequested:
      return requestingHome(state, "isLogin");
    case AUTH_CONSTANT.loginUserError:
      return handleError(state, action);
    case AUTH_CONSTANT.loginUserSuccess:
      return handleAuthentication(state, action);

    case AUTH_CONSTANT.setErrorSuccess:
      return setErrorAction(state, action);

    case AUTH_CONSTANT.clearErrorMessageSuccess:
      return clearError(state, action);
    case AUTH_CONSTANT.clearSuccessMessageSuccess:
      return clearSuccessMessage(state, action);

    default:
      return state;
  }
};
export default authReducer;
