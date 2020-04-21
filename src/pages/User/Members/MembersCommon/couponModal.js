import React from 'react'
import { Modal } from 'antd'
import CouponTable from './couponTable'
import './index.less'
export default class CouponModal extends React.Component {

  constructor() {
    super()
    this.state = {
      visible: false,
      title: '选取优惠券',
      labelArr: []
    }
  }


  componentDidMount() {
    this.props.targetRef && this.props.targetRef(this)
  }
  show = () => {
    this.setState({
      visible: true
    })
  }

  onOk = () => {
    this.props.onOk(this.state.labelArr)
  }

  onCancel = () => {
    this.setState({
      visible: false
    })
  }

  onCheckboxChange = (e) => {
    this.setState({
      labelArr: e
    })
  }

  selectChange = (selectedRowKeys, selectedRows)=> {
    console.log(selectedRowKeys, selectedRows)
  }
  render() {
    const { visible, title } = this.state
    const searchData = [
      { type: 'input', field: 'name', label: '名称' },
    ]
    return (
      <Modal
        visible={visible}
        title={title}
        width={850}
        onOk={this.onOk}
        onCancel={this.onCancel}
      >

        <div className="lms-box">

          <CouponTable searchData={searchData} isAction={false} selectChange={this.selectChange} />

        </div>
      </Modal>
    )
  }
}