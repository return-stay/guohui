import React from 'react'
import { Modal, Button, Form, Select, Input, message } from 'antd'

import './index.less'
const { Option } = Select;
class ArticleSortModal extends React.Component {
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

        message.success('保存成功')
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

  add = (item) => {
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
  }


  render() {
    const { visible, loading, title } = this.state
    const { getFieldDecorator } = this.props.form;
    const formItemLayout = {
      labelCol: { span: 6 },
      wrapperCol: { span: 14 },
    };
    const selectArr = [{ key: 'jack', value: 'jack', id: 0 }, { key: 'luck', value: 'luck', id: 1 }, { key: 'yiminghe', value: 'yiminghe', id: 2 }]
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
          <Form.Item label="上级分类">
            {getFieldDecorator('shangjifenlei', { valuePropName: 'value', initialValue: 1 })(<Select>
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

export default Form.create()(ArticleSortModal)


const BaseOption = (item) => {
  return <Option value={item.id} key={item.id}>{item.value}</Option>
}
