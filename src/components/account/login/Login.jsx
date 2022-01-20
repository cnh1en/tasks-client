import React, { useState, useEffect } from "react";
import loginUser from "../../../api/loginUser";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getUser } from "../../redux/actions/UserAction";
import { Button, Input, Modal, Typography, Form, Row } from "antd";
import "./login.css";
import { ToastContainer } from "react-toastify";
import forgotPassword from "../../../api/forgotPassword";

const Login = () => {
  const [visible, setVisible] = useState(false);
  const handleCancel = () => setVisible(false);
  const showModal = () => setVisible(true);

  const onFinish = async (values) => {
    const email = values.email;
    forgotPassword({ email });
    setVisible(false);
  };
  const history = useHistory();
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  localStorage.removeItem("api_key");
  const handleFinish = async (values) => {
    const inputData = {
      email: values.email,
      password: values.password,
    };
    const resp = await loginUser(inputData);
    if (resp.success) {
      history.push("/dashboard");
      dispatch(getUser(resp.user));
    } else {
      setError(resp.message);
      console.log(resp.message);
    }
  };
  useEffect(() => {
    let time = setTimeout(() => setError(null), 2000);
    return () => {
      clearTimeout(time);
    };
  }, [error]);

  return (
    <div>
      <div className="login">
        <div className="login__image">
          <i className="bx bx-lock-alt"></i>
        </div>
        <h3 className="login__header">Hey, welcomeback !</h3>
        <div className="login__error">
          {error ? error.charAt(0).toLocaleUpperCase() + error.slice(1) : ""}
        </div>

        <Form onFinish={handleFinish}>
          <Form.Item
            placeholder="Email"
            name="email"
            rules={[
              {
                required: true,
                message: "Please input your email!",
              },
              {
                type: "email",
                message: "Invalid email",
              },
            ]}>
            <Input size="large" placeholder="Email" />
          </Form.Item>
          <Form.Item
            placeholder="Password"
            name="password"
            rules={[
              {
                required: true,
                message: "Please input your password!",
              },
            ]}>
            <Input.Password size="large" placeholder="Password" />
          </Form.Item>
          <Form.Item>
            <Button
              htmlType="submit"
              type="primary"
              style={{ width: "100%" }}
              size="large">
              Submit
            </Button>
          </Form.Item>
        </Form>
        <Button type="link" onClick={showModal} style={{ display: "flex" }}>
          Forgot password ?
        </Button>

        <Modal visible={visible} onCancel={handleCancel} footer={[]}>
          <div>
            <Typography.Title level={1} style={{ textAlign: "center" }}>
              Forgot Password
            </Typography.Title>
            <Typography.Title
              level={5}
              style={{
                textAlign: "center",
                fontWeight: "400",
                marginBottom: "20px",
              }}>
              Enter your email address
            </Typography.Title>

            <Form onFinish={onFinish}>
              <Form.Item style={{ marginBottom: "10px" }} name="email">
                <Input placeholder="Enter your email address" size="large" />
              </Form.Item>
              <Form.Item>
                <Row type="flex" align="center">
                  <Button
                    type="primary"
                    htmlType="submit"
                    size="large"
                    style={{ width: "100%" }}>
                    Submit
                  </Button>
                </Row>
              </Form.Item>
            </Form>
          </div>
        </Modal>
      </div>
      <ToastContainer autoClose={2000} hideProgressBar={true} />
    </div>
  );
};

export default Login;
