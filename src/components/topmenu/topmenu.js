import React from "react";
import { Menu, message } from "antd";
import ProfileHeader from "../profile-popover";
// import TaskHeader from "../taskheader";
import AddNewArticle from "../add-article";
// import SearchNav from "../search";
import photo from "../../img/package.png";
import "./index.css";
function getMessage() {
  message.info("功能开发中，敬请期待。。。");
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
          <img src={photo} style={{ width: "30px", marginRight: "10px" }} />
          充值中心
        </span>
      </Menu.Item>
      <Menu.Item>
        <span onClick={() => getMessage()}>商城</span>
      </Menu.Item>

      <Menu.Item>
        <ProfileHeader />
      </Menu.Item>

      <Menu.Item>
        <AddNewArticle />
      </Menu.Item>
    </Menu>
  );
}
