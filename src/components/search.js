import React from "react";
import { Input } from "antd";
import "antd/dist/antd.css";
import "../index.css";
import { contentListApi } from "../services/content";
import emitter from "../utils/events.js";
import { Link, withRouter } from "react-router-dom";
const { Search } = Input;

class SearchNav extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {};
  }
  onchange = (value) => {
    emitter.emit("changeMessage", value);
    this.props.history.push("/search");
  };
  render() {
    return (
      <Search
        placeholder="热搜关键词"
        onSearch={(value) => this.onchange(value)}
        enterButton
      />
    );
  }
}
export default withRouter(SearchNav);
