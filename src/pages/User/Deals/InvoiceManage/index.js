import React from 'react'
import { Form, Modal, Button, Table, Divider, Input } from 'antd'
import '../Payment/index.less'
const FormItem = Form.Item
export default class InvoiceManage extends React.Component {
  constructor() {
    super()
    this.state = {
      dataSource: [
        {
          Id: 0,
          Tuiyuanyin: '测试',
        },
        {
          Id: 1,
          Tuiyuanyin: '办公用品',
        },
        {
          Id: 2,
          Tuiyuanyin: '文具用品',
        }
      ]
    }
  }

  addAfterWhy = () => {
    this.child.add()
  }

  editAfterWhy = () => {
    this.child.edit()
  }
  render() {
    const columns = [
      {
        Id: 0,
        title: "发票内容",
        key: 'Tuiyuanyin',
        dataIndex: 'Tuiyuanyin',
      },
      {
        Id: 1,
        title: "操作",
        key: 'action',
        render: () => {
          return (
            <>
              <span style={{ color: '#2481d1', cursor: 'pointer', fontSize: 12 }} onClick={this.editAfterWhy}>编辑</span>
              <Divider type="vertical" />
              <span style={{ color: '#2481d1', cursor: 'pointer', fontSize: 12 }} onClick={this.delete}>删除</span>
            </>
          )
        }
      }
    ]
    const { dataSource } = this.state
    return (
      <div>
        <Button style={{ marginBottom: 14 }} icon="plus" onClick={this.addAfterWhy}>新增</Button>

        <Table
          rowKey={row => row.Id}
          columns={columns}
          dataSource={dataSource}
        />

        <AfterWhyModal targetRef={ref => this.child = ref} />

      </div>
    )
  }
}


@Form.create()
class AfterWhyModal extends React.Component {
  constructor() {
    super()
    this.state = {
      visible: false,
      title: ''
    }
  }
  componentDidMount() {
    this.props.targetRef && this.props.targetRef(this)
  }
  add = () => {
    this.setState({
      title: '添加售后原因'
    })
    this.show()
  }
  edit = () => {
    this.setState({
      title: '编辑售后原因'
    })
    this.show()
  }
  show = () => {
    this.setState({
      visible: true,
    })
  }
  onOk = (e) => {

  }
  onCancel = () => {
    this.setState({
      visible: false,
    })
  }
  render() {
    const formItemLayout = {
      labelCol: { span: 5 },
      wrapperCol: { span: 18 },
    };
    const { visible, title } = this.state
    const { getFieldDecorator } = this.props.form
    return (
      <Modal
        visible={visible}
        title={title}
        onOk={this.onOk}
        onCancel={this.onCancel}
      >
        <Form {...formItemLayout}>
          <FormItem key='AfterWhy' label='发票内容'>
            {getFieldDecorator('AfterWhy')(
              <Input type="text" />
            )}
          </FormItem>
        </Form>

      </Modal>
    )
  }
}