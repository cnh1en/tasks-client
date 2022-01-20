import React, { useState } from "react";
import "./profile.css";
import { useSelector } from "react-redux";
import Loading from "../loading/Loading";
import { Avatar, Button } from "antd";
import moment from "moment";
import Modal from "antd/lib/modal/Modal";
import FormRegister from "../form/FormRegister";
import { ToastContainer } from "react-toastify";

const Profile = () => {
  const state = useSelector((state) => state.UserReducer);
  const user = state.user_current;

  const [isVisible, setVisible] = useState(false);
  const showModal = () => setVisible(true);
  const handleCancel = () => setVisible(false);

  return user ? (
    <div>
      <div>
        <h1>PROFILE</h1>
      </div>
      <div className="card">
        <div className="card__body">
          <div className="row row-avt">
            <div className="col-4 flex-center">
              <Avatar
                size={{
                  xs: 150,
                  sm: 200,
                  md: 200,
                  lg: 300,
                  xl: 300,
                  xxl: 400,
                }}
                style={{ backgroundColor: "var(--main-color)" }}>
                <span className="avt-name">{user.name.slice(0, 2)}</span>
              </Avatar>
              <Button size="large" onClick={showModal}>
                Change Information
              </Button>
            </div>
            <div className="col-8 profile">
              <div className="profile__name pull-center">{user.name}</div>
              <div className="profile__info">
                <div className="col-6 profile__wrap profile__col">
                  <div className="profile__item profile__gender">
                    <span>Gender: </span>
                    {user.gender}
                  </div>
                  <div className="profile__item profile__phone">
                    <span>Phone: </span>
                    {user.phone}
                  </div>
                  <div className="profile__item profile__phone">
                    <span>Address: </span>
                    {user.location}
                  </div>
                </div>
                <div className="col-6 profile__wrap profile__col">
                  <div className="profile__item profile__usertype">
                    <span>Position: </span>
                    {user.usertype}
                  </div>
                  <div className="profile__item profile__email">
                    <span>Email: </span>
                    {user.email}
                  </div>
                  <div className="profile__item profile__date">
                    <span>Date: </span>
                    {moment(user.date).format("DD-MM-YYYY")}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <Modal
            visible={isVisible}
            onCancel={handleCancel}
            width={800}
            title="Update"
            footer={[
              <Button key="cancel" onClick={handleCancel}>
                Cancel
              </Button>,
            ]}>
            <FormRegister
              wrapperCol={{ span: 18 }}
              labelCol={{ span: 4 }}
              dataRowTable={user}
              flag={"change-info"}
            />
          </Modal>
        </div>
      </div>
      <ToastContainer autoClose={2000} hideProgressBar={true} />
    </div>
  ) : (
    <Loading />
  );
};
export default Profile;
