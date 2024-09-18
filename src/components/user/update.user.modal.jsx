import { Input, Modal, notification } from "antd";
import { useEffect, useState } from "react";
import { createUserApi } from "../../services/api.service";

const UpdateUserModal = (props) => {
  const { isModalUpdateOpen, setIsModalUpdateOpen, dataUpdate, setDataUpdate } =
    props;
  const [id, setId] = useState("");
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  useEffect(() => {
    if (dataUpdate) {
      setId(dataUpdate._id);
      setFullName(dataUpdate.fullName);
      setPhone(dataUpdate.phone);
    }
  }, [dataUpdate]);
  const handleSubmitBtn = async () => {};

  const resetAndCloseModal = () => {
    setIsModalUpdateOpen(false);
    setId("");
    setFullName("");
    setPhone("");
    setDataUpdate(null);
  };
  return (
    <Modal
      title="Update a User"
      open={isModalUpdateOpen}
      onOk={() => handleSubmitBtn()}
      onCancel={() => resetAndCloseModal()}
      maskClosable={false}
      okText={"SAVE"}
    >
      <div
        style={{
          display: "flex",
          gap: "15px",
          flexDirection: "column",
        }}
      >
        <div>
          <span>Id</span>
          <Input value={id} disabled />
        </div>
        <div>
          <span>Full Name</span>
          <Input
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
          />
        </div>
        <div>
          <span>Phone number</span>
          <Input value={phone} onChange={(e) => setPhone(e.target.value)} />
        </div>
      </div>
    </Modal>
  );
};

export default UpdateUserModal;
