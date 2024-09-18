import { Input, Modal, notification } from "antd";
import { useState } from "react";
import { createUserApi } from "../../services/api.service";

const UpdateUserModal = () => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleSubmitBtn = async () => {
    let res = await createUserApi(fullName, email, password, phone);
    if (res.data) {
      notification.success({
        message: "create user",
        description: "Tạo mới user thành công",
        showProgress: true,
      });
      resetAndCloseModal();
      await loadUser();
    } else {
      notification.error({
        message: "Error create user",
        description: JSON.stringify(res.message),
        showProgress: true,
      });
    }
  };

  const resetAndCloseModal = () => {
    setIsModalOpen(false);
    setFullName("");
    setEmail("");
    setPassword("");
    setPhone("");
  };
  return (
    <Modal
      title="Update a User"
      open={isModalOpen}
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
          <span>Full Name</span>
          <Input
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
          />
        </div>
        <div>
          <span>Email</span>
          <Input value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div>
          <span>Password</span>
          <Input.Password
            value={password}
            onChange={(e) => setPassword(e.target.value)}
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
