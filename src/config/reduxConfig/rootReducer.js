import { combineReducers } from "redux";
import authReducer from "../authFunctions/reducer";
import JobDescriptionReducer from "../../pages/jobDescription/reduxFunctions/reducer";
import evaluationReducer from "../../pages/evaluation/reduxFunctions/reducer";
import usersReducer from "../../pages/users/reduxFunctions/reducer";
import configReducer from '../../pages/configuration/reduxFunctions/reducer';

export default combineReducers({
  authReducer,
  evaluationReducer,
  JobDescriptionReducer,
  usersReducer,
  configReducer
});
