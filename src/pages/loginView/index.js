import React, { Component } from "react";
import { Button } from "antd";

class LoginView extends Component {
  render() {
    return (
      <div className='loginView'>
        <div className="body">
          <span className="title">Job Evaluation Tool</span>
          <p className="description">KPMG Staff</p>
          <a
            // href={`http://ec2-3-16-29-129.us-east-2.compute.amazonaws.com/pep_admin/#/AuthPage?pepAdmin_ClientUserName=userone@ng.pep.com&pepAdmin_AppId=pepAdmin`}
            // href={`http://nglosapp07/os_environment_getter?CallBackUrl=http://nglosapp07/booking_project%23AuthPage&AppId=jobEvaluation`}

            href={`http://localhost:4000/?CallBackUrl=http://localhost:3001/%23AuthPage&AppId=jobEvaluation&UserName=joshua.andu@ng.kpmg.com`}
          >
            <Button className="button">Login</Button>
          </a>
        </div>
      </div>
    );
  }
}
export default LoginView;
