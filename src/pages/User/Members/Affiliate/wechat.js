import React from 'react'
import { Icon, Radio, Select, Tabs, Button, Input } from 'antd'
import '../LabelManage/index.less'
import { withRouter } from "react-router-dom";
import WechatInfo from '../MembersCommon/wechatInfo'
import LabelModalSelect from '../MembersCommon/labelModalSelect'
const { Option } = Select;
const { TabPane } = Tabs;
const { TextArea } = Input
class Wechat extends React.Component {
  constructor() {
    super()
    this.state = {
      objectValue: 1,
      visible: false,
      isSelect: false
    }
  }

  onObjectChange = (e) => {
    console.log(e)
    let value = e.target.value
    this.setState({
      objectValue: value
    })
  }
  onSexChange = (e) => {
    console.log(e)
  }

  onGroupChange = (e) => {
    console.log(e)
  }

  typeCallback = (e) => {
    console.log(e)
  }
  submitWechat = () => { }
  // 跳转到微商城的素材编辑
  toRouterMicromall = () => {
    this.props.history.push("/personalCenter");
  }

  materialLibrarySelect = () => {
    this.setState({
      visible: true
    })
  }

  onOk = (e) => {
    console.log(e)
    this.setState({
      isSelect: true,
    })
    this.onClose()
  }

  onClose = () => {
    this.setState({
      visible: false
    })
  }

  selectedItem = (e) => {
    console.log(e)
  }


  onObjectClick = () => {
    this.labelChild.show()
  }

  onLabelOk = (e) => {
    console.log(e)
    this.labelChild.onCancel()
  }
  render() {
    const { visible, isSelect } = this.state
    const photoTab = (
      <>
        <Icon type="profile" />
        <span>图文</span>
      </>
    )
    const textTab = (
      <>
        <Icon type="font-size" />
        <span>文字</span>
      </>
    )
    return (
      <div className="aw-box" style={{ marginTop: 16 }}>
        <h5 className='help-default'>
          <Icon type="info-circle" />
          <span style={{ marginLeft: 10 }}>说明：一个粉丝一个月最多接收同一个服务号群发的四条消息，若超过四条则该粉丝无法接收</span>
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

          <div className="sex">
            <span style={{ marginRight: 12 }}>性别</span>
            <Select defaultValue={0} style={{ width: 120 }} onChange={this.onSexChange}>
              <Option value={0}>全部</Option>
              <Option value={3}>保密</Option>
              <Option value={1}>男</Option>
              <Option value={2}>女</Option>
            </Select>
          </div>
          <div className="form-group">
            <span style={{ marginRight: 12 }}>群发地区</span>
            <Select defaultValue={0} style={{ width: 120 }} onChange={this.onGroupChange}>
              <Option value={0}>全部</Option>
            </Select>
          </div>


          <div style={{ border: '1px solid #e7e7eb', marginTop: 20, width: '870px' }}>
            <Tabs defaultActiveKey="1" onChange={this.typeCallback}>
              <TabPane tab={photoTab} key="1">

                {
                  isSelect ? (
                    <div className="photo-box">
                      <div className="photo-item photo-item-left" onClick={this.materialLibrarySelect}>
                        <Icon type="plus" style={{ fontSize: 40 }} />
                        <span>从素材库中选取</span>
                      </div>
                    </div>
                  ) : (
                      <div className="photo-box">
                        <div className="photo-item photo-item-left" onClick={this.materialLibrarySelect}>
                          <Icon type="plus" style={{ fontSize: 40 }} />
                          <span>从素材库中选取</span>
                        </div>
                        <div className="photo-item" onClick={this.toRouterMicromall}>
                          <Icon type="plus" style={{ fontSize: 40 }} />
                          <span>新建图文信息</span>
                        </div>
                      </div>
                    )
                }

              </TabPane>
              <TabPane tab={textTab} key="2">
                <div className="photo-box">
                  <TextArea style={{ width: '100%', minHeight: 197 }} />
                </div>
              </TabPane>
            </Tabs>
          </div>


          <div style={{ width: '870px', textAlign: 'center' }}>
            <Button type="primary" style={{ marginTop: 25 }} onClick={this.submitWechat}>提交</Button>
          </div>

        </div>

        <WechatInfo visible={visible} width={700} onClose={this.onClose} onOk={this.onOk} selectedItem={this.selectedItem} />
        <LabelModalSelect width={700} targetRef={ref => this.labelChild = ref} onOk={this.onLabelOk} />
      </div>
    )
  }
}

export default withRouter(Wechat)