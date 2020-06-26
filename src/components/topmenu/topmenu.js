import React from "react";
import "antd/dist/antd.css";

import { Menu, Row, Col } from "antd";
import ProfileHeader from "../profile-popover";
import TaskHeader from "../taskheader";
import AddNewArticle from "../add-article";
import SearchNav from "../search";



export default function TopMenu() {

  return (
    <Menu mode="horizontal">


      {/* <Menu.Item >
        <TaskHeader />

      </Menu.Item> */}
      <Menu.Item >
        <span>商城</span>

      </Menu.Item>
      <Menu.Item >
        <span>充值中心</span>

      </Menu.Item>
      <Menu.Item >
        <ProfileHeader />

      </Menu.Item>


      <Menu.Item >
        <AddNewArticle />
      </Menu.Item>


    </Menu>
  );
}
