import React from "react";

import "antd/dist/antd.css";
import { Steps, Button, message, Card } from "antd";
import Step1 from "./step1";
import Step2 from "./step2";
import Step3 from "./step3";

const Step = Steps.Step;

const steps = [
  {
    title: "手机验证",
    content: <Step1 />
  },
  {
    title: "验证答题",
    content: <Step2 />
  },
  {
    title: "注册成功",
    content: <Step3 />
  }
];

class Signup extends React.Component {
  state = {
    current: 0,
  };
  componentDidMount() {
    
    const { location } = this.props;
    console.log(location)
  }
  next() {
    const current = this.state.current + 1;
    console.log(current);
    console.log(this.state);
    console.log(this.props);
    this.setState({ current });
  }

  prev() {
    const current = this.state.current - 1;
    console.log(current);
    console.log(this.state);
    console.log(this.props);
    this.setState({ current });
  }

  render() {
    const { current } = this.state;
    return (
      <Card className="mainwidth">
      <div>
        <Steps current={current}>
          {steps.map(item => (
            <Step key={item.title} title={item.title} />
          ))}
        </Steps>
        
        <div className="steps-content">{steps[current].content}</div>
        
        <div className="steps-action">
          
          {current === 1 && (
            <Button style={{ marginLeft: 8 }} onClick={() => this.prev()}>
              上一步
            </Button>
          )}
          {current < steps.length - 1 && (
            <Button type="primary" onClick={() => this.next()}>
              下一步
            </Button>
          )}
          {current === steps.length - 1 && (
            <Button
              type="primary"
              onClick={() => message.success("Processing complete!")}
            >
              完成
            </Button>
          )}
        </div>
      </div>
    </Card>
    );
  }
}

export default Signup;
