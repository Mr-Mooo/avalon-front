import React from "react";

import {
  Card,
  Col,
  Row,
  Tabs,
  Button,
  Upload,
  message,
  Input,
  DatePicker,
  Form,
  Select,
  Modal,
} from "antd";
import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import { uploadImg, uploadavatartApi } from "../../services/content.js";
import "antd/dist/antd.css";

function getBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
}

function beforeUpload(file) {
  const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
  if (!isJpgOrPng) {
    message.error("You can only upload JPG/PNG file!");
  }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    message.error("Image must smaller than 2MB!");
  }
  return isJpgOrPng && isLt2M;
}

class AvatarUpload extends React.Component {
  state = {
    loading: false,
    tags: [],
    inputVisible: false,
    inputValue: "",
    message: "",
    previewVisible: false,
    previewImage: "",
    previewTitle: "",
    uploadOptions: {},
    needOption: {},
    imgUrl: [],
    fileList: [],
  };

  handleCancel = () => this.setState({ previewVisible: false });

  handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }

    this.setState({
      previewImage: file.url || file.preview,
      previewVisible: true,
      previewTitle:
        file.name || file.url.substring(file.url.lastIndexOf("/") + 1),
    });
  };
  getFileSuffix = (name) => {
    if (name) {
      const lastIndex = name.lastIndexOf(".");
      const suffix = name.slice(lastIndex + 1);
      return suffix;
    }
  };
  beforeUpload = async (file, fileList) => {
    const { imgUrl } = this.state;
    const query = {
      file_name: file.name,
      category: "content",
      suffix: this.getFileSuffix(file.name),
    };
    // if(file)
    const res = await uploadImg(query);
    if (res) {
      const needOption = {
        url: res.data.request_url,
        key: res.data.key,
        contentType: res.data["content-type"],
        policy: res.data.policy,
        signature: res.data.signature,
        accessKeyId: res.data.accessKeyId,
        file: fileList,
      };
      this.setState({
        needOption: needOption,
        imgUrl: [...imgUrl, res.data.key],
      });
    }
    const op = {
      path: res.data.key,
    };
    const data = await uploadavatartApi(op);
    if (data.code === 0) {
      message.success("上传成功");
    }
  };
  handleChange = async ({ file, fileList }) => {
    this.setState({ fileList });
  };
  handleClose = (removedTag) => {
    const tags = this.state.tags.filter((tag) => tag !== removedTag);
    console.log(tags);
    this.setState({ tags });
  };

  showInput = () => {
    this.setState({ inputVisible: true }, () => this.input.focus());
  };

  handleInputChange = (e) => {
    this.setState({ inputValue: e.target.value });
  };

  handleInputConfirm = () => {
    const { inputValue } = this.state;
    let { tags } = this.state;
    if (inputValue && tags.indexOf(inputValue) === -1) {
      tags = [...tags, inputValue];
    }
    console.log(tags);
    this.setState({
      tags,
      inputVisible: false,
      inputValue: "",
    });
  };

  render() {
    const {
      tags,
      inputVisible,
      inputValue,
      previewVisible,
      previewImage,
      fileList,
      previewTitle,
      needOption,
    } = this.state;
    const uploadButton = (
      <div>
        <PlusOutlined />
        <div className="ant-upload-text">Upload</div>
      </div>
    );
    const { imageUrl } = this.state;
    return (
      <div>
        <Upload
          action={needOption.url}
          listType="picture-card"
          method="POST"
          data={{
            key: needOption.key,
            "content-type": needOption.contentType,
            policy: needOption.policy,
            signature: needOption.signature,
            accessKeyId: needOption.accessKeyId,
          }}
          fileList={fileList}
          onPreview={this.handlePreview}
          beforeUpload={this.beforeUpload}
          onChange={this.handleChange}
        >
          {fileList.length >= 1 ? null : uploadButton}
        </Upload>
        <Modal
          visible={previewVisible}
          title={previewTitle}
          footer={null}
          onCancel={this.handleCancel}
        >
          <img alt="example" style={{ width: "100%" }} src={previewImage} />
        </Modal>
      </div>
    );
  }
}

const { Option } = Select;

const formItemLayout = {
  labelCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 8,
    },
  },
  wrapperCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 16,
    },
  },
};
const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0,
    },
    sm: {
      span: 16,
      offset: 8,
    },
  },
};

