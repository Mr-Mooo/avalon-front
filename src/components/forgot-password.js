import React from "react";

import { Card, Button, Input } from "antd";
import { UserOutlined } from "@ant-design/icons";
import "antd/dist/antd.css";
import "../index.css";

export default function ForgotPassword() {
  return (
    <Card className="margin-1 forgot-password">
      <div className="margin-t-b ">
        {" "}
        <Input
          size="large"
          placeholder="请输入登陆名"
          prefix={<UserOutlined />}
        />
      </div>
      <div className="margin-t-b ">
        {" "}
        <Input placeholder="请输入验证码" />
        <Button>发送验证码</Button>
      </div>

      <div className="margin-t-b ">
        {" "}
        <Button type="primary">立即验证</Button>
      </div>
    </Card>
  );
}
