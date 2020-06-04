import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Link } from "react-router-dom";
import { Layout, Menu, BackTop, Row, Col } from "antd";
import { HomeOutlined } from "@ant-design/icons";
import SearchNav from "./components/search";
import TaskHeader from "./components/taskheader";
import ProfileHeader from "./components/profile-popover";
import AddNewArticle from "./components/add-article";
import MailHeader from "./components/mail-header";

import MainContent from "./components/main-content";
import AllHotAuthors from "./components/all-hot-authors/all-hot-authors";
import AllTopTopics from "./components/all-top-topics/all-top-topics";
import Login from "./components/login";
import Profile from "./components/profile-center/profile";
import SignUp from "./components/signup/signup";
import Messagetab from "./components/message/message";
import TopicCenter from "./components/topic-center/topic-center";
import UserPage from "./components/user-page/user-page";
import Recharge from "./components/recharge/recharge";
import ForgotPassword from "./components/forgot-password";
import { MailOutlined, AppstoreOutlined, SettingOutlined } from '@ant-design/icons';

import "antd/dist/antd.css";
import "./index.css";
import TopMenu from "./components/topmenu/topmenu";



const { Header, Footer, Content } = Layout;
const { SubMenu } = Menu;



export default function Home() {
  const pathName = window.location.pathname;
  return (
    <Router>
      <Layout>
        {
          pathName !== '/login' && (
            <Header>
            <div className="mainwidth header-nav">
            <Row>
            <Col xs={4} sm={4} md={4} lg={4} className="logo">LOGO</Col>
              <Col xs={20} sm={20} md={12} lg={12} className="logo"> <SearchNav /></Col>
            <Col xs={24} sm={24} md={8} lg={8}>  <TopMenu /></Col>

            </Row>

            </div>
              
            </Header>
          )
        }

        <Content>
          <Route path="/" component={MainContent} exact />
          <Route path="/all-hot-authors" component={AllHotAuthors} exact />
          <Route path="/all-top-topics" component={AllTopTopics} exact />
          <Route path="/login" component={Login} replace />
          <Route path="/profile" component={Profile} exact />
          <Route path="/sign-up" component={SignUp} exact />
          <Route path="/message" component={Messagetab} exact />
          <Route path="/topic-center" component={TopicCenter} exact />
          <Route path="/user" component={UserPage} exact />
          <Route path="/recharge" component={Recharge} exact />
          <Route path="/forgot-password" component={ForgotPassword} exact />
        </Content>
        <Footer className="align-center">
          Footer content goes here...
          <BackTop />
        </Footer>
      </Layout>
    </Router>
  );
}
