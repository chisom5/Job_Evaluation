import React, { Component, useCallback } from "react";
import { ConfigContext } from "../../../config/contextConfig";
import { Button } from "antd";
import { withRouter } from "react-router";
import { PlusOutlined } from "@ant-design/icons";
import { ErrorComponent } from "../../../components/errorBoundry/errorComponent";

// UI component
import Header from "../../../components/header";
import Sidebar from "../../../components/sidebar";
import TableComponent from "../../../components/table";
import EditConfiguration from "./editConfigurationPage";
import ModalContentForm from "./modalContent";

class Configuration extends Component {
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

    isUsersModal: false,
    modalTitle: "",
    headerTitle: "Configurations",
    isEditConfig: false,
    active_editConfig: "",
    name: "",
    label: "",
    configurationObj: {},
    fixedDimensionHeader: [
      {
        title: "Dimensions/Levels",
      },
      {
        title: "Multiplication Factor",
      },
    ],
    active_editConfig: "Dimensions/Levels",
    modalTitle: "",
    isVisible: false,
  };
  componentDidMount() {
    const { pathname } = this.props.location;

    this.setState({
      pathname: pathname,
    });
    this.props.handleFetechedFactor(this.props.history);
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.factorList !== this.props.factorList) {
      const ind = this.props.factorList.findIndex(
        (item) => item.id === this.props.factor_id
      );

      this.setState({
        configurationObj: this.state.isEditConfig
          ? this.props.factorList[ind]
          : this.state.configurationObj,
        label: "",
        name: "",
      });

      this.dismissModal();
    }

    // if (
    //   prevProps.success !== this.props.success ||
    //   prevProps.error !== this.props.error
    // ) {
    //   setTimeout(() => this.props.clearSuccessMessage(), 5000);
    //   setTimeout(() => this.props.clearErrorMessage(), 5000);
    // }
  }

  handleTextChange = (e) => {
    const { name, value } = e.target;

    this.setState({
      [name]: value,
    });
  };

  handleNumberChange = (e, name) => {
    this.setState({
      [name]: e,
    });
  };
  editConfiguration = (obj) => {
    this.setState({
      subTitle: obj.label,
      isEditConfig: true,
      configurationObj: obj,
    });

    // dispatch redux action here
    this.props.handleFactorId(obj.id);
  };

  // navigate back
  navigateBack = () => {
    this.setState({
      isEditConfig: false,
    });
  };

  updateFactor = (title) => {
    this.setState({
      active_editConfig: title,
    });
  };

  // add new factor
  handleAddToArray = (arrHeader, dimension_id) => {
    const { factor_id } = this.props;

    const payload = {
      label: this.state.name,
      dimension_id,
      order: this.extractOrderCount(arrHeader.levels),
    };

    this.props
      .handleCreateLevel(payload, this.props.history, factor_id)
      .then(() => {
        this.setState({
          name: "",
        });
      });
  };

  // add new multipler
  handleAddToMultipler = () => {
    const { factor_id } = this.props;
    const payload = {
      label: this.state.label,
      factor_id,
      multiple: this.state.multiple,
    };

    this.props.handleAddMultiplictorFactor(payload, this.props.history);
  };
  extractOrderCount = (arr) => {
    let count = 0;
    for (let a = 0; a < arr.length; a++) {
      if (arr[a].order > count) {
        count = arr[a].order;
      }
    }
    return count + 1;
  };
  // remove from the factors list
  handleRemoveFromArr = (arrHeader, levelId) => {
    const { factor_id } = this.props;

    if (arrHeader.multiple !== undefined) {
      const multipleParams = {
        factor_id,
        multiplier_id: arrHeader.id,
      };
      this.props.handleDeleteMultiplier(multipleParams, this.props.history);
    } else {
      const params = {
        factor_id,
        dimension_id: arrHeader.id,
        level_id: levelId,
      };
      this.props.handleDeleteLevel(params, this.props.history);
    }
  };

  deleteAction = () => {
    const { modalTitle } = this.state;
    const { factorObj } = this.props;

    if (modalTitle.includes("Dimension")) {
      const params = {
        factor_id: factorObj.factor_id,
        dimension_id: factorObj.id,
      };
      this.props.handleDeleteDimension(params, this.props.history);
    } else {
      const params = {
        factor_id: factorObj.id,
      };
      this.props.handleDeleteFactor(params, this.props.history);
    }
  };
  openModal = (val) => {
    this.setState({
      modalTitle: val,
      isVisible: true,
    });
  };
  onRowClick = (val, record) => {
    console.log(record);
    this.props.handleFactorObj(record);
    this.props.handleFactorId(record.id);

    this.setState({
      modalTitle: val,
      isVisible: true,
    });
  };

  handleFilter = (arr, title) => {
    return arr && arr.filter((item) => item.title === title);
  };
  goBackToHomePage = () => {
    this.setState({ isEditConfig: false });
  };

  dismissModal = () => {
    this.setState(
      {
        isVisible: false,
        modalTitle: "",
      },
      () => {}
    );
  };
  render() {
    const {
      pathname,
      menu,
      modalTitle,
      isUsersModal,
      headerTitle,
      subTitle,
      name,
      isEditConfig,
      active_editConfig,
      isVisible,
      fixedDimensionHeader,
      configurationObj,
    } = this.state;
    const {
      handleTextChange,
      updateFactor,
      editConfiguration,
      goBackToHomePage,
      handleRemoveFromArr,
      handleAddToArray,
      openModal,
      dismissModal,
      onRowClick,
      handleAddToMultipler,
      handleNumberChange,
      deleteAction,
    } = this;
    const { fetchingFactor, creatingLevel } = this.props;

    return (
      <ErrorComponent
        error={this.props.error}
        success={this.props.success}
        clearErrorMessage={this.props.clearErrorMessage}
        clearSuccessMessage={this.props.clearSuccessMessage}
      >
        <ConfigContext.Provider
          value={{
            pathname,
            menu,
            modalTitle,
            isUsersModal,
            headerTitle,
            subTitle,
            name,
            isEditConfig,
            active_editConfig,
            configurationObj,
            //
            modalTitle,
            isVisible,
            fixedDimensionHeader,
            creatingLevel,
            //
            updateFactor,
            handleTextChange,
            editConfiguration,
            goBackToHomePage,
            handleRemoveFromArr,
            handleAddToArray,
            openModal,
            dismissModal,
            onRowClick,
            handleAddToMultipler,
            handleNumberChange,
            deleteAction,
          }}
        >
          <div>
            <Header />
            <section className="main__section">
              <Sidebar />

              <div className="init__content">
                <header>
                  <p className="init__content_title">
                    {isEditConfig ? subTitle : headerTitle}
                  </p>

                  {isEditConfig ? (
                    <p
                      className="init__content_back"
                      onClick={() => this.navigateBack()}
                    >
                      Back
                    </p>
                  ) : (
                    <div>
                      <Button
                        className="btn_primary"
                        icon={<PlusOutlined />}
                        onClick={() => this.openModal("Add Factor")}
                      >
                        Add Factor
                      </Button>
                    </div>
                  )}
                </header>

                {isEditConfig ? (
                  <EditConfiguration />
                ) : (
                  <TableComponent
                    tableData={this.props.factorList}
                    tableLoading={fetchingFactor}
                  />
                )}
              </div>
            </section>
            {/* modal here */}
            {isVisible ? <ModalContentForm /> : null}
          </div>
        </ConfigContext.Provider>
      </ErrorComponent>
    );
  }
}
export default withRouter(Configuration);
