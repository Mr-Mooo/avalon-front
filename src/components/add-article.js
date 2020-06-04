import React from "react";

import { Button, Dropdown, Menu, Modal } from "antd";
import { FileOutlined, EditOutlined } from "@ant-design/icons";
import "antd/dist/antd.css";
import "../index.css";
import AddArticleContent from "./addarticle-content";
import AddImageContent from "./addimage-content";

class Addarticle extends React.Component {
  state = { visible: false };

  showModal = () => {
    this.setState({
      visible: true
    });
  };

  handleOk = e => {
    console.log(e);
    this.setState({
      visible: false
    });
  };

  handleCancel = e => {
    console.log(e);
    this.setState({
      visible: false
    });
  };

  render() {
    return (
      <div>
        <Button type="link" onClick={this.showModal}>
          <FileOutlined /> 文章投稿
        </Button>
        <Modal
          title="文章投稿"
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
        >
          <AddArticleContent />
        </Modal>
      </div>
    );
  }
}

class Addpic extends React.Component {
  state = { visible: false };

  showModal = () => {
    this.setState({
      visible: true
    });
  };

  handleOk = e => {
    console.log(e);
    this.setState({
      visible: false
    });
  };

  handleCancel = e => {
    console.log(e);
    this.setState({
      visible: false
    });
  };

  render() {
    return (
      <div>
        <Button type="link" onClick={this.showModal}>
          <FileOutlined /> 图片投稿
        </Button>
        <Modal
          title="图片投稿"
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
        >
          <AddImageContent />
        </Modal>
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
