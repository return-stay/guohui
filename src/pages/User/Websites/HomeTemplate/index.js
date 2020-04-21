import React from 'react'
import { PageHeader, Button } from 'antd'
import './index.less'

import ThemeColor from './ThemeColor'
export default class HomeTemplate extends React.Component {
  constructor() {
    super()

    this.state = {
      isHome: true,
      isThemeColor: false,
    }
  }
  // 显示默认首页
  showHome = () => {
    this.setState({
      isHome: true,
      isThemeColor: false,
    })
  }
  // 主题配置返回
  themeColorBack = () => {
    this.showHome()
  }
  // 主题配置
  themeColor = () => {
    this.setState({
      isHome: false,
      isThemeColor: true,
    })
  }
  // 启用模板
  enabledTemplate = (e) => {
    console.log(e)
  }
  render() {
    const { isHome, isThemeColor } = this.state
    return (
      <>
        {
          isHome && <div className="ht-box">
            <PageHeader
              style={{
                border: '1px solid rgb(235, 237, 240)',
              }}
              title="模板管理"
            />
            <h3 className="templateTitle">当前使用的模板</h3>


            <div className="set-switch">
              <div className="usertemplate">
                <img className="usertemplate-img" src="http://tiyan.himall.kuaidiantong.cn/Areas/Admin/Templates/home/t_1/default.jpg" alt="图片" />
              </div>

              <div className="usertemplateInfo">
                <h2 style={{ fontSize: 18, marginTop: 20, }}>模板1</h2>

                <div style={{ marginTop: 20 }}>
                  <Button type="primary">编辑模板</Button>
                  <Button type="primary" style={{ margin: '0 10px' }}>预览</Button>
                  <Button type="primary" onClick={this.themeColor}>主题配色</Button>
                </div>
              </div>
            </div>


            <h3 className="templateTitle">可用模板(共3套)</h3>
            <div className="templateList">
              <ul className="templateUl">
                <li className="tempateLi">
                  <div>
                    <img className="tempateLi-img" src="http://tiyan.himall.kuaidiantong.cn/Areas/Admin/Templates/home/t_1/default.jpg" alt="图片" />
                  </div>
                  <div className="lightBtn">
                    <Button style={{ marginRight: 5 }} onClick={this.enabledTemplate}>启用</Button>
                    <Button type="primary">编辑</Button>
                  </div>
                  <div className="templateUser">模板1</div>
                </li>

                <li className="tempateLi">
                  <div>
                    <img className="tempateLi-img" src="http://tiyan.himall.kuaidiantong.cn/Areas/Admin/Templates/home/t_1/default.jpg" alt="图片" />
                  </div>
                  <div className="lightBtn">
                    <Button style={{ marginRight: 5 }}>启用</Button>
                    <Button type="primary">编辑</Button>
                  </div>
                  <div className="templateUser">模板2</div>
                </li>
                <li className="tempateLi">
                  <div>
                    <img className="tempateLi-img" src="http://tiyan.himall.kuaidiantong.cn/Areas/Admin/Templates/home/t_1/default.jpg" alt="图片" />
                  </div>
                  <div className="lightBtn">
                    <Button style={{ marginRight: 5 }}>启用</Button>
                    <Button type="primary">编辑</Button>
                  </div>
                  <div className="templateUser">模板3</div>
                </li>

              </ul>
            </div>

          </div>
        }

        {
          isThemeColor && <ThemeColor onBack={this.themeColorBack} />
        }




      </>

    )
  }
}