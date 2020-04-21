import React from 'react'
import { Icon, Radio, Input,Button } from 'antd'
import '../LabelManage/index.less'
import LabelModalSelect from './labelModalSelect'
const { TextArea } = Input
export default class Note extends React.Component {
  constructor() {
    super()
    this.state = {
      objectValue: 2
    }
  }

  onObjectChange = (e) => {
    console.log(e)
    let value = e.target.value
    this.setState({
      objectValue: value
    })

  }

  onObjectClick = () => {
    this.child.show()
  }

  onOk = (e) => {
    console.log(e)

    this.child.onCancel()
  }

  editorChangeCallback = (e) => {
    console.log(e)
  }

  submitEmail = () => {}
  render() {
    return (
      <div className="aw-box" style={{ marginTop: 16 }}>
        <h5 className='help-default'>
          <Icon type="info-circle" />
          <span style={{ marginLeft: 10 }}>说明：未绑定手机的会员无法收到您群发的短信，短信平台接口的Appkey和Appsecret也必须配置正确。</span>
          <span style={{marginLeft: 20, color: '#2481d1', fontSize: 13}} >去配置</span>
        </h5>

        <div className="VIP-Marketing">
          <div className="object">
            <i style={{ fontWeight: 700, color: '#333', fontSize: 12 }}>群发对象</i>
            <div style={{ margin: '6px 0' }}>

              <Radio.Group onChange={this.onObjectChange} defaultValue={2}>
                <Radio value={1}>全部</Radio>
                <Radio value={2} onClick={this.onObjectClick}>
                  <span>按标签</span><span style={{ color: '#459ae9', marginLeft: 20 }}>选择</span>
                </Radio>
              </Radio.Group>
            </div>
          </div>

          <div className='email-content'>

            <h5 style={{ marginTop: 10 }}>短信正文</h5>

            <TextArea rows={4} />

          </div>

          <div style={{ width: '870px', textAlign: 'center' }}>
            <Button type="primary" style={{ marginTop: 25 }} onClick={this.submitEmail}>群发</Button>
          </div>
        </div>


        <LabelModalSelect targetRef={ref => this.child = ref} onOk={this.onOk} />

      </div>
    )
  }
}