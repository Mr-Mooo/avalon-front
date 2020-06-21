import React from "react";

import "antd/dist/antd.css";
import { Form, Input, Button, Card, Checkbox } from "antd";
import FormItem from "antd/lib/form/FormItem";

const layout = {
  labelCol: {
    span: 8
  },
  wrapperCol: {
    span: 16
  }
};
class Step1 extends React.PureComponent {
  onSubmit = async () => {
    const fieldsValue = await this.formRef.current.validateFields();
    console.log(fieldsValue);
    console.log(11111111);
    const options = fieldsValue;
    
    sessionStorage.setItem('options', options);
    this.props.next()
  }
formRef = React.createRef();
  render(){
    console.log(this.props)
    return (
      <Card title="注册账号">
      <Form {...layout} ref={this.formRef} onFinish={this.onSubmit} className="step1-wrap">
        <Form.Item
          name="mobile"
          label="手机号码"
          rules={[
            {
              type: "string",
              required: true
            }
          ]}
        >
          <Input placeholder="请输入11位手机号码" />
        </Form.Item>
        {/* <Form.Item
          name="pic"
          label="图片验证码"
          rules={[
            {
              required: true
            }
          ]}
        >
          <Input placeholder="请输入图片中的数字" />
        </Form.Item> */}
        <Form.Item
          name="otp"
          label="短信验证码"
          rules={[
            {
              type: "string",
              required: true
            }
          ]}
        >
          <Input placeholder="请输入短信验证码" />
        </Form.Item>
        
        <Button type="primary">获取验证码</Button>
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
          <Input placeholder="请输入6-16位密码" />
        </Form.Item>
  
        <Form.Item
        name="agree"
                  valuePropName="checked"
        rules={[
                    {
                      validator: (_, value) =>
                        value ? Promise.resolve() : Promise.reject('Please consent to the agreement.'),
                    },
                  ]}
          >
          <Checkbox>勾选表示我已同意平台合作协议</Checkbox>
        </Form.Item>

        <Button type="primary" onClick={() => {
          this.onSubmit()
          
        }}>
          下一步
        </Button>
      </Form>
      </Card>
    );
  }
}
export default Step1;