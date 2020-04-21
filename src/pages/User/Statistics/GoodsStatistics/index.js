import React from 'react'
import { Popover, Radio, Icon } from 'antd'
import MerchandiseSales from './MerchandiseSales'
import SalesAnalysis from './SalesAnalysis'
export default class GoodsStatistics extends React.Component {
  constructor() {
    super()

    this.state = {
      titleList: [
        { value: '商品销售情况', id: 1, type: 1 },
        { value: '商品类目销售分析', id: 2, type: 2 },
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
            <span style={{ color: '#747474' }}>统计了时间段内商品的销售情况（包括浏览人数、下单人数、销售金额等，可以根据不同维度排序）。</span>
          </li>

          <li style={listStyle}>
            <div style={{ color: '#747474' }}>统计了时间段内已销售商品的类目占比情况。</div>
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
              titleType === 1 && <MerchandiseSales />
            }
            {
              titleType === 2 && <SalesAnalysis />
            }
          </div>

        </div>

      </div>
    )
  }
}