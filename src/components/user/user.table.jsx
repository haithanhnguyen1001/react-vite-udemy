import { message, Popconfirm, Table } from "antd";
import { deleteUserApi } from "../../services/api.service";
import { useState } from "react";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import UpdateUserModal from "./update.user.modal";
import ViewUserDetail from "./view.user.detail";
const UserTable = (props) => {
  const {
    dataUsers,
    loadUser,
    current,
    pageSize,
    total,
    setCurrent,
    setPageSize,
  } = props;
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
      title: "STT",
      render: (_, record, index) => {
        return <>{index + 1 + (current - 1) * pageSize}</>;
      },
    },
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

  const onChange = (pagination, filters, sorter, extra) => {
    //Neu thay doi trang
    if (pagination && pagination.current) {
      if (+pagination.current !== +current) {
        setCurrent(+pagination.current);
      }
    }
    //neu thay doi so phan tu
    if (pagination && pagination.pageSize) {
      if (+pagination.pageSize !== +pageSize) {
        setPageSize(+pagination.pageSize);
      }
    }
  };

  return (
    <>
      <Table
        columns={columns}
        dataSource={dataUsers}
        rowKey={"_id"}
        pagination={{
          current: current,
          pageSize: pageSize,
          showSizeChanger: true,
          total: total,
          showTotal: (total, range) => {
            return (
              <div>
                {range[0]}-{range[1]} trên {total} rows
              </div>
            );
          },
        }}
        onChange={onChange}
      />
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
        loadUser={loadUser}
      />
    </>
  );
};

export default UserTable;
