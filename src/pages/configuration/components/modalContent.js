import React, { useState, useEffect } from "react";
import { Select, Button, Input, Form, Modal } from "antd";
import { withContext } from "../../../config/contextConfig";
import { useHistory } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import {
  handleAddFactor,
  handleUpdateFactor,
  handleCreateDimension,
  handleUpdateDimension,
} from "../reduxFunctions/actions";

const { Option } = Select;

const ModalContentForm = (props) => {
  const [form] = Form.useForm();
  const { history } = useHistory();
  const [factorName, setFactorName] = useState("");
  const [orientation, setOrientation] = useState(0);

  const {
    factorObj,
    addingFactor,
    creatingDimension,
    deletingDimension,
  } = useSelector((state) => state.configReducer);

  const dispatch = useDispatch();

  useEffect(() => {
    if (factorObj !== null) {
      setOrientation(factorObj.orientation);
      setFactorName(factorObj.label);
    }
  }, [factorObj]);

  const onCreateClient = () => {
    const payload = {
      label: factorName,
    };
    // call redux action here
    dispatch(handleAddFactor(payload, history));
  };

  const onUpdateClient = () => {
    const payload = {
      label: factorName,
      factor_id: props.value.factor_id,
    };
    // update factor
    dispatch(handleUpdateFactor(payload, history));
  };
  const onCreateDimension = () => {
    const payload = {
      label: factorName,
      orientation: orientation,
      factor_id: props.value.factor_id,
    };

    // call redux action here
    dispatch(handleCreateDimension(payload, history));
  };

  const onUpdateDimension = () => {
    const payload = {
      label: factorName,
      orientation: orientation,
      factor_id: factorObj.factor_id,
      dimension_id: factorObj.id,
    };
    // console.log(payload);
    dispatch(handleUpdateDimension(payload, history));
  };

  const handleTextChange = (e) => {
    const { value } = e.target;
    setFactorName(value);
  };
  const onCheckboxChange = (e) => {
    setOrientation(e);
  };

  const renderContent = () => {
    switch (props.value.modalTitle) {
      case "Add Factor":
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
                  label: "",
                }}
                onFinish={() => onCreateClient()}
              >
                <Form.Item
                  name="label"
                  label="Factor Name"
                  rules={[
                    { required: true, message: `Please enter factor name` },
                  ]}
                >
                  <Input
                    type="text"
                    className="form__container__input"
                    placeholder="Type here..."
                    name="label"
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
                    loading={addingFactor}
                  >
                    Add
                  </Button>
                </Form.Item>
              </Form>
            </div>
          </div>
        );

      case "Update Factor":
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
                  label: factorObj.label,
                }}
                onFinish={() => onUpdateClient()}
              >
                <Form.Item
                  name="label"
                  label="Factor Name"
                  rules={[
                    { required: true, message: `Please enter factor name` },
                  ]}
                >
                  <Input
                    type="text"
                    className="form__container__input"
                    placeholder="Type here..."
                    name="label"
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
                    loading={addingFactor}
                  >
                    Save
                  </Button>
                </Form.Item>
              </Form>
            </div>
          </div>
        );

      case "Add Dimension":
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
                  label: "",
                  orientation: null,
                }}
                onFinish={() => onCreateDimension()}
              >
                <Form.Item
                  name="label"
                  label="Dimension Name"
                  rules={[
                    { required: true, message: `Please enter factor name` },
                  ]}
                >
                  <Input
                    type="text"
                    className="form__container__input"
                    placeholder="Type here..."
                    name="label"
                    onChange={(e) => handleTextChange(e)}
                  />
                </Form.Item>
                <Form.Item
                  name="orientation"
                  label="Orientation"
                  rules={[
                    { required: true, message: `select orientation type` },
                  ]}
                >
                  <Select
                    placeholder="Select client"
                    onChange={(e) => onCheckboxChange(e)}
                  >
                    <Option value={0}>Horizontial</Option>
                    <Option value={1}>Vertical</Option>
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
                  <Button
                    htmlType="submit"
                    className="btn_primary"
                    loading={creatingDimension}
                  >
                    Add
                  </Button>
                </Form.Item>
              </Form>
            </div>
          </div>
        );

      case "Update Dimension":
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
                  label: factorObj.label,
                  orientation: factorObj.orientation,
                }}
                onFinish={() => onUpdateDimension()}
              >
                <Form.Item
                  name="label"
                  label="Dimension Name"
                  rules={[
                    { required: true, message: `Please enter factor name` },
                  ]}
                >
                  <Input
                    type="text"
                    className="form__container__input"
                    placeholder="Type here..."
                    name="label"
                    onChange={(e) => handleTextChange(e)}
                  />
                </Form.Item>
                <Form.Item
                  name="orientation"
                  label="Orientation"
                  rules={[
                    { required: true, message: `select orientation type` },
                  ]}
                >
                  <Select
                    placeholder="Select client"
                    onChange={(e) => onCheckboxChange(e)}
                  >
                    <Option value={0}>Horizontial</Option>
                    <Option value={1}>Vertical</Option>
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
                  <Button
                    htmlType="submit"
                    className="btn_primary"
                    loading={creatingDimension}
                  >
                    Add
                  </Button>
                </Form.Item>
              </Form>
            </div>
          </div>
        );

      case "Delete Dimension":
      case "Delete Factor":
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
              <p>
                Are you Sure you want to delete this{" "}
                {props.value.modalTitle.includes("Dimension")
                  ? "dimension"
                  : "factor"}
              </p>

              <div className="btn_group">
                <Button
                  id="cancel_btn"
                  onClick={() => props.value.dismissModal()}
                >
                  Cancel
                </Button>
                <Button
                  className="btn_primary"
                  onClick={() => props.value.deleteAction()}
                  loading={deletingDimension}
                >
                  Yes, Continue
                </Button>
              </div>
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
      visible={props.value.isVisible}
      closable={false}
      onCancel={() => props.value.dismissModal()}
      destroyOnClose
      footer={null}
      width={450}
    >
      <div className="modalContent_wrapper">{renderContent()}</div>
    </Modal>
  );
};

export default React.memo(withContext(ModalContentForm));
