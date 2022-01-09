import React, { useState } from "react";
import "./register.css";
import { useDispatch } from "react-redux";
import { register } from "../../redux/actions/UserAction";
import { Redirect } from "react-router-dom";
import FormRegister from "../../form/FormRegister";
import { ToastContainer } from "react-toastify";

const Register = () => {
  return (
    <div className="register">
      <div className="card">
        <div className="card__header form__header">
          <h3>Create user</h3>
        </div>

        <div className="card__body">
          <FormRegister
            wrapperCol={{ span: 20 }}
            labelCol={{ span: 2 }}
            flag={"post"}
          />
        </div>
        <ToastContainer autoClose={2000} hideProgressBar={true} />
      </div>
    </div>
  );
};

export default Register;
