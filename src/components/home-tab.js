import React from "react";

import { Card, Tabs, List, Spin, message } from "antd";
import "antd/dist/antd.css";
import "../index.css";
import { CrownOutlined, HeartOutlined, TagsOutlined } from "@ant-design/icons";
import Author from "./author";
import reqwest from "reqwest";
import InfiniteScroll from "react-infinite-scroller";
const fakeDataUrl =
  "https://randomuser.me/api/?results=5&inc=name,gender,email,nat&noinfo";

const contentListData = [
  {
    "content_id": 6,
    "subject": "de",
    "content": "dew",
    "tag_ids": null,
    "pid": 0,
    "type": "message",
    "create_user": 2,
    "like_number": null,
    "collect_number": null,
    "createdAt": "2020-06-13T15:18:55.000Z",
    "updatedAt": "2020-06-13T15:18:55.000Z",
    "deletedAt": null,
    "avl_user": {
      "user_id": 2,
      "area": 86,
      "mobile": "15618875452",
      "email": "",
      "nick_name": "Hou",
      "password": "a665a45920422f9d417e4867efdc4fb8a04a1f3fff1fa07e998e86f7f7a27ae3",
      "status": true,
      "avatar": "11223344",
      "verify": false,
      "is_18plus": true,
      "coupon": 0,
      "integral": 0,
      "is_member": false,
      "createdAt": "2020-06-04T14:23:40.000Z",
      "updatedAt": "2020-06-10T05:49:55.000Z",
      "deletedAt": null
    },
    "avl_attachments": [
      {
        "document_id": 1,
        "content_id": "6",
        "path": "123",
        "createdAt": "2020-06-13T15:20:06.000Z",
        "updatedAt": "2020-06-13T15:20:06.000Z",
        "deletedAt": null
      }
    ]
  },
  {
    "content_id": 7,
    "subject": "rfr",
    "content": "f",
    "tag_ids": null,
    "pid": 0,
    "type": "message",
    "create_user": 2,
    "like_number": null,
    "collect_number": null,
    "createdAt": "2020-06-13T15:20:06.000Z",
    "updatedAt": "2020-06-13T15:20:06.000Z",
    "deletedAt": null,
    "avl_user": {
      "user_id": 2,
      "area": 86,
      "mobile": "15618875452",
      "email": "",
      "nick_name": "Hou",
      "password": "a665a45920422f9d417e4867efdc4fb8a04a1f3fff1fa07e998e86f7f7a27ae3",
      "status": true,
      "avatar": "11223344",
      "verify": false,
      "is_18plus": true,
      "coupon": 0,
      "integral": 0,
      "is_member": false,
      "createdAt": "2020-06-04T14:23:40.000Z",
      "updatedAt": "2020-06-10T05:49:55.000Z",
      "deletedAt": null
    },
    "avl_attachments": []
  },
  {
    "content_id": 8,
    "subject": "fyj",
    "content": "jhk",
    "tag_ids": [],
    "pid": 0,
    "type": "message",
    "create_user": 2,
    "like_number": null,
    "collect_number": null,
    "createdAt": "2020-06-13T15:22:13.000Z",
    "updatedAt": "2020-06-13T15:22:13.000Z",
    "deletedAt": null,
    "avl_user": {
      "user_id": 2,
      "area": 86,
      "mobile": "15618875452",
      "email": "",
      "nick_name": "Hou",
      "password": "a665a45920422f9d417e4867efdc4fb8a04a1f3fff1fa07e998e86f7f7a27ae3",
      "status": true,
      "avatar": "11223344",
      "verify": false,
      "is_18plus": true,
      "coupon": 0,
      "integral": 0,
      "is_member": false,
      "createdAt": "2020-06-04T14:23:40.000Z",
      "updatedAt": "2020-06-10T05:49:55.000Z",
      "deletedAt": null
    },
    "avl_attachments": []
  },
  {
    "content_id": 9,
    "subject": "123",
    "content": "1234er",
    "tag_ids": [
      1,
      3,
      8
    ],
    "pid": 0,
    "type": "message",
    "create_user": 2,
    "like_number": null,
    "collect_number": null,
    "createdAt": "2020-06-13T19:26:57.000Z",
    "updatedAt": "2020-06-13T19:26:57.000Z",
    "deletedAt": null,
    "avl_user": {
      "user_id": 2,
      "area": 86,
      "mobile": "15618875452",
      "email": "",
      "nick_name": "Hou",
      "password": "a665a45920422f9d417e4867efdc4fb8a04a1f3fff1fa07e998e86f7f7a27ae3",
      "status": true,
      "avatar": "11223344",
      "verify": false,
      "is_18plus": true,
      "coupon": 0,
      "integral": 0,
      "is_member": false,
      "createdAt": "2020-06-04T14:23:40.000Z",
      "updatedAt": "2020-06-10T05:49:55.000Z",
      "deletedAt": null
    },
    "avl_attachments": []
  }
];

class InfiniteList extends React.Component {
  state = {
    data: [],
    loading: false,
    hasMore: true
  };

  componentDidMount() {
    this.fetchData(res => {
      this.setState({
        data: res.results
      });
    });
  }

  fetchData = callback => {
    reqwest({
      url: fakeDataUrl,
      type: "json",
      method: "get",
      contentType: "application/json",
      success: res => {
        callback(res);
      }
    });
  };

  handleInfiniteOnLoad = () => {
    let { data } = this.state;
    this.setState({
      loading: true
    });
    if (data.length > 14) {
      message.warning("Infinite List loaded all");
      this.setState({
        hasMore: false,
        loading: false
      });
      return;
    }
    this.fetchData(res => {
      data = data.concat(res.results);
      this.setState({
        data,
        loading: false
      });
    });
  };

  render() {
    return (
      <div className="demo-infinite-container">
        <InfiniteScroll
          initialLoad={false}
          pageStart={0}
          loadMore={this.handleInfiniteOnLoad}
          hasMore={!this.state.loading && this.state.hasMore}
          useWindow={false}
        >
          <List
            // dataSource={this.state.data}
            dataSource={contentListData}
            renderItem={item => {
              // console.log(item, 'items');
              return (
                <List.Item key={item.id}>
                  <Author contentData={item} />
                </List.Item>
              )
            }}
          >
            {this.state.loading && this.state.hasMore && (
              <div className="demo-loading-container">
                <Spin />
              </div>
            )}
          </List>
        </InfiniteScroll>
      </div>
    );
  }
}

export default function HomeTab() {
  const { TabPane } = Tabs;

  function callback(key) {
    console.log(key);
  }
  return (
    <Card className="margin-1">
      <Tabs defaultActiveKey="1" onChange={callback} className="home-tab">
        <TabPane
          tab={
            <span>
              <CrownOutlined />
              推荐
            </span>
          }
          key="1"
        >
          <InfiniteList />
        </TabPane>
        <TabPane
          tab={
            <span>
              <HeartOutlined />
              关注
            </span>
          }
          key="2"
        >
          <Author />
          <Author />
        </TabPane>
        <TabPane
          tab={
            <span>
              <TagsOutlined />
              订阅
            </span>
          }
          key="3"
        >
          <Author />
          <Author />
        </TabPane>
      </Tabs>
    </Card>
  );
}
