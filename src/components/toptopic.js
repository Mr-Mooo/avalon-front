import React from "react";

import { Card, Col, Row, Tabs, Button } from "antd";
import { FileOutlined, FileTextOutlined } from "@ant-design/icons";
import "antd/dist/antd.css";
import "../index.css";
import { ThunderboltOutlined, RobotOutlined } from "@ant-design/icons";
import { Link, withRouter } from "react-router-dom";
import { topSentimentApi, contentSentimentApi } from "../services/content";

class Toptopic extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      name: this.props.name,
      tagData: [],
    };
  }
  async componentDidMount() {
    const res = await topSentimentApi();
    if (res) {
      this.setState({
        tagData: res.data,
      });
    }
  }
  render() {
    const { tagData } = this.state;
    return (
      <Card className="margin-1 cardColor">
        <ThunderboltOutlined /> 话题榜单 Top5
        {tagData.length > 0 && (
          <Link to="/all-top-topics">
            <Button className="gap" type="link">
              <FileTextOutlined /> 查看全部
            </Button>
          </Link>
        )}
        {tagData.map((item, index) => {
          return (
            <Link
              to={{
                pathname: "/tag",
                state: {
                  tag: item.avl_tag.content,
                },
              }}
              key={index}
            >
              <Row style={{ cursor: "pointer" }}>
                <Col span={11}>
                  {index + 1}. {item.avl_tag.content}
                </Col>
                <Col span={3}>
                  <RobotOutlined className="margin-l-sm" />
                </Col>
                <Col span={3}>{item.degree_of_heat}</Col>
              </Row>
            </Link>
          );
        })}
      </Card>
    );
  }
}
export default withRouter(Toptopic);
