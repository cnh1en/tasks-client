import React from "react";
import { useSelector } from "react-redux";
import FormAssignTask from "../form/FormAssignTask";
import { ToastContainer } from "react-toastify";
import "./assigntask.css";

const AssignTask = () => {
  const state = useSelector((state) => state.UserReducer);
  const users = state.users;
  const user_current = state.user_current;

  const userList =
    users && user_current
      ? users.filter(
          (user) => user._id !== user_current._id && user.usertype === "normal"
        )
      : "";

  return (
    <div className="col-12 card">
      <div className="card__header">
        <h3>Assign Task</h3>
      </div>

      <div className="card__body">
        <FormAssignTask
          userList={userList}
          flag={true}
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 18 }}
          wrapperColBtn={{ span: 20, offset: 2 }}
        />
        <ToastContainer autoClose={2000} hideProgressBar={true} />
      </div>
    </div>
  );
};

export default AssignTask;
