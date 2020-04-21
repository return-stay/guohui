import React from 'react'
import { Modal, Button, Input, message } from 'antd'
import GtableEdit from '../../../../common/GtableEdit'
class VdianReplace extends React.Component {
  constructor() {
    super()
    this.state = {
      urls: {
        list: ''
      },
      visible: false,
      vdianItem: {},
      dataSource: [
        {
          Id: 29,
          name: "潘旭的店铺",
          creatTime: "2019/10/9 16:20:57",
          vshopTypes: "普通微店",
          categoryName: "美食",
          visiteNum: 24,
          buyNum: 0,
          StateStr: "审核通过",
          IsOpenStr: "已关闭",
          IsOpen: false,
        }
      ]
    }
  }
  componentDidMount() {
    this.props.tirggerRef && this.props.tirggerRef(this)
  }

  show = (item) => {
    this.setState({
      visible: true,
      vdianItem: item
    })
  }
  onCancel = () => {
    this.setState({
      visible: false,
    })
  }

  replace = () => {
    message.success('替换成功')
    this.onCancel()
    this.props.replaceSuccess()
  }
  render() {
    const { visible, urls, dataSource } = this.state
    const _columns = (that) => {
      const _this = this
      return [
        {
          title: '微店名称',
          key: 'name',
          dataIndex: 'name',
        },
        {
          title: '经营类目',
          key: 'categoryName',
          dataIndex: 'categoryName',
        },
        {
          title: '添加时间',
          key: 'addTime',
          dataIndex: 'addTime',
        },
        {
          title: '进店浏览量',
          key: 'visiteNum',
          dataIndex: 'visiteNum',
        },
        {
          title: '成交量',
          key: 'buyNum',
          dataIndex: 'buyNum',
        },
        {
          title: '操作',
          render: (item) => {
            return (
              <>
                <span style={{ color: '#1890ff', cursor: 'pointer' }} onClick={() => { _this.replace(item) }}>替换</span>
              </>
            )
          }
        }
      ]
    }
    return (
      <Modal
        width={700}
        title="替换微店"
        visible={visible}
        onCancel={this.onCancel}
        footer={null}
      >
        <div style={{ marginBottom: 10 }}>
          <span>微店名称</span>
          <Input style={{ width: 200, margin: '0 10px' }} />
          <Button type="primary">搜索</Button>
        </div>

        <GtableEdit
          urls={urls}
          columns={_columns}
          isRowSelection={false}
          dataSource={dataSource}
        />
      </Modal>
    )
  }
}


export default VdianReplace