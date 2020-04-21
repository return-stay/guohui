import React from 'react'

import { Divider, Modal, Input, Button, Form, message } from 'antd'
import GtableEdit from '../../../../common/GtableEdit'
import { withRouter } from 'react-router-dom'
import './index.less'

const { confirm } = Modal
class StoreLabelSetting extends React.Component {
  constructor() {
    super()

    this.state = {
      urls: {
        list: ''
      },
      dataSource: [
        {
          Id: 2,
          Title: "阿艺福家电清洗连锁",
          ShopBranchCount: 3,
        }
      ]
    }
  }

  // 添加标签
  add = () => {
    this.storeLabelChild.add()
  }

  edit = (item) => {
    this.storeLabelChild.edit(item)
  }

  orderNavigation = (item) => {
    console.log(item)
    this.props.history.push({
      pathname: '/user/deals/order'
    })
  }

  delete = (item) => {
    confirm({
      title: '确定要删除标签吗?',
      onOk() {
        console.log('OK');
      },
    })
  }

  render() {
    let { urls, dataSource } = this.state;
    const _columns = (that) => {
      const _this = this
      return [
        {
          title: '标签名称',
          key: 'Title',
          dataIndex: 'Title',
        },
        {
          title: '门店数量',
          key: 'ShopBranchCount',
          dataIndex: 'ShopBranchCount',
        },
        {
          title: '操作',
          render: (item) => {
            return (
              <>
                <span style={{ color: '#1890ff', cursor: 'pointer' }} onClick={() => { _this.edit(item) }}>修改</span>
                <Divider type="vertical" />
                <span style={{ color: '#1890ff', cursor: 'pointer' }} onClick={() => { _this.delete(item) }}>删除</span>
              </>
            )
          }
        }
      ]
    }

    return (
      <>
        <div style={{ textAlign: 'right', marginBottom: 10, paddingRight: 30 }}>
          <Button onClick={this.add} type="primary">添加标签</Button>
        </div>
        <GtableEdit
          urls={urls}
          columns={_columns}
          dataSource={dataSource}
          isRowSelection={false}
        />
        <StoreLabelModal triggerRef={ref => this.storeLabelChild = ref} />
      </>
    )
  }
}

export default withRouter(StoreLabelSetting)


class StoreLabelModalForm extends React.Component {
  constructor() {
    super()
    this.state = {
      visible: false,
    }
  }
  componentDidMount() {
    this.props.triggerRef && this.props.triggerRef(this)
  }

  add = () => {
    this.setState({
      title: '添加标签'
    })
    this.show()
  }

  edit = (item) => {
    this.setState({
      title: '编辑标签',
      storeLabelItem: item
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
    console.log(e)
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log(values)

        message.success('成功')
      }
    });
  }
  render() {
    const formItemLayout = {
      labelCol: { span: 5 },
      wrapperCol: { span: 18 },
    };
    const { visible, title } = this.state;
    const { getFieldDecorator } = this.props.form
    return (
      <Modal
        visible={visible}
        title={title}
        onOk={this.onOk}
        onCancel={this.onCancel}
        destroyOnClose={true}
      >
        <Form {...formItemLayout}>
          <Form.Item label="标签名称">
            {getFieldDecorator('Title', { valuePropName: 'value' })(<Input />)}
          </Form.Item>
        </Form>

      </Modal>
    )
  }
}
const StoreLabelModal = Form.create()(StoreLabelModalForm)