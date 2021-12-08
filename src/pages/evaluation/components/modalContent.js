import React, { useState } from "react";
import { Select, Button, Input, Form, Modal } from "antd";
import { withContext } from "../../../config/contextConfig";
import { useHistory } from "react-router";
import update from "immutability-helper";
const { Option } = Select;

const ModalContentForm = (props) => {
  const [form] = Form.useForm();
  const { history } = useHistory();
  const [clientName, setClientName] = useState("");
  const [evaluationObj, setEvaluationObj] = useState({});

  const onCreateClient = () => {
    const payload = {
      name: clientName,
    };
    // call redux action here
    props.value.handleCreateClient(payload, history);
  };

  const onCreateEvaluation = () => {
    props.value.createClientEvaluation(evaluationObj, history);
  };

  const handleTextChange = (e) => {
    const { value } = e.target;
    setClientName(value);
  };

  // const onChange = (value) => {
  //   console.log(`selected ${value}`);
  // };
  const onClientNameChange = (e, name) => {
    setEvaluationObj(
      update(evaluationObj, {
        $merge: {
          [name]: e,
        },
      })
    );
  };

  const onTextChange = (e) => {
    const { name, value } = e.target;
    setEvaluationObj(
      update(evaluationObj, {
        $merge: {
          [name]: value,
        },
      })
    );
  };
  // const onBlur=()=> {
  //   console.log('blur');
  // }

  // const onFocus() {
  //   console.log('focus');
  // }

  // const onSearch = (val) => {
  //   console.log("search:", val);
  // };
  const renderContent = () => {
    switch (props.value.modalTitle) {
      case "New Evaluation":
        return (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
            }}
          >
            <div className="modal__header">
              <h2>{props.value.modalTitle}</h2>
            </div>

            {/* content */}
            <div className="inner__modal__content">
              <Form
                form={form}
                name="basicForm"
                onFinish={() => onCreateEvaluation()}
                requiredMark={false}
              >
                <Form.Item
                  name="client_id"
                  label="Client Name"
                  rules={[{ required: true, message: `select client name` }]}
                >
                  <Select
                    allowClear
                    placeholder="Select client"
                    onChange={(e) => onClientNameChange(e, "client_id")}
                  >
                    {props.value.clientsData &&
                      props.value.clientsData.map((item) => {
                        return (
                          <Option key={item.name} value={item.id}>
                            {item.name}
                          </Option>
                        );
                      })}
                  </Select>
                </Form.Item>

                <Form.Item
                  name="title"
                  label="Name of Evaluation"
                  rules={[
                    {
                      required: true,
                      message: "Please enter evaluation name",
                    },
                  ]}
                >
                  <Input
                    type="text"
                    className="form__container__input"
                    placeholder="Type here..."
                    name="title"
                    onChange={(e) => onTextChange(e)}
                  />
                </Form.Item>
                <Form.Item
                  name="first_approver"
                  label="First Reviewer"
                  rules={[
                    {
                      required: true,
                      message: "Please select name of first reviewer",
                    },
                  ]}
                >
                  <Select
                    showSearch
                    placeholder="Select first reviewer"
                    optionFilterProp="children"
                    onChange={(e) => onClientNameChange(e, "first_approver")}
                    //  onFocus={onFocus}
                    //  onBlur={onBlur}
                    // onSearch={onSearch}
                    filterOption={(input, option) =>
                      option.children
                        .toLowerCase()
                        .indexOf(input.toLowerCase()) >= 0
                    }
                  >
                    {props.value.staffList &&
                      props.value.staffList.map((item, i) => {
                        console.log(item, "list");
                        return (
                          <Option key={i} value={item.email}>
                            {item.displayName}
                          </Option>
                        );
                      })}
                  </Select>
                </Form.Item>

                <Form.Item
                  name="second_approver"
                  label="Second Reviewer"
                  rules={[
                    {
                      required: true,
                      message: "Please select name of second reviewer",
                    },
                  ]}
                >
                  <Select
                    showSearch
                    placeholder="Select second reviewer"
                    optionFilterProp="children"
                    onChange={(e) => onClientNameChange(e, "second_approver")}
                    //  onFocus={onFocus}
                    //  onBlur={onBlur}
                    // onSearch={onSearch}
                    filterOption={(input, option) =>
                      option.children
                        .toLowerCase()
                        .indexOf(input.toLowerCase()) >= 0
                    }
                  >
                    {props.value.staffList &&
                      props.value.staffList.map((item) => {
                        return (
                          <Option key={item.id} value={item.email}>
                            {item.displayName}
                          </Option>
                        );
                      })}
                  </Select>
                </Form.Item>

                <Form.Item
                  name="factors"
                  label="Evaluation Factors"
                  rules={[
                    {
                      required: true,
                      message: "Please enter evaluation factors",
                    },
                  ]}
                >
                  <Select
                    mode="multiple"
                    allowClear
                    placeholder="Select evaluation factors"
                    onChange={(e) => onClientNameChange(e, "factor_ids")}
                  >
                    {props.value.factorList &&
                      props.value.factorList.map((item) => {
                        return (
                          <Option key={item.id} value={item.id}>
                            {item.label}
                          </Option>
                        );
                      })}
                  </Select>
                </Form.Item>

                {/* button */}
                <Form.Item className="btn_group">
                  <Button
                    id="cancel_btn"
                    onClick={() => props.value.dismissModal()}
                  >
                    Cancel
                  </Button>
                  <Button htmlType="submit" className="btn_primary">
                    Continue
                  </Button>
                </Form.Item>
              </Form>
            </div>
          </div>
        );

      case "New Client":
        return (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
            }}
          >
            <div className="modal__header">
              <h2>{props.value.modalTitle}</h2>
            </div>

            {/* content */}
            <div className="inner__modal__content">
              <Form
                form={form}
                name="basicForm"
                initialValues={{
                  clientName: "",
                }}
                onFinish={() => onCreateClient()}
              >
                <Form.Item
                  name="clientName"
                  label="Client Name"
                  rules={[
                    { required: true, message: `Please enter client name` },
                  ]}
                >
                  <Input
                    type="text"
                    className="form__container__input"
                    placeholder="Type here..."
                    name="clientName"
                    onChange={(e) => handleTextChange(e)}
                  />
                </Form.Item>

                {/* button */}
                <Form.Item className="btn_group">
                  <Button
                    id="cancel_btn"
                    onClick={() => props.value.dismissModal()}
                  >
                    Cancel
                  </Button>
                  <Button
                    htmlType="submit"
                    className="btn_primary"
                    loading={props.value.isCreating}
                    // onClick={() => onCreateClient()}
                  >
                    Create
                  </Button>
                </Form.Item>
              </Form>
            </div>
          </div>
        );

      default:
        return false;
    }
  };
  return (
    <Modal
      title={null}
      style={{ top: 20 }}
      visible={props.value.isNewEval}
      closable={props.closable ?? false}
      onCancel={() => props.value.dismissModal()}
      destroyOnClose
      footer={null}
      width={props.width || 450}
    >
      <div className="modalContent_wrapper">{renderContent()}</div>
    </Modal>
  );
};

export default withContext(ModalContentForm);
