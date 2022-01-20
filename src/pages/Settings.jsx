import { Col, Row, Typography } from "antd";
import React, { useState } from "react";
import { Form, Input, Button } from "antd";
import { useHistory } from "react-router-dom";
import "../components/settings/settings.css";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import { URL } from "../constaint";

const Settings = () => {
  const [error, setError] = useState();
  const history = useHistory();

  const onFinish = async (values) => {
    const data = {
      oldPassword: values.password,
      newPassword: values.confirm,
    };
    const apiKey = localStorage.getItem("api_key");
    try {
      const changePass = await axios.post(
        `${URL}/api/v1/user/change-pass`,
        data,
        {
          headers: {
            "X-API-Key": apiKey,
          },
        }
      );
      console.log(changePass);
      toast.success("Successfully!!");
      localStorage.removeItem("api_key");
      history.push("/login");
    } catch (error) {
      toast.error("Error !");
      setError(error.response.data.message);
    }
  };

  return (
    <div>
      <h1>SETTINGS</h1>
      <div className="card settings">
        <div className="settings__header">
          <h2>Change your password</h2>
          <p>Enter a password</p>
        </div>

        <div className="settings__body">
          <div className="settings__image">
            <i className="bx bx-check-shield" style={{ fontSize: "7rem" }}></i>
          </div>

          <div className="settings__form">
            <Typography.Title level={3} style={{ color: "red" }}>
              {error ? error : ""}
            </Typography.Title>
            <Row type="flex" align="center">
              <Col span={16}>
                <Form size="large" onFinish={onFinish}>
                  <Form.Item
                    rules={[
                      {
                        required: true,
                        message: "Old password is required !",
                      },
                    ]}
                    name="password">
                    <Input.Password placeholder="Old password" />
                  </Form.Item>
                  <Form.Item
                    name="new_password"
                    rules={[
                      {
                        min: 8,
                        max: 32,
                        message:
                          "New password must be between 8 and 32 characters",
                      },
                      {
                        required: true,
                        message: "New password is required !",
                      },
                    ]}
                    hasFeedback>
                    <Input.Password placeholder="New password" />
                  </Form.Item>
                  <Form.Item
                    name="confirm"
                    dependencies={["new_password"]}
                    hasFeedback
                    rules={[
                      {
                        required: true,
                        message: "Please confirm new  password!",
                      },
                      ({ getFieldValue }) => ({
                        validator(_, value) {
                          if (
                            !value ||
                            getFieldValue("new_password") === value
                          ) {
                            return Promise.resolve();
                          }

                          return Promise.reject(
                            new Error(
                              "The two passwords that you entered do not match!"
                            )
                          );
                        },
                      }),
                    ]}>
                    <Input.Password placeholder="Comfirm password" />
                  </Form.Item>

                  <Form.Item>
                    <Button type="primary" htmlType="submit">
                      Submit
                    </Button>
                  </Form.Item>
                </Form>
              </Col>
            </Row>
          </div>
        </div>
      </div>
      <ToastContainer autoClose={2000} hideProgressBar={true} />
    </div>
  );
};

export default Settings;
