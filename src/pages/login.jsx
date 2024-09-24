import { ArrowRightOutlined } from "@ant-design/icons";
import {
  Button,
  Form,
  Input,
  Row,
  Col,
  Divider,
  message,
  notification,
} from "antd";
import { Link, useNavigate } from "react-router-dom";
import { loginApi } from "../services/api.service";
import { useContext, useState } from "react";
import { AuthContext } from "../components/context/auth.context";

const LoginPage = () => {
  const [form] = Form.useForm();
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { setUser } = useContext(AuthContext);
  const onFinish = async (values) => {
    setIsLoading(true);
    const res = await loginApi(values.email, values.password);
    console.log(res);
    if (res.data) {
      message.success("Đăng nhập thành công!");
      localStorage.setItem("access_token", res.data.access_token);
      setUser(res.data.user);
      navigate("/");
    } else {
      notification.error({
        message: "Error login",
        description: JSON.stringify(res.message),
      });
    }
    setIsLoading(false);
  };

  return (
    <Row justify={"center"} style={{ marginTop: "30px" }}>
      <Col xs={24} md={14} lg={10}>
        <fieldset
          style={{
            padding: "15px",
            margin: "5px",
            border: "1px solid #ccc",
            borderRadius: "5px",
          }}
        >
          <legend
            style={{ fontSize: "14px", padding: "10px", fontWeight: "400" }}
          >
            Đăng Nhập
          </legend>
          <Form form={form} layout="vertical" onFinish={onFinish}>
            <Form.Item
              label="Email"
              name="email"
              rules={[
                {
                  required: true,
                  message: "Email không được để trống!",
                },
                {
                  type: "email",
                  message: "Email không đúng định dạng!",
                },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Password"
              name="password"
              rules={[
                {
                  required: true,
                  message: "Password không được để trống!",
                },
              ]}
            >
              <Input.Password
                onKeyDown={(event) => {
                  if (event.key === "Enter") {
                    form.submit();
                  }
                }}
              />
            </Form.Item>

            <Form.Item>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Button
                  loading={isLoading}
                  type="primary"
                  onClick={() => form.submit()}
                >
                  Login
                </Button>
                <Link to="/">
                  Go to homepage <ArrowRightOutlined />
                </Link>
              </div>
            </Form.Item>
          </Form>
          <Divider />
          <div style={{ textAlign: "center" }}>
            Chưa có tài khoản? <Link to={"/register"}>Đăng ký tại đây</Link>
          </div>
        </fieldset>
      </Col>
    </Row>
  );
};

export default LoginPage;
