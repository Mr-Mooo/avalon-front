import request from "superagent";
import { message, notification } from "antd";
// import { history } from 'umi';
import { baseUrl } from "../utils/util.js";

function errTip(e, url) {
  if (
    e.response &&
    e.response.body &&
    e.response.body.msg &&
    typeof e.response.body.msg === "string"
  ) {
    if (url.includes("/admin/login")) {
      notification.error({
        message: e.response && e.response.body && e.response.body.msg,
        description: null,
        duration: 2,
      });
    } else if (sessionStorage.getItem("token")) {
      notification.error({
        message: e.response && e.response.body && e.response.body.msg,
        description: null,
        duration: 2,
      });
    }
  } else if (
    e.response &&
    e.response.body &&
    e.response.body.msg &&
    typeof e.response.body.msg === "object"
  ) {
    let result = "";
    e.response.body.msg.map((val) => {
      result += `${val.field} ${val.message} \n`;
    });
    if (url.includes("/admin/login")) {
      notification.error({
        message: result,
        description: null,
        duration: 2,
      });
    } else if (sessionStorage.getItem("token")) {
      notification.error({
        message: result,
        description: null,
        duration: 2,
      });
    }
  }
  if (e.response && e.response.body && e.response.body.message) {
    if (url.includes("/admin/login")) {
      // new LightTip().error(e.response && e.response.body && e.response.body.message, 2);
      notification.error({
        message: e.response && e.response.body && e.response.body.message,
        description: null,
        duration: 2,
      });
    } else if (sessionStorage.getItem("token")) {
      notification.error({
        message: e.response && e.response.body && e.response.body.message,
        description: null,
        duration: 2,
      });
    }
  }
}

const myFetch = async (url, parmas = {}, type = "GET") => {
  // console.log(url, 'urls')
  try {
    // const token = sessionStorage.getItem('token');
    const headers = {};
    headers["Content-Type"] = "application/json";
    // headers['Authorization'] = `Bearer ${token}`;
    let res;
    let promise = {};
    switch (type) {
      case "GET":
        res = await request
          .get(url)
          .set(headers)
          .withCredentials()
          .query(parmas);
        break;
      case "POST":
        res = await request
          .post(url)
          .set(headers)
          .withCredentials()
          .send(parmas);
        break;
      case "PUT":
        res = await request
          .put(url)
          .set(headers)
          .withCredentials()
          .send(parmas);
        break;
      case "DELETE":
        res = await request
          .del(url)
          .set(headers)
          .withCredentials()
          .send(parmas);
        break;
      case "HEAD":
        res = await request
          .get(url)
          .set(headers)
          .withCredentials()
          .query(parmas);
        break;
      default:
        res = await request
          .get(url)
          .set(headers)
          .withCredentials()
          .query(parmas);
    }
    if (res) {
      if (res.ok && res.statusCode === 200) {
        promise = Object.assign({}, res.body);
        if (promise && promise.code === 0) {
          return promise;
        }
        // console.log(promise, 'promise')
        message.destroy();
        notification.destroy();
        let errorStr = promise.messageDetail;
        // console.log(url, 'url')
        if (promise.code === 1001) {
          if (Array.isArray(promise.data)) {
            promise.data.map((val) => {
              errorStr = "";
              errorStr += `${val.field_display} ${val.message} \n`;
            });
            notification.error({
              message: errorStr,
              description: null,
              duration: 3,
            });
            return false;
          }
        }
        // console.log(errorStr, 'errorStr')
        if (promise.message && typeof promise.message === "string") {
          notification.error({
            message: errorStr,
            description: null,
            duration: 2,
          });
        }
        if (promise.code === 4001) {
          sessionStorage.clear();
          // this.props.history.push('/login');

          window.location.replace(baseUrl);
          // const urlParams = new URL(window.location.href);
          // console.log(urlParams, 'urlParams')
        }
      }
      if (res.statusCode === 4001) {
        sessionStorage.clear();
        // this.props.history.push('/dashboard');
        window.location.replace(baseUrl);
      }
      return false;
    }
  } catch (e) {
    // console.log(e, 'e')
    message.destroy();
    // console.log(e.response, 555)
    // console.log(e.response.body, 'e')
    if (e.status === 401) {
      sessionStorage.clear();
      if (e.response && e.response.body) {
        message.error(e.response.body.msg, 2);
        // new LightTip().error(e.response.body.msg, 2);
      }
      // this.props.history.push('/dashboard');
      window.location.replace(baseUrl);
    } else {
      // console.log(e.response.body, 'e.response.body.msg')
      errTip(e, url);
    }
    return false;
  }
  return false;
};

export default myFetch;
