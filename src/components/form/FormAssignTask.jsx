import React from "react";
import "react-toastify/dist/ReactToastify.css";
import { DatePicker, Select, Input, Button, Form } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { createTask, updateTaskAction } from "../redux/actions/TaskAction";
import { useState } from "react";
import { useEffect } from "react";
import moment from "moment";
import { getAllUser } from "../redux/actions/UserAction";
const validateMessages = {
  required: "${label} is required!",
};
function disabledDate(current) {
  // Can not select days before today and today
  return current && current < moment().endOf("day");
}
const FormAssignTask = (props) => {
  const user = useSelector((state) => state.UserReducer.user_current);
  const error = useSelector((state) => state.TaskReducer.error);
  const userCurrentMail = user ? user.email : "";

  // HANDLE ERROR
  const [errorTask, setErrorTask] = useState(error);
  useEffect(() => {
    setErrorTask(error);
    let time = setTimeout(() => setErrorTask(null), 3000);
    return () => {
      clearTimeout(time);
    };
  }, [error]);
  useEffect(() => {
    setErrorTask(null);
  }, []);
  const dispatch = useDispatch();
  const [form] = Form.useForm();

  //
  const [updateTask, setUpdateTask] = useState(props.updateTask);
  useEffect(() => {
    setUpdateTask(props.updateTask);
    if (updateTask) {
      form.setFieldsValue({
        title: updateTask.title,
        select: updateTask.assignto,
        date: moment(updateTask.deadlineAt),
        describe: updateTask.describe,
      });
    }
  }, [props.updateTask, updateTask]);
  const onReset = () => {
    if (updateTask) {
      form.setFieldsValue({
        title: updateTask.title,
        select: updateTask.assignto,
        date: moment(updateTask.deadlineAt),
        describe: updateTask.describe,
      });
    } else form.resetFields();
  };
  const onFinish = async (values) => {
    const inputData = {
      title: values.title,
      assignto: values.select,
      assignby: userCurrentMail,
      status: "pending",
      like: true,
      deadlineAt: values.date,
      describe: values.describe,
      project: "Hello World",
    };
    if (props.flag) {
      await dispatch(createTask(inputData));
      await dispatch(getAllUser());
    } else {
      if (inputData.deadlineAt.diff(moment(), "days") >= 1) {
        inputData.status = "pending";
      }
      dispatch(updateTaskAction(props.updateTask._id, inputData));
    }
  };
  return (
    <div>
      <div>
        <h3 style={{ color: "red", textAlign: "center", height: "30px" }}>
          {errorTask ? errorTask.message : ""}
        </h3>
      </div>
      <Form
        form={form}
        labelCol={props.labelCol}
        wrapperCol={props.wrapperCol}
        onFinish={onFinish}
        validateMessages={validateMessages}>
        <Form.Item name="select" label="Select" rules={[{ required: true }]}>
          <Select
            showSearch
            placeholder="Select a person"
            optionFilterProp="children"
            filterOption={(input, option) =>
              option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
            }
            rules={[{ required: true }]}
            defaultValue={updateTask ? updateTask.assignto : ""}
            disabled={updateTask ? true : false}>
            {props.userList
              ? props.userList.map((item, index) => (
                  <Select.Option key={index} value={`${item.email}`}>
                    {item.email}
                  </Select.Option>
                ))
              : ""}
          </Select>
        </Form.Item>
        <Form.Item name="date" label="Date" rules={[{ required: true }]}>
          <DatePicker
            className="time-data"
            defaultValue={updateTask ? moment(updateTask.deadlineAt) : ""}
            format={["DD-MM-YYYY"]}
            disabledDate={disabledDate}
          />
        </Form.Item>
        <Form.Item
          name="title"
          label="Title"
          rules={[
            { required: true },
            { min: 5, message: "Minimum 5 characters" },
            { max: 100, message: "Maximum 100 characters" },
          ]}>
          <Input defaultValue={updateTask ? updateTask.title : ""} />
        </Form.Item>
        <Form.Item
          name="describe"
          label="Describe"
          rules={[
            { required: true },
            { min: 5, message: "Minimum 5 characters" },
          ]}>
          <Input.TextArea
            rows={4}
            defaultValue={updateTask ? updateTask.describe : ""}
          />
        </Form.Item>
        <Form.Item wrapperCol={props.wrapperColBtn}>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
          <Button
            htmlType="button"
            onClick={onReset}
            style={{ marginLeft: "10px" }}>
            Reset
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default FormAssignTask;
