import CONFIG_CONSTANT from "./constant";
import {
  makeGetRequest,
  makePutRequest,
  makePostRequest,
  makeDeleteRequest,
} from "./api";

const homeActionsSuccess = (actionType, payload) => ({
  type: CONFIG_CONSTANT[`${actionType}Success`],
  payload,
});

const homeActionsRequested = (actionType) => ({
  type: CONFIG_CONSTANT[`${actionType}Requested`],
});

const homeActionsError = (actionType, error) => ({
  type: CONFIG_CONSTANT[`${actionType}Error`],
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

// update factor
export const handleFactorObj = (payload) => ({
  type: CONFIG_CONSTANT[`SET_FACTOR_OBJ`],
  payload,
});

export const handleFactorId = (payload) => ({
  type: CONFIG_CONSTANT[`SET_FACTOR_ID`],
  payload,
});

// create factor
export const handleAddFactor = (params, history) => {
  const actionType = "createFactor";
  return async (dispatch) => {
    try {
      dispatch(homeActionsRequested(actionType));
      const res = await makePostRequest(`/factors`, params);

      if (res.status !== 200) {
        dispatch(homeActionsError(actionType, res.data.msg));
      } else {
        if (res.data.status === true) {
          console.log(res);
          dispatch(homeActionsSuccess(actionType, res.data.data.factor));
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

// update factor
export const handleUpdateFactor = (params, history) => {
  const actionType = "updateFactor";
  return async (dispatch) => {
    try {
      dispatch(homeActionsRequested(actionType));
      const res = await makePutRequest(`/factor/${params.factor_id}`, params);

      if (res.status !== 200) {
        dispatch(homeActionsError(actionType, res.data.msg));
      } else {
        if (res.data.status === true) {
          console.log(res);
          dispatch(homeActionsSuccess(actionType, params));
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

// delete factor
export const handleDeleteFactor = (params, history) => {
  const actionType = "deleteFactor";
  return async (dispatch) => {
    try {
      dispatch(homeActionsRequested(actionType));
      const res = await makeDeleteRequest(`/factor/${params.factor_id}`);

      if (res.status !== 200) {
        dispatch(homeActionsError(actionType, res.data.msg));
      } else {
        if (res.data.status === true) {
          dispatch(homeActionsSuccess(actionType, params));
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

// add dimension
export const handleCreateDimension = (params, history) => {
  const actionType = "createDimensions";
  return async (dispatch) => {
    try {
      dispatch(homeActionsRequested(actionType));
      const res = await makePostRequest(`/dimensions`, params);

      if (res.status !== 200) {
        dispatch(homeActionsError(actionType, res.data.msg));
      } else {
        if (res.data.status === true) {
          // console.log(res.data.data.dimension, "dim");
          dispatch(homeActionsSuccess(actionType, res.data.data.dimension));
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
// delete dimension
export const handleDeleteDimension = (params, history) => {
  const actionType = "deleteDimension";
  return async (dispatch) => {
    try {
      dispatch(homeActionsRequested(actionType));
      const res = await makeDeleteRequest(`/dimension/${params.dimension_id}`);

      if (res.status !== 200) {
        dispatch(homeActionsError(actionType, res.data.msg));
      } else {
        if (res.data.status === true) {
          const deleteParams = {
            factor_id: params.factor_id,
            dimension_id: params.dimension_id,
          };
          dispatch(homeActionsSuccess(actionType, deleteParams));
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
// update factor
export const handleUpdateDimension = (params, history) => {
  const actionType = "updateDimension";
  return async (dispatch) => {
    try {
      dispatch(homeActionsRequested(actionType));
      const res = await makePutRequest(`/dimension/${params.dimension_id}`, params);

      if (res.status !== 200) {
        dispatch(homeActionsError(actionType, res.data.msg));
      } else {
        if (res.data.status === true) {
          dispatch(homeActionsSuccess(actionType, params));
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

// add level
export const handleCreateLevel = (params, history, factor_id) => {
  const actionType = "createLevel";
  return async (dispatch) => {
    try {
      dispatch(homeActionsRequested(actionType));
      const res = await makePostRequest(`/levels`, params);

      if (res.status !== 200) {
        dispatch(homeActionsError(actionType, res.data.msg));
      } else {
        if (res.data.status === true) {
          console.log(res, "level");
          dispatch(
            homeActionsSuccess(actionType, {
              ...res.data.data.leval,
              factor_id,
            })
          );
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

// delete level
export const handleDeleteLevel = (params, history) => {
  const actionType = "deleteLevel";
  return async (dispatch) => {
    try {
      dispatch(homeActionsRequested(actionType));
      const res = await makeDeleteRequest(`/level/${params.level_id}`);

      if (res.status !== 200) {
        dispatch(homeActionsError(actionType, res.data.msg));
      } else {
        if (res.data.status === true) {
          const deleteParams = {
            factor_id: params.factor_id,
            dimension_id: params.dimension_id,
            level_id: params.level_id,
          };
          dispatch(homeActionsSuccess(actionType, deleteParams));
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
// add multiplier
export const handleAddMultiplictorFactor = (params, history) => {
  const actionType = "createMultiple";
  return async (dispatch) => {
    try {
      dispatch(homeActionsRequested(actionType));
      const res = await makePostRequest(`/multipliers`, params);

      if (res.status !== 200) {
        dispatch(homeActionsError(actionType, res.data.msg));
      } else {
        if (res.data.status === true) {
          dispatch(homeActionsSuccess(actionType, res.data.data.multiplier));
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

// delete multiplier
export const handleDeleteMultiplier = (params, history) => {
  const actionType = "deleteMultiplier";
  return async (dispatch) => {
    try {
      dispatch(homeActionsRequested(actionType));
      const res = await makeDeleteRequest(
        `/multiplier/${params.multiplier_id}`
      );

      if (res.status !== 200) {
        dispatch(homeActionsError(actionType, res.data.msg));
      } else {
        if (res.data.status === true) {
          const deleteParams = {
            factor_id: params.factor_id,
            multiplier_id: params.multiplier_id,
          };
          dispatch(homeActionsSuccess(actionType, deleteParams));
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


