import React, { Component } from "react";
import { ConfigContext } from "../../../config/contextConfig";

// UI import 
import Header from "../../../components/header";
import Sidebar from "../../../components/sidebar";
import TableComponent from "../../../components/table";

class JobDescription extends Component {
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
        jobTitle: "Admininstative Officer",
        clientName: "Pell Electric",
        dateAdded: "18-Jul-2020",
      },
      {
        id: 2,
        jobTitle: "Chief Finance Officer",
        clientName: "National Construction Company",
        dateAdded: "11-Jul-2020",
      },
      {
        id: 3,
        jobTitle: "Compliance Officer",
        clientName: "MainQuartz LLC",
        dateAdded: "8-Jul-2021",
      },
    ],
    headerTitle: "Job Descriptions",
  };
  componentDidMount() {
    const { pathname } = this.props.location;

    this.setState({
      pathname: pathname,
    });
  }
  render() {
    const { data, pathname, menu, headerTitle } = this.state;

    return (
      //   <ErrorComponent
      //   error={this.props.error}
      //   success={this.props.success}
      //   clearErrorMessage={this.props.clearErrorMessage}
      //   clearSuccessMessage={this.props.clearSuccessMessage}
      // >
      // </ErrorComponent>

      <ConfigContext.Provider value={{ pathname, menu, headerTitle }}>
        <div>
          <Header />
          <section className="main__section">
            <Sidebar />
            <div className="init__content">
              <header>
                <p className="init__content_title">{headerTitle}</p>
              </header>

              {/* table component */}
              <TableComponent tableData={data} />
            </div>
          </section>
        </div>
      </ConfigContext.Provider>
    );
  }
}
export default JobDescription;
