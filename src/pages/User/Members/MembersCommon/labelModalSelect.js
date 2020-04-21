import React from 'react'
import { Modal, Checkbox } from 'antd'

import './index.less'
export default class LabelModalSelect extends React.Component {

  constructor() {
    super()
    this.state = {
      visible: false,
      title: '勾选标签',
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
  render() {
    const { visible, title } = this.state

    const options = [
      { value: 'niu', label: '牛百叶爱好者' },
      { value: '1', label: '手机号' },
      { value: '2', label: '差评师' },
      { value: '3', label: '衣服' },
      { value: '4', label: '宁静1' },
      { value: '5', label: '忠实用户' },
      { value: '6', label: '好久好久' },
      { value: '7', label: '111' },
      { value: '8', label: '运动' },
      { value: '9', label: '农民' },
    ];
    return (
      <Modal
        visible={visible}
        title={title}
        onOk={this.onOk}
        onCancel={this.onCancel}
      >

        <div className="lms-box">
          <Checkbox.Group options={options} style={{ height: 40 }} defaultValue={['niu']} onChange={this.onCheckboxChange} />
        </div>
      </Modal>
    )
  }
}