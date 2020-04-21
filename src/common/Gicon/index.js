import React from 'react'
import PropTypes from 'prop-types';
class Gicon extends React.Component {

  largerImage = (e) => {
    console.log(e)
    console.log(this.props.bigUrl)
  }
  render() {
    // let url = this.props.url || ''
    const url = '/src/asset' + this.props.url
    return (
      <>
        <img alt={this.props.alt} src={url} style={this.props.style}  onClick={this.largerImage} />
      </>
    )
  }
}

Gicon.propTypes = {
  url: PropTypes.string,
  bigUrl: PropTypes.string, //大图地址
  alt: PropTypes.string, //图片显示不出来时的默认文字
  style: PropTypes.object, //图片的样式
}

Gicon.defaultProps = {
  alt: '图片',
}

export default Gicon