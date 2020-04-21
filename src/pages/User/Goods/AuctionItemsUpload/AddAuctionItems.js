import React from 'react'

import { Modal, Form, Input, Button, InputNumber, Select } from 'antd'
import { getOptionsList } from '../../../../utils'
class AddAuctionItems extends React.Component {
  constructor() {
    super()

    this.state = {
      title: '',
      visible: false,
    }
  }

  componentDidMount() {
    this.props.triggerRef && this.props.triggerRef(this)
  }

  add = () => {
    this.setState({
      title: '添加拍品'
    })
    this.show()
  }
  edit = () => {
    this.setState({
      title: '编辑拍品'
    })
    this.show()
  }
  show = () => {
    this.setState({
      visible: true,
    })
  }
  onCancel = () => {
    this.setState({
      visible: false,
    })
  }

  verifyParams = (params) => {

    return true
  }

  onOk = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        let params = {
          ...values,
        }
        console.log(params)
        if (!this.verifyParams(params)) {
          return false
        }
      }
    });
  }
  render() {

    const formLayout = {
      labelCol: { span: 4 },
      wrapperCol: { span: 18 },
    }
    const { getFieldDecorator } = this.props.form
    const { title, visible } = this.state
    const footer = (
      <div>
        <Button type="primary" style={{ marginRight: 10 }} onClick={this.onOk}>保存</Button>
        <Button style={{ marginRight: 10 }}>保存并下一份</Button>
        <Button type="danger" style={{ marginRight: 10 }} onClick={this.onCancel}>取消</Button>
      </div>
    )
    return (
      <Modal
        width={700}
        title={title}
        visible={visible}
        footer={footer}
        onCancel={this.onCancel}
      >
        <div className="aai-box" style={{ maxHeight: 620, overflow: 'auto' }}>
          <Form  {...formLayout}>
            <Form.Item label="拍品名称">
              {getFieldDecorator('name', { valuePropName: 'value', rules: [{ required: true, message: '' }] })(<Input placeholder='请输入名称' />)}
            </Form.Item>


            <Form.Item label="数量">
              {getFieldDecorator('number', { valuePropName: 'value', rules: [{ required: true, message: '' }] })(<InputNumber placeholder='' />)}
            </Form.Item>


            <Form.Item label="作者">
              {getFieldDecorator('zuozhe', { valuePropName: 'value' })(<Input style={{ width: 200 }} placeholder='请输入作者' />)}
            </Form.Item>

            <Form.Item label="年代">
              {getFieldDecorator('ninadai', { valuePropName: 'value' })(<Input placeholder='' />)}
            </Form.Item>

            <Form.Item label="质地形式">
              {getFieldDecorator('xingshi', { valuePropName: 'value' })(
                <Select placeholder='请选择质地形式'>
                  {getOptionsList([
                    { id: 0, value: '0', label: '第一类' },
                    { id: 1, value: '1', label: '第er类' },
                  ])}
                </Select>
              )}
            </Form.Item>


            <Form.Item label="尺寸">
              {getFieldDecorator('chicun', { valuePropName: 'value' })(<Input placeholder='' />)}
            </Form.Item>

            <Form.Item label="底价">
              {getFieldDecorator('dijia', { valuePropName: 'value' })(<InputNumber placeholder='' />)}
            </Form.Item>
            <Form.Item label="起拍价">
              {getFieldDecorator('qipaijia', { valuePropName: 'value' })(<InputNumber placeholder='' />)}
            </Form.Item>


            <Form.Item label="保证金">
              {getFieldDecorator('baozhengjin', { valuePropName: 'value' })(<InputNumber placeholder='' />)}
            </Form.Item>
            <Form.Item label="估价">
              {getFieldDecorator('gujia', { valuePropName: 'value' })(<InputNumber placeholder='' />)}
            </Form.Item>
            <Form.Item label="主标签">
              {getFieldDecorator('zhubiaoqian', { valuePropName: 'value' })(
                <Select placeholder='请选择主标签'>
                  {getOptionsList([
                    { id: 0, value: '0', label: '第一类' },
                    { id: 1, value: '1', label: '第er类' },
                  ])}
                </Select>
              )}
            </Form.Item>
            <Form.Item label="副标签">
              {getFieldDecorator('fubiaoqian', { valuePropName: 'value' })(
                <Select placeholder='请选择副标签'>
                  {getOptionsList([
                    { id: 0, value: '0', label: '第一类' },
                    { id: 1, value: '1', label: '第er类' },
                  ])}
                </Select>
              )}
            </Form.Item>
            <Form.Item label="所属店铺">
              {getFieldDecorator('suoshudianbu', { valuePropName: 'value' })(
                <Select placeholder='请选择所属店铺'>
                  {getOptionsList([
                    { id: 0, value: '0', label: '第一类' },
                    { id: 1, value: '1', label: '第er类' },
                  ])}
                </Select>
              )}
            </Form.Item>
          </Form>
        </div>
      </Modal>
    )
  }
}


export default Form.create()(AddAuctionItems)