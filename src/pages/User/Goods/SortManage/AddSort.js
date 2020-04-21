import React from 'react'
import { Modal, Button, Form, Select, Input, Icon, message, Upload } from 'antd'

import './index.less'
const { Option } = Select;
class AddSort extends React.Component {
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
    });
  }

  add = () => {
    this.setState({
      title: '新增'
    });
    this.modalShow()
  }
  edit = () => {
    this.setState({
      title: '编辑'
    });
    this.modalShow()
    setTimeout(() => {
      this.props.form.setFieldsValue({
        inputName: '我是编辑的设置内容'
      })
    }, 0);
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
      labelCol: { span: 6 },
      wrapperCol: { span: 14 },
    };

    const selectArr = [{ key: '1', value: '一级分类', id: 1 }, { key: '2', value: '二级分类', id: 2 }, { key: '3', value: '三级分类', id: 3 }]
    return (
      <Modal
        title={title}
        visible={visible}
        onOk={this.handleOk}
        onCancel={this.handleCancel}
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

          {/* <Form.Item label="上级分类">
            {getFieldDecorator('shangjifenlei', { valuePropName: 'value', initialValue: 1 })(<Select>
              {
                selectArr.map((item) => {
                  return BaseOption(item)
                })
              }
            </Select>)}
          </Form.Item> */}

          <Form.Item label="选择类型">
            {getFieldDecorator('xuanzeleixing', { valuePropName: 'value', initialValue: 2, rules: [{ required: true, message: '请选择类型' }] })(<Select>
              {
                selectArr.map((item) => {
                  return BaseOption(item)
                })
              }
            </Select>)}
          </Form.Item>
        </Form>
      </Modal>
    )
  }
}

export default Form.create()(AddSort)


const BaseOption = (item) => {
  return <Option value={item.id} key={item.id}>{item.value}</Option>
}


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