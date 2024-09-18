import { Drawer } from "antd";
import { useEffect, useState } from "react";

const ViewUserDetail = (props) => {
  const { isModalUserInfoOpen, setIsModalUserInfoOpen, userInfo, setUserInfo } =
    props;

  const [id, setId] = useState("");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  useEffect(() => {
    if (userInfo) {
      setId(userInfo._id);
      setFullName(userInfo.fullName);
      setEmail(userInfo.email);
      setPhone(userInfo.phone);
    }
  }, [userInfo]);
  const onClose = () => {
    setIsModalUserInfoOpen(false);
    setUserInfo(null);
  };
  return (
    <Drawer title="Chi tiết User" onClose={onClose} open={isModalUserInfoOpen}>
      {userInfo ? (
        <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
          <p>
            <b>Id:</b> {id}
          </p>
          <p>
            <b>Full name:</b> {fullName}
          </p>
          <p>
            <b>Email:</b> {email}
          </p>
          <p>
            <b>Phone number:</b> {phone}
          </p>
        </div>
      ) : (
        <div>
          <p>Không có dữ liệu</p>
        </div>
      )}
    </Drawer>
  );
};

export default ViewUserDetail;
