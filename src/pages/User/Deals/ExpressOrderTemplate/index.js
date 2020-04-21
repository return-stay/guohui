import React from 'react'
import GtableEdit from '../../../../common/GtableEdit'
import { Radio, Popover, Icon, Divider, Switch } from 'antd'
import expressData from './expressData'

import ExpressModal from './ExpressModal'
import ExpressSetting from './ExpressSetting'


// 模板设置没有做
export default class ExpressOrderTemplate extends React.Component {
  state = {
    urls: {
      list: ''
    },
    titleList: [
      { value: '快递单模板管理', id: 0, type: 0 },
      { value: '物流设置', id: 1, type: 1 },
    ],
    dataSource: expressData,
    isExpressSetting: true,
  }

  expressTabsChange = (e) => {
    console.log(e)
    let type = e.target.value
    let bool = false
    if (type === 0) {
      // this.child.tableTabsChange(e)
      bool = true
    }
    this.setState({
      isExpressSetting: bool
    })
  }
  templateSetting = (e) => {
    console.log(e)
  }

  switchChange = (e, item) => {
    let list = this.state.dataSource

    for (let i = 0; i < list.length; i++) {
      if (list[i].Id === item.Id) {
        list[i].IsShow = !list[i].IsShow
      }
    }

    this.setState({
      dataSource: list
    })
  }
  addCallback = () => {
    this.modalChild.add()
  }
  editCallback = () => {
    this.modalChild.edit()
  }

  clickKuaidi = (e) => {
    let type = e.target.getAttribute('data-type')
    if(type === '100') {
      window.open('https://www.kuaidi100.com')
    }else {
      window.open('http://www.kdniao.com')
    }
  }
  render() {

    let { urls, titleList, dataSource, isExpressSetting } = this.state;
    // sortedInfo = sortedInfo || {};
    const _columns = (that) => {
      return [
        {
          title: '快递公司',
          key: 'CourierServicesCompany',
          dataIndex: 'CourierServicesCompany',
        },
        {
          title: '快递100code',
          key: 'Kuaidi100',
          dataIndex: 'Kuaidi100',
        },
        {
          title: '快递鸟code',
          key: 'Kdniao',
          dataIndex: 'Kdniao',
        },
        {
          title: '开启状态',
          key: 'IsShow',
          render: (item) => {
            let bool = item.IsShow ? true : false
            return (
              <>
                <Switch
                  checkedChildren={<Icon type="plus" />}
                  unCheckedChildren={<Icon type="minus" />}
                  onChange={(e) => this.switchChange(e, item)}
                  checked={bool}
                />
              </>
            )
          }
        },
        {
          title: '操作',
          render: (item) => {
            return (
              <>
                <span style={{ color: '#1890ff', cursor: 'pointer' }} onClick={(e) => { that.handleEdit(e, item) }}>编辑</span>
                <Divider type="vertical" />
                <span style={{ color: '#1890ff', cursor: 'pointer' }} onClick={(e) => { this.templateSetting(e, item) }}>模板设置</span>
                <Divider type="vertical" />
                <span style={{ color: '#1890ff', cursor: 'pointer' }} onClick={(e) => { that.handleDelete(e, item) }}>删除</span>
              </>
            )
          }
        }
      ]
    }

    const listStyle = { color: '#b2ebf2', listStyleType: 'square', marginTop: 10 }
    const content = (
      <div style={{ padding: 20, width: 480 }}>
        <h5>温馨提示：</h5>
        <ul>
          <li style={listStyle}>
            <span style={{ color: '#747474' }}>状态为开启的快递公司，商家发货时才能进行选择。</span>
          </li>

          <li style={listStyle}>
            <div style={{ color: '#747474' }}>
              其中
          <span style={{ color: '#2481d1' }} data-type={100} onClick={this.clickKuaidi}>快递100</span>
              code和
          <span style={{ color: '#2481d1' }} data-type={200} onClick={this.clickKuaidi}>快递鸟</span>
              code分别是这两家系统内对应快递公司的代号，可以登录对方官网查询。
              </div>
          </li>
        </ul>
      </div>
    );

    return (
      <>

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingRight: 20 }}>
          <Radio.Group defaultValue={0} buttonStyle="solid" size="large" onChange={this.expressTabsChange}>
            {
              titleList.map((item, index) => {
                return (
                  <Radio.Button key={item.id} value={index}>{item.value}</Radio.Button>
                )
              })
            }
          </Radio.Group>

          <Popover content={content} placement="leftBottom">
            <Icon type="question-circle" style={{ color: '#ccc' }} />
          </Popover>
        </div>

        {
          isExpressSetting ? (
            <GtableEdit
              triggerRef={ref => this.child = ref}
              isTitleTabsShow={false}
              titleList={titleList}
              functionButtons={{ isAdd: true, addText: '添加物流公司', textAlign: 'right' }}
              urls={urls}
              columns={_columns}
              dataSource={dataSource}
              isRowSelection={false}
              addCallback={this.addCallback}
              editCallback={this.editCallback}
            />
          ) : (<ExpressSetting />)
        }




        <ExpressModal targetRef={ref => this.modalChild = ref} />
      </>
    )
  }
}
