import React from "react";
import { Menu, Row, Col } from "antd";
import ProfileHeader from "../profile-popover";
import TaskHeader from "../taskheader";
import AddNewArticle from "../add-article";
import SearchNav from "../search";
import photo from "../../img/package.png";
import  "./index.css";
export default function TopMenu() {

  return (
    <Menu mode="horizontal" className="box">
      {/* <Menu.Item >
        <TaskHeader />

      </Menu.Item> */}
       <Menu.Item >
        <span><img src={photo} style={{width:'30px',marginRight:'10px'}}/>充值中心</span>
      </Menu.Item>
      <Menu.Item >
        <span>商城</span>
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
