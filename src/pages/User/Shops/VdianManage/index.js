import React from 'react'
import { Radio, Popover, Icon } from 'antd'

import VdianList from './VdianList'
import HotVdianManage from './HotVdianManage'
import MainlyPopularizeVdian from './MainlyPopularizeVdian'
import VdianSetting from './VdianSetting'
export default class VdianManage extends React.Component {
  constructor() {
    super()

    this.state = {
      titleList: [
        { value: '微店列表', id: 1, type: 1 },
        { value: '热门微店管理', id: 2, type: 2 },
        { value: '主推微店管理', id: 3, type: 3 },
        { value: '入驻微店设置', id: 4, type: 4 },
      ],
      titleType: 1,
    }
  }

  expressTabsChange = (e) => {
    let type = e.target.value
    this.setState({
      titleType: type
    })
  }
  render() {
    let { titleList, titleType, } = this.state;
    const listStyle = { color: '#b2ebf2', listStyleType: 'square', marginTop: 10, fontSize: 14 }
    const content = (
      <div style={{ padding: 20, width: 520 }}>
        <h5>温馨提示：</h5>
        <ul>
          <li style={listStyle}>
            <span style={{ color: '#747474' }}>微店是商家店铺在微信端、APP端的一种展示形式，平台设置为主推/热门的微店，在微店列表上会优先进行展示。</span>
          </li>

          <li style={{ color: 'red', listStyleType: 'square', marginTop: 10, fontSize: 14 }}>
            <div>注意：即使商家没有开通微店，也可以正常售卖商品。</div>
          </li>
        </ul>
      </div>
    );
    return (
      <div>


        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingRight: 20,marginBottom: 10 }}>
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

        {
          titleType === 1 && (
            <VdianList />
          )
        }
        {
          titleType === 2 && (
            <HotVdianManage />
          )
        }
        {
          titleType === 3 && (
            <MainlyPopularizeVdian />
          )
        }
        {
          titleType === 4 && (
            <VdianSetting />
          )
        }
      </div>
    )
  }
}