import React from "react";
import "antd/dist/antd.css";
import { Form, Input, Button, Card, Checkbox, Statistic, notification } from "antd";
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import FormItem from "antd/lib/form/FormItem";
import { sendOtpApi } from '../../services/user';
import "./index1.css";

const layout = {
  labelCol: {
    span: 8
  },
  wrapperCol: {
    span: 16
  }
};
const { Countdown } = Statistic;
class Step1 extends React.PureComponent {

  state = {
    // loginAvailable: false,
    loginAvailable: true,
    countdownAvailable: false,
    tipPhone: null,
    bankList: [],
    showAccept: false,
  };
  onSubmit = async () => {
    const fieldsValue = await this.formRef.current.validateFields();

    const { loginAvailable } = this.state;
    if (!loginAvailable) {
      notification.error({
        message: '请发送验证码',
        description: null,
        duration: 2,
      });
    } else {
      sessionStorage.setItem('mobile', fieldsValue.mobile);
      sessionStorage.setItem('password', fieldsValue.password);
      sessionStorage.setItem('otp', fieldsValue.otp);
      this.props.next()
    }
  }
  formRef = React.createRef();
  getOtp = async () => {
    this.formRef.current
      .validateFields(['mobile'])
      .then(async values => {
        const { loginAvailable } = this.state;
        this.setState({
          countdownAvailable: true,
        });
        const options = {
          phone: values.mobile,
          type: 'signup',
        };
        console.log(12345678976543)
        console.log(values)
        const res = await sendOtpApi(options);
        if (res) {
          if (!loginAvailable) {
            this.setState({ loginAvailable: true });
          }
          // this.setState({ tipPhone: res.phone });
        }
      })
      .catch(errorInfo => {
        // console.log(errorInfo, 'errorInfo');
      });
  };
  render() {

    const deadline = Date.now() + 1000 * 60;
    const { loginAvailable, countdownAvailable } = this.state;
    console.log(this.props)
    return (
      <Card title="注册账号" className="step1-card cardXX">
        <Form {...layout} ref={this.formRef} onFinish={this.onSubmit} className="step1-wrap" className="padding-1">
          <Form.Item
            name="mobile"
            label="手机号码"
            className="item"
            rules={[
              {
                type: "string",
                required: true
              },
              ({ getFieldValue }) => ({
                validator(rule, value) {
                  if (!value || getFieldValue('mobile') === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject('phone numbers do not match.');
                },
              })
            ]}
          >
            <Input className="input-width" placeholder="请输入11位手机号码" />
          </Form.Item>
            <Form.Item
              name="otp"
              label="短信验证码"
              rules={[
                {
                  required: true
                }
              ]}>
              <Input className="input-width" placeholder="请输入短信验证码" />
            {
                countdownAvailable
                  ?
                  <Button type="primary" className="gray-block send-btn">
                    <Countdown value={deadline} format="s" suffix="S" onFinish={() => { this.setState({ countdownAvailable: false }) }} />
                  </Button>
                  :
                  <Button
                    type="primary"
                    onClick={this.getOtp}
                  >
                    获取验证码
              </Button>
              }
          </Form.Item>

          <Form.Item
            name="nick_name"
            label="用户名"
            rules={[
              {
                type: "string",
                required: true
              },
              ({ getFieldValue }) => ({
                validator(rule, value) {
                  if (!value || getFieldValue('nick_name') === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject('用户名不可用');
                },
              })
            ]}
          >
            <Input className="input-width" placeholder="请输入用户名" />
          </Form.Item>
          <Form.Item
            name="password"
            label="密码"
            rules={[
              {
                type: "string",
                required: true
              }
            ]}
          >
            <Input.Password className="input-width" placeholder="请输入6-16位密码" />
          </Form.Item>
          <Form.Item
            name="password_confrim"
            label="确认密码"
            rules={[
              {
                type: "string",
                required: true
              }
            ]}
          >
            <Input.Password className="input-width" placeholder="请确认密码密码" />
          </Form.Item>
          <div style={{marginLeft:"350px"}}>
            <Form.Item
              name="agree"
              label=""
              valuePropName="checked"
              rules={[
                {  required: true,
                  validator: (_, value) =>
                    value ? Promise.resolve() : Promise.reject('Please consent to the agreement.'),
                },
              ]}
            >
              <Checkbox>勾选表示我已同意平台合作协议</Checkbox>
            </Form.Item>
            <Form.Item
              label="">
            <Button type="primary" onClick={() => {
              this.onSubmit()
            }}>
              下一步
          </Button>
          </Form.Item>
        </div>
        </Form>
      </Card>
    );
  }
}
export default Step1;