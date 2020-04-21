import React from 'react'
import { Popover, Radio, Icon } from 'antd'
import AddMember from './AddMember'
import AreaStatistics from './AreaStatistics'

export default class MemberStatistics extends React.Component {
  constructor() {
    super()

    this.state = {
      titleList: [
        { value: '新增会员', id: 1, type: 1 },
        { value: '区域分析', id: 2, type: 2 },
      ],
      titleType: 1,
    }
  }

  memberTabsChange = (e) => {
    let type = e.target.value
    this.setState({
      titleType: type
    })
  }

  enterData = () => {

  }
  render() {
    const listStyle = { color: '#b2ebf2', listStyleType: 'square', marginTop: 10, fontSize: 14 }
    const content = (
      <div style={{ padding: 20, width: 520 }}>
        <h5>温馨提示：</h5>
        <ul>
          <li style={listStyle}>
            <span style={{ color: '#747474' }}>统计了时间段内新增会员数的走势和与前一时间段的对比。</span>
          </li>

          <li style={listStyle}>
            <div style={{ color: '#747474' }}>统计了时间段内不同地区的下单量/下单金额。</div>
          </li>
        </ul>
      </div>
    );
    const { titleList, titleType } = this.state
    return (
      <div>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingRight: 20 }}>
            <Radio.Group value={titleType} buttonStyle="solid" size="large" onChange={this.memberTabsChange}>
              {
                titleList.map((item) => {
                  return (
                    <Radio.Button key={item.id} value={item.id}>{item.value}</Radio.Button>
                  )
                })
              }
            </Radio.Group>

            <div>
              <Popover content={content} placement="leftBottom">
                <Icon type="question-circle" style={{ color: '#ccc', cursor: 'pointer' }} />
              </Popover>

              <span style={{color: '#2481d1', cursor: 'pointer'}} onClick={this.enterData}>
                <Icon type="vertical-align-bottom" style={{margin: '0 5px 0 10px', fontSize: 20}} />导出数据
                </span>

            </div>

          </div>

          <div style={{ marginTop: 10 }}>
            {
              titleType === 1 && <AddMember checkShopInfo={this.checkShopInfo} />
            }
            {
              titleType === 2 && <AreaStatistics auditInfo={this.auditInfo} />
            }
          </div>

        </div>

      </div>
    )
  }
}