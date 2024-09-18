import { Space, Table, Tag } from "antd";
import { fetchAllUserAPI } from "../../services/api.service";
import { useEffect, useState } from "react";
const UserTable = () => {
  const [dataUsers, setDataUsers] = useState([]);
  useEffect(() => {
    loadUser();
  }, []);
  const columns = [
    {
      title: "Id",
      dataIndex: "_id",
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
  ];
  const loadUser = async () => {
    const res = await fetchAllUserAPI();
    setDataUsers(res.data);
  };

  return <Table columns={columns} dataSource={dataUsers} rowKey={"_id"} />;
};

export default UserTable;
