import { useState } from "react";
import { Form, Input, Button, Checkbox } from "antd";
import { UserOutlined, LockOutlined, TeamOutlined } from "@ant-design/icons";
import "../styles/Login.css";
import axios from "axios";

const NormalLoginForm = ({ settoken, setsubDomain }) => {
  const [loading, setloading] = useState(false);
  const [form] = Form.useForm();

  const onFinish = async (values) => {
    setloading(true);
    const config = {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    };
    try {
      const res = await axios.post(
        `https://${values.company}.ox-sys.com/security/auth_check`,
        `_username=${values.username}&_password=${values.password}&_subdomain=${values.company}`,
        config
      );
      localStorage.setItem("token", res.data.token);
      setloading(false);
      settoken(localStorage.getItem("token"));
    } catch (err) {
      setloading(false);
      form.resetFields();
      console.log(err);
    }
  };

  return (
    <div className="_login">
      <Form
        form={form}
        name="normal_login"
        className="login-form login_form"
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}
      >
        <Form.Item
          name="username"
          rules={[
            {
              required: true,
              message: "Please input your Username!",
            },
          ]}
        >
          <Input
            prefix={<UserOutlined className="site-form-item-icon" />}
            placeholder="Username"
          />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[
            {
              required: true,
              message: "Please input your Password!",
            },
          ]}
        >
          <Input
            prefix={<LockOutlined className="site-form-item-icon" />}
            type="password"
            placeholder="Password"
          />
        </Form.Item>
        <Form.Item
          name="company"
          rules={[
            {
              required: true,
              message: "Please input your company name",
            },
          ]}
        >
          <Input
            prefix={<TeamOutlined className="site-form-item-icon" />}
            type="text"
            placeholder="Company Name"
          />
        </Form.Item>
        <Form.Item>
          <Form.Item name="remember" valuePropName="checked" noStyle>
            <Checkbox>Remember me</Checkbox>
          </Form.Item>

          <a className="login-form-forgot" href="/">
            Forgot password
          </a>
        </Form.Item>

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            className="login-form-button"
            loading={loading}
            block
          >
            Log in
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};
export default NormalLoginForm;
