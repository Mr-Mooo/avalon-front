import React from "react";

import "antd/dist/antd.css";
import { Form, Card, Radio, Row, Button, Input, message } from "antd";
import { signUpApi } from "../../services/user";
import { withRouter } from "react-router-dom";
import "./index1.css";
const layout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 16,
  },
};

class Step2 extends React.PureComponent {
  // state = {
  //   active: true,
  // };
  onFinish = async () => {
    const data = {
      question1: "2",
      question2: "4",
      question3: "3",
      question4: "1",
      question5: "4",
      question6: "1",
      question7: "1",
      question8: "3",
      question9: "2",
      question10: "4",
    };
    let num = 0;

    console.log(234567);
    const fieldsValue = await this.formRef.current.validateFields();
    console.log(fieldsValue);
    console.log(11111111);
    for (const key in data) {
      if (data[key] !== fieldsValue[key]) {
        num++;
      }
      if (num > 4) {
        message.info("抱歉您未通过测试 请重新再来");
        setTimeout(() => {
          this.props.history.push("/");
        }, 2000);
        return;
      }
    }
    const options = {};
    options.mobile = sessionStorage.getItem("mobile");
    options.password = sessionStorage.getItem("password");
    options.otp = sessionStorage.getItem("otp");
    // const options = fieldsValue;
    console.log(options);
    message.loading("Loading...", 20, () => {
      message.destroy();
    });
    const res = await signUpApi(options);
    if (res) {
      message.destroy();
      this.setState({
        mailVisible: true,
      });
      this.props.next();
    }
    // sessionStorage.setItem('options', options);
  };

