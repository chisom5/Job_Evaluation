import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { ErrorComponent } from "../../components/errorBoundry/errorComponent";
import { Spin, Result } from "antd";
import {
  authenticateUser,
  clearErrorMessage,
  clearSuccessMessage,
} from "../../config/authFunctions/actions";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import qs from "qs";

class AuthPage extends Component {
  componentDidMount() {
    const { search } = this.props.location;

    //convert url query strings to js object.
    const { history } = this.props;

    let params = qs.parse(search);
    params = JSON.parse(JSON.stringify(params).replace("?", ""));

    // extract user's computer credentials
    const userObj = {
      email: params.jobEvaluation_ClientUserName,
    };

    //logs user in
    this.props.authenticateUser(userObj, history);
  }
  componentDidUpdate(prevProps, prevState) {
    if (
      prevProps.success !== this.props.success ||
      prevProps.error !== this.props.error
    ) {
      setTimeout(() => this.props.clearSuccessMessage(), 5000);
      setTimeout(() => this.props.clearErrorMessage(), 5000);
    }
  }

  render() {
    return (
      <ErrorComponent
        error={this.props.error}
        success={this.props.success}
        clearErrorMessage={this.props.clearErrorMessage}
        clearSuccessMessage={this.props.clearSuccessMessage}
      >
        <div
          style={{
            background: "#e5eff1",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
            width: "100%",
          }}
        >
          {this.props.loading ? (
            <div className="spin">
              <Spin size="small" />
            </div>
          ) : (
            <Result
              status="404"
              title="404"
              subTitle="Sorry, couldn't authenticate user."
              // extra={
              //   <Button type="primary">
              //     <Link to="/">Back Home</Link>
              //   </Button>
              // }
            />
          )}
        </div>
      </ErrorComponent>
    );
  }
}

const mapStateToProps = ({ authReducer }) => ({
  loading: authReducer.isLogin,
  error: authReducer.error,
  success: authReducer.success,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      clearErrorMessage,
      clearSuccessMessage,
      authenticateUser,
    },
    dispatch
  );

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(AuthPage)
);
