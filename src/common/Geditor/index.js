import React from 'react'
import PropTypes from 'prop-types';
import { message } from 'antd'
import { UploadApi } from '../../config/api'
import E from 'wangeditor'


export default class EditorFunction extends React.Component {
  constructor() {
    super()
    this.state = {
      stateTxtHtml: ''
    }
  }
  componentDidMount() {
    this.initEditor()
    if (this.props.txtHtml && this.editor) {
      this.initHtml()
    }
  }

  initHtml=() => {
    this.setState({
      stateTxtHtml: this.props.txtHtml || ''
    }, () => {
      this.editor.txt.html(this.props.txtHtml)
    })
    
  }

  initEditor() {
    const that = this
    const elem = this.refs.editorElem
    const editor = new E(elem)

    this.editor = editor

    const uploadImgServerUrl = UploadApi + '?md5Str=' + localStorage.getItem('authed')

    editor.customConfig.zIndex = 200
    editor.customConfig.uploadImgServer = uploadImgServerUrl
    // 限制一次最多上传 1 张图片
    editor.customConfig.uploadImgMaxLength = 1
    editor.customConfig.customUploadImg = function (files, insert) {
      // files 是 input 中选中的文件列表
      if (files[0]) {
        const formData = new window.FormData()
        formData.append('file', files[0], 'cover.jpg')
        fetch(uploadImgServerUrl, {
          method: 'POST',
          body: formData
        }).then((res) => {
          return res.json()
        }).then((res) => {
          if (res.code === 100) {
            const data = res.data
            // 上传代码返回结果之后，将图片插入到编辑器中
            insert(data.imageUrl)
          } else {
            console.log(res.message)
          }
        })
      } else {
        message.info('請選擇要上傳的圖片')
      }
    }
    editor.customConfig.menus = [
      'head', // 标题
      'bold', // 粗体
      'fontSize', // 字号
      'fontName', // 字体
      'italic', // 斜体
      'underline', // 下划线
      'strikeThrough', // 删除线
      'foreColor', // 文字颜色
      // 'backColor', // 背景颜色
      'link', // 插入链接
      'list', // 列表
      'justify', // 对齐方式
      'quote', // 引用
      'emoticon', // 表情
      'image', // 插入图片
      'table', // 表格
      // 'video', // 插入视频
      // 'code', // 插入代码
      'undo', // 撤销
      'redo' // 重复
    ]
    editor.customConfig.lang = {
      '设置标题': 'Title',
      '字号': 'Size',
      '文字颜色': 'Color',
      '设置列表': 'List',
      '有序列表': '',
      '无序列表': '',
      '对齐方式': 'Align',
      '靠左': '',
      '居中': '',
      '靠右': '',
      '正文': 'p',
      '链接文字': 'link text',
      '链接': 'link',
      '上传图片': 'Upload',
      '网络图片': 'Web',
      '图片link': 'image url',
      '插入视频': 'Video',
      '格式如': 'format',
      '上传': 'Upload',
      '创建': 'init'
    }
    editor.customConfig.colors = [
      '#000000',
      '#eeece0',
      '#1c487f',
      '#4d80bf',
      '#c24f4a',
      '#8baa4a',
      '#7b5ba1',
      '#46acc8',
      '#f9963b',
      '#ffffff'
    ]

    editor.customConfig.onchangeTimeout = 500 // 单位 ms
    editor.customConfig.onchange = function (html) {
      // html 即变化之后的内容
      console.log(html)
      that.setState({
        stateTxtHtml: html
      })
      that.props.editorChangeCallback && that.props.editorChangeCallback(html)

    }
    editor.create()
  }
  render() {
    const { style } = this.props
    return (
      <>
        <div ref='editorElem' style={{ textAlign: 'left', ...style }} />
        {/* <div style={{ border: '1px solid #d4d4d4', borderTop: 0, height: 26, lineHeight: 26, fontSize: 12, color: '#aaa' }}>

        </div> */}
      </>
    )
  }
}


EditorFunction.propTypes = {
  editorChangeCallback: PropTypes.func,
  txtHtml: PropTypes.string,
  style: PropTypes.object,
};

EditorFunction.defaultProps = {
  txtHtml: '',
}
