import {
  clearErrorMessage,
  clearSuccessMessage,
  // handleAddFactor,
  handleDeleteFactor,
  // handleUpdateFactor,
  handleFetechedFactor,
  handleCreateLevel,
  handleDeleteLevel,
  handleAddMultiplictorFactor,
  handleDeleteMultiplier,
  // handleCreateDimension,
  handleDeleteDimension,
  // handleUpdateDimension,
  handleFactorObj,
  handleFactorId
} from "../reduxFunctions/actions";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import Configuration from "../components";

const mapStateToProps = (state) => ({
  addingFactor: state.configReducer.addingFactor,
  fetchingFactor: state.configReducer.fetchingFactor,
  creatingDimension: state.configReducer.creatingDimension,
  factorList: state.configReducer.factorList,
  deletingDimension: state.configReducer.deletingDimension,
  creatingLevel: state.configReducer.creatingLevel,
  factor_id: state.configReducer.factor_id,
  factorObj: state.configReducer.factorObj,

  error: state.authReducer.error || state.configReducer.error,
  success: state.authReducer.success || state.configReducer.success,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      clearErrorMessage,
      clearSuccessMessage,
      // handleAddFactor,
      handleDeleteFactor,
      // handleUpdateFactor,
      handleFetechedFactor,
      handleCreateLevel,
      handleDeleteLevel,
      handleAddMultiplictorFactor,
      handleDeleteMultiplier,
      // handleCreateDimension,
      handleDeleteDimension,
      // handleUpdateDimension,
      handleFactorObj,
      handleFactorId
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(Configuration);
