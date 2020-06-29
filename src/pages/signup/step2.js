import React from "react";

import "antd/dist/antd.css";
import { Form, Card, Radio, Row, Button, Input, message } from "antd";
import { signUpApi } from '../../services/user';
import "./index1.css";
const layout = {
  labelCol: {
    span: 8
  },
  wrapperCol: {
    span: 16
  }
};

class Step2 extends React.PureComponent {
  
  // state = {
  //   active: true,
  // };
  onFinish = async () => {
    console.log(234567);
    const fieldsValue = await this.formRef.current.validateFields();
    console.log(fieldsValue);
    console.log(11111111);
    const options = {};
    options.mobile = sessionStorage.getItem('mobile');
    options.password = sessionStorage.getItem('password');
    options.otp = sessionStorage.getItem('otp');
    // const options = fieldsValue;
    console.log(options);
    message.loading('Loading...', 20, () => {
      message.destroy();
    });
    const res = await signUpApi(options);
    if (res) {
      message.destroy();
      this.setState({
        mailVisible: true
      })
      this.props.next()
    }
    // sessionStorage.setItem('options', options);
  };

  formRef = React.createRef();
  render() {

    // const { active } = this.state;
    // const { getFieldDecorator } = form;
    console.log(this.props)
    return (

      <Card title="答题验证" className="cardXX">
        <Form {...layout} name="nest-messages" ref={this.formRef}>

          <Form.Item
            
          >一、“同人”一词源于日语中的“どうじん”，它的含义是？"
            <Form.Item
              name="question1"
              rules={[
                {
                  required: true
                }
              ]}
            >
              <Radio.Group name="question1">
                <Radio value={1}>A.同一个人</Radio>
                <Radio value={2}>B.志同道合之人</Radio>
                <Radio value={3}>C.同性恋人群</Radio>
                <Radio value={4}>D.少林寺十八铜人</Radio>
              </Radio.Group>
            </Form.Item>

          </Form.Item>

          <Form.Item
          >
          二、现代同人的正式解读是？
            <Form.Item
              name="question2"
              rules={[
                {
                  required: true
                }
              ]}
            >
              <Radio.Group name="question2">
                <Radio value={1}>A.具有正式商业性质的创作活动</Radio>
              <br/>
                <Radio value={2}>B.由原作/原型官方出品的衍生创作活动</Radio>
              <br/>
                <Radio value={3}>C.由创作者原创、并具有商业性质的创作活动</Radio>
              <br/>
                <Radio value={4}>D.非正式商业性质的创作活动</Radio>
              </Radio.Group>
            </Form.Item>

          </Form.Item>

          <Form.Item
          >
          三、在同人创作活动之中，最为核心的目的应是？
            <Form.Item
              name="question3"
              rules={[
                {
                  validator: (_, value) =>
                    value ? Promise.resolve() : Promise.reject('Please consent to the agreement.'),
                },
              ]}
            >

              <Radio.Group name="question3">
                <Radio value="1" >A.赚取利益</Radio>
                <Radio value="2" >B.博得关注与热度</Radio>
                <Radio value="3" >C.分享与交流</Radio>
                <Radio value="4">D.拉帮结派、党同伐异</Radio>
              </Radio.Group>
            </Form.Item>
          </Form.Item>

          <Button style={{ marginLeft: 8 }} onClick={() => this.props.prev()}>
            上一步
        </Button>
          <Button type="primary" onClick={this.onFinish}>
            下一步
        </Button>
        </Form>
      </Card>
    );
  }
}
// const QuestionForm = (func) => {
//   const onFinish = values => {
//     console.log(values);
//     console.log(234567);
//   };
//   const props = func.props;
//   console.log(props, 'this.ques props')

// };

// export default function Step2(props) {
//   console.log(props, 'this.step2 props')
//   // console.log(JSON.parse(sessionStorage.getItem('options')))
//   return (
//     {/* <Card title="答题验证">
//       <QuestionForm props={props} />
//     </Card> */}
//   );
// }


export default Step2;
