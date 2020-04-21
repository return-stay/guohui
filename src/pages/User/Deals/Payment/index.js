import React from 'react'

import GtableEdit from '../../../../common/GtableEdit'
import { Switch, Icon, Popover } from 'antd'
import PaymentModal from './PaymentModal'
export default class Payment extends React.Component {
  state = {
    visible: false,
    urls: {
      list: ''
    },
    dataSource: [
      {
        Id: 1,
        payStatus: '商城小程序支付',
        isSwitch: 1,
      },
      {
        Id: 2,
        payStatus: 'O2O程序支付',
        isSwitch: 0,
      },
      {
        Id: 3,
        payStatus: '微信PC端支付',
        isSwitch: 1,
      },
      {
        Id: 4,
        payStatus: '微信H5支付',
        isSwitch: 1,
      },
      {
        Id: 5,
        payStatus: '微信APP支付',
        isSwitch: 1,
      },
      {
        Id: 6,
        payStatus: '微信公众号支付（用于微信商城）',
        isSwitch: 1,
      },
      {
        Id: 7,
        payStatus: '银联PC端支付',
        isSwitch: 1,
      },
      {
        Id: 8,
        payStatus: '银联企业网银支付',
        isSwitch: 0,
      },
      {
        Id: 9,
        payStatus: '支付宝H5支付',
        isSwitch: 1,
      },
      {
        Id: 10,
        payStatus: '支付宝App支付',
        isSwitch: 1,
      },
      {
        Id: 11,
        payStatus: '支付宝PC端支付',
        isSwitch: 1,
      },
    ],
    dataSourceDown: [
      {
        Id: 21,
        payStatus: '货到付款 (仅官方自营店可用)',
        isSwitch: 1,
      },
    ]
  }
  handleEdit = (e, item)=> {
    this.child.showModal(item)
  }

  switchChange = (e, item, type)=> {
    let list = []
    if(type === 'xianshang') {
      list = this.state.dataSource
    }else {
      list = this.state.dataSourceDown
    }

    for(let i=0;i<list.length;i++) {
      if(list[i].Id === item.Id) {
        list[i].isSwitch = !list[i].isSwitch
      }
    }

    if(type === 'xianshang') {
      this.setState({
        dataSource: list
      })
    }else {
      this.setState({
        dataSourceDown: list
      })
    }
  }

  // 区域设置
  quyushezhi = ()=> {}

  render() {
    const listStyle = { color: '#b2ebf2', listStyleType: 'square', marginTop: 10 }
    const content = (
      <div style={{ padding: 20, width: 480 }}>
        <h5>温馨提示：</h5>
        <ul>
          <li style={listStyle}>
            <span style={{ color: '#747474' }}>展示所有平台支持的支付方式的相关信息列表。</span>
          </li>

          <li style={listStyle}><span style={{ color: '#747474' }}>可进行打开或关闭相应的支付方式。</span></li>
          <li style={listStyle}><span style={{ color: '#747474' }}>配置好相应支付方式后，用户购物时便可使用相应的支付方式，请谨慎关闭。</span></li>
        </ul>
      </div>
    );
    const _columns = (that) => {
      const _this = this
      return [
        {
          title: () => {
            return (<>
              <div>
                <span style={{ marginRight: 10 }}>线上支付</span>
                <Popover content={content} placement="rightBottom">
                  <Icon type="question-circle" style={{ color: '#ccc' }} />
                </Popover>
              </div>
            </>)
          },
          key: 'payStatus',
          width: '60%',
          dataIndex: 'payStatus',
        },
        {
          title: '开关',
          key: 'isSwitch',
          render: (item) => {
            let bool = item.isSwitch ? true : false
            return (
              <>
                <Switch
                  checkedChildren={<Icon type="plus" />}
                  unCheckedChildren={<Icon type="minus" />}
                  onChange={(e)=> this.switchChange(e, item, 'xianshang')}
                  checked={bool}
                />
              </>
            )
          }
        },
        {
          title: '操作',
          width: '15%',
          render: (item) => {
            return (
              <>
                <div style={{ color: '#1890ff', cursor: 'pointer' }} onClick={(e) => { _this.handleEdit(e, item) }}>编辑</div>
              </>
            )
          }
        }
      ]
    }

    const contentDown = (
      <div style={{ padding: 20, width: 480 }}>
        <h5>温馨提示：</h5>
        <ul>
          <li style={listStyle}><span style={{ color: '#747474' }}>货到付款目前仅支持自营商家的商品，平台可以设置支持货到付款的地区。</span></li>
        </ul>
      </div>
    );

    const _columnsDown = (that) => {
      const _this = this
      return [
        {
          title: () => {
            return (<>
              <div>
                <span style={{ marginRight: 10 }}>线下支付</span>
                <Popover content={contentDown} placement="rightBottom">
                  <Icon type="question-circle" style={{ color: '#ccc' }} />
                </Popover>
              </div>
            </>)
          },
          key: 'payStatus',
          width: '60%',
          dataIndex: 'payStatus',
        },
        {
          title: '',
          key: 'isSwitch',
          render: (item) => {
            let bool = item.isSwitch ? true : false
            return (
              <>
                <Switch
                  checkedChildren={<Icon type="plus" />}
                  unCheckedChildren={<Icon type="minus" />}
                  onChange={(e)=> this.switchChange(e, item, 'xianxai')}
                  checked={bool}
                />
              </>
            )
          }
        },
        {
          title: '',
          width: '15%',
          render: (item) => {
            return (
              <>
                <div style={{ color: '#1890ff', cursor: 'pointer' }} onClick={(e)=> _this.quyushezhi(e, item)}>区域设置</div>
              </>
            )
          }
        }
      ]
    }

    const { urls, dataSource,dataSourceDown} = this.state;
    return (
      <>
        <GtableEdit
          urls={urls}
          columns={_columns}
          dataSource={dataSource}
          isRowSelection={false}
        />


        <GtableEdit
          urls={urls}
          columns={_columnsDown}
          dataSource={dataSourceDown}
          isRowSelection={false}
        />

        <PaymentModal triggerRef={ref => { this.child = ref }} />

      </>
    )
  }
}
