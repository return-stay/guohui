import React from 'react'
import PropTypes from 'prop-types';

class Gimage extends React.Component {
  constructor() {
    super()

    this.state = {
      isShowBig: false,
    }
  }

  largerImage = (e) => {
    this.setState({
      isShowBig: true,
      bigUrl: this.props.src
    })

  }
  hideBig = (e) => {
    e.stopPropagation()
    this.setState({
      isShowBig: false,
    })
  }
  imgClick = (e) => {
    e.stopPropagation()
    this.setState({
      isShowBig: true
    })
  }
  render() {
    const { isShowBig, bigUrl } = this.state
    let src = this.props.src || ''
    return (
      <>
        <img alt={this.props.alt} src={src} style={this.props.style} onClick={this.largerImage} />
        {
          isShowBig && <div onClick={this.hideBig} style={{ position: 'fixed', top: 0, left: 0, height: '100vh', width: '100vw', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: 'rgba(0,0,0,.5)', zIndex: 100000 }}>
            <img src={bigUrl} alt="大图" onClick={this.imgClick} style={{ height: '80%' }} />
          </div>
        }
      </>
    )
  }
}

Gimage.propTypes = {
  src: PropTypes.string,
  bigUrl: PropTypes.string, //大图地址
  alt: PropTypes.string, //图片显示不出来时的默认文字
  style: PropTypes.object, //图片的样式
}

Gimage.defaultProps = {
  src: '', //图片的样式
  alt: '图片',
}

export default Gimage