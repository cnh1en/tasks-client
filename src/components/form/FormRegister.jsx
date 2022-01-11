import React from "react";
import { Button, DatePicker, Form, Input, Select } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { changeInfo, register, updateUser } from "../redux/actions/UserAction";
import { useState } from "react";
import { useEffect } from "react";
import moment from "moment";

const validateMessages = {
  required: "${label} is required!",
  types: {
    email: "${label} is not a valid email!",
  },
};

const FormRegister = (props) => {
  const dispatch = useDispatch();
  const stateError = useSelector((state) => state.UserReducer.error);

  const [form] = Form.useForm();
  const onReset = () => {
    if (dataRow) {
      form.setFieldsValue({
        name: dataRow.name,
        location: dataRow.location,
        email: dataRow.email,
        phone: dataRow.phone,
        gender: dataRow.gender,
        date: moment(dataRow.date),
      });
    } else form.resetFields();
    setError(null);
  };

  const [dataRow, setDataRow] = useState(props.dataRowTable);
  const [error, setError] = useState(stateError);

  useEffect(() => {
    setDataRow(props.dataRowTable);
    if (dataRow) {
      form.setFieldsValue({
        name: dataRow.name,
        location: dataRow.location,
        email: dataRow.email,
        phone: dataRow.phone,
        gender: dataRow.gender,
        date: moment(dataRow.date),
      });
    }
  }, [props.dataRowTable, dataRow]);
  useEffect(() => {
    setError(stateError);
    let time = setTimeout(() => setError(null), 5000);
    return () => {
      clearTimeout(time);
    };
  }, [stateError]);
  useEffect(() => {
    setError(null);
  }, []);

  const onFinish = (values) => {
    const inputData = {
      name: values.name,
      gender: values.gender,
      date: values.date,
      email: values.email,
      phone: values.phone,
      location: values.location,
      usertype: "normal",
      password: "default@123",
    };
    if (props.flag === "post") {
      dispatch(register(inputData));
    } else if (props.flag === "patch") {
      dispatch(updateUser(props.dataRowTable._id, inputData));
    } else {
      dispatch(
        changeInfo(props.dataRowTable._id, {
          ...inputData,
          usertype: props.dataRowTable.usertype,
        })
      );
    }
    setError(stateError);
  };

  return (
    <div>
      <h3 style={{ color: "red", textAlign: "center", height: "30px" }}>
        {error ? error.message : ""}
      </h3>
      <Form
        form={form}
        {...props}
        validateMessages={validateMessages}
        onFinish={onFinish}>
        <Form.Item
          name="name"
          label="Name"
          rules={[{ required: true }, { max: 100 }]}>
          <Input defaultValue={dataRow ? dataRow.name : ""} />
        </Form.Item>

        <Form.Item
          name="gender"
          label="Gender"
          wrapperCol={{ span: 4 }}
          rules={[{ required: true }]}>
          <Select defaultValue={dataRow ? dataRow.gender : ""}>
            <Select.Option value="male">Male</Select.Option>
            <Select.Option value="female">Female</Select.Option>
            <Select.Option value="none">None</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item name="date" label="Date" rules={[{ required: true }]}>
          <DatePicker
            defaultValue={dataRow ? moment(dataRow.date) : ""}
            format={["DD-MM-YYYY"]}
          />
        </Form.Item>
        <Form.Item
          name="email"
          label="Email"
          rules={[{ type: "email", required: true }]}>
          <Input
            defaultValue={dataRow ? dataRow.email : ""}
            disabled={props.flag !== "post" ? true : false}
          />
        </Form.Item>
        <Form.Item
          name="phone"
          label="Phone"
          rules={[
            { required: true },
            { max: 12, message: "Maximum 12 characters" },
          ]}>
          <Input defaultValue={dataRow ? dataRow.phone : ""} />
        </Form.Item>
        <Form.Item
          name="location"
          label="Location"
          rules={[
            { required: true },
            { max: 100, message: "Maximun 100 characters" },
          ]}>
          <Input defaultValue={dataRow ? dataRow.location : ""} />
        </Form.Item>
        <Form.Item wrapperCol={{ span: 22, offset: 2 }}>
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

export default FormRegister;
