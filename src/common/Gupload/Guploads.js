import React from 'react'
import { Upload, Icon, Modal } from 'antd';
import { UploadApi, UploadRemove } from '../../config/api'
import { getBase64 } from '../../utils'
import PropTypes from 'prop-types';
import request from '../../utils/request'
import './index.less'
class Guploads extends React.Component {

  constructor() {
    super()
    this.state = {
      loading: false,
      fileList: [],
      previewVisible: false,
      previewImage: '',
    }
  }

  static getDerivedStateFromProps(props, state) {
    let imgarr = props.files || []
    let fileList = []
    for (let i = 0; i < imgarr.length; i++) {
      fileList.push({
        uid: i,
        name: imgarr[i],
        status: 'done',
        response: {
          code: 100,
          data: {
            attachmentId: '0',
            imageUrl: imgarr[i]
          }
        },
        thumbUrl: imgarr[i]
      })
    }
    if (state.fileList.length > 0) {
      return state
    } else {
      state.fileList = fileList
      return state
    }
  }

  returnImgArr = (fileList) => {
    let imgArr = []
    for (let i = 0; i < fileList.length; i++) {
      if (fileList[i].response && fileList[i].response.code === 100) {
        imgArr.push(fileList[i].response.data.imageUrl)
      } else {
        if (imgArr[imgArr.length] !== fileList[i].uid) {
          imgArr.push(fileList[i].uid)
        }
      }
    }
    this.props.success && this.props.success(imgArr)
  }
  handleChange = ({ fileList }) => {
    this.returnImgArr(fileList)
    this.setState({ fileList })
  }
  removeUpload = (info) => {
    let imgid = info.response.data.attachmentId
    if (imgid === '0') {
      let fileList = this.state.fileList
      for (let i = 0; i < fileList.length; i++) {
        if (fileList[i].name === info.name) {
          fileList.splice(i, 1)
        }
      }
      this.setState({
        fileList
      })
      this.returnImgArr(fileList)
    } else {
      return request({
        url: UploadRemove + '/' + imgid,
        method: 'delete',
        params: { md5Str: localStorage.getItem('authed') },
      }).then(res => {
        return true
      }).catch(err => {
        if (err.code === undefined) {
          return true
        } else {
          return true
        }
      })
    }
  }
  handleCancel = () => this.setState({ previewVisible: false });
  handlePreview = async file => {
    console.log(file)
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }

    this.setState({
      previewImage: file.url || file.preview,
      previewVisible: true,
    });
  };
  render() {
    const { loading, fileList, previewVisible, previewImage } = this.state
    const { data, uploadButtonText, displayFlex, fileLength } = this.props
    const uploadButton = (
      <div>
        <Icon style={{ fontSize: 30 }} type={loading ? 'loading' : 'plus'} />
        {uploadButtonText && <div className="ant-upload-text">{uploadButtonText}</div>}
      </div>
    )
    const UploadApiMd5 = UploadApi + '?md5Str=' + localStorage.getItem('authed')
    return (
      <>
        <div className={displayFlex ? 'display-flex gupload' : 'gupload'}>
          <Upload
            name="file"
            data={data}
            action={UploadApiMd5}
            listType="picture-card"
            fileList={fileList}
            onPreview={this.handlePreview}
            onChange={this.handleChange}
            onRemove={this.removeUpload}
          >
            {fileList.length >= fileLength ? null : uploadButton}
          </Upload>
          <Modal visible={previewVisible} footer={null} onCancel={this.handleCancel}>
            <img alt="example" style={{ width: '100%' }} src={previewImage} />
          </Modal>
        </div>
      </>
    )
  }
}


Guploads.propTypes = {
  data: PropTypes.object, //默认传递参数
  uploadButtonText: PropTypes.string, //添加按钮文字
  displayFlex: PropTypes.bool,  //是否使用flex布局
  fileLength: PropTypes.number, //限制上传的个数
}

Guploads.defaultProps = {
  uploadButtonText: 'Upload',
  displayFlex: false,
  fileLength: 3,
}


export default Guploads