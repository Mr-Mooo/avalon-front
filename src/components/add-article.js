import React from "react";

import { Button, Dropdown, Menu, Modal } from "antd";
import { FileOutlined, EditOutlined } from "@ant-design/icons";
import "antd/dist/antd.css";
import "../index.css";
import AddArticleContent from "./Modal/addarticle-content";
import AddImageContent from "./Modal/addimage-content";

class Addarticle extends React.Component {
  state = {
    // warranteeTable: [],
    // bankActive: 'ccb',
    // bankList: [], //银行列表
    visible: false,
    modifyVisible: false,
    // modalVisble: false,
  };

  showModal = () => {
    this.setState({
      visible: true,
    });
  };

  handleOk = async (content, checked) => {
    window.location.reload();
  };

  handleCancel = (e) => {
    this.setState({
      visible: false,
    });
  };

  render() {
    const { modifyVisible } = this.state;
    return (
      <div>
        <Button
          type="link"
          onClick={() => {
            this.setState({
              modifyVisible: true,
            });
          }}
        >
          <FileOutlined /> 文章投稿
        </Button>
        <AddArticleContent
          title="文章投稿"
          visible={modifyVisible}
          onOk={({ content, resonsItem: checked }) => {
            this.handleOk(content, checked);
          }}
          onCancel={() => {
            this.setState({
              modifyVisible: false,
            });
          }}
        >
          {/* <AddArticleContent /> */}
        </AddArticleContent>
      </div>
    );
  }
}

class Addpic extends React.Component {
  state = { visible: false };

  showModal = () => {
    this.setState({
      visible: true,
    });
  };

  handleOk = (e) => {
    window.location.reload();
    this.setState({
      visible: false,
    });
  };

  handleCancel = (e) => {
    this.setState({
      visible: false,
    });
  };

  render() {
    const { visible } = this.state;
    return (
      <div>
        <Button type="link" onClick={this.showModal}>
          <FileOutlined /> 图片投稿
        </Button>
        <AddImageContent
          title="文章投稿"
          visible={visible}
          onCancel={() => {
            this.setState({
              visible: false,
            });
          }}
        >
          {/* <AddArticleContent /> */}
        </AddImageContent>
        {/* <Modal
          title="图片投稿"
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
        >
          <AddImageContent />
        </Modal> */}
      </div>
    );
  }
}

export default function AddNewArticle() {
  const menuarticle = (
    <Menu>
      <Menu.Item>
        <Addpic />
      </Menu.Item>

      <Menu.Item>
        <Addarticle />
      </Menu.Item>
    </Menu>
  );

  return (
    <Dropdown overlay={menuarticle} placement="bottomLeft">
      <Button type="primary" size="small">
        {" "}
        <EditOutlined />
        投稿
      </Button>
    </Dropdown>
  );
}
