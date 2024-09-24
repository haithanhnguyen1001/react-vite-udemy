import {
  AliwangwangOutlined,
  AuditOutlined,
  HomeOutlined,
  LoginOutlined,
  SettingOutlined,
  UsergroupAddOutlined,
} from "@ant-design/icons";
import { Menu } from "antd";
import { useContext, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { AuthContext } from "../context/auth.context";
// import "./header.css";
const Header = () => {
  const [current, setCurrent] = useState("home");
  const { user } = useContext(AuthContext);
  const onClick = (e) => {
    console.log("click ", e);
    setCurrent(e.key);
  };
  const items = [
    {
      label: <Link to={"/"}>Home</Link>,
      key: "home",
      icon: <HomeOutlined />,
    },
    {
      label: <Link to={"/users"}>Users</Link>,
      key: "users",
      icon: <UsergroupAddOutlined />,
    },
    {
      label: <Link to={"/books"}>Books</Link>,
      key: "books",
      icon: <AuditOutlined />,
    },

    ...(!user.id
      ? [
          {
            label: <Link to={"/login"}>Đăng nhập</Link>,
            key: "login",
            icon: <LoginOutlined />,
          },
        ]
      : [
          {
            label: `Welcome ${user.fullName}`,
            key: "setting",
            icon: <AliwangwangOutlined />,
            children: [
              {
                label: "Đăng xuất",
                key: "logout",
              },
            ],
          },
        ]),
  ];
  return (
    <Menu
      onClick={onClick}
      selectedKeys={[current]}
      mode="horizontal"
      items={items}
    />
  );
};

export default Header;
