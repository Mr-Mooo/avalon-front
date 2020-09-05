import React from "react";
import { Menu, message, Button } from "antd";
import ProfileHeader from "../profile-popover";
import ProfileMessage from "../profile-message";
// import TaskHeader from "../taskheader";
import AddNewArticle from "../add-article";
// import SearchNav from "../search";
import photo from "../../img/package.png";
import "./index.css";
function getMessage() {
  message.info("功能开发中，敬请期待！！！");
}
export default function TopMenu() {
  // render() {
  return (
    <Menu mode="horizontal" className="box">
      {/* <Menu.Item >
        <TaskHeader />

      </Menu.Item> */}
      <Menu.Item>
        <span onClick={() => getMessage()}>
          {/* <img src={photo} style={{ width: "30px", marginRight: "10px" }} />
           */}
          <Button style={{ color: "#1890ff", borderRadius: "4px" }}>
            充值中心
          </Button>
        </span>
      </Menu.Item>
      <Menu.Item>
        <span onClick={() => getMessage()}>
          <Button style={{ color: "#1890ff", borderRadius: "4px" }}>
            商城
          </Button>
        </span>
      </Menu.Item>

      <Menu.Item>
        <ProfileHeader />
      </Menu.Item>
      <Menu.Item>
        <ProfileMessage />
      </Menu.Item>
      <Menu.Item>
        <AddNewArticle />
      </Menu.Item>
    </Menu>
  );
}
