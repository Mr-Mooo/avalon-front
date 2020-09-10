import React from "react";

import { Card, Col, Row, Tabs, Button } from "antd";
import { RobotOutlined } from "@ant-design/icons";
import "antd/dist/antd.css";
import "../index.css";
import { FireOutlined, FileTextOutlined } from "@ant-design/icons";
import { Link, withRouter } from "react-router-dom";
import { userSentimentApi, contentSentimentApi } from "../services/content";
const { TabPane } = Tabs;
function callback(key) {
}
class Hotcontent extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      name: this.props.name,
      userData: [],
      contentData: [],
    };
  }
  async componentDidMount() {
    const { name } = this.state;
    if (name === "author") {
      const res = await userSentimentApi();
      if (res) {
        this.setState({
          userData: res.data,
        });
      }
    } else {
      const options = {
        type: "both",
      };
      const res = await contentSentimentApi(options);
      if (res) {
        this.setState({
          contentData: res.data,
        });
      }
    }
  }
  getcontentData = async (value) => {
    const options = {
      type: value,
    };
    const res = await contentSentimentApi(options);
    if (res) {
      this.setState({
        contentData: res.data,
      });
    }
  };
  callback = (key) => {
    if (key === "1") {
      this.getcontentData("both");
    } else if (key === "2") {
      this.getcontentData("picture");
    } else {
      this.getcontentData("message");
    }
  };
  render() {
    const { name, userData, contentData } = this.state;
    return (
      <Card className="margin-1 cardColor">
        <FireOutlined /> {name === "author" ? "用户人气榜单" : "内容人气榜单"}{" "}
        Top5{" "}
        {name === "author"
          ? userData.length > 0 && (
              <Link to="/all-hot-authors">
                <Button className="gap" type="link">
                  <FileTextOutlined /> 查看全部
                </Button>
              </Link>
            )
          : contentData.length > 0 && (
              <Link to="/content-sentiment">
                <Button className="gap" type="link">
                  <FileTextOutlined /> 查看全部
                </Button>
              </Link>
            )}
        {name === "author" ? (
          <div>
            {userData.map((item, index) => {
              return (
                <Link
                  to={{
                    pathname: "/user-home",
                    state: {
                      id: item.user_id,
                      name: "user-home",
                      user: item.avl_user,
                    },
                  }}
                  key={index}
                >
                  <Row style={{ cursor: "pointer" }}>
                    <Col span={11}>
                      {index + 1}. {item.avl_user.nick_name}
                    </Col>
                    <Col span={3}>
                      <RobotOutlined className="margin-l-sm" />
                    </Col>
                    <Col span={3}>{item.degree_of_heat}</Col>
                  </Row>
                </Link>
              );
            })}
          </div>
        ) : (
          <Tabs defaultActiveKey="1" onChange={(key) => this.callback(key)}>
            <TabPane tab="综合榜" key="1">
              {contentData.map((item, index) => {
                return (
                  <Link
                    to={{
                      pathname: "/content-detail",
                      state: {
                        id: item.content_id,
                      },
                    }}
                    key={index}
                  >
                    <Row style={{ cursor: "pointer" }}>
                      <Col
                        span={11}
                        style={{ overflow: "hidden", whiteSpace: "nowrap" }}
                      >
                        {index + 1}. {item.avl_content.subject}
                      </Col>
                      <Col span={3}>
                        <RobotOutlined className="margin-l-sm" />
                      </Col>
                      <Col span={3}>{item.degree_of_heat}</Col>
                    </Row>
                  </Link>
                );
              })}
            </TabPane>
            <TabPane tab="图片榜" key="2">
              {contentData.map((item, index) => {
                return (
                  <Link
                    to={{
                      pathname: "/content-detail",
                      state: {
                        id: item.content_id,
                      },
                    }}
                    key={index}
                  >
                    <Row key={index} style={{ cursor: "pointer" }}>
                      <Col
                        span={11}
                        style={{ overflow: "hidden", whiteSpace: "nowrap" }}
                      >
                        {index + 1}. {item.avl_content.subject}
                      </Col>
                      <Col span={3}>
                        <RobotOutlined className="margin-l-sm" />
                      </Col>
                      <Col span={3}>{item.degree_of_heat}</Col>
                    </Row>
                  </Link>
                );
              })}
            </TabPane>
            <TabPane tab="文字榜" key="3">
              {contentData.map((item, index) => {
                return (
                  <Link
                    to={{
                      pathname: "/content-detail",
                      state: {
                        id: item.content_id,
                      },
                    }}
                    key={index}
                  >
                    <Row key={index} style={{ cursor: "pointer" }}>
                      <Col
                        span={11}
                        style={{ overflow: "hidden", whiteSpace: "nowrap" }}
                      >
                        {index + 1}. {item.avl_content.subject}
                      </Col>
                      <Col span={3}>
                        <RobotOutlined className="margin-l-sm" />
                      </Col>
                      <Col span={3}>{item.degree_of_heat}</Col>
                    </Row>
                  </Link>
                );
              })}
            </TabPane>
          </Tabs>
        )}
      </Card>
    );
  }
}
export default withRouter(Hotcontent);
