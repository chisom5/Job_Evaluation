import React, { Component } from "react";
import { Tabs, Button } from "antd";
import { ConfigContext } from "../../../config/contextConfig";

// UI
import EvaluationFactorTab from "./evaluationFactorTab";
import EvaluationMatrices from "./evaluationMatrice";
import EvaluationJobDetails from './evaluationJobDetail';

const { TabPane } = Tabs;

class EvaluationTabsComponent extends Component {
  state = {
    isDrawer: false,
    activeKey: "1",
  };

  showDrawer = () => {
    this.setState({
      isDrawer: true,
    });
  };
  onClose = () => {
    this.setState({
      isDrawer: false,
    });
  };
  onTabChange = (selectedKey) => {
    console.log(selectedKey);
    this.setState({ activeKey: selectedKey });
  };
  render() {
    const { isDrawer, activeKey } = this.state;
    const { showDrawer, onClose } = this;
    let leftContent;

    switch (activeKey) {
      case "1":
        leftContent = (
          <div className="tabs__extra_content">
            <p>The Evaluation Factors’ weights must add up to 100%</p>
            <Button
              className="tabs__extra_content__btn_disable"
              disabled={true}
            >
              Next
            </Button>
          </div>
        );
        break;

      default :
        leftContent = (
          <div className="tabs__extra_content">
            <Button className="tabs__extra_content__btn_back">Back</Button>
            <Button
              className="tabs__extra_content__btn_disable"
              disabled={true}
            >
              Next
            </Button>
          </div>
        );
        break;
    }
    return (
      <ConfigContext.Provider
        value={{
          isDrawer,
          showDrawer,
          onClose,
        }}
      >
        <div className="mini_menu_header">
          <Tabs
            tabBarExtraContent={leftContent}
            onChange={this.onTabChange}
            activeKey={activeKey}
          >
            <TabPane tab="Evaluation Factors" key="1">
              <EvaluationFactorTab factorsList={this.props.factorsList} />
            </TabPane>
            <TabPane tab="Review Evaluation Matrices" key="2">
              <EvaluationMatrices />
            </TabPane>
            <TabPane tab="Upload Job Details" key="3">
              <EvaluationJobDetails />
            </TabPane>
            <TabPane tab="Evaluation Report Preview" key="4">
              Content of tab 4
            </TabPane>
          </Tabs>
        </div>
      </ConfigContext.Provider>
    );
  }
}

export default EvaluationTabsComponent;
