import React, { Component } from "react";
import { Button } from "antd";
import { PlusOutlined } from "@ant-design/icons";

import { ConfigContext } from "../../../config/contextConfig";

// UI component
import Header from "../../../components/header";
import Sidebar from "../../../components/sidebar";
import TableComponent from "../../../components/table";
import ModalContentForm from "./modalContent";

class Users extends Component {
  state = {
    pathname: null,
    menu: [
      {
        id: 0,
        icon_default: require("../../../assets/images/evaluation_default.svg")
          .default,
        icon_active: require("../../../assets/images/evaluation_active.svg")
          .default,
        path: "/evaluation",
        name: 'Evaluations'
      },
      {
        id: 1,
        icon_default: require("../../../assets/images/description_default.svg")
          .default,
        icon_active: require("../../../assets/images/description_active.svg")
          .default,
        path: "/job_description",
        name: 'Job Descriptions'
      },

      {
        id: 2,
        icon_default: require("../../../assets/images/users_default.svg")
          .default,
        icon_active: require("../../../assets/images/users_active.svg").default,
        path: "/users",
        name: 'User Management'
      },
      {
        id: 3,
        icon_default: require("../../../assets/images/settings_default.svg")
          .default,
        icon_active: require("../../../assets/images/settings_active.svg")
          .default,
        path: "/settings",
        name: 'Configurations'
      },
    ],
    data: [
      {
        id: 1,
        name: "Nancy Jubril",
        unit: "People & Change",
        position: "Analyst",
        role: "Preparer",
      },
      {
        id: 2,
        name: "Nancy Jubril",
        unit: "People & Change",
        position: "Senior Associate",
        role: "Approver",
      },
      {
        id: 3,
        name: "Nancy Jubril",
        unit: "People & Change",
        position: "Senior Associate",
        role: "Administrator",
      },
    ],
    isUsersModal: false,
    modalTitle: "",
    headerTitle: 'Users'
  };
  componentDidMount() {
    const { pathname } = this.props.location;

    this.setState({
      pathname: pathname,
    });
  }

  openModal = (val) => {
    console.log(val);
    this.setState({
      isUsersModal: true,
      modalTitle: val,
    });
  };

  handleTextChange = (e) => {};

  dismissModal = () => {
    this.setState({
      isUsersModal: false,
      modalTitle: "",
    });
  };
  render() {
    const { data, pathname, menu, modalTitle, isUsersModal,  headerTitle,} = this.state;
    const { handleTextChange, openModal, dismissModal } = this;
    return (
      //   <ErrorComponent
      //   error={this.props.error}
      //   success={this.props.success}
      //   clearErrorMessage={this.props.clearErrorMessage}
      //   clearSuccessMessage={this.props.clearSuccessMessage}
      // >
      // </ErrorComponent>

      <ConfigContext.Provider
        value={{
          pathname,
          menu,
          modalTitle,
          isUsersModal,
          headerTitle,
          dismissModal,
          handleTextChange,
          openModal,
        }}
      >
        <div>
          <Header />
          <section className="main__section">
            <Sidebar />
            <div className="init__content">
              <header>
                <p className="init__content_title">User Management</p>

                <div>
                  <Button
                  className='btn_primary'
                    icon={<PlusOutlined />}
                    onClick={() => this.openModal("New User")}
                  >
                    New User
                  </Button>
                </div>
              </header>

              {/* table component */}
              <TableComponent tableData={data} />
            </div>
          </section>
          {/* modal here */}
          {isUsersModal ? <ModalContentForm /> : null}
        </div>
      </ConfigContext.Provider>
    );
  }
}
export default Users;
