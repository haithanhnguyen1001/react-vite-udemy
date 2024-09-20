import { message, Popconfirm, Table } from "antd";
import { deleteUserApi } from "../../services/api.service";
import { useState } from "react";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import UpdateUserModal from "./update.user.modal";
import ViewUserDetail from "./view.user.detail";
const UserTable = (props) => {
  const { dataUsers, loadUser } = props;
  const [isModalUpdateOpen, setIsModalUpdateOpen] = useState(false);
  const [dataUpdate, setDataUpdate] = useState(null);
  const [isModalUserInfoOpen, setIsModalUserInfoOpen] = useState(false);
  const [userInfo, setUserInfo] = useState(null);

  const handDeleteUser = async (id) => {
    let res = await deleteUserApi(id);
    if (res.data) {
      message.success("Xóa thành công user");
      await loadUser();
    } else {
      message.error(JSON.stringify(res.message));
    }
  };
  const columns = [
    {
      title: "Id",
      dataIndex: "_id",
      render: (_, record) => {
        return (
          <a
            href="#"
            onClick={() => {
              setUserInfo(record);
              setIsModalUserInfoOpen(true);
            }}
          >
            {record._id}
          </a>
        );
      },
    },
    {
      title: "Name",
      dataIndex: "fullName",
    },
    {
      title: "Email",
      dataIndex: "email",
    },
    {
      title: "PhoneNumber",
      dataIndex: "phone",
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
          <EditOutlined
            onClick={() => {
              setDataUpdate(record);
              setIsModalUpdateOpen(true);
            }}
            style={{ cursor: "pointer", color: "green" }}
          />
          <Popconfirm
            title="Delete user"
            description="Bạn có chắc chắn muốn xóa user này?"
            onConfirm={() => handDeleteUser(record._id)}
            okText="Xóa"
            cancelText="Không"
            placement="left"
          >
            <DeleteOutlined style={{ cursor: "pointer", color: "red" }} />
          </Popconfirm>
        </div>
      ),
    },
  ];

  return (
    <>
      <Table columns={columns} dataSource={dataUsers} rowKey={"_id"} />
      <UpdateUserModal
        isModalUpdateOpen={isModalUpdateOpen}
        setIsModalUpdateOpen={setIsModalUpdateOpen}
        dataUpdate={dataUpdate}
        setDataUpdate={setDataUpdate}
        loadUser={loadUser}
      />
      <ViewUserDetail
        isModalUserInfoOpen={isModalUserInfoOpen}
        setIsModalUserInfoOpen={setIsModalUserInfoOpen}
        userInfo={userInfo}
        setUserInfo={setUserInfo}
      />
    </>
  );
};

export default UserTable;
