import React from "react";
import { Select, Button, Input, Form, Modal } from "antd";
import { withContext } from "../../../config/contextConfig";

const { Option } = Select;

const ModalContentForm = (props) => {
  const [form] = Form.useForm();

  const onFormFinish = () => {
    form.validateFields(async (err, values) => {
      this.setState({ loading: true });
      try {
        if (err) return;

        // const payload = {
        //   address_line: values.address,
        //   note: values.note,
        //   sale_id: saleId,
        // };

        // const res = await api.sales.sendReceiptToEmail(payload);

        this.setState({ loading: false });

        // if (res.status === 200) {
        //   Modal.success({
        //     title: res.data.message,
        //     onOk: () => {
        //       closeModal();
        //       clearSaleId();
        //     },
        //   });
        // }
      } catch (error) {
        // console.log(error);
        this.setState({ loading: true });
      }
    });
  };

  const renderContent = () => {
    switch (props.value.modalTitle) {
      case "New User":
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
                  name: "",
                  unit: "",
                  position: "",
                  role: "",
                }}
              >
                <Form.Item
                  name="name"
                  label="Name"
                  rules={[{ required: true, message: `Please enter Name` }]}
                >
                  <Input
                    type="text"
                    className="form__container__input"
                    placeholder="Type here..."
                    name="Name"
                    // onChange={(e) => props.value.handleTextChange(e)}
                  />
                </Form.Item>

                <Form.Item
                  name="unit"
                  label="Unit"
                  rules={[
                    {
                      required: true,
                      message: "Please enter customer email",
                    },
                  ]}
                >
                  <Input
                    type="text"
                    className="form__container__input"
                    placeholder="Type here..."
                    name="unit"
                    // onChange={(e) => props.value.handleTextChange(e)}
                  />
                </Form.Item>
                <Form.Item
                  name="position"
                  label="Position"
                  rules={[
                    {
                      required: true,
                      message: "Please enter customer email",
                    },
                  ]}
                >
                  <Input
                    type="text"
                    className="form__container__input"
                    placeholder="Type here..."
                    name="position"
                    // onChange={(e) => props.value.handleTextChange(e)}
                  />
                </Form.Item>

                <Form.Item
                  name="role"
                  label="Role"
                  rules={[
                    {
                      required: true,
                      message: "Please enter customer email",
                    },
                  ]}
                >
                  <Select>
                    <Option>Administrator</Option>
                  </Select>
                </Form.Item>
              </Form>

              {/* button */}
              <Form.Item className="btn_group">
                <Button id="cancel_btn" onClick={()=> props.value.dismissModal()}>Cancel</Button>
                <Button
                  htmlType="submit"
                  className="btn_primary"
                  onClick={() => onFormFinish()}
                >
                  Add User
                </Button>
              </Form.Item>
            </div>
          </div>
        );

      case "Edit User Role":
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
                  name: "",
                  unit: "",
                  position: "",
                  role: "",
                }}
              >
                <Form.Item
                  name="name"
                  label="Name"
                  rules={[{ required: true, message: `Please enter Name` }]}
                >
                  <Input
                    type="text"
                    className="form__container__input"
                    placeholder="Type here..."
                    name="Name"
                    // onChange={(e) => props.value.handleTextChange(e)}
                  />
                </Form.Item>

                <Form.Item
                  name="unit"
                  label="Unit"
                  rules={[
                    {
                      required: true,
                      message: "Please enter customer email",
                    },
                  ]}
                >
                  <Input
                    type="text"
                    className="form__container__input"
                    placeholder="Type here..."
                    name="unit"
                    // onChange={(e) => props.value.handleTextChange(e)}
                  />
                </Form.Item>
                <Form.Item
                  name="position"
                  label="Position"
                  rules={[
                    {
                      required: true,
                      message: "Please enter customer email",
                    },
                  ]}
                >
                  <Input
                    type="text"
                    className="form__container__input"
                    placeholder="Type here..."
                    name="position"
                    // onChange={(e) => props.value.handleTextChange(e)}
                  />
                </Form.Item>

                <Form.Item
                  name="role"
                  label="Role"
                  rules={[
                    {
                      required: true,
                      message: "Please enter customer email",
                    },
                  ]}
                >
                  <Select>
                    <Option>Administrator</Option>
                  </Select>
                </Form.Item>
              </Form>

              {/* button */}
              <Form.Item className="btn_group">
                <Button id="cancel_btn"  onClick={()=> props.value.dismissModal()}>Cancel</Button>
                <Button
                  htmlType="submit"
                  className="btn_primary"
                  onClick={() => onFormFinish()}
                >
                  Save changes
                </Button>
              </Form.Item>
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
      visible={props.value.isUsersModal}
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