const PersonalProfile = () => {
  const [form] = Form.useForm();

  const onFinish = (values) => {
    console.log("Received values of form: ", values);
  };

  const prefixSelector = (
    <Form.Item name="prefix" noStyle>
      <Select
        style={{
          width: 70,
        }}
      >
        <Option value="86">+86</Option>
        <Option value="87">+87</Option>
      </Select>
    </Form.Item>
  );

  return (
    <Form
      {...formItemLayout}
      form={form}
      name="personalprofile"
      onFinish={onFinish}
      initialValues={{
        prefix: "86",
      }}
      scrollToFirstError
    >
      <Form.Item
        name="nickname"
        label="昵称"
        rules={[
          {
            required: true,
            message: "请输入昵称",
            whitespace: true,
          },
        ]}
      >
        <Input disabled />
      </Form.Item>

      <Form.Item name="birthdate" label="出生日期" hasFeedback>
        <DatePicker />
      </Form.Item>

      <Form.Item name="phone" label="绑定手机">
        <Input
          addonBefore={prefixSelector}
          disabled
          style={{
            width: "100%",
          }}
        />
      </Form.Item>

      <Form.Item
        name="email"
        label="绑定邮箱"
        rules={[
          {
            type: "email",
            message: "请输入正确的邮箱",
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item name="academic-degree" label="最高学位">
        <Select placeholder="请选择学位" allowClear>
          <Option value="primary-school">小学</Option>
          <Option value="junior-high">初中</Option>
          <Option value="senior-high">高中</Option>
          <Option value="bachelor">本科</Option>
          <Option value="master">硕士</Option>
          <Option value="phd">博士</Option>
          <Option value="other">其他</Option>
        </Select>
      </Form.Item>

      <Form.Item name="residence" label="所在地">
        <Input />
      </Form.Item>

      <Form.Item name={["user", "introduction"]} label="自我介绍">
        <Input.TextArea />
      </Form.Item>

      <Form.Item name="sex" label="性别">
        <Select placeholder="请选择性别" allowClear>
          <Option value="male">男</Option>
          <Option value="female">女</Option>
          <Option value="none">保密</Option>
        </Select>
      </Form.Item>

      <Form.Item name="permission" label="个人信息访问权限">
        <Select placeholder="请选择访问权限" allowClear>
          <Option value="visible-for-all">全部可见</Option>
          <Option value="visible-for-fans">关注可见</Option>
          <Option value="visible-for-me">仅自己可见</Option>
        </Select>
      </Form.Item>

      <Form.Item name="permission" label="社交信息可见权限">
        <Select placeholder="请选择社交信息可见权限" allowClear>
          <Option value="visible-for-all">全部可见</Option>
          <Option value="visible-for-fans">关注可见</Option>
          <Option value="visible-for-me">仅自己可见</Option>
        </Select>
      </Form.Item>

      <Form.Item name="weibo" label="微博">
        <Input addonBefore="http://www.weibo.com/u/" />

        <Button
          className="margin-t"
          type="primary"
          htmlType="submit"
          size="small"
        >
          关联
        </Button>
      </Form.Item>

      <Form.Item name="lofter" label="Lofter">
        <Input addonAfter=".loft.com" />

        <Button
          className="margin-t"
          type="primary"
          htmlType="submit"
          size="small"
        >
          关联
        </Button>
      </Form.Item>

      <Form.Item name="taobao" label="淘宝">
        <Input />

        <Button
          className="margin-t"
          type="primary"
          htmlType="submit"
          size="small"
        >
          关联
        </Button>
      </Form.Item>

      <Form.Item name="other" label="其他">
        <Input />

        <Button
          className="margin-t"
          type="primary"
          htmlType="submit"
          size="small"
        >
          关联
        </Button>
      </Form.Item>

      <Form.Item {...tailFormItemLayout}>
        <Button type="primary" htmlType="submit">
          修改
        </Button>
      </Form.Item>
    </Form>
  );
};

export default function Profile() {
  const { TabPane } = Tabs;
  return (
    <Row className="mainwidth margin-1">
      <div>
        <Tabs tabPosition="left">
          <TabPane tab="个人基本信息" key="1">
            <Card className="margin-1" title="基本信息">
              <Row>
                <Col span={4} className="gap">
                  <AvatarUpload />
                </Col>
                <Col span={18}>
                  <PersonalProfile />
                </Col>
              </Row>
            </Card>
          </TabPane>
          {/* <TabPane tab="xxxxxxx" key="2">
            Content of Tab 2
          </TabPane> */}
        </Tabs>
      </div>
    </Row>
  );
}
