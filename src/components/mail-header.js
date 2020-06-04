import React from "react";

import { Dropdown, Menu, Badge } from "antd";
import {
  FileImageOutlined,
  FileOutlined,
  LikeOutlined,
  StarOutlined,
  MailOutlined
} from "@ant-design/icons";
import "antd/dist/antd.css";
import "../index.css";
import { Link } from "react-router-dom";

export default function MailHeader() {
  const menumail = (
    <Menu>
      <Menu.Item>
        <Link to="/message" replace>
          {" "}
          <FileImageOutlined /> 推荐 <Badge count={5} />
        </Link>
      </Menu.Item>
      <Menu.Item>
        <Link to="/message" replace>
          {" "}
          <FileOutlined /> 评论 <Badge count={6} />
        </Link>
      </Menu.Item>

      <Menu.Item>
        <Link to="/message" replace>
          <LikeOutlined /> 点赞 <Badge count={2} />
        </Link>
      </Menu.Item>

      <Menu.Item>
        <Link to="/message" replace>
          <StarOutlined /> 超赞 <Badge count={3} />
        </Link>
      </Menu.Item>

      <Menu.Item>
        <Link to="/message" replace>
          <MailOutlined /> 私信 <Badge count={3} />
        </Link>
      </Menu.Item>
    </Menu>
  );

  return (
    <Badge dot>
      <Dropdown overlay={menumail} placement="bottomLeft">
        <MailOutlined />
      </Dropdown>
    </Badge>
  );
}
