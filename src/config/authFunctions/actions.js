import AUTH_CONSTANT from "./constant";
import { getUserAccessToken, getUserDetails } from "./api";

const actionSuccess = (actionType, payload) => ({
  type: AUTH_CONSTANT[`${actionType}Success`],
  payload,
});

const actionRequested = (actionType) => ({
  type: AUTH_CONSTANT[`${actionType}Requested`],
});

const actionError = (actionType, error) => ({
  type: AUTH_CONSTANT[`${actionType}Error`],
  error,
});

// clear error message
export const clearErrorMessage = () => (dispatch) => {
  const actionType = "clearErrorMessage";
  dispatch(actionSuccess(actionType));
};

// clear success message
export const clearSuccessMessage = () => (dispatch) => {
  const actionType = "clearSuccessMessage";
  dispatch(actionSuccess(actionType));
};

// set error
export const handleSetError = (payload) => (dispatch) => {
  const actionType = "set";
  dispatch(actionError(actionType, payload));
};

// export const getUserEmail = (query) => {
//   const actionType = "emailofUser";
//   return async (dispatch) => {
//     try {
//       dispatch(actionRequested(actionType));
//       const res = await getUserDetails(query);
//       if (res.status !== 200) {
//         return dispatch(actionError(actionType, res.data));
//       } else {
//         if (res.data.status === true) {
//           console.log(res);
//           sessionStorage.setItem("AUTH_USER_XXX", JSON.stringify(res.data));
//           dispatch(actionSuccess(actionType, res.data));
//         } else {
//           dispatch(
//             actionError(
//               actionType,
//               res.data.err || `couldn't access the page`
//             )
//           );
//         }
//       }
//     } catch (error) {
//       if (error.response) {
//         console.log(error.response);
//         return dispatch(
//           actionError(actionType, error.response.data.error_description)
//         );
//       } else if (error.request) {
//         // console.log(error.request)
//         return dispatch(actionError(actionType, "Network error"));
//       } else {
//         // Something happened in setting up the request and triggered an error
//         console.log("axios", error);
//         return dispatch(actionError(actionType, error.message));
//       }
//     }
//   };
// };
// authenticate user
export const authenticateUser = (query, history) => {
  const actionType = "loginUser";
  return async (dispatch) => {
    try {
      dispatch(actionRequested(actionType));
      const res = await getUserAccessToken(query);
      if (res.status !== 200) {
        return dispatch(actionError(actionType, res.data));
      } else {
        if (res.data.status === true) {
          sessionStorage.setItem("JOB_EVAL_XXX", JSON.stringify(res.data.data));
          dispatch(actionSuccess(actionType, res.data.data));
          history.push("/evaluation");
        } else {
          dispatch(
            actionError(
              actionType,
              res.data.err || `couldn't access the page`
            )
          );
        }
      }
    } catch (error) {
      if (error.response) {
        console.log(error.response);
        return dispatch(
          actionError(actionType, error.response.data.error_description)
        );
      } else if (error.request) {
        // console.log(error.request)
        return dispatch(actionError(actionType, "Network error"));
      } else {
        // Something happened in setting up the request and triggered an error
        console.log("axios", error.message);
        return dispatch(actionError(actionType, error.message));
      }
     
    }
  };
};

