import EVALUATION_CONSTANT from "./constant";
import { makeGetRequest, makePostRequest } from "./api";

const homeActionsSuccess = (actionType, payload) => ({
  type: EVALUATION_CONSTANT[`${actionType}Success`],
  payload,
});

const homeActionsRequested = (actionType) => ({
  type: EVALUATION_CONSTANT[`${actionType}Requested`],
});

const homeActionsError = (actionType, error) => ({
  type: EVALUATION_CONSTANT[`${actionType}Error`],
  error,
});

// clear error message
export const clearErrorMessage = () => (dispatch) => {
  const actionType = "clearErrorMessage";
  dispatch(homeActionsSuccess(actionType));
};

// clear success message
export const clearSuccessMessage = () => (dispatch) => {
  const actionType = "clearSuccessMessage";
  dispatch(homeActionsSuccess(actionType));
};

// set error
export const handleSetError = (payload) => (dispatch) => {
  const actionType = "setError";
  dispatch(homeActionsSuccess(actionType, payload));
};

// fetch clients
export const fetchClientList = (history) => {
  const actionType = "getClients";
  return async (dispatch) => {
    try {
      dispatch(homeActionsRequested(actionType));
      const res = await makeGetRequest(`/clients`);

      if (res.status !== 200) {
        dispatch(homeActionsError(actionType, res.data.msg));
      } else {
        if (res.data.status === true) {
          console.log(res);
          dispatch(homeActionsSuccess(actionType, res.data.data.clients));
        } else {
          dispatch(
            homeActionsError(
              actionType,
              res.data.err || `couldn't access the page`
            )
          );
        }
      }
    } catch (error) {
      // console.log(error);
      if (error.response) {
        if (error.response.status === 401) {
          history.push("/");
          sessionStorage.removeItem("JOB_EVAL_XXX");
        } else {
          return dispatch(
            homeActionsError(actionType, error.response.data.msg)
          );
        }
      } else if (error.request) {
        // console.log(error.request)
        return dispatch(homeActionsError(actionType, "Network error"));
      } else {
        // Something happened in setting up the request and triggered an error
        console.log("axios", error.message);
      }
    }
  };
};
// create client
export const handleCreateClient = (params, history) => {
  const actionType = "createClient";
  return async (dispatch) => {
    try {
      dispatch(homeActionsRequested(actionType));
      const res = await makePostRequest(`/clients`, params);

      if (res.status !== 200) {
        dispatch(homeActionsError(actionType, res.data.msg));
      } else {
        if (res.data.status === true) {
          console.log(res);
          dispatch(homeActionsSuccess(actionType, res.data.data));
        } else {
          dispatch(
            homeActionsError(
              actionType,
              res.data.err || `couldn't access the page`
            )
          );
        }
      }
    } catch (error) {
      // console.log(error);
      if (error.response) {
        if (error.response.status === 401) {
          history.push("/");
          sessionStorage.removeItem("JOB_EVAL_XXX");
        } else {
          return dispatch(
            homeActionsError(actionType, error.response.data.msg)
          );
        }
      } else if (error.request) {
        // console.log(error.request)
        return dispatch(homeActionsError(actionType, "Network error"));
      } else {
        // Something happened in setting up the request and triggered an error
        console.log("axios", error.message);
      }
    }
  };
};
// get evaluation of client
export const fetchClientEvaluation = (params, history) => {
  const actionType = "clientEvaluation";
  return async (dispatch) => {
    try {
      dispatch(homeActionsRequested(actionType));
      const res = await makeGetRequest(`/client/${params}/evaluations`);

      if (res.status !== 200) {
        dispatch(homeActionsError(actionType, res.data.msg));
      } else {
        if (res.data.status === true) {
          console.log(res);
          dispatch(homeActionsSuccess(actionType, res.data.data.evaluations));
        } else {
          dispatch(
            homeActionsError(
              actionType,
              res.data.err || `couldn't access the page`
            )
          );
        }
      }
    } catch (error) {
      // console.log(error);
      if (error.response) {
        if (error.response.status === 401) {
          history.push("/");
          sessionStorage.removeItem("JOB_EVAL_XXX");
        } else {
          return dispatch(
            homeActionsError(actionType, error.response.data.msg)
          );
        }
      } else if (error.request) {
        // console.log(error.request)
        return dispatch(homeActionsError(actionType, "Network error"));
      } else {
        // Something happened in setting up the request and triggered an error
        console.log("axios", error.message);
      }
    }
  };
};