  formRef = React.createRef();
  render() {
    // const { active } = this.state;
    // const { getFieldDecorator } = form;
    console.log(this.props);
    return (
      <Card title="答题验证">
        <Form {...layout} name="nest-messages" ref={this.formRef}>
          <Form.Item>
            一、“同人”一词源于日语中的“どうじん”，它的含义是？"
            <Form.Item
              name="question1"
              rules={[
                {
                  required: true,
                  message: "请选择题目",
                },
              ]}
            >
              <Radio.Group name="question1">
                <Radio value="1">A.同一个人</Radio>
                <Radio value="2">B.志同道合之人</Radio>
                <Radio value="3">C.同性恋人群</Radio>
                <Radio value="4">D.少林寺十八铜人</Radio>
              </Radio.Group>
            </Form.Item>
          </Form.Item>

          <Form.Item>
            二、现代同人的正式解读是？
            <Form.Item
              name="question2"
              rules={[
                {
                  required: true,
                  message: "请选择题目",
                },
              ]}
            >
              <Radio.Group name="question2">
                <Radio value="1">A.具有正式商业性质的创作活动</Radio>
                <br />
                <Radio value="2">B.由原作/原型官方出品的衍生创作活动</Radio>
                <br />
                <Radio value="3">
                  C.由创作者原创、并具有商业性质的创作活动
                </Radio>
                <br />
                <Radio value="4">D.非正式商业性质的创作活动</Radio>
              </Radio.Group>
            </Form.Item>
          </Form.Item>

          <Form.Item>
            三、在同人创作活动之中，最为核心的目的应是？
            <Form.Item
              name="question3"
              rules={[
                {
                  required: true,
                  message: "请选择题目",
                },
              ]}
            >
              <Radio.Group name="question3">
                <Radio value="1">A.赚取利益</Radio>
                <Radio value="2">B.博得关注与热度</Radio>
                <Radio value="3">C.分享与交流</Radio>
                <Radio value="4">D.拉帮结派、党同伐异</Radio>
              </Radio.Group>
            </Form.Item>
          </Form.Item>
          <Form.Item>
            四、在我国当前的网络语境下，我们在多数情况中所说的“同人”一般是指？
            <Form.Item
              name="question4"
              rules={[
                {
                  required: true,
                  message: "请选择题目",
                },
              ]}
            >
              <Radio.Group name="question4">
                <Radio value="1">A.基于某一原作/原型的二次创作</Radio>
                <Radio value="2">B.桐谷和人</Radio>
                <Radio value="3">C.少林寺十八铜人</Radio>
                <Radio value="4">D.同一个人</Radio>
              </Radio.Group>
            </Form.Item>
          </Form.Item>
          <Form.Item>
            五、基于以上定义，以下作品之中哪些可以被视为“同人创作”？
            <Form.Item
              name="question5"
              rules={[
                {
                  required: true,
                  message: "请选择题目",
                },
              ]}
            >
              <Radio.Group name="question5">
                <Radio value="1">A.《西游记》对于玄奘法师的二次创作</Radio>
                <br />
                <Radio value="2">
                  B.《三国演义》、《水浒转》对于真实历史的二次创作
                </Radio>
                <br />
                <Radio value="3">C.《红楼梦》第80章以后的他人续写</Radio>
                <br />
                <Radio value="4">D.以上全是</Radio>
              </Radio.Group>
            </Form.Item>
          </Form.Item>
          <Form.Item>
            六、在我国当前的网络语境下，对于没有原作/原型、且不以盈利为目的原创作品，以下定义正确的是？
            <Form.Item
              name="question6"
              rules={[
                {
                  required: true,
                  message: "请选择题目",
                },
              ]}
            >
              <Radio.Group name="question6">
                <Radio value="1">
                  A.仍然属于同人范畴，即所谓“原创同人”或“一创同人”
                </Radio>
                <br />
                <Radio value="2">B.与二次创作性质一样的同人创作</Radio>
                <br />
                <Radio value="3">C.原创作品不属于同人</Radio>
                <br />
                <Radio value="4">D.尚不明确无法定义</Radio>
              </Radio.Group>
            </Form.Item>
          </Form.Item>
          <Form.Item>
            七、基于以上定义，以下作品之中哪些可以被视为“原创同人”或“一创同人”？
            <Form.Item
              name="question7"
              rules={[
                {
                  required: true,
                  message: "请选择题目",
                },
              ]}
            >
              <Radio.Group name="question7">
                <Radio value="1">A.以下全是</Radio>
                <br />
                <Radio value="2">
                  B.小明出于兴趣、且不以盈利为目的，写的原创小说
                </Radio>
                <br />
                <Radio value="3">
                  C.小红出于兴趣、且不以盈利为目的，画的原创插画
                </Radio>
                <br />
                <Radio value="4">
                  D.小花出于兴趣、且不以盈利为目的，画的原创漫画
                </Radio>
              </Radio.Group>
            </Form.Item>
          </Form.Item>
          <Form.Item>
            八、除了以上所提及的“文字形式”与“图片形式”以外，还有哪些常见的同人创作形式？
            <Form.Item
              name="question8"
              rules={[
                {
                  required: true,
                  message: "请选择题目",
                },
              ]}
            >
              <Radio.Group name="question8">
                <Radio value="1">A.同人音乐</Radio>
                <Radio value="2">B.同人游戏</Radio>
                <Radio value="3">C.其余三者全是</Radio>
                <Radio value="4">D.同人视频</Radio>
              </Radio.Group>
            </Form.Item>
          </Form.Item>
          <Form.Item>
            九、对于以现实生活之中的真人作为创作原型时，以下处理方式正确的是？
            <Form.Item
              name="question9"
              rules={[
                {
                  required: true,
                  message: "请选择题目",
                },
              ]}
            >
              <Radio.Group name="question9">
                <Radio value="1">A.无所顾忌，随意而为</Radio>
                <br />
                <Radio value="2">
                  B.在发布时利用标题、TAG等方式，主动申明“纯属虚构”
                </Radio>
                <br />
                <Radio value="3">
                  C.使用容易让他人产生误解的标题、TAG以获取更多的关注
                </Radio>
                <br />
                <Radio value="4">D.在内容中进行“拉踩”等行为，挑起争端</Radio>
              </Radio.Group>
            </Form.Item>
          </Form.Item>
          <Form.Item>
            十、对于公开表示不欢迎以自身为原型的同人创作的人或组织，以下处理方式正确的是？
            <Form.Item
              name="question10"
              rules={[
                {
                  required: true,
                  message: "请选择题目",
                },
              ]}
            >
              <Radio.Group name="question10">
                <Radio value="1">A.义愤填膺，强烈声讨其人/组织</Radio>
                <br />
                <Radio value="2">B.偷偷摸摸的继续创作</Radio>
                <br />
                <Radio value="3">C.不屑一顾，我行我素</Radio>
                <br />
                <Radio value="4">
                  D.尊重其意愿，主动停止一切与其人/组织相关的同人创作活动，并删除曾经发布的相关作品（同时通过有效途径告知我们，我们在进行核实确认之后，也将对相关作品不再收录）
                </Radio>
              </Radio.Group>
            </Form.Item>
          </Form.Item>
          <div style={{ textAlign: "center" }}>
            <Button style={{ marginLeft: 8 }} onClick={() => this.props.prev()}>
              上一步
            </Button>
            <Button type="primary" onClick={this.onFinish}>
              下一步
            </Button>
          </div>
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

export default withRouter(Step2);
