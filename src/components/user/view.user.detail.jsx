import { Button, Drawer, notification } from "antd";
import { useEffect, useState } from "react";
import {
  handleUploadFile,
  updateUserWithAvatarApi,
} from "../../services/api.service";

const ViewUserDetail = (props) => {
  const {
    isModalUserInfoOpen,
    setIsModalUserInfoOpen,
    userInfo,
    setUserInfo,
    loadUser,
  } = props;

  const [id, setId] = useState("");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [selectedFile, setSelectedFile] = useState();
  const [preview, setPreview] = useState();
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
    setSelectedFile(null);
    setPreview(null);
  };

  const handleOnChangeFile = (event) => {
    if (!event.target.files || event.target.files.length === 0) {
      setSelectedFile(null);
      setPreview(null);
      return;
    } else {
      const file = event.target.files[0];
      if (file) {
        setSelectedFile(file);
        setPreview(URL.createObjectURL(file));
      }
    }
  };
  const handleUpdateUserAvatar = async () => {
    //Step 1: upload file
    const resUpload = await handleUploadFile(selectedFile, "avatar");
    if (resUpload.data) {
      const avatar = resUpload.data.fileUploaded;
      //Step 2: update user
      const resUpdateAvatar = await updateUserWithAvatarApi(
        avatar,
        userInfo._id,
        userInfo.fullName,
        userInfo.phone
      );
      if (resUpdateAvatar.data) {
        onClose();
        await loadUser();
        notification.success({
          message: "Update user avatar",
          description: "Cập nhật avatar thành công",
        });
      } else {
        notification.error({
          message: "Error update user avatar",
          description: JSON.stringify(resUpdateAvatar.message),
        });
      }
    } else {
      notification.error({
        message: "Error upload file",
        description: JSON.stringify(resUpload.message),
      });
      return;
    }
  };
  return (
    <Drawer
      width={"40vw"}
      title="Chi tiết User"
      onClose={onClose}
      open={isModalUserInfoOpen}
    >
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
          <div style={{ margin: "15px auto", border: "1px solid #ccc" }}>
            <img
              width={"300px"}
              src={`${import.meta.env.VITE_BACKEND_URL}/images/avatar/${
                userInfo.avatar
              }`}
              alt=""
            />
          </div>
          <div>
            <label
              htmlFor="btnUpload"
              style={{
                background: "#1777FF",
                padding: "10px 15px",
                color: "#FFF",
                borderRadius: "5px",
                cursor: "pointer",
              }}
            >
              Upload Avatar
            </label>
            <input
              type="file"
              name=""
              id="btnUpload"
              hidden
              onChange={handleOnChangeFile}
            />
          </div>
          {preview && (
            <>
              <div style={{ margin: "15px auto", border: "1px dashed #ccc" }}>
                <img width={"300px"} src={preview} alt="" />
              </div>
              <Button
                type="primary"
                style={{ width: "fit-content" }}
                onClick={() => handleUpdateUserAvatar()}
              >
                Save
              </Button>
            </>
          )}
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
