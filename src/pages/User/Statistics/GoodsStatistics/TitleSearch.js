import React from 'react'

import { Radio, DatePicker, Button } from 'antd';
const { RangePicker } = DatePicker;
export default class TitleSearch extends React.Component {


  onRickerChange = (date, dateString) => {
    console.log(date, dateString)
  }
  searchMember = ()=> {
    this.props.searchMember()
  }
  render() {
    return (
      <div style={{ margin: '10px 0' }}>

        <Radio.Group defaultValue="a" style={{ marginRight: 14 }}>
          <Radio.Button value="a">昨天</Radio.Button>
          <Radio.Button value="b">最近七天</Radio.Button>
          <Radio.Button value="c">最近30天</Radio.Button>
        </Radio.Group>


        <RangePicker onChange={this.onRickerChange} />

        <Button type="primary" style={{ marginLeft: 20 }} onClick={this.searchMember}>查询</Button>
      </div>
    )
  }
}