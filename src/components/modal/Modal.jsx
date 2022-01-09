import React from "react";
import { Modal } from "antd";
const ModalInfo = (props) => {
  return (
    <Modal
      title="Basic Modal"
      visible={props.isModal}
      onOk={props.handleOk}
      onCancel={props.handleCancel}
    >
      <p>My name is {props.record.name}</p>
      <p>Iam {props.record.usertype}</p>
    </Modal>
  );
};

export default ModalInfo;
