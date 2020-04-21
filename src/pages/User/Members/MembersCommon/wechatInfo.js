import React from 'react'
import Gpopover from '../../../../common/Gpopover'
import Gimage from '../../../../common/Gimage'
import {Icon} from 'antd'
import './index.less'
// 微信素材库
@Gpopover
class WechatInfo extends React.Component {
  constructor() {
    super()
    this.state = {
      visible: false,
      isCheckout: false,
    }
  }

  selectedItem = (e) => {
    this.setState({
      isCheckout: true
    })

    this.props.selectedItem('woshishikan')
  }


  render() {
    const { isCheckout } = this.state
    return (
      <div className="wi-box">
        <div className="wi-item" onClick={this.selectedItem}>
          <div className="wi-item-img">
            <Gimage style={{ width: 70, height: 70 }} />
          </div>
          <div className="wi-item-text">
            法拉第放哪的李娜代理费那代理费那懒得发哪里都能反拉到那法拉十多年反拉到那法兰蝶阀兰饭量拿蓝嘎嘎啦嘎啦果爱搞好啊囊 again欧诺法咖喱饭你噶了那个辣咖喱你敢来你刚狼按法律函卢浮宫反辣咖喱你发个浪啦能发了归纳理发哪个是浪费你老是你弄了个是你
            发给谁了能发了酸辣粉哪个是路径圣诞节埃及人我高共和国拉拉呱jaguar阿济格爱国韩浪费你敢能发； 啊；卢浮宫哪里发给您阿法狗爱国a algae你噶反昂昂啊给你啊卢浮宫那，烦恼歌
          </div>
          <div className="wi-item-date">2019/11/25 00:59:59</div>

          {
            isCheckout ? (<div className="wi-item-pg-per" >
              <Icon style={{fontSize: 50, color: '#fff'}} type="check" />
            </div>) : (<div className="wi-item-pg" ></div>)
          }


        </div>

        <div className="wi-item">
          <div className="wi-item-img">
            <Gimage style={{ width: 70, height: 70 }} />
          </div>
          <div className="wi-item-text">
            法拉第放哪的李娜代理费那代理费那懒得发哪里都能反拉到那法拉十多年反拉到那法兰蝶阀兰饭量拿蓝嘎嘎啦嘎啦果爱搞好啊囊 again欧诺法咖喱饭你噶了那个辣咖喱你敢来你刚狼按法律函卢浮宫反辣咖喱你发个浪啦能发了归纳理发哪个是浪费你老是你弄了个是你
            发给谁了能发了酸辣粉哪个是路径圣诞节埃及人我高共和国拉拉呱jaguar阿济格爱国韩浪费你敢能发； 啊；卢浮宫哪里发给您阿法狗爱国a algae你噶反昂昂啊给你啊卢浮宫那，烦恼歌
          </div>
          <div className="wi-item-date">2019/11/25 00:59:59</div>

          <div className="wi-item-pg"></div>
        </div>
        <div className="wi-item">
          <div className="wi-item-img">
            <Gimage style={{ width: 70, height: 70 }} />
          </div>
          <div className="wi-item-text">
            法拉第放哪的李娜代理费那代理费那懒得发哪里都能反拉到那法拉十多年反拉到那法兰蝶阀兰饭量拿蓝嘎嘎啦嘎啦果爱搞好啊囊
          </div>
          <div className="wi-item-date">2019/11/25 00:59:59</div>

          <div className="wi-item-pg"></div>
        </div>


      </div>
    )
  }
}


export default WechatInfo