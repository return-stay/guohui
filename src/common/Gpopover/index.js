import React from 'react'
import { Icon, Button } from 'antd'
import PropTypes from 'prop-types';
import './index.less'

const Gpopover = (Comp) => {
  return class extends React.Component {
    static defaultProps = {
      cancelText: '取消',
      okText: '确定',
      cancelShow: true,
      okShow: true,
      footerShow: true
    }
    
    state = {
      visible: false,
    }
    componentDidMount() {
      const { visible } = this.props
      this.setState({
        visible
      })
    }
    onClose = () => {
      this.props.onClose()
    }

    onOk = () => {
      this.props.onOk()
    }


    render() {
      const { title, cancelText, visible, okText, width, cancelShow, okShow ,footerShow} = this.props
      // const { visible } = this.state
      return (
        <>
          {
            visible ? (<div className="pp-box" >
              <div className="pp-cont" style={{ width: width || 546 }}>
                <div className="pp-header">{title || '标题'}</div>
                <div className="pp-top-close" onClick={this.onClose}>
                  <Icon type="close" />
                </div>

                <div className="pp-middle">
                  <Comp {...this.props} />
                </div>

                {
                  footerShow ? (<div className="pp-footer" >
                    {cancelShow ? <Button className="pp-footer-cancel" onClick={this.onClose}>{cancelText}</Button> : ''}
                    {okShow ? <Button className="pp-footer-ok" type="primary" onClick={this.onOk}>{okText}</Button> : ''}
                  </div>) : ''
                }


              </div>
            </div>) : ''
          }
        </>
      )
    }
  }
}

Gpopover.propTypes = {
  cancelText: PropTypes.string,
  okText: PropTypes.string,
  cancelShow: PropTypes.bool,
  okShow: PropTypes.bool,
  footerShow: PropTypes.bool,
}


export default Gpopover