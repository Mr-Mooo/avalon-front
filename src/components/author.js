import React from "react";

import {
  List,
  Card,
  Col,
  Row,
  Avatar,
  Tag,
  Popover,
  Divider,
  Button,
  Tooltip,
  message,
  Modal,
  Comment,
  Form,Select ,
  Input
} from "antd";
import { UserOutlined } from "@ant-design/icons";
import "antd/dist/antd.css";
import "../index.css";
import { Dianzan,guanzhu,gotuijian,gogetComment,goComment,gopinbi,gotousu } from '../services/content';
import {
  CrownOutlined,
  HeartOutlined,
  LikeOutlined,
  MessageOutlined,
  RotateRightOutlined,
  MailOutlined,
  SmileOutlined,
  DownOutlined,
} from "@ant-design/icons";
import { Link, withRouter } from "react-router-dom";
const { Option } = Select;
const { TextArea } = Input;

const Editor = ({ onChange, onSubmit, submitting, value }) => (
  <div>
    <Form.Item>
      <TextArea rows={4} onChange={onChange} value={value} />
    </Form.Item>
    <Form.Item>
      <Button htmlType="submit" loading={submitting} onClick={onSubmit} type="primary">
       新增评论
      </Button>
    </Form.Item>
  </div>
);

class Author extends React.PureComponent {
  constructor(props){
    super(props);
    this.state={
      visible: false,
      commentList:[],
      comments: [],
      submitting: false,
      value: '',
      optionss:{},
      visible1:false,
      type:1,
      value1:'',
      content_id:''
    }
}

goDianzan=async (id)=>{
  let options={
    content_id:id,
   	is_delete:0
  }
  const addRes = await Dianzan(options);
    if(addRes&&addRes.success){
      message.success("点赞成功");
      this.props.refush()
    }
}

gocollect=async (id)=>{
  let options={
    content_id:id,
   	is_delete:0
  }
  const addRes = await guanzhu(options);
    if(addRes&&addRes.success){
      message.success("关注成功");
      this.props.refush()
    }
}

gogetComment=async (id)=>{
  let options={
    pid:1,
    content_id:id
  }

   this.setState({
    optionss:options
   })

   const addRes =await gogetComment(options);
  
   if(addRes&&addRes.success){
      this.setState({commentList:[]},()=>{
         this.setState({commentList:addRes.data})
      })
  }
  this.setState({visible:true})
}

gotuijian=async (id)=>{
  let options={
    content_id:id,
   	is_delete:0
  }
  const addRes = await gotuijian(options);
    if(addRes&&addRes.success){
      message.success("推荐成功");
      this.props.refush()
    }
}

handleOk = e => {
  this.setState({
    visible: false,
  });
};

handleCancel = e => {
  this.setState({
    visible: false,
  });
};

handleOk1 =async e => {
  // 屏蔽动态
  const {content_id,type,value1}=this.state;
    if(type==1){
      let options={
        content_id:content_id
      }
      const addRes = await gopinbi(options);
      if(addRes.success){
        message.success("您已成功屏蔽该动态");
        this.props.refush()
      }
    }else{
      if(!value1){
        message.error("文本框不能为空")
        return;
      }

      let options={
        content_id:content_id,
        reason:value1
      }
      const addRes = await gotousu(options);
      if(addRes.success){
        message.success("您已成功投诉该动态");
        this.props.refush()
      }

    }
   this.setState({
    visible1: false,
    value1:''
  });
};

handleCancel1 = e => {
  this.setState({
    visible1: false,
  });
};



handleSubmit = () => {
  const {optionss}=this.state;
  if (!this.state.value) {
    return;
  }
  this.setState({
    submitting: true,
  });

  setTimeout(() => {
    this.setState({
      submitting: false,
      value: ''
    });
  }, 1000);
  optionss.content=this.state.value;
  delete optionss.pid;
  this.goComment(optionss)
};

  goComment=async (optionss)=>{
    let options={...optionss}
    const addRes = await goComment(options);
      if(addRes&&addRes.success){
        message.success("评论成功");
       this.gogetComment(options.content_id)
      }
  }

  setComment=(pid,ref_id)=>{
    
  }

  handleChange = e => {
    this.setState({
      value: e.target.value,
    });
  };

  onChange1=e=>{
    this.setState({
      value1: e.target.value,
    });
  }

  handleChange1=(value)=>{
    this.setState({type:value})
  }

  goModal=(id)=>{
    this.setState({visible1:true,content_id:id})
  }

