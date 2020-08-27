import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Link } from "react-router-dom";
import { Layout, Menu, BackTop, Row, Col, Affix, Button } from "antd";
// import { HomeOutlined } from "@ant-design/icons";
import SearchNav from "./components/search";
// import TaskHeader from "./components/taskheader";
// import ProfileHeader from "./components/profile-popover";
// import AddNewArticle from "./components/add-article";
// import MailHeader from "./components/mail-header";

import MainContent from "./components/main-content";
import AllHotAuthors from "./components/all-hot-authors/all-hot-authors";
import AllTopTopics from "./components/all-top-topics/all-top-topics";
import Login from "./pages/login";
import Profile from "./components/profile-center/profile";
import SignUp from "./pages/signup/signup";
import Messagetab from "./components/message/message";
import TopicCenter from "./components/topic-center/topic-center";
import UserPage from "./components/user-page/user-page";
import PersonPage from "./components/person-page/user-page";
import Recharge from "./components/recharge/recharge";
import ForgotPassword from "./components/forgot-password";
import Tag from "./components/tag";
import u2 from "./img/u2.png";
// import { MailOutlined, AppstoreOutlined, SettingOutlined } from '@ant-design/icons';

import "antd/dist/antd.css";
import "./index.css";
import TopMenu from "./components/topmenu/topmenu";
import emitter from "./utils/events.js";
const { Header, Footer, Content } = Layout;
// const { SubMenu } = Menu;
function dashboard() {
  console.log(11);
  emitter.emit("changeValue", "");
}
export default function Home() {
  const pathName = window.location.pathname;
  const bottom = 5;
  return (
    <Router>
      <Layout>
        {pathName !== "/" &&
          pathName !== "/sign-up" &&
          pathName !== "/forgot-password" && (
            <Header>
              <div className="mainwidth header-nav">
                <Row>
                  <Col xs={4} sm={4} md={4} lg={4} className="logo">
                    <Link to="/dashboard">
                      <Button
                        style={{ color: "#1890ff", borderRadius: "4px" }}
                        onClick={() => dashboard()}
                      >
                        主页
                      </Button>
                    </Link>
                    <Link
                      to={{ pathname: "person", state: { name: "person" } }}
                      style={{ marginLeft: 15 }}
                    >
                      <Button style={{ color: "#1890ff", borderRadius: "4px" }}>
                        个人主页
                      </Button>
                    </Link>
                  </Col>
                  <Col xs={16} sm={16} md={12} lg={12} className="logo">
                    {" "}
                    <SearchNav />
                  </Col>
                  <Col xs={10} sm={10} md={8} lg={8}>
                    {" "}
                    <TopMenu />
                  </Col>
                </Row>
              </div>
            </Header>
          )}

        <Content>
          <Route path="/" component={Login} exact />
          <Route path="/dashboard" component={MainContent} exact />
          <Route path="/search" component={MainContent} exact />
          <Route path="/all-hot-authors" component={AllHotAuthors} exact />
          <Route path="/all-top-topics" component={AllTopTopics} exact />
          <Route path="/profile" component={Profile} exact />
          <Route path="/sign-up" component={SignUp} exact />
          <Route path="/message" component={Messagetab} exact />
          <Route path="/topic-center" component={TopicCenter} exact />
          <Route path="/user" component={UserPage} exact />
          <Route path="/recharge" component={Recharge} exact />
          <Route path="/forgot-password" component={ForgotPassword} exact />
          <Route path="/tag" component={Tag} exact />
          <Route path="/person" component={PersonPage} exact />
        </Content>
        <Affix offsetBottom={bottom}>
          <Footer className="align-center">
            Footer content goes here...
            <BackTop />
          </Footer>
        </Affix>
      </Layout>
    </Router>
  );
}
