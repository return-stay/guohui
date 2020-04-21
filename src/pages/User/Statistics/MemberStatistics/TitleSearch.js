import React from 'react'
import { Select, DatePicker, Button } from 'antd'
const { Option } = Select;
const { RangePicker } = DatePicker;
export default class TitleSearch extends React.Component {


  doHandleYear = () => {
    let myDate = new Date();
    let tYear = myDate.getFullYear();
    return tYear;
  }
  yearArr = () => {
    let years = []
    let myDate = new Date();
    let tYear = myDate.getFullYear();
    for (let i = tYear + 3; i > tYear - 10; i--) {
      years.push(i)

    }
    return years.reverse()
  }
  fdoHandleMonth = () => {
    let myDate = new Date();
    let tMonth = myDate.getMonth();

    let m = tMonth + 1;
    return m;
  }

  yearChange = (e) => {
    console.log(e)
  }

  monthChange = (e) => {
    console.log(e)
  }

  onRickerChange = (date, dateString) => {
    console.log(date, dateString)
  }

  searchMember = () => {
    const data = {}
    this.props.searchMember(data)
  }
  render() {
    const years = this.yearArr()
    return (
      <div>
        <Select defaultValue={this.doHandleYear()} style={{ width: 80 }} onChange={this.yearChange}>
          {
            years.map(item => {
              return <Option key={item} value={item}>{item}</Option>
            })
          }
        </Select>

        <Select defaultValue={this.fdoHandleMonth()} style={{ width: 50, margin: '0 16px' }} onChange={this.monthChange}>
          {
            [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map(item => {
              return <Option key={item} value={item}>{item}</Option>
            })
          }
        </Select>
        <RangePicker onChange={this.onRickerChange} />

        <Button type="primary" style={{ marginLeft: 20 }} onClick={this.searchMember}>查询</Button>
      </div>
    )
  }
}