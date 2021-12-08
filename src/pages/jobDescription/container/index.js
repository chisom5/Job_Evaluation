import {
    clearErrorMessage,
    clearSuccessMessage,
  } from "../reduxFunctions/actions";
  import { bindActionCreators } from "redux";
  import { connect } from "react-redux";
  import JobDescription from "../components";
  
  const mapStateToProps = (state) => ({
    error: state.authReducer.error || state.JobDescriptionReducer.error,
    success: state.authReducer.success || state.JobDescriptionReducer.success,
  });
  
  const mapDispatchToProps = (dispatch) =>
    bindActionCreators(
      {
        clearErrorMessage,
        clearSuccessMessage,
      },
      dispatch
    );
  
  export default connect(mapStateToProps, mapDispatchToProps)(JobDescription);
  