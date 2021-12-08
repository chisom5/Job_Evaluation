import React, { lazy, Suspense, Component } from "react";
import { HashRouter as Router, Route, Switch, Link } from "react-router-dom";
// import { ProtectedRoute } from "./protectedRoute";
import { Spin, Result, Button } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import "./App.scss";

const Login = lazy(() => import("../pages/loginView"));
const AuthPage = lazy(() => import("../pages/authPage"));
const Evaluation = lazy(() => import("../pages/evaluation/container"));
const JobDescription = lazy(() => import("../pages/jobDescription/container"));
const Users = lazy(() => import("../pages/users/container"));
const Configuration = lazy(() => import("../pages/configuration/container"));

const LoadingMessage = () => (
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
    <div className="spin">
      <Spin
        size="small"
        indicator={
          <LoadingOutlined style={{ fontSize: 24, color: "#00A3A1" }} spin />
        }
      />
    </div>
  </div>
);

const FourZeroFour = () => (
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
    <Result
      status="404"
      title="404"
      subTitle="Sorry, the page you visited does not exist."
      extra={
        <Button type="primary">
          <Link to="/">Back Home</Link>
        </Button>
      }
    />
  </div>
);

class Main extends Component {
  render() {
    return (
      <Router basename="/job_evaluation">
        <Suspense fallback={<LoadingMessage />}>
          <Switch>
            <Route exact path="/" component={Login} />
            <Route exact path="/AuthPage" component={AuthPage} />
            <Route exact path="/evaluation" component={Evaluation} />
            <Route exact path="/job_description" component={JobDescription} />
            <Route exact path="/users" component={Users} />
            <Route exact path="/settings" component={Configuration} />

            <Route path="*" component={FourZeroFour} />
          </Switch>
        </Suspense>
      </Router>
    );
  }
}
export default Main;