  render() {
    const { contentData } = this.props;
    const { comments, submitting, value,commentList,type,value1,visible1 } = this.state;

    return (
      <List className="margin listAuthor">
        <Row>
          <Col className="align-center" xs={12} sm={12} md={4} lg={4} span={60}>
            <Popover
              content={
                <div className="author-popover">
                  {" "}
                  <Avatar
                    className="margin-bt-sm"
                    size={64}
                    icon={<UserOutlined />}
                  />
                  <p>作者昵称</p>
                  <p>
                    {contentData.content}
                  </p>
                  <Divider />
                  <Row className="align-center">
                    <Col span={8}>
                      {" "}
                      <h3>关注  {contentData.avl_user.follolw_number}</h3>
                    </Col>

                    <Col span={8}>
                      <h3>粉丝  {contentData.avl_user.fans_number}</h3>
                    </Col>
                    <Col span={8}>
                      <h3>投稿   {contentData.avl_user.content_number}</h3>
                    </Col>
                  </Row>
                  <Button type="primary" size="small" className="margin-sm"    onClick={()=>this.gocollect(contentData.avl_user.user_id)}>
                    <SmileOutlined />
                    关注
                  </Button>
                  <Button size="small" className="margin-sm">
                    <MailOutlined /> 私信
                  </Button>
                  <Link to="/user">
                    <Button size="small" className="margin-sm">
                      <MailOutlined /> 查看主页
                    </Button>
                  </Link>
                </div>
              }
            >
              {" "}
              <Avatar
                className="margin-bt-sm"
                size={64}
                icon={<UserOutlined />}
              />
            </Popover>
            {/* <span>{contentData['avl_user.nick_name']}</span> */}

            <br />
            <span>
              <h3>估计会被看见你来</h3>
            </span>
            {contentData &&
              contentData.avl_user &&
              contentData.avl_user.nick_name}
            <div className="icons-list">
              <HeartOutlined className="margin-sm" />
              <HeartOutlined className="margin-sm" />
              <HeartOutlined className="margin-sm" />
            </div>
            {/* <Button type="primary" size="small">
              <SmileOutlined /> 关注
            </Button> */}
          </Col>
          <Col span={20} className="align-left">
            <Row>
              <h3>标题</h3>
              <DownOutlined className="icon-down" onClick={()=>this.goModal(contentData.content_id)}></DownOutlined>
            </Row>
            
            <div className="showThree"><Tooltip placement="topLeft" title={contentData && contentData.subject} arrowPointAtCenter>{contentData && contentData.subject} </Tooltip></div>
            {contentData &&
              contentData.avl_attachments &&
              contentData.avl_attachments.map((val) => {
                console.log(val, "val.path");
                return (
                  <Avatar
                    key={val.document_id}
                    className="margin-author-img"
                    shape="square"
                    size={64}
                    src={val.path}
                  />
                );
              })}
            {/* <Avatar
            className="margin-author-img"
            shape="square"
            size={64}
            src="../img/photo7.jpg"
          />
          <Avatar
            className="margin-author-img"
            shape="square"
            size={64}
            src="../img/photp8.jpg"
          /> */}
            <br />
            <br />
            <Row className="buttom-click">
              <div className="iconShow">
                {/* 推荐 */}
                <RotateRightOutlined className="margin-sm" onClick={()=>this.gotuijian(contentData.content_id)}/>
                {contentData.recommend_number}
              </div>
              <div className="iconShow"  onClick={()=>this.gogetComment(contentData.content_id)}>
                {/* 评论 */}
                <MessageOutlined className="margin-sm" />
                {contentData.comment_number}
              </div>
              <div className="iconShow">
                {/* 点赞 */}
                <LikeOutlined className="margin-sm" onClick={()=>this.goDianzan(contentData.content_id)}/>   
               {contentData.like_number}
              </div>
               {/* 收藏 */}
              {/* <div className="iconShow">
                <CrownOutlined className="margin-sm"/>
                {contentData.collect_number}
              </div> */}
              {/* <Tag>
                <HeartOutlined className="margin-sm" />
              收藏
            </Tag> */}
            </Row>
          </Col>
        </Row>
        <Modal
          title="评论列表"
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          cancelText="取消"
          okText="确定"
        >
     <div>
        <List
          itemLayout="horizontal"
          dataSource={commentList}
          renderItem={item => (
            <List.Item>
              <List.Item.Meta
                avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
                title={<a href="https://ant.design">{item.nick_name}</a>}
                description={item.content}
                onClick={()=>this.setComment(item.pid,item.ref_id)}
              />
            </List.Item>
          )}
        />

        <Comment
          // avatar={
          //   <Avatar
          //     src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
          //     alt="Han Solo"
          //   />
          // }
          content={
            <Editor
              onChange={this.handleChange}
              onSubmit={this.handleSubmit}
              submitting={submitting}
              value={value}
            />
          }
        />
      </div>
        </Modal>

        <Modal
          title="动态处理"
          visible={this.state.visible1}
          cancelText="取消"
          okText="确定"
          onOk={this.handleOk1}
          onCancel={this.handleCancel1}
        >
           <Select defaultValue="1" style={{ width: 120 }} onChange={this.handleChange1}>
            <Option value="1">屏蔽动态</Option>
            <Option value="2">投诉动态</Option>
          </Select>
           {type==1?null:<div>           
            <TextArea rows={4} onChange={this.onChange1} value={value1} style={{marginTop:"20px"}}/>          
             </div>}
        </Modal>


      </List>
    );
  }
}

export default withRouter(Author);
// export default function Author(props) {
//   const content = (
//   );
//   const { contentData } = props;
//   console.log(contentData,
//     'contentData ...')
// }
