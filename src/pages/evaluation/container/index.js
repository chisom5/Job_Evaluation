import {
  fetchClientList,
  handleCreateClient,
  fetchClientEvaluation,
  fetchStaffList,
  clearErrorMessage,
  clearSuccessMessage,
  handleSetError,
  handleFetechedFactor,
  createClientEvaluation
} from "../reduxFunctions/actions";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import Evaluation from "../components";

const mapStateToProps = (state) => ({
  clientsData: state.evaluationReducer.clientsData,
  isCreating: state.evaluationReducer.isCreating,
  isRequesting: state.evaluationReducer.isRequesting,
  evaluationList: state.evaluationReducer.evaluationList,
  staffList: state.evaluationReducer.staffList,
  factorList: state.evaluationReducer.factorList,

  error: state.authReducer.error || state.evaluationReducer.error,
  success: state.authReducer.success || state.evaluationReducer.success,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      clearErrorMessage,
      clearSuccessMessage,
      handleSetError,
      fetchClientList,
      fetchStaffList,
      handleCreateClient,
      fetchClientEvaluation,
      handleFetechedFactor,
      createClientEvaluation
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(Evaluation);
