import React from 'react'
import { Select, Button } from 'antd'
import PropTypes from 'prop-types';
import Gupload from '../../../../common/Gupload'
const { Option } = Select;

class Buttons extends React.Component {
  handleChange = () => {
    console.log(this.props.selectedRowKeys)
  }

  addLabel = () => {
    console.log(this.props.selectedRowKeys)
  }
  render() {
    const { isSetting } = this.props.btns
    return (
      <div style={{display: 'flex'}}>
        {
          isSetting ? (
            <>
              <Button style={{ marginRight: 10 }} onClick={this.addLabel}>批量添加标签</Button>
              {/* <Button style={{ marginRight: 10 }}>导出查询结果</Button> */}
              <Gupload  style={{ width: 150, marginRight: 10 }} btnText="导出查询结果" />
            </>
          ) : (
              <Select defaultValue="jack" style={{ width: 150, marginRight: 10 }} onChange={this.handleChange}>
                <Option value="jack">添加标签</Option>
                <Option value="lucy">已选中会员群发</Option>
                <Option value="disabled">已筛选会员群发</Option>
              </Select>
            )
        }

        <Select defaultValue="jack" style={{ width: 150, marginRight: 10 }} onChange={this.handleChange}>
          <Option value="jack">群发优惠券</Option>
          <Option value="lucy">已选中会员群发</Option>
          <Option value="disabled">已筛选会员群发</Option>
        </Select>


        <Select defaultValue="jack" style={{ width: 150, marginRight: 10 }} onChange={this.handleChange}>
          <Option value="jack">群发微信</Option>
          <Option value="lucy">已选中会员群发</Option>
          <Option value="disabled">已筛选会员群发</Option>
        </Select>

        <Select defaultValue="jack" style={{ width: 150, marginRight: 10 }} onChange={this.handleChange}>
          <Option value="jack">群发短信</Option>
          <Option value="lucy">已选中会员群发</Option>
          <Option value="disabled">已筛选会员群发</Option>
        </Select>
      </div>
    )
  }
}

Buttons.propTypes = {
  btns: PropTypes.object,
}

Buttons.defaultProps = {
  btns: {isSetting: false}
}

export default Buttons