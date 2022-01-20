import React, { useState } from "react";
import moment from "moment";
import "./css/Customer.css";
import { useDispatch, useSelector } from "react-redux";
import Loading from "../components/loading/Loading";
import { deleteUser } from "../components/redux/actions/UserAction";
import { deleteAllTask } from "../components/redux/actions/TaskAction";
import FormRegister from "../components/form/FormRegister";
import { Space, Table, Tag, Modal, Button } from "antd";

import { ToastContainer } from "react-toastify";
const searchUser = (user, info) => {
  const { name, email, phone, date, location, usertype } = user;
  return (
    name.toLowerCase().includes(info.toLowerCase()) ||
    email.toLowerCase().includes(info.toLowerCase()) ||
    (phone && phone.toLowerCase().includes(info.toLowerCase())) ||
    (date && date.toLowerCase().includes(info.toLowerCase())) ||
    (location && location.toLowerCase().includes(info.toLowerCase())) ||
    usertype.toLowerCase().includes(info.toLowerCase())
  );
};

const Customers = () => {
  const [email, setEmail] = useState("");
  const userState = useSelector((state) => state.UserReducer.user_current);
  const userType = userState ? userState.usertype : "";
  const users = useSelector((state) => state.UserReducer.users);
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setEmail(e.target.value);
  };

  const [isDataRow, setIsDataRow] = useState();
  const [isVisible, setVisible] = useState(false);
  const showModal = () => setVisible(true);
  const handleCancel = () => setVisible(false);

  const [isId, setId] = useState("");
  const [isVisible2, setVisible2] = useState(false);
  const showModal2 = () => setVisible2(true);
  const handleOk2 = async () => {
    setVisible2(false);
    setConfirmLoading(true);
    await dispatch(deleteUser(isId._id));
    await dispatch(deleteAllTask(isId.email));
    setVisible2(false);
    setConfirmLoading(false);
  };
  const handleCancel2 = () => setVisible2(false);
  const [confirmLoading, setConfirmLoading] = useState(false);

  const columns = [
    {
      title: "Id",
      dataIndex: "_id",
      key: "id",
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",

      render: (text) => (
        <span style={{ color: "#1890ff", textTransform: "capitalize" }}>
          {text}
        </span>
      ),
    },
    {
      title: "Age",
      dataIndex: "date",
      key: "date",

      render: (date) => <p>{moment().diff(date, "years")}</p>,
    },
    {
      title: "Gender",
      dataIndex: "gender",
      key: "gender",
      responsive: ["sm"],
      render: (text) => (
        <span style={{ textTransform: "capitalize" }}>{text}</span>
      ),
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      responsive: ["lg"],
    },
    {
      title: "Phone",
      dataIndex: "phone",
      key: "phone",
      responsive: ["lg"],
    },

    {
      title: "Address",
      dataIndex: "location",
      key: "location",
    },
    {
      title: "User type",
      key: "usertype",
      dataIndex: "usertype",

      render: (usertype) => (
        <span>
          {
            <Tag
              color={usertype === "normal" ? "geekblue" : "green"}
              key={usertype}>
              {usertype.toUpperCase()}
            </Tag>
          }
        </span>
      ),
    },

    {
      title: "Action",
      key: "action",

      render: (text, record, index) => (
        <>
          <Space size="small" wrap>
            {record.usertype === "normal" ? (
              <>
                <Button
                  onClick={() => {
                    showModal2();
                    setId(record);
                  }}>
                  Delete
                </Button>
                <Button
                  type="primary"
                  onClick={() => {
                    showModal();
                    setIsDataRow(record);
                  }}>
                  Update
                </Button>
              </>
            ) : (
              ""
            )}
          </Space>
        </>
      ),
    },
  ].filter((col) => {
    if (userType === "normal") {
      return (
        col.dataIndex !== "_id" &&
        col.dataIndex !== "date" &&
        col.dataIndex !== "location" &&
        col.title !== "Action"
      );
    }
    return (
      col.dataIndex !== "_id" &&
      col.dataIndex !== "date" &&
      col.dataIndex !== "location"
    );
  });
  return users ? (
    <div>
      <h1>CUSTOMER</h1>

      <div className="topnav__search" style={{ marginBottom: "20px" }}>
        <input
          type="text"
          placeholder="Search user"
          style={{ color: "#000" }}
          onChange={handleChange}
        />
        <i className="bx bx-search"></i>
      </div>
      <div className="row">
        <div className="col-12">
          <div className="card">
            <div className="card__body">
              <Table
                columns={columns}
                dataSource={users.filter((user) => {
                  if (email === "") {
                    return user;
                  } else if (searchUser(user, email)) {
                    return user;
                  }
                })}></Table>
              <Modal
                title="Update"
                visible={isVisible}
                onCancel={handleCancel}
                width={800}
                footer={[
                  <Button key="cancel" onClick={handleCancel}>
                    Cancel
                  </Button>,
                ]}>
                <FormRegister
                  wrapperCol={{ span: 18 }}
                  labelCol={{ span: 4 }}
                  dataRowTable={isDataRow}
                  flag={"patch"}
                />
              </Modal>

              <Modal
                title="Delete user"
                visible={isVisible2}
                onOk={handleOk2}
                confirmLoading={confirmLoading}
                onCancel={handleCancel2}>
                <p>
                  Are you sure want to delete{" "}
                  {<span style={{ color: "#1890FF" }}> {isId.name}</span>}
                </p>
              </Modal>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer autoClose={2000} hideProgressBar={true} />
    </div>
  ) : (
    <Loading />
  );
};

export default Customers;
