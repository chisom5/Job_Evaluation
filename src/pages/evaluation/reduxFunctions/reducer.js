import update from "immutability-helper";
import EVALUATION_CONSTANT from "./constant";

const initialState = {
  success: null,
  error: null,
  clientsData: [],
  evaluationList: [],
  staffList: [],
  factorList: [],
  isRequesting: false,
  isCreating: false,
  isFetching: false,
  isOpening: false,
};

const requestingHome = (state, loading) =>
  update(state, {
    [loading]: {
      $set: true,
    },
  });

const handleClientFetched = (state, { payload }) =>
  update(state, {
    clientsData: {
      $set: payload,
    },
    isRequesting: {
      $set: false,
    },
  });

const handleClientCreated = (state, { payload }) =>
  update(state, {
    clientsData: {
      $push: [payload.client],
    },
    isCreating: {
      $set: false,
    },
  });

const handleClientEvaluation = (state, { payload }) =>
  update(state, {
    evaluationList: {
      $set: payload,
    },
    isOpening: {
      $set: false,
    },
  });

const handleAllStaff = (state, { payload }) =>
  update(state, {
    staffList: {
      $set: payload,
    },
    isFetching: {
      $set: false,
    },
  });
  const handleFactorsFetched = (state, { payload }) =>
  update(state, {
    factorList: {
      $set: payload,
    },
    fetchingFactor: {
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
    isRequesting: {
      $set: false,
    },
    isCreating: {
      $set: false,
    },
    isOpening: {
      $set: false,
    },
    isFetching: {
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

const evaluationReducer = (state = initialState, action) => {
  switch (action.type) {
    case EVALUATION_CONSTANT.fetchFactorRequested:
      return requestingHome(state, "fetchingFactor");
    case EVALUATION_CONSTANT.fetchFactorError:
      return handleError(state, action);
    case EVALUATION_CONSTANT.fetchFactorSuccess:
      return handleFactorsFetched(state, action);

    case EVALUATION_CONSTANT.createClientRequested:
      return requestingHome(state, "isCreating");
    case EVALUATION_CONSTANT.createClientError:
      return handleError(state, action);
    case EVALUATION_CONSTANT.createClientSuccess:
      return handleClientCreated(state, action);

    case EVALUATION_CONSTANT.getClientsRequested:
      return requestingHome(state, "isRequesting");
    case EVALUATION_CONSTANT.getClientsError:
      return handleError(state, action);
    case EVALUATION_CONSTANT.getClientsSuccess:
      return handleClientFetched(state, action);

    case EVALUATION_CONSTANT.clientEvaluationRequested:
      return requestingHome(state, "isOpening");
    case EVALUATION_CONSTANT.clientEvaluationError:
      return handleError(state, action);
    case EVALUATION_CONSTANT.clientEvaluationSuccess:
      return handleClientEvaluation(state, action);

    case EVALUATION_CONSTANT.getAllStaffRequested:
      return requestingHome(state, "isFetching");
    case EVALUATION_CONSTANT.getAllStaffError:
      return handleError(state, action);
    case EVALUATION_CONSTANT.getAllStaffSuccess:
      return handleAllStaff(state, action);

    case EVALUATION_CONSTANT.setErrorSuccess:
      return setErrorAction(state, action);

    case EVALUATION_CONSTANT.clearErrorMessageSuccess:
      return clearError(state, action);
    case EVALUATION_CONSTANT.clearSuccessMessageSuccess:
      return clearSuccessMessage(state, action);

    default:
      return state;
  }
};
export default evaluationReducer;
