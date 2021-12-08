import React, { Component } from "react";
import { Button, Empty } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { withRouter } from "react-router-dom";
import { ConfigContext } from "../../../config/contextConfig";

// UI component
import Header from "../../../components/header";
import Sidebar from "../../../components/sidebar";
import ModalContentForm from "./modalContent";
import TableComponent from "../../../components/table";
import EvaluationTabsComponent from "./evaluationTabsComponent";

class Evaluation extends Component {
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
        name: "Evaluations",
      },
      {
        id: 1,
        icon_default: require("../../../assets/images/description_default.svg")
          .default,
        icon_active: require("../../../assets/images/description_active.svg")
          .default,
        path: "/job_description",
        name: "Job Descriptions",
      },

      {
        id: 2,
        icon_default: require("../../../assets/images/users_default.svg")
          .default,
        icon_active: require("../../../assets/images/users_active.svg").default,
        path: "/users",
        name: "User Management",
      },
      {
        id: 3,
        icon_default: require("../../../assets/images/settings_default.svg")
          .default,
        icon_active: require("../../../assets/images/settings_active.svg")
          .default,
        path: "/settings",
        name: "Configurations",
      },
    ],
    modalTitle: "",
    isNewEval: false,
    isEvaluationOpen: false,
    eval_factors: false,
    evaluation_type: ["By You", "By Others"],
    activeEvalType: "By You",
    headerTitle: "Evaluations",
  };

  async componentDidMount () {
    const { pathname } = this.props.location;

    this.setState({
      pathname: pathname,
    });
    await this.props.fetchClientList(this.props.history);
    await this.props.fetchStaffList(this.props.history);
    await this.props.handleFetechedFactor(this.props.history)
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.evaluationList !== this.props.evaluationList) {
      this.setState({
        isEvaluationOpen: true,

      });
    }
  }
  // extract the client name by the given client id
 
  openModal = (val) => {
    this.setState({
      modalTitle: val,
      isNewEval: true,
    });
  };

  setEval_factors = () => {
    this.setState({
      eval_factors: true,
    });
  };

  handleTextChange = (e) => {};

  openEvaluationTable = (content) => {
    // call redux action
    this.props.fetchClientEvaluation(content.id);
  };
  setActiveEvalType = (item) => {
    this.setState({
      activeEvalType: item,
    });
  };
  dismissModal = () => {
    this.setState({
      isNewEval: false,
      modalTitle: "",
    });
  };

  render() {
    const {
      pathname,
      menu,
      modalTitle,
      isNewEval,
      // evaluationArr,
      isEvaluationOpen,
      // data,
      eval_factors,
      evaluation_type,
      activeEvalType,
      headerTitle,
    } = this.state;
    const {
      handleTextChange,
      dismissModal,
      setEval_factors,
      setActiveEvalType,
    } = this;
    const {
      handleCreateClient,
      createClientEvaluation,
      handleSetError,
      isCreating,
      isRequesting,
      evaluationList,
      clientsData,
      staffList,
      factorList,
    } = this.props;

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
          headerTitle,
          modalTitle,
          isNewEval,
          evaluation_type,
          activeEvalType,
          isCreating,
          clientsData,
          handleTextChange,
          dismissModal,
          setActiveEvalType,
          setEval_factors,
          createClientEvaluation,
          handleCreateClient,
          handleSetError,
          staffList,
          factorList,
        }}
      >
        <div>
          <Header />
          <section className="main__section">
            <Sidebar />

            {/* second state check */}
            {!eval_factors ? (
              <div className="init__content">
                <header>
                  <p className="init__content_title">Evaluation</p>

                  <div>
                    <Button
                      className="btn_primary"
                      icon={<PlusOutlined />}
                      onClick={() => this.openModal("New Evaluation")}
                    >
                      New Evaluation
                    </Button>

                    <Button
                      type="primary"
                      className="btn_client"
                      onClick={() => this.openModal("New Client")}
                    >
                      Create Client
                    </Button>
                  </div>
                </header>

                {/* other contents here */}

                <section className="init__content_wrapper">
                  {!isEvaluationOpen &&
                    !isRequesting &&
                    this.props.clientsData.length > 0 && (
                      <>
                        <p id="header">
                          Click on any of the clients to see evaluations done
                          for them
                        </p>
                        <div className="init__content__eval">
                          {this.props.clientsData.map((content) => {
                            return (
                              <div
                                className="init__content__eval_item"
                                key={content.id}
                                onClick={() =>
                                  this.openEvaluationTable(content)
                                }
                              >
                                {/* img */}
                                <div id="building_icon">
                                  <img
                                    src={
                                      require("../../../assets/images/building.svg")
                                        .default
                                    }
                                    alt="building"
                                  />
                                </div>

                                <p>{content.name}</p>
                              </div>
                            );
                          })}
                        </div>
                      </>
                    )}
                  {/* loading state of client */}
                  {!isEvaluationOpen && isRequesting && (
                    <>
                      <p>Loading...</p>
                    </>
                  )}

                  {/* if client list is empty and we are not in the table */}
                  {!isEvaluationOpen &&
                    !isRequesting &&
                    this.props.clientsData.length === 0 && (
                      <>
                        <Empty />
                      </>
                    )}

                  {/* table component when you click on a card */}
                  {isEvaluationOpen && (
                    <TableComponent tableData={evaluationList} />
                  )}
                </section>
              </div>
            ) : (
              <EvaluationTabsComponent factorsList={factorList} />
            )}
          </section>
          {/* modal here */}
          {isNewEval ? <ModalContentForm /> : null}
        </div>
      </ConfigContext.Provider>
    );
  }
}
export default withRouter(Evaluation);
