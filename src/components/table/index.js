import React from "react";
import { Table, Button, Input, Popover, Tag } from "antd";
import "../componentStyle.scss";
import moment from "moment";
// import Avatar from "react-avatar";
// import Avatar from "@material-ui/core/Avatar";
// import AvatarGroup from "@material-ui/lab/AvatarGroup";

import { withContext } from "../../config/contextConfig";

const { Search } = Input;

const TableComponent = (props) => {
  
  const extractClientName = (client_id) => {
    return props.value.clientsData?.filter((item) => item.id === client_id)[0]
      .name;
  };

  const onSearch = (e) => console.log(e.target.value);
  const dimensionContent = (
    <div>
      <p>Update Dimension</p>
      <p>Delete Dimension</p>
    </div>
  );

  const renderTable = (path) => {
    let columns;

    switch (path) {
      case "/evaluation":
        return (columns = [
          {
            title: "Name of Evaluation",
            dataIndex: "name",
            render: (_, obj) => {
              return (
                <div className="img__attach">
                  <div className="img__icon">
                    <img
                      src={require("../../assets/images/file.svg").default}
                      alt="icon"
                    />
                  </div>
                  <p>{obj.title}</p>
                </div>
              );
            },
          },
          {
            title: "Client Name",
            dataIndex: "client_name",
            render: (_, obj) => {
              return <div>{extractClientName(obj.client_id)}</div>;
            },
          },
          {
            title: "Date Created",
            dataIndex: "date_created",
            render: (_, obj) => {
              let splitted = obj.createdAt;

              return <div>{moment(splitted[0]).format("DD-MMM-YYYY")}</div>;
            },
          },
          {
            title: "Status",
            dataIndex: "status",
            render: (_, obj) => {
              let colors;
              if (obj.status === "In Progress") {
                colors = "#483698";
              } else if (obj.status === "Awaiting Review") {
                colors = "#EAAA00";
              }
              return <Tag color={colors}>{obj.status}</Tag>;
            },
          },
          {
            title: "Action",
            dataIndex: "id",
            render: (_, obj) => {
              return (
                <Button
                  className="btn"
                  onClick={() => props.value.setEval_factors()}
                >
                  View
                </Button>
              );
            },
          },
        ]);

      case "/job_description":
        return (columns = [
          {
            title: "Job Title",
            dataIndex: "jobTitle",
            render: (_, obj) => {
              return (
                <div className="img__attach">
                  <div className="img__icon">
                    <img
                      src={require("../../assets/images/briefcase.svg").default}
                      alt="icon"
                    />
                  </div>
                  <p>{obj.jobTitle}</p>
                </div>
              );
            },
          },
          {
            title: "Client Name",
            dataIndex: "clientName",
          },
          {
            title: "Date Added",
            dataIndex: "dateAdded",
          },
          {
            title: "Action",
            dataIndex: "id",
            render: (_, obj) => {
              return <Button className="btn">View</Button>;
            },
          },
        ]);

      case "/users":
        return (columns = [
          {
            title: "Name",
            dataIndex: "name",
            render: (_, obj) => {
              return (
                <div className="img__attach">
                  <div className="img__icon">
                    <img
                      src={require("../../assets/images/users.svg").default}
                      alt="icon"
                    />
                  </div>
                  <p>{obj.name}</p>
                </div>
              );
            },
          },
          {
            title: "Unit",
            dataIndex: "unit",
          },
          {
            title: "Position",
            dataIndex: "position",
          },
          {
            title: "Role",
            dataIndex: "role",
          },
          {
            title: "Action",
            dataIndex: "id",
            render: (_, obj) => {
              return (
                <Button
                  className="btn"
                  onClick={() => props.value.openModal("Edit User Role")}
                >
                  Edit
                </Button>
              );
            },
          },
        ]);

      case "/settings":
        return (columns = [
          {
            title: "Name",
            dataIndex: "label",
            render: (_, obj) => {
              return (
                <div className="img__attach">
                  <div className="img__icon">
                    <img
                      src={require("../../assets/images/key.svg").default}
                      alt="icon"
                    />
                  </div>

                  <Popover
                    content={
                      <div>
                        <p
                          style={{ cursor: "pointer" }}
                          onClick={() =>
                            props.value.onRowClick("Update Factor", obj)
                          }
                        >
                          Update Factor
                        </p>
                        <p
                          style={{ cursor: "pointer" }}
                          onClick={() =>
                            props.value.onRowClick("Add Dimension", obj)
                          }
                        >
                          Add Dimension
                        </p>
                      </div>
                    }
                    title="Action"
                    trigger="hover"
                  >
                    <p style={{ cursor: "pointer" }}>{obj.label}</p>
                  </Popover>
                </div>
              );
            },
          },
          {
            title: "Dimension",
            dataIndex: "dimensions",
            render: (_, obj) => {
              return (
                <div
                  style={{
                    display: "flex",
                    width: "max-content",
                  }}
                >
                  {obj.dimensions &&
                    obj.dimensions.map((item, index) => {
                      return (
                        <Popover
                          content={
                            <div>
                              <p
                                style={{ cursor: "pointer" }}
                                onClick={() =>
                                  props.value.onRowClick(
                                    "Update Dimension",
                                    item
                                  )
                                }
                              >
                                Update Dimension
                              </p>
                              <p
                                style={{ cursor: "pointer" }}
                                onClick={() =>
                                  props.value.onRowClick(
                                    "Delete Dimension",
                                    item
                                  )
                                }
                              >
                                Delete Dimension
                              </p>
                            </div>
                          }
                          title="Action"
                          trigger="hover"
                        >
                          <p key={item.id} style={{ cursor: "pointer" }}>
                            {item.label} {index === 0 ? "/" : null}
                          </p>
                        </Popover>
                      );
                    })}
                </div>
              );
            },
          },
          {
            title: "Action",
            dataIndex: "id",
            render: (_, obj) => {
              return (
                <div>
                  <Button
                    className="btn"
                    style={{ marginRight: "10px" }}
                    onClick={() => props.value.editConfiguration(obj)}
                  >
                    Edit
                  </Button>
                  <Button
                    className="btn"
                    onClick={() => props.value.onRowClick("Delete Factor", obj)}
                  >
                    Delete
                  </Button>
                </div>
              );
            },
          },
        ]);
    }
  };

  const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      console.log(
        `selectedRowKeys: ${selectedRowKeys}`,
        "selectedRows: ",
        selectedRows
      );
    },
  };

  return (
    <div className="tableStyle">
      {/* {props.value.pathname === "/dashboard" && (
        <header className="table__header">All Users</header>
      )} */}
      <div className="tableInnerStyle">
        {/* evaluation */}
        {props.value.pathname === "/evaluation" && (
          <div className={["theader__inner "].join(" ")}>
            <div id="eval_type">
              {props.value.evaluation_type.map((item) => {
                return (
                  <p
                    key={item}
                    className={[
                      "type ",
                      props.value.activeEvalType === item
                        ? "eval_type_active"
                        : null,
                    ].join("")}
                    onClick={() => props.value.setActiveEvalType(item)}
                  >
                    {item}
                  </p>
                );
              })}
            </div>

            <div className="">
              <Search
                placeholder={props.placeholder}
                onChange={(e) => onSearch(e)}
                style={{ width: 250 }}
              />
            </div>
          </div>
        )}
        {/* job description */}
        {props.value.pathname === "/job_description" && (
          <div
            className={[
              "theader__inner ",
              props.value.pathname === "customers" ? "removeTopPad" : null,
            ].join(" ")}
          >
            <Search
              placeholder={props.placeholder}
              onChange={(e) => onSearch(e)}
              style={{ width: 250 }}
            />

            <div id="btn_group">
              <Button id="btn__job_template">
                Download Job Description Template
              </Button>
              <Button className="btn">Export Selected JDs</Button>
            </div>
          </div>
        )}

        {/* users */}
        {(props.value.pathname === "/users" ||
          props.value.pathname === "/settings") && (
          <div className={["theader__inner "].join(" ")}>
            <div>
              <p>
                {props.value.pathname === "/users"
                  ? "All users"
                  : "All Factors"}
              </p>
            </div>
            <div className="">
              <Search
                placeholder={props.placeholder}
                onChange={(e) => onSearch(e)}
                style={{ width: 250 }}
              />
            </div>
          </div>
        )}

        <Table
          rowSelection={
            props.value.pathname === "/job_description"
              ? {
                  type: "checkbox",
                  ...rowSelection,
                }
              : null
          }
          columns={renderTable(
            props.value.pathname,
            props.value.showCustomerView
          )}
          dataSource={props.tableData}
          rowKey="id"
          loading={props.tableLoading}
          onChange={props.value.handlePagination}
          pagination={{
            total: props.tableData.length,

            defaultPageSize:
              props.placeholder === "Search for team member" ? 5 : 10,
            pageSize: props.placeholder === "Search for team member" ? 5 : 10,
            defaultCurrent: props.value.current,
          }}
        />
      </div>
    </div>
  );
};

export default withContext(TableComponent);
