import React from 'react'
import { Modal, Form, Input } from 'antd'
// import TypeForm from './TypeForm'
class AddModalType extends React.Component {
  constructor() {
    super()
    this.state = {
      type: 'search',
      visible: false,
      loading: false,
      imgLoading: false,
      width: 500,
      mockData: [],
      targetKeys: []
    }
  }

  componentDidMount() {
    this.props.triggerRef && this.props.triggerRef(this)
  }
  handleOk = e => {
    console.log(e)
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.setState({ loading: true });
        // console.log('Received values of form: ', values);
        console.log(values)
        console.log(this.state.imageUrl)
        setTimeout(() => {
          this.setState({ loading: false, visible: false });
        }, 3000);
      }
    });
  };

  onEmpty = () => {
    this.handleCancel()
  }

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

  search = () => {
    this.setState({
      title: '请输入搜索条件'
    });
    this.modalShow()
  }

  add = () => {
    this.setState({
      title: '新增属性',
    });
    this.modalShow()

  }
  edit = ({ type, item }) => {
    this.setState({
      title: '编辑属性',
    });
    this.modalShow()
  }

  render() {
    const { visible, title } = this.state
    const { getFieldDecorator } = this.props.form;
    const formItemLayout = {
      labelCol: { span: 6 },
      wrapperCol: { span: 16 },
    }
    return (
      <Modal
        title={title}
        visible={visible}
        width={600}
        onCancel={this.handleCancel}
        onClick={this.handleOk}
      >

        <div style={{ maxHeight: 700 }}>
          <Form {...formItemLayout}>
            <Form.Item label="属性名称">
              {getFieldDecorator('name', { valuePropName: 'name', rules: [{ required: true, message: '请输入熟悉感名称' }] })(<Input placeholder='请输入属性名称' />)}
            </Form.Item>
          </Form>
        </div>

        {/* <TypeForm form={this.props.form} /> */}
      </Modal>
    )
  }
}

export default Form.create()(AddModalType)