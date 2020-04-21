import React from 'react'
import { Form, Modal, Button, Table, Divider, Input } from 'antd'
import '../Payment/index.less'
const FormItem = Form.Item
export default class AfterSalesReasonSetting extends React.Component {
  constructor() {
    super()
    this.state = {
      dataSource: [
        {
          Id: 0,
          Tuiyuanyin: '颜色问题',
        },
        {
          Id: 1,
          Tuiyuanyin: '七天无理由退换货',
        },
        {
          Id: 2,
          Tuiyuanyin: '物流',
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
        title: "退款/退货原因",
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
        <Button style={{ margin: '14px 0' }} icon="plus" onClick={this.addAfterWhy}>新增售后原因</Button>

        <Table
          rowKey={row => row.Id}
          columns={columns}
          dataSource={dataSource}
        />

        <AfterWhyModal targetRef={ref=>this.child=ref} />

      </div>
    )
  }
}


@Form.create()
class AfterWhyModal extends React.Component {
  constructor(){
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
  show= () => {
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
  render () {
    const formItemLayout = {
      labelCol: { span: 5 },
      wrapperCol: { span: 18 },
    };
    const {visible,title} = this.state
    const {getFieldDecorator} = this.props.form
    return (
      <Modal
        visible={visible}
        title={title}
        onOk={this.onOk}
        onCancel={this.onCancel}
      >
        <Form {...formItemLayout}>
          <FormItem key='AfterWhy' label='售后原因'>
            {getFieldDecorator('AfterWhy')(
              <div className="form-item">
                <Input type="text" style={{ marginTop: 4, width: '90%' }} />
                <span className="form-text">限20字符</span>
              </div>
            )}
          </FormItem>
        </Form>

      </Modal>
    )
  }
}