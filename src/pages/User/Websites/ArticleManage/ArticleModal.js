import React from 'react'
import { Form, Modal, Input, Checkbox, Select, message } from 'antd'
import Geditor from '../../../../common/Geditor'
import './index.less'
const { Option } = Select;
class ArticleModal extends React.Component {
  constructor() {
    super()

    this.state = {
      visible: false,
      title: '',
      articleItem: {},
    }
  }

  componentDidMount() {
    this.props.triggerRef && this.props.triggerRef(this)
  }

  add = (item) => {
    this.setState({
      title: '新增',
      articleItem: item,
    })
    this.show()
  }

  edit = (item) => {
    this.setState({
      articleItem: item,
      title: '编辑'
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

  onOk = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {

        console.log(values)

        message.success('保存成功')
        this.onCancel()
      }
    });
  }
  render() {

    const { getFieldDecorator } = this.props.form;
    const formItemLayout = {
      labelCol: { span: 4 },
      wrapperCol: { span: 20 },
    };
    const { visible, title } = this.state
    return (
      <div className="art-modal-box">

        <Modal
          width={790}
          title={title}
          visible={visible}
          onCancel={this.onCancel}
          onOk={this.onOk}
          destroyOnClose={true}
        >

          <div className="art-modal-form">
            <Form {...formItemLayout}>

              <Form.Item label="标题">
                {getFieldDecorator('title', { valuePropName: 'value', rules: [{ required: true, message: '请输入标题' }] })(<Input style={{ width: 300 }} />)}
              </Form.Item>

              <Form.Item label="所属分类">
                {getFieldDecorator('categoryName', { valuePropName: 'value', initialValue: '0', rules: [{ required: true, message: '请选择所属分类' }] })(
                  <Select style={{ width: 300 }} >
                    <Option value="0">请选择</Option>
                    <Option value="1">商城公告</Option>
                    <Option value="2">投融资服务</Option>
                  </Select>
                )}
              </Form.Item>


              <Form.Item label="内容">
                {getFieldDecorator('content', { valuePropName: 'value', rules: [{ required: false, message: '请输入内容' }] })(
                  <Geditor />
                )}
              </Form.Item>


              <Form.Item label="Title">
                {getFieldDecorator('Title', { valuePropName: 'value' })(<Input style={{ width: 300 }} />)}
              </Form.Item>
              <Form.Item label="Keywords">
                {getFieldDecorator('Keywords', { valuePropName: 'value' })(<Input style={{ width: 300 }} />)}
              </Form.Item>
              <Form.Item label="Description">
                {getFieldDecorator('Description', { valuePropName: 'value' })(<Input style={{ width: 300 }} />)}
              </Form.Item>

              <Form.Item label="是否显示">
                {getFieldDecorator('isShow', { valuePropName: 'checked' })(<Checkbox>是</Checkbox>)}
              </Form.Item>

            </Form>

          </div>
        </Modal>
      </div>
    )
  }
}



export default Form.create()(ArticleModal)