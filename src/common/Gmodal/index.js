import React from 'react'
import { Modal, Button, Form } from 'antd'
class Gmodal extends React.Component {
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
        console.log(values)
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

  render() {
    const { visible, loading, title } = this.state
    const { modalormBase } = this.props
    return (
      <Modal
        title={title}
        visible={visible}
        onOk={this.handleOk}
        onCancel={this.handleCancel}
        width={660}
        footer={[
          <Button key="back" onClick={this.handleCancel}>
            取消
          </Button>,
          <Button key="submit" type="primary" htmlType="submit" loading={loading} onClick={this.handleOk}>
            保存
          </Button>,
        ]}
      >
        <Form layout='inline'>
          {/* {modalormBase()} */}
        </Form>

      </Modal>
    )
  }
}

export default Form.create()(Gmodal)