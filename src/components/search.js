import React from "react";
import { Input, message } from "antd";
import "antd/dist/antd.css";
import "../index.css";
import { contentListApi } from "../services/content";
import emitter from "../utils/events.js";
import { Link, withRouter } from "react-router-dom";
const { Search } = Input;

class SearchNav extends React.PureComponent {
  constructor(props) {
    super(props);
    this.eventEmitter = this.eventEmitter.bind(this);
    this.state = {
      value: "",
    };
  }
  componentDidMount() {
    this.eventEmitter = emitter.addListener("changeValue", async (message) => {
      this.setState({
        value: "",
      });
    });
  }
  // componentWillUnmount() {
  //   // 卸载时移除事件
  //   emitter.removeListener("changeValue", this.eventEmitter);
  // }
  eventEmitter = () => {};
  getValue(e) {
    this.setState({
      value: e.target.value,
    });
  }
  onchange = () => {
    const { value } = this.state;
    if (!value) {
      message.info("请输入关键词搜索");
      return;
    }
    setTimeout(() => {
      emitter.emit("changeMessage", value);
    }, 1000);

    this.props.history.push("/search");
  };
  render() {
    const { value } = this.state;
    return (
      <Search
        placeholder="热搜关键词"
        onSearch={() => this.onchange()}
        style={{ width: 550 }}
        onChange={(e) => {
          this.getValue(e);
        }}
        value={value}
        enterButton
      />
    );
  }
}
export default withRouter(SearchNav);
