import React, { useState } from "react";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import "./tasklist.css";
import { deleteTask, submitTask } from "../redux/actions/TaskAction";
import FormAssignTask from "../form/FormAssignTask";

import { Button, Card, Tag, Space, Typography, List } from "antd";
import Modal from "antd/lib/modal/Modal";
import { ToastContainer } from "react-toastify";
import { getAllUser } from "../redux/actions/UserAction";

const searchTask = (task, info) => {
  const { assignto, title, createdAt, deadlineAt, status } = task;
  const infoLowerCase = info.toLowerCase();
  return (
    (assignto && assignto.toLowerCase().includes(infoLowerCase)) ||
    (title && title.toLowerCase().includes(infoLowerCase)) ||
    (createdAt && createdAt.toLowerCase().includes(infoLowerCase)) ||
    (deadlineAt && deadlineAt.toLowerCase().includes(infoLowerCase)) ||
    (status && status.toLowerCase().includes(infoLowerCase))
  );
};

const TaskList = () => {
  const stateUser = useSelector((state) => state.UserReducer);
  const stateTask = useSelector((state) => state.TaskReducer);
  const user_current = stateUser.user_current;
  const users = stateUser.users;
  const tasks = stateTask.tasks;
  const userList =
    users && user_current
      ? users.filter(
          (user) => user._id !== user_current._id && user.usertype === "normal"
        )
      : "";
  //SEARCH
  const [search, setSearch] = useState("");

  // MODAL
  const [task, setTask] = useState({});
  const [isVisible, setVisible] = useState(false);
  const showModal = () => setVisible(true);
  const handleOk = async () => {
    setConfirmLoading(true);
    await dispatch(deleteTask(task._id));
    await dispatch(getAllUser());
    setConfirmLoading(false);
    setVisible(false);
  };
  const handleCancel = () => setVisible(false);
  const [confirmLoading, setConfirmLoading] = useState(false);

  // FORM_UPDATE
  const [updateTask, setUpdateTask] = useState({});
  const [isVisibleFormUpdate, setIsVisbleFormUpdate] = useState(false);
  const showFormUpdate = () => setIsVisbleFormUpdate(true);
  const handleCancelFormUpdate = () => setIsVisbleFormUpdate(false);
  const dispatch = useDispatch();
  const handleChange = (e) => {
    setSearch(e.target.value);
  };
  // SUBMIT

  const handleSubmit = async (id) => {
    await dispatch(submitTask(id));
    await dispatch(getAllUser());
  };

  return (
    <div className="tasks">
      <div>
        <h1>TASKS</h1>

        <div className="topnav__search" style={{ marginBottom: "20px" }}>
          <input
            type="text"
            placeholder="Search task"
            style={{ color: "#000" }}
            onChange={handleChange}
          />
          <div></div>
        </div>
        <List
          itemLayout="vertical"
          pagination={{
            pageSize: 5,
          }}
          dataSource={tasks.filter((item) => {
            if (search === "") {
              return item;
            } else if (searchTask(item, search)) {
              return item;
            }
          })}
          renderItem={(task, index) => (
            <List.Item>
              <Card
                title={
                  <Typography.Title level={2} ellipsis>
                    {task.title}
                  </Typography.Title>
                }
                key={index}
                extra={
                  <Space>
                    {user_current && user_current.usertype === "admin" ? (
                      <>
                        <Button
                          type="primary"
                          danger
                          ghost
                          onClick={() => {
                            setTask(task);
                            showModal();
                          }}>
                          Remove
                        </Button>
                        {task.status === "success" ? (
                          ""
                        ) : (
                          <Button
                            type="primary"
                            ghost
                            onClick={() => {
                              setUpdateTask(task);
                              showFormUpdate();
                            }}>
                            Update
                          </Button>
                        )}
                      </>
                    ) : (
                      <Button
                        type="primary"
                        disabled={task.status !== "pending" ? true : false}
                        onClick={() => handleSubmit(task._id)}>
                        Submit
                      </Button>
                    )}
                  </Space>
                }
                style={{
                  width: "100%",
                  fontSize: "1rem",
                  backgroundColor: "var(--main-bg)",
                  boxShadow: "var(--box-shadow)",
                  borderRadius: "var(--border-radius)",
                }}>
                <p>
                  {user_current && user_current.usertype === "admin" ? (
                    <Typography.Text strong={true}>
                      Assign to:{" "}
                      <span style={{ color: "var(--main-color)" }}>
                        {" "}
                        {task.assignto}
                      </span>
                    </Typography.Text>
                  ) : (
                    <Typography.Text strong={true}>
                      Assign by:{" "}
                      <span style={{ color: "var(--main-color)" }}>
                        {" "}
                        {task.assignby}
                      </span>
                    </Typography.Text>
                  )}
                </p>
                <p>
                  <Typography.Text strong={true}>Due date: </Typography.Text>
                  {moment(task.deadlineAt).format("DD-MM-YYYY")}
                </p>
                <p>
                  <Typography.Text strong={true}>Start date: </Typography.Text>
                  {moment(task.createdAt).format("DD-MM-YYYY")}
                </p>
                <p>
                  <Typography.Text strong={true}>
                    Status:{" "}
                    {task.status === "pending" ? (
                      <Tag color="processing">PENDING</Tag>
                    ) : task.status === "success" ? (
                      <Tag color="success">SUCCESS</Tag>
                    ) : (
                      <Tag color="error">FAILURE</Tag>
                    )}
                  </Typography.Text>
                </p>
              </Card>
            </List.Item>
          )}></List>
      </div>

      <Modal
        title="Delete user"
        visible={isVisible}
        onOk={handleOk}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}>
        <p>
          Are you sure want to delete{" "}
          {<span style={{ color: "var(--main-color)" }}> {task.title}</span>}
        </p>
      </Modal>

      <Modal
        title="Update"
        visible={isVisibleFormUpdate}
        onCancel={handleCancelFormUpdate}
        width={800}
        footer={[
          <Button key="cancel" onClick={handleCancelFormUpdate}>
            Cancel
          </Button>,
        ]}>
        <FormAssignTask
          updateTask={updateTask}
          userList={userList}
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 18 }}
          wrapperColBtn={{ span: 18, offset: 4 }}
          flag={false}
        />
      </Modal>
      <ToastContainer autoClose={2000} hideProgressBar={true} />
    </div>
  );
};

export default TaskList;
