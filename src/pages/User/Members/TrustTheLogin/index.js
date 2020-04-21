// 信任登录
import React from 'react'
import GtableEdit from '../../../../common/GtableEdit'
import { Switch, Icon } from 'antd'
import TrustTheLoginModal from './TrustTheLoginModal'
export default class TrustTheLogin extends React.Component {
  constructor() {
    super()
    this.state = {
      urls: {
        list: '',
        add: '',
        edit: '',
        delete: '',
      },
      dataSource: [
        {
          Id: 10000,
          TrustLogin: '京东云',
          IsSwitch: false,
        },
        {
          Id: 10001,
          TrustLogin: 'QQ',
          IsSwitch: false,
        },
        {
          Id: 10002,
          TrustLogin: '新浪微博',
          IsSwitch: false,
        },
        {
          Id: 10003,
          TrustLogin: '微信',
          IsSwitch: true,
        }
      ]
    }
  }
  deleteCallback = (e) => {
    console.log(e)
  }

  editCallback = (e) => {
    this.loginChild.edit(e)
  }

  onSwitchChange = (e, item) => {
    console.log(e)

    let data = this.state.dataSource

    for (let i = 0, len = data.length; i < len; i++) {
      if (data[i].Id === item.Id) {
        data[i].IsSwitch = !data[i].IsSwitch
      }
    }

    this.setState({
      dataSource: data
    })
  }

  // 修改，添加成功回调
  onTrustTheLoginModalCallback = () => { }
  render() {
    let { urls, dataSource } = this.state;
    const _columns = (that) => {
      return [
        {
          title: '信任登录',
          key: 'TrustLogin',
          dataIndex: 'TrustLogin',
        },
        {
          title: '开关',
          key: 'Switch',
          render: (item) => (
            <Switch
              checkedChildren={<Icon type="plus" />}
              unCheckedChildren={<Icon type="minus" />}
              checked={item.IsSwitch}
              onChange={e => this.onSwitchChange(e, item)}
            />
          )
        },
        {
          title: '操作',
          render: (item) => {
            return (
              <>
                <span style={{ color: '#1890ff' }} onClick={(e) => that.handleEdit(e, item)}>编辑</span>
              </>
            )
          }
        }
      ]
    }
    return (
      <div>
        <GtableEdit
          triggerRef={ref => this.child = ref}
          urls={urls}
          dataSource={dataSource}
          columns={_columns}
          isRowSelection={false}
          editCallback={this.editCallback}
        />

        <TrustTheLoginModal triggerRef={ref => this.loginChild = ref} onTrustTheLoginModalCallback={this.onTrustTheLoginModalCallback} />

      </div>
    )
  }
}