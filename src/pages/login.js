import React from "react";
import {
  Form,
  Input,
  Button,
  Checkbox,
  Row,
  Col,
  notification,
  message,
} from "antd";
// import { connect } from 'react-redux';

import "antd/dist/antd.css";
import "./login.css";
import { BrowserRouter as Router, withRouter, Link } from "react-router-dom";
// import { Link } from "react-router-dom";
import { loginApi, userApi } from "../services/user";
import { userMessageApi } from "../services/content";
import { baseUrl } from "../utils/util.js";
import ForgotPassword from "../components/forgot-password";
let i = 1;
class Login extends React.PureComponent {
  componentWillMount() {
    if (i === 1) {
      console.log(this.props);
      // window.location.reload();
      i++;
    }
    console.log("App-页面即将加载");
  }
  // const Loginform = () => {
  // const login = async options => {
  //   console.log(options);
  //   message.loading('Loading...', 20, () => {
  //     message.destroy();
  //   });
  //   const loginRes = await loginApi(options);
  //   message.destroy();
  //   if (loginRes) {
  //     notification.success({
  //       message: 'Login successful!',
  //       description: null,
  //       duration: 2,
  //     });
  //     // sessionStorage.setItem('token', loginRes.access_token);
  //     sessionStorage.setItem('mobile', loginRes.mobile);
  //     sessionStorage.setItem('email', loginRes.email);
  //     sessionStorage.setItem('nick_name', loginRes.nick_name);
  //     // sessionStorage.setItem('phone', loginRes.phone);
  //     // sessionStorage.setItem('type', loginRes.type);
  //     sessionStorage.setItem('user_id', loginRes.user_id);
  //     // const { dispatch } = this.props;
  //     // dispatch({
  //     //   type: 'global/getBankData',
  //     // });
  //     // this.getLoanSimpleDetailApi();
  // this.props.history.push('/ho');
  //   }
  // };

  onFinish = async (values) => {
    console.log("Success:", values);
    // login(values);
    message.loading("Loading...", 20, () => {
      message.destroy();
    });
    const loginRes = await loginApi(values);
    message.destroy();
    console.log(loginRes, "red");
    if (loginRes.code === 0) {
      notification.success({
        message: "Login successful!",
        description: null,
        duration: 2,
      });

      // sessionStorage.setItem('token', loginRes.access_token);
      sessionStorage.setItem("mobile", loginRes.data.mobile);
      sessionStorage.setItem("email", loginRes.data.email);
      sessionStorage.setItem("nick_name", loginRes.data.nick_name);
      // sessionStorage.setItem('phone', loginRes.phone);
      // sessionStorage.setItem('type', loginRes.type);
      sessionStorage.setItem("user_id", loginRes.data.user_id);
      // const { dispatch } = this.props;
      // dispatch({
      //   type: 'global/getBankData',
      // });
      // this.getLoanSimpleDetailApi();
      // this.props.history.push('/dashboard');

      const userRes = await userMessageApi();
      localStorage.setItem("userInfo", JSON.stringify(userRes.data));
      window.location.replace(`${baseUrl}dashboard`);
      // this.props.history.push("");
    }
  };

  onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  goSign = () => {
    this.props.history.push("/sign-up");
  };
  render() {
    const {
      children,
      location: { pathname },
    } = this.props;

    // window.location.reload();
    // location.reload()
    return (
      <div className="login-card">
        <Row>
          <Col span={15} className="login-panel-bg" />
          <Col span={9} className="padding-1">
            <Form
              name="basic"
              initialValues={{
                remember: true,
              }}
              onFinish={this.onFinish}
              onFinishFailed={this.onFinishFailed}
            >
              <Form.Item
                label="手机号码"
                name="mobile"
                rules={[
                  {
                    required: true,
                    message: "请输入手机号",
                  },
                  {
                    pattern: /^1[3456789]\d{9}$/,
                    message: "请输入正确的手机号",
                  },
                ]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                label="登陆密码"
                name="password"
                rules={[
                  {
                    required: true,
                    message: "请输入密码",
                  },
                  { min: 6, message: "密码最少要6个字符" },
                ]}
              >
                <Input.Password />
              </Form.Item>

              <Form.Item name="remember" valuePropName="checked">
                <Checkbox>记住密码</Checkbox>
              </Form.Item>
              <Router>
                <Form.Item>
                  <Button type="primary" htmlType="submit" block>
                    <span>登陆</span>
                  </Button>
                  <Button
                    onClick={() => {
                      this.goSign();
                    }}
                    className="margin-t"
                    block
                  >
                    注册
                  </Button>
                  <br />
                  <br />
                  <a href={"/forgot-password"} className="margin-t">
                    忘记密码？
                    {/* <Route path="/forgot-password" component={ForgotPassword} replace /> */}
                  </a>
                </Form.Item>
              </Router>
            </Form>
          </Col>
        </Row>
      </div>
    );
  }
}
export default withRouter(Login);
