import { Button, Input, notification } from "antd";
import { useState } from "react";
import { createUserApi } from "../../services/api.service";
const UserForm = () => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const handleClickBtn = async () => {
    let res = await createUserApi(fullName, email, password, phone);
    if (res.data) {
      notification.success({
        message: "create user",
        description: "Tạo mới user thành công",
        showProgress: true,
      });
    } else {
      notification.error({
        message: "Error create user",
        description: JSON.stringify(res.message),
        showProgress: true,
      });
    }
    console.log("check res: ", res.data);
  };
  return (
    <div className="user-form" style={{ margin: "20px 0" }}>
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
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <h3>Table User</h3>
          <Button type="primary" onClick={() => handleClickBtn()}>
            Create User
          </Button>
        </div>
      </div>
    </div>
  );
};

export default UserForm;
