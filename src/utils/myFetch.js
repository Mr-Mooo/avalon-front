import request from 'superagent';

const myFetch = async (url, parmas = {}, type = 'GET') => {
  // console.log(url, 'urls')
  try {
    const token = sessionStorage.getItem('token');
    const headers = {};
    headers['Content-Type'] = 'application/json';
    headers['Authorization'] = `Bearer ${token}`;
    let res;
    let promise = {};
    switch (type) {
      case 'GET':
        res = await request
          .get(url)
          .set(headers)
          .withCredentials()
          .query(parmas);
        break;
      case 'POST':
        res = await request
          .post(url)
          .set(headers)
          .withCredentials()
          .send(parmas);
        break;
      case 'PUT':
        res = await request
          .put(url)
          .set(headers)
          .withCredentials()
          .send(parmas);
        break;
      case 'DELETE':
        res = await request
          .del(url)
          .set(headers)
          .withCredentials()
          .send(parmas);
        break;
      case 'HEAD':
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
      }
      return false;
    }
  } catch (e) {
    // console.log(e, 'e')
  }
  return false;
};

export default myFetch;
