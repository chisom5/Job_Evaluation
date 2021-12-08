import update from "immutability-helper";
import USERS_CONSTANT from "./constant";

const initialState = {
  success: null,
  error: null,
};

const requestingHome = (state, loading) =>
  update(state, {
    [loading]: {
      $set: true,
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
    fetchingDistribution: {
      $set: false,
    },
    fetchingTopChart: {
      $set: false,
    },
    fetchingTrend: {
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

const usersReducer = (state = initialState, action) => {
  switch (action.type) {
    case USERS_CONSTANT.setErrorSuccess:
      return setErrorAction(state, action);

    case USERS_CONSTANT.clearErrorMessageSuccess:
      return clearError(state, action);
    case USERS_CONSTANT.clearSuccessMessageSuccess:
      return clearSuccessMessage(state, action);

    default:
      return state;
  }
};
export default usersReducer;
