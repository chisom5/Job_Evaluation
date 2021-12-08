import {
    clearErrorMessage,
    clearSuccessMessage,
  } from "../reduxFunctions/actions";
  import { bindActionCreators } from "redux";
  import { connect } from "react-redux";
  import Users from "../components";
  
  const mapStateToProps = (state) => ({
    error: state.authReducer.error || state.usersReducer.error,
    success: state.authReducer.success || state.usersReducer.success,
  });
  
  const mapDispatchToProps = (dispatch) =>
    bindActionCreators(
      {
        clearErrorMessage,
        clearSuccessMessage,
      },
      dispatch
    );
  
  export default connect(mapStateToProps, mapDispatchToProps)(Users);
  