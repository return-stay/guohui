import React from 'react'
import { Upload, Icon, message } from 'antd';
import { UploadApi } from '../../config/api'
import PropTypes from 'prop-types';
import connect from '../../utils/connect'
import './index.less'

@connect
class GVideoUpload extends React.Component {

  constructor() {
    super()
    this.state = {
      imageUrl: '',
      loading: false,
    }
  }
  static getDerivedStateFromProps(props, state) {
    if (props.file !== state.imageUrl) {
      state.imageUrl = props.file
      return state
    } else {
      return null
    }
  }
  handleChange = info => {
    console.log(info)
    if (info.file.status === 'uploading') {
      this.setState({ loading: true });
      return;
    }
    if (info.file.status === 'done') {
      let file = info.file

      let response = file.response
      if (response.code === 100) {
        let img = response.data[0].path
        let attachmentId = response.data[0].attachmentId
        this.setState({
          imageUrl: img,
          loading: false,
        })
        this.props.success && this.props.success(img, attachmentId)
      }else {
        message.error(response.message)
        const { dispatch, authChangeAction } = this.props
        localStorage.removeItem('authed')
        dispatch(authChangeAction(null))
      }
    }
  };

  beforeUpload = (file) => {
    const videoTypeCheck = /(.mp4)$/.test(file.type);
    if (!videoTypeCheck) {
      message.error('只支持mp4格式视频')
      return false
    }
    return videoTypeCheck
  }

  closeVideo = (e) => {
    e.stopPropagation();
    this.props.close && this.props.close()
  }


  render() {

    const { imageUrl, loading } = this.state
    const { data, uploadButtonText, uploadButtonTopText, className, imageStyle, uploadButtonStyle, iconStyle } = this.props
    const uploadButton = (
      <div style={uploadButtonStyle}>
        {uploadButtonTopText && <div className="ant-upload-top-text">{uploadButtonTopText}</div>}
        <Icon style={iconStyle} type={loading ? 'loading' : 'plus'} />
        {uploadButtonText && <div className="ant-upload-text">{uploadButtonText}</div>}
      </div>
    )

    const UploadApiMd5 = UploadApi + '?md5Str=' + localStorage.getItem('authed')

    return (
      <div className="gupload">
        <Upload
          name="files"
          data={data}
          action={UploadApiMd5}
          listType="picture-card"
          className={className}
          showUploadList={false}
          beforeUpload={this.beforeUpload}
          onChange={this.handleChange}
        >
          {imageUrl ? <div className="upload-video-box">
            <video src={imageUrl} className="upload-img-class" alt="avatar" style={imageStyle} />
            <div className='upload-video-box-close'><Icon className="close-icon" type="delete" style={{fontSize: 20}} onClick={this.closeVideo} /></div>
          </div> : uploadButton}
        </Upload>
      </div>
    )
  }
}


GVideoUpload.propTypes = {
  data: PropTypes.object,
  file: PropTypes.string,
  uploadButtonTopText: PropTypes.string,
  uploadButtonText: PropTypes.string,
  success: PropTypes.func,
  className: PropTypes.string,
  imageStyle: PropTypes.object,
  uploadButtonStyle: PropTypes.object,
  iconStyle: PropTypes.object
}

GVideoUpload.defaultProps = {
  data: { maxSize: 10 },
  uploadButtonText: 'Upload',
  className: 'avatar-uploader',
  iconStyle: { fontSize: 30 }
}


export default GVideoUpload