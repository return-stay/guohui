import React from 'react'
import { Radio} from 'antd'

import SettingTable from './SettingTable'
import Screen from './Screen'

import './index.less'
export default class MemberSetting extends React.Component {
  state = {
    titleList: [
      { value: '管理', id: 0, type: 0 },
      { value: '购买力筛选', id: 1, type: 1 },
    ],
    isManage: true,
  }

  expressTabsChange = (e) => {
    let type = e.target.value
    let bool = false
    if (type === 0) {
      bool = true
    }
    this.setState({
      isManage: bool
    })
  }
  render() {

    let { titleList, isManage } = this.state;
    return (
      <>

        <div style={{ borderBottom: '1px solid #e8e8e8', paddingBottom: 10, }}>
          <Radio.Group defaultValue={0} buttonStyle="solid" size="large" onChange={this.expressTabsChange}>
            {
              titleList.map((item, index) => {
                return (
                  <Radio.Button key={item.id} value={index}>{item.value}</Radio.Button>
                )
              })
            }
          </Radio.Group>
        </div>

        {
          isManage ? <SettingTable />: <Screen />
        }
      </>
    )
  }
}
