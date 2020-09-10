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
import {
  uploadImg,
  uploadavatartApi,
  updateDataApi,
} from "../../services/content.js";
import "antd/dist/antd.css";
import "cropperjs/dist/cropper.css";
import { defaultAvatar } from "../../utils/util";
import Cropper from "react-cropper";

function getBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
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
    imgprv: "",
    srcCropper: "",
    visible: false,
    confirmLoading: false,
  };
  beforeUpload = (file) => {
    // const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
    // if (!isJpgOrPng) {
    //   message.error("You can only upload JPG/PNG file!");
    // }
    // const isLt2M = file.size / 1024 / 1024 < 2;
    // if (!isLt2M) {
    //   message.error("Image must smaller than 2MB!");
    // }
    const reader = new FileReader();
    reader.readAsDataURL(file); // 开始读取文件
    // 因为读取文件需要时间,所以要在回调函数中使用读取的结果
    reader.onload = (e) => {
      console.log(e, "e");
      this.setState({
        visible: true,
        srcCropper: e.target.result, // cropper的图片路径
      });
    };
    return false;
    // return isJpgOrPng && isLt2M;
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
      path: `${res.data.request_url}/${res.data.key}`,
    };

    const data = await uploadavatartApi(op);
    if (data.code === 0) {
      message.success("上传成功");
      setTimeout(() => {
        this.setState({
          imgprv: `${res.data.request_url}/${res.data.key}`,
        });
      }, 2000);
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
  // 取消
  onCloseModal = () => {
    this.setState({
      visible: false,
      confirmLoading: false,
    });
  };
  b64toBlob = (dataurl) => {
    var arr = dataurl.split(","),
      mime = arr[0].match(/:(.*?);/)[1],
      bstr = atob(arr[1]),
      n = bstr.length,
      u8arr = new Uint8Array(n);

    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }

    return new Blob([u8arr], { type: mime });
  };
  // saveImg = () => {
  //   const lrz = require("lrz");
  //   console.log(this.refs.cropper.getCroppedCanvas().toDataURL(), "000");
  //   this.setState({
  //     confirmLoading: true,
  //   });
  //   // 通过refs读取到Cropper实例，并读取到裁剪之后的图片（base64）
  //   const cropper = this.refs.cropper;
  //   console.log(cropper, "cropper");
  //   const url = cropper.getCroppedCanvas().toDataURL();
  //   console.log(cropper.getCroppedCanvas().toDataURL(), "1231");
  //   return;
  //   // 此处使用了lrz组件对裁剪之后的图片进行压缩，lrz的API十分简单，quality是指对压缩图片的品质，一般0.6或者0.7即可
  //   lrz(url, { quality: 0.6 }).then((results) => {
  //     const { onSuccess, onChange } = this.props;
  //     const fd = new FormData();
  //     // 由于后台接口参数需要一个文件名，所有根据当前时间生成文件名
  //     const imgName = `${new Date().getTime()}.png`;
  //     // 将base64转化成二进制流
  //     fd.append("file", this.b64toBlob(results.base64), imgName);
  //     // 发送请求

  //     // axios
  //     //   .post(`${BaseUrl}/tools/saveAvatar`, fd)
  //     //   .then((res) => {
  //     //     const { data = {} } = res;
  //     //     if (data.code === 200) {
  //     //       onSuccess(data.data.file);
  //     //       onChange && onChange(data.data.file);
  //     //       message.success(data.message || "上传成功");
  //     //     }
  //     //   })
  //     //   .catch((err) => {
  //     //     message.error("上传失败");
  //     //   })
  //     //   .finally(() => this.onCloseModal());
  //   });
  // };
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
      imgprv,
    } = this.state;
    const { user } = JSON.parse(localStorage.getItem("userInfo"));
    console.log(localStorage.getItem("userInfo"), "000000");
    const uploadButton = (
      <div style={{ marginLeft: "6px" }}>
        {/* <PlusOutlined />
        <div className="ant-upload-text">Upload</div> */}
        <Button>上传头像</Button>
      </div>
    );
    const { imageUrl, srcCropper, visible, confirmLoading } = this.state;
    console.log(srcCropper, "srcCropper");
    return (
      <div>
        <img
          src={
            user.avatar && !imgprv
              ? user.avatar
              : imgprv
              ? imgprv
              : defaultAvatar
          }
          style={{
            width: 100,
            height: 100,
            border: "1px solid gray",
            marginBottom: 30,
            objectFit: "cover",
          }}
        />
        <Upload
          action={needOption.url}
          listType="picture"
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
          showUploadList={false}
        >
          {uploadButton}
        </Upload>
        {/* <Modal
          visible={previewVisible}
          title={previewTitle}
          footer={null}
          onCancel={this.handleCancel}
        >
          <img alt="example" style={{ width: "100%" }} src={previewImage} />
        </Modal> */}
        {/* <Modal
          visible={visible}
          onOk={this.saveImg}
          onCancel={this.onCloseModal}
          okText="确认上传"
          cancelText="取消"
          confirmLoading={confirmLoading}
        >
          {srcCropper ? (
            <Cropper
              style={{ height: 400 }}
              src={srcCropper}
              ref="cropper"
              // ref={cropper => this.cropper = cropper}
              // Cropper.js options
              viewMode={1}
              zoomable={false}
              aspectRatio={75 / 32}
              guides={true}
              viewMode={1}
              background={false} //是否显示马赛克
              rotatable={true} //是否旋转
              preview=".cropper-preview"
            />
          ) : (
            ""
          )}
        </Modal> */}
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

const PersonalProfile = (content) => {
  const [form] = Form.useForm();
  const onFinish = async (values) => {
    const options = {
      introduce: values.introduction,
      email: values.email,
    };
    const res = await updateDataApi(options);
    if (res.code === 0) {
      message.success("修改成功");
    }
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
  const data = JSON.parse(localStorage.getItem("userInfo"));
  const mobile = sessionStorage.getItem("mobile");
  const email = sessionStorage.getItem("email");
  const nick_name = sessionStorage.getItem("nick_name");

  return (
    <Form
      {...formItemLayout}
      form={form}
      name="personalprofile"
      onFinish={onFinish}
      initialValues={{
        prefix: "86",
        remember: true,
      }}
      scrollToFirstError
    >
      <Form.Item
        name="nickname"
        label="昵称"
        initialValues={nick_name}
        rules={[
          {
            required: false,
            message: "请输入昵称",
            whitespace: true,
          },
        ]}
      >
        <Input disabled defaultValue={nick_name} />
      </Form.Item>

      {/* <Form.Item name="birthdate" label="出生日期" hasFeedback>
        <DatePicker />
      </Form.Item> */}

      <Form.Item name="phone" initialValues={mobile} label="绑定手机">
        <Input
          addonBefore={prefixSelector}
          defaultValue={mobile}
          disabled
          style={{
            width: "100%",
          }}
        />
      </Form.Item>

      <Form.Item
        name="email"
        label="绑定邮箱"
        initialValues={email}
        rules={[
          {
            required: true,
            type: "email",
            message: "请输入正确的邮箱",
          },
        ]}
      >
        <Input />
      </Form.Item>

      {/* <Form.Item name="academic-degree" label="最高学位">
        <Select placeholder="请选择学位" allowClear>
          <Option value="primary-school">小学</Option>
          <Option value="junior-high">初中</Option>
          <Option value="senior-high">高中</Option>
          <Option value="bachelor">本科</Option>
          <Option value="master">硕士</Option>
          <Option value="phd">博士</Option>
          <Option value="other">其他</Option>
        </Select>
      </Form.Item> */}

      <Form.Item name="residence" label="实名验证">
        <Input disabled />
      </Form.Item>

      <Form.Item
        name="introduction"
        initialValues={data.user.introduce}
        rules={[
          {
            required: true,
            message: "请输入正确的简介",
          },
          {
            max: 60,
            message: "最多不能超过六十个字符",
          },
        ]}
        label="个人简介"
      >
        <Input.TextArea defaultValue={data.user.introduce} />
      </Form.Item>
      <Form.Item {...tailFormItemLayout}>
        <Button type="primary" htmlType="submit">
          修改
        </Button>
      </Form.Item>
      {/* <Form.Item name="sex" label="性别">
        <Select placeholder="请选择性别" allowClear>
          <Option value="male">男</Option>
          <Option value="female">女</Option>
          <Option value="none">保密</Option>
        </Select>
      </Form.Item> */}

      {/* <Form.Item name="permission" label="个人信息访问权限">
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
      </Form.Item> */}

      {/* <Form.Item name="weibo" label="微博">
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
      </Form.Item> */}
      {/* 
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
      </Form.Item> */}

      {/* <Form.Item name="other" label="其他">
        <Input />

        <Button
          className="margin-t"
          type="primary"
          htmlType="submit"
          size="small"
        >
          关联
        </Button>
      </Form.Item> */}
    </Form>
  );
};

export default function Profile() {
  const { TabPane } = Tabs;
  const data = JSON.parse(localStorage.getItem("userInfo"));
  const mobile = sessionStorage.getItem("mobile");
  const email = sessionStorage.getItem("email");
  const nick_name = sessionStorage.getItem("nick_name");
  console.log(data, "data");
  const message = {
    mobile,
    email,
    nick_name,
    introduce: data.user.introduce,
  };
  return (
    <Row className="mainwidth margin-1">
      <div>
        <Tabs tabPosition="left">
          <TabPane tab="个人基本信息" key="1">
            <Card className="margin-1" title="基本信息">
              <Row style={{ position: "relative" }}>
                <Col span={4} className="gap">
                  <AvatarUpload />
                </Col>
                <div
                  style={{
                    borderLeft: "1px solid #1890ff",
                    display: "inline-block",
                    verticalAlign: "top",
                    width: "2px",
                    height: "300px",
                    position: "absolute",
                    left: "140px",
                  }}
                ></div>
                <Col span={18}>
                  <PersonalProfile content={message} />
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
