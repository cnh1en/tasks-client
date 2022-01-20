import React, { useState } from "react";
import StatusCard from "../components/status-card/StatusCard";
import Loading from "../components/loading/Loading";
import { useSelector } from "react-redux";
import { Modal, Table } from "antd";
import Weather from "../components/weather/Weather";

const Dashboard = () => {
  const users = useSelector((state) => state.UserReducer.users);
  const tasks = useSelector((state) => state.TaskReducer.tasks);
  const userNormal = users
    ? users
        .filter((user) => user.usertype === "normal")
        .sort((el1, el2) => el2.task_complete - el1.task_complete)
    : [];
  const tasks_completed = tasks
    ? tasks.filter((task) => task.status === "success")
    : "";
  const tasks_pending = tasks
    ? tasks.filter((task) => task.status === "pending")
    : "";
  const [isModal, setIsModal] = useState(false);
  const showModal = () => setIsModal(true);
  const handleOk = () => setIsModal(false);
  const handleCancel = () => setIsModal(false);
  const columns = [
    {
      title: "Name",
      key: "name",
      dataIndex: "name",
      render: (text) => (
        <span style={{ textTransform: "capitalize" }}>{text}</span>
      ),
    },
    {
      title: "Tasks",
      key: "tasks",
      dataIndex: "tasks",
    },
    {
      title: "Completed task",
      key: "task_complete",
      dataIndex: "task_complete",
    },
  ];

  return tasks && users && tasks_completed && tasks_pending ? (
    <div>
      <h1>DASHBOARD</h1>
      <div className="row">
        <div className="col-12">
          <div className="row card-row">
            <div className="col-6 card-full">
              <StatusCard
                icon={"bx bx-user"}
                title={"Employees"}
                count={users.length}
              />
              <StatusCard
                icon={"bx bx-gift"}
                title={"Tasks"}
                count={tasks.length}
              />
            </div>
            <div className="col-6 card-full">
              <StatusCard
                icon={"bx bx-task"}
                title={"Completed task"}
                count={tasks_completed.length}
              />
              <StatusCard
                icon={"bx bx-task-x"}
                title={"Pending task"}
                count={tasks_pending.length}
              />
            </div>
          </div>
        </div>

        <div className="col-5 information">
          <div className="card">
            <div className="card__header">
              <h3>top users</h3>
            </div>
            <div className="card__body">
              <Table
                columns={columns}
                dataSource={userNormal.slice(0, 5)}
                pagination={false}
              />
            </div>
            <div className="card__footer">
              <span
                style={{ color: "#1890FF", cursor: "pointer" }}
                onClick={showModal}>
                View All
              </span>
            </div>
          </div>
        </div>
        <div className="col-7 weather">
          <div className="card">
            <div className="card__header">
              <h3>8-day forecast</h3>
            </div>
            <div className="card__body">
              <Weather />
            </div>
          </div>
        </div>
      </div>

      <Modal
        title="Top users"
        visible={isModal}
        onCancel={handleCancel}
        onOk={handleOk}
        width={600}>
        <Table
          columns={columns}
          dataSource={userNormal}
          pagination={{
            pageSize: 8,
          }}
        />
      </Modal>
    </div>
  ) : (
    <Loading />
  );
};

export default Dashboard;