// get staff
export const fetchStaffList = (history) => {
  const actionType = "getAllStaff";
  return async (dispatch) => {
    try {
      dispatch(homeActionsRequested(actionType));
      const res = await makeGetRequest(`/staff`);

      if (res.status !== 200) {
        dispatch(homeActionsError(actionType, res.data.msg));
      } else {
        if (res.data.status === true) {
          dispatch(homeActionsSuccess(actionType, res.data.data));
        } else {
          dispatch(
            homeActionsError(
              actionType,
              res.data.err || `couldn't access the page`
            )
          );
        }
      }
    } catch (error) {
      // console.log(error);
      if (error.response) {
        if (error.response.status === 401) {
          history.push("/");
          sessionStorage.removeItem("JOB_EVAL_XXX");
        } else {
          return dispatch(
            homeActionsError(actionType, error.response.data.msg)
          );
        }
      } else if (error.request) {
        // console.log(error.request)
        return dispatch(homeActionsError(actionType, "Network error"));
      } else {
        // Something happened in setting up the request and triggered an error
        console.log("axios", error.message);
      }
    }
  };
};

// fetch all factors
export const handleFetechedFactor = (history) => {
  const actionType = "fetchFactor";
  return async (dispatch) => {
    try {
      dispatch(homeActionsRequested(actionType));
      const res = await makeGetRequest(`/factors`);

      if (res.status !== 200) {
        dispatch(homeActionsError(actionType, res.data.msg));
      } else {
        if (res.data.status === true) {
          console.log(res);
          dispatch(homeActionsSuccess(actionType, res.data.data.factors));
        } else {
          dispatch(
            homeActionsError(
              actionType,
              res.data.err || `couldn't access the page`
            )
          );
        }
      }
    } catch (error) {
      // console.log(error);
      if (error.response) {
        if (error.response.status === 401) {
          history.push("/");
          sessionStorage.removeItem("JOB_EVAL_XXX");
        } else {
          return dispatch(
            homeActionsError(actionType, error.response.data.msg)
          );
        }
      } else if (error.request) {
        // console.log(error.request)
        return dispatch(homeActionsError(actionType, "Network error"));
      } else {
        // Something happened in setting up the request and triggered an error
        console.log("axios", error.message);
      }
    }
  };
};

// create evaluation
// get evaluation of client
export const createClientEvaluation = (params, history) => {
  console.log(params);
  const actionType = "createEvaluation";
  return async (dispatch) => {
    try {
      dispatch(homeActionsRequested(actionType));
      const res = await makePostRequest(`/evaluations`, params);

      if (res.status !== 200) {
        dispatch(homeActionsError(actionType, res.data.msg));
      } else {
        if (res.data.status === true) {
          if (!navigator.clipboard) {
            // Clipboard API not available
            return;
          }

          navigator.clipboard.writeText(res.data.data.id);

          dispatch(homeActionsSuccess(actionType, res.data.data.id));
        } else {
          dispatch(
            homeActionsError(
              actionType,
              res.data.err || `couldn't access the page`
            )
          );
        }
      }
    } catch (error) {
      // console.log(error);
      if (error.response) {
        if (error.response.status === 401) {
          history.push("/");
          sessionStorage.removeItem("JOB_EVAL_XXX");
        } else {
          return dispatch(
            homeActionsError(actionType, error.response.data.msg)
          );
        }
      } else if (error.request) {
        // console.log(error.request)
        return dispatch(homeActionsError(actionType, "Network error"));
      } else {
        // Something happened in setting up the request and triggered an error
        console.log("axios", error.message);
      }
    }
  };
};
