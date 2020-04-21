import React from 'react'
import { Modal, Button, Form, Input, Icon, message, Upload } from 'antd'

import './index.less'
class AddModalBrand extends React.Component {
  state = {
    visible: false,
    loading: false,
    imgLoading: false,
  }
  componentDidMount() {
    this.props.triggerRef(this)
  }
  handleOk = e => {
    console.log(e)
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.setState({ loading: true });
        // console.log('Received values of form: ', values);
        console.log(this.state.imageUrl)
        setTimeout(() => {
          this.setState({ loading: false, visible: false });
        }, 3000);
      }
    });

  };

  handleCancel = e => {
    this.setState({
      visible: false,
    });
  };

  modalShow = () => {
    this.setState({
      visible: true,
      title: '新增'
    });
  }

  add = () => {
    this.setState({
      visible: true,
      title: '新增'
    });
  }
  edit = () => {
    this.setState({
      visible: true,
      title: '编辑'
    });
  }

  handleChange = info => {
    if (info.file.status === 'uploading') {
      this.setState({ imgLoading: true });
      return;
    }
    if (info.file.status === 'done') {
      // Get this url from response in real world.
      getBase64(info.file.originFileObj, imageUrl =>
        this.setState({
          imageUrl,
          imgLoading: false,
        }),
      );
    }
  };

  render() {
    const uploadButton = (
      <div>
        <Icon type={this.state.imgLoading ? 'loading' : 'plus'} />
        <div className="ant-upload-text">Upload</div>
      </div>
    );
    const { visible, loading, title, imageUrl } = this.state
    const { getFieldDecorator } = this.props.form;
    const formItemLayout = {
      labelCol: { span: 4 },
      wrapperCol: { span: 20 },
    };

    return (
      <Modal
        title={title}
        visible={visible}
        onOk={this.handleOk}
        width={660}
        onCancel={this.handleCancel}
        destroyOnClose={true}
        footer={[
          <Button key="back" onClick={this.handleCancel}>
            取消
          </Button>,
          <Button key="submit" type="primary" htmlType="submit" loading={loading} onClick={this.handleOk}>
            保存
          </Button>,
        ]}
      >
        <Form {...formItemLayout}>

          <Form.Item label="名称">
            {getFieldDecorator('inputName', { valuePropName: 'value', rules: [{ required: true, message: '请输入名称' }] })(<Input placeholder='请输入名称' />)}
          </Form.Item>

          <Form.Item label="图片">

            <div className="img-box">
              {getFieldDecorator('imageUrl', { valuePropName: 'upload' })(<Upload
                name="avatar"
                listType="picture-card"
                className="avatar-uploader"
                showUploadList={false}
                action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                beforeUpload={beforeUpload}
                onChange={this.handleChange}
              >
                {imageUrl ? <img src={imageUrl} alt="avatar" style={{ width: '100%' }} /> : uploadButton}
              </Upload>)}

              <span className='img-box-text'>建议尺寸128*128</span>

            </div>

          </Form.Item>
          <Form.Item label="title">
            <div className="input-box">
              <div className="img-box-left">
                {getFieldDecorator('title', { valuePropName: 'value', rules: [{ required: true, message: '请输入名称' }] })(<Input placeholder='请输入名称' />)}
              </div>
              <span className='input-box-text'>SEO优化用的网站标题，有利于搜索引擎抓取</span>
            </div>
          </Form.Item>
          <Form.Item label="keywords">
            <div className="input-box">
              
              <div className="img-box-left">
              {getFieldDecorator('keywords', { valuePropName: 'value', rules: [{ required: true, message: '请输入名称' }] })(<Input placeholder='请输入名称' />)}
              </div>
              <span className='input-box-text'>SEO优化用的网站关键词，有利于搜索引擎抓取</span>
            </div>
          </Form.Item>
          <Form.Item label="description">
            <div className="input-box">
              
              <div className="img-box-left">
              {getFieldDecorator('description', { valuePropName: 'value', rules: [{ required: true, message: '请输入名称' }] })(<Input placeholder='请输入名称' />)}
              </div>
              <span className='input-box-text'>SEO优化用的网站描述，有利于搜索引擎抓取</span>
            </div>
          </Form.Item>


        </Form>
      </Modal>
    )
  }
}

export default Form.create()(AddModalBrand)


function getBase64(img, callback) {
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result));
  reader.readAsDataURL(img);
}

function beforeUpload(file) {
  const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
  if (!isJpgOrPng) {
    message.error('You can only upload JPG/PNG file!');
  }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    message.error('Image must smaller than 2MB!');
  }
  return isJpgOrPng && isLt2M;
}