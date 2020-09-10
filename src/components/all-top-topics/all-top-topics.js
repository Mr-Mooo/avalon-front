import React from "react";

import { Col, Row, Avatar, Button, Divider, Card, Pagination } from "antd";
import "antd/dist/antd.css";
import { Link, withRouter } from "react-router-dom";
import { topSentimentListApi } from "../../services/content";
class AllTopTopics extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      value: "",
      data: [],
      count: "",
    };
  }
  async componentDidMount() {
    const res = await topSentimentListApi();
    if (res) {
      this.setState({
        data: res.data.rows,
        count: res.data.count,
      });
    }
  }
  onchange = async (page, pageSize) => {
    const options = {
      page: page,
      limit: pageSize,
    };
    const res = await topSentimentListApi(options);
    if (res) {
      this.setState({
        data: res.data.rows,
        count: res.data.count,
      });
    }
  };
  render() {
    const { data, count } = this.state;
    return (
      <div className="mainwidth">
        {data.map((item, index) => {
          return (
            <Card className="margin-1" key={index}>
              <Row>
                <Col
                  span={24}
                  className="align-left"
                  style={{ position: "relative" }}
                >
                  <Link
                    to={{
                      pathname: "/tag",
                      state: {
                        tag: item.avl_tag.content,
                      },
                    }}
                    key={index}
                  >
                    <h2>{item.avl_tag.content}</h2>
                  </Link>
                  <p>这是一段默认的标签简介</p>
                  <Divider />
                  <p className="gap">{item.degree_of_heat}热度</p>
                  <Button
                    type="primary"
                    className="gap"
                    size="small"
                    style={{ position: "absolute", top: "0px", right: "0px" }}
                  >
                    订阅话题
                  </Button>
                </Col>
              </Row>
            </Card>
          );
        })}
        {count > 5 && (
          <Pagination
            className="margin-1"
            style={{ float: "right" }}
            defaultPageSize={5}
            defaultCurrent={1}
            onChange={(page, pageSize) => this.onchange(page, pageSize)}
            total={count > 20 ? 20 : count}
          />
        )}
      </div>
    );
  }
}
export default withRouter(AllTopTopics);
