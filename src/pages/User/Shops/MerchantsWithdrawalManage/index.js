import React from 'react'
import { Radio, Popover, Icon, Button } from 'antd'

import GtableEdit from '../../../../common/GtableEdit'
import WithdrawAmountSetting from './WithdrawAmountSetting'
import { merchData, columnsSuccess, columnsPending } from './data'

export default class VdianManage extends React.Component {
  constructor() {
    super()

    this.state = {
      isRowSelection: false,
      titleList: [
        { value: '提现成功', id: 1, type: 1 },
        { value: '待处理', id: 2, type: 2 },
        { value: '代付款', id: 3, type: 3 },
        { value: '提现失败', id: 4, type: 4 },
        { value: '提现拒绝', id: 5, type: 5 },
        { value: '提现金额设置', id: 6, type: 6 },
      ],
      searchData: [
        { type: 'input', field: 'Name', label: '商家' },
        { type: 'chooseTime', field: 'shenqingshijian', beginTime: 'shenqingStart', EndTime: 'shengqingEnd', label: '申请时间' },
        { type: 'input', field: 'shenhe', beginTime: 'shenheStart', EndTime: 'shenheEnd', label: '审核时间' },
      ],
      titleType: 1,
      dataSource: merchData,
      columns: columnsSuccess(this)
    }
  }

  setToAdvocate = () => {
    console.log('jjjjjj')
  }

  expressTabsChange = (e) => {
    let type = e.target.value
    let fun = null
    let isRowSelection = false;
    let searchData = [
      { type: 'input', field: 'Name', label: '商家' },
      { type: 'chooseTime', field: 'shenqingshijian', beginTime: 'shenqingStart', EndTime: 'shengqingEnd', label: '申请时间' },
    ]
    switch (type) {
      case 1:
        fun = columnsSuccess(this)
        isRowSelection = false
        searchData.push({ type: 'input', field: 'shenhe', beginTime: 'shenheStart', EndTime: 'shenheEnd', label: '审核时间' })
        break;
      case 2:
        fun = columnsPending(this)
        isRowSelection = true;
        break;
      case 3:
        fun = columnsPending(this)
        isRowSelection = true;
        break;
      case 4:
        fun = columnsPending(this)
        isRowSelection = true;
        break;
      case 5:
        fun = columnsPending(this)
        isRowSelection = true;
        break;

      default:
        break;
    }
    this.setState({
      titleType: type,
      columns: fun,
      isRowSelection,
      searchData,
    })
  }
  render() {
    const listStyle = { color: '#b2ebf2', listStyleType: 'square', marginTop: 10, fontSize: 14 }
    const content = (
      <div style={{ padding: 20, width: 520 }}>
        <h5>温馨提示：</h5>
        <ul>
          <li style={listStyle}>
            <span style={{ color: '#747474' }}>其中提现方式为银行账户的申请，需由平台线下打款至商家账户，其他方式可由系统自动完成转账。</span>
          </li>
        </ul>
      </div>
    );
    let { urls, dataSource, titleList, titleType, columns, isRowSelection, searchData } = this.state;
    return (
      <div>

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingRight: 20, marginBottom: 10 }}>
          <Radio.Group value={titleType} buttonStyle="solid" size="large" onChange={this.expressTabsChange}>
            {
              titleList.map((item) => {
                return (
                  <Radio.Button key={item.id} value={item.id}>{item.value}</Radio.Button>
                )
              })
            }
          </Radio.Group>

          <Popover content={content} placement="leftBottom">
            <Icon type="question-circle" style={{ color: '#ccc' }} />
          </Popover>
        </div>

        {isRowSelection && <div style={{ textAlign: 'right', marginBottom: 10, paddingRight: 30 }}><Button>批量审核</Button></div>}
        {
          titleType !== 6 && (
            <GtableEdit
              urls={urls}
              columns={columns}
              searchData={searchData}
              dataSource={dataSource}
              isRowSelection={isRowSelection}
            />
          )
        }
        {
          titleType === 6 && (
            <WithdrawAmountSetting />
          )
        }
      </div>
    )
  }
}