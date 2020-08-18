import React from "react";

import "antd/dist/antd.css";
import "../index.css";
import { Layout, Row, Col, Grid } from "antd";
import Imgslider from "./imgslider";

import Hotcontent from "./hotcontent";
import Toptopic from "./toptopic";
import HomeTab from "./home-tab";
import HomeShoppingTab from "./home-shopping-tab";
import { Link, withRouter } from "react-router-dom";
const { Content } = Layout;

// const { useBreakpoint } = Grid;
class MainContent extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      isShow: false,
    };
  }
  componentDidMount() {
    const { pathname } = this.props.location;

    this.setState({
      isShow: pathname !== "/search",
    });
  }
  render() {
    const { isShow } = this.state;
    return (
      <Layout>
        <Content className="mainwidth">
          {isShow && <Imgslider />}
          <Row>
            <Col xs={24} sm={24} md={18} lg={18}>
              <HomeTab />
            </Col>
            <Col xs={24} sm={24} md={6} lg={6}>
              {" "}
              <HomeShoppingTab />
              <Hotcontent />
              <Toptopic />
            </Col>
          </Row>
        </Content>
      </Layout>
    );
  }
}
export default withRouter(MainContent);
