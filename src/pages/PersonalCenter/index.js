import React from 'react'
import  connect from '../../utils/connect'

@connect
class  PersonalCenter extends React.Component {
  componentDidMount() {
    const { dispatch, headerAction } = this.props
    dispatch(headerAction({parent: '合同编辑', current: '拍品上传'}))
  }
  render() {
    return(
      <div>个人中心</div>
    )
  }
}

export default PersonalCenter