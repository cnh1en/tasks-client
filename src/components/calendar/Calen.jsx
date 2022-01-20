import { Alert, Calendar, List, Modal, Tag, Typography } from "antd";
import moment from "moment";
import React, { useState } from "react";
import { useSelector } from "react-redux";
const Calen = () => {
  const tasks = useSelector((state) => state.TaskReducer.tasks);
  const [date, setDate] = useState({
    value: moment(),
    selectedValue: moment(),
  });
  const handleSelect = (value) => {
    setDate({ ...date, selectedValue: value });
    console.log(value);
    setVisible(true);
  };
  const getListData = (value) => {
    return tasks.filter(
      (task) =>
        moment(task.deadlineAt).format("DD-MM-YYYY") ===
        moment(value).format("DD-MM-YYYY")
    );
  };
  const dateCellRender = (value) => {
    const listData = getListData(moment(value));
    return (
      <span style={{ color: "var(--main-color)", float: "right" }}>
        {listData.length ? (
          <i className="bx bx-calendar-x" style={{ fontSize: "1rem" }}></i>
        ) : (
          ""
        )}
      </span>
    );
  };
  const [visible, setVisible] = useState(false);
  const handleCancel = () => setVisible(false);
  const handleOk = () => setVisible(false);
  return (
    <div>
      <h1>CALENDAR</h1>
      <div className="card">
        <Alert message={`Today: ${date.value.format("DD-MM-YYYY")}`} />
        <Calendar onSelect={handleSelect} dateCellRender={dateCellRender} />
        <Modal
          onCancel={handleCancel}
          onOk={handleOk}
          visible={visible}
          width={600}
          footer={null}>
          <List
            header={
              <Typography.Title level={4}>
                Date: {moment(date.selectedValue).format("DD-MM-YYYY")}
              </Typography.Title>
            }
            pagination={{
              pageSize: 4,
            }}
            dataSource={tasks.filter(
              (task) =>
                moment(task.deadlineAt).format("DD-MM-YYYY") ===
                moment(date.selectedValue).format("DD-MM-YYYY")
            )}
            renderItem={(item) => (
              <List.Item>
                <Typography.Text>
                  {item.status === "pending" ? (
                    <Tag color="processing">PENDING</Tag>
                  ) : item.status === "success" ? (
                    <Tag color="success">SUCCESS</Tag>
                  ) : (
                    <Tag color="error">FAILURE</Tag>
                  )}
                  {item.title}
                </Typography.Text>
              </List.Item>
            )}
          />
        </Modal>
      </div>
    </div>
  );
};

export default Calen;
