// 积分规则
import React from 'react'
import GtableEdit from '../../../../common/GtableEdit'
import { Radio, Row, Col, InputNumber, Button, message } from 'antd'
import Explain from './Explain'
export default class IntegrationRule extends React.Component {
  constructor() {
    super()
    this.state = {
      isRule: true,
      isRuleErrorPop: false,
      titleList: [
        { value: '积分获取规则', id: 0, type: 0 },
        { value: '积分兑换规则', id: 1, type: 1 },
      ],

    }
  }
  editorChangeCallback = (e) => {
    console.log(e)
    let index = e.target.value
    let bool = true
    if (index === 1) {
      bool = false
    }
    this.setState({
      isRule: bool
    })
  }
  // 兑换规则成功回调
  onExplainCallback = (e) => {
    console.log(e)
  }
  render() {
    let { titleList, isRule } = this.state;
    return (
      <div>
        {
          titleList && titleList.length > 0 && (
            <div style={{ borderBottom: '1px solid #e8e8e8', paddingBottom: 10 }}>
              <Radio.Group defaultValue={0} buttonStyle="solid" size="large" onChange={this.editorChangeCallback}>
                {
                  titleList.map((item, index) => <Radio.Button key={item.id} value={index}>{item.value}</Radio.Button>)
                }
              </Radio.Group>

            </div>
          )
        }

        {
          isRule ? <RuleGeneration /> : <Explain onExplainCallback={this.onExplainCallback} />
        }
      </div>
    )
  }
}

class RuleGeneration extends React.Component {
  constructor() {
    super()
    this.state = {
      urls: {
        list: ''
      },
      ruleValue: null,
      isRulePop: false,
      dataSource: [
        {
          Id: 21000,
          project: "绑定手机邮箱",
          rule: 1,
          explain: '首次绑定手机或邮箱可获得的积分'
        },
        {
          Id: 21001,
          project: "绑定微信公众号",
          rule: 0,
          explain: '会员在微信端绑定个人账号赠送的积分'
        },
        {
          Id: 21002,
          project: "每日登录",
          rule: 0,
          explain: '	会员每日登录赠送的积分，每天仅第一次登录可获得积分'
        },
        {
          Id: 21003,
          project: "商品评论",
          rule: 0,
          explain: '会员每次发布商品评论赠送的积分'
        },
        {
          Id: 21004,
          project: "晒订单",
          rule: 0,
          explain: '会员每个订单首次晒单赠送的积分'
        },
      ]
    }
  }


  blurInputNumber = (e) => {
    this.setState({
      isRulePop: false,
    })
  }

  focusInputNumber = (e) => {
    if(!this.state.ruleValue) {
      this.setState({
        isRulePop: true,
      })
    }

    this.setState({
      isRuleErrorPop: false,
    })
  }

  onRuleChange = (e)=> {
    this.setState({
      ruleValue: e
    })
  }

  ruleSubmit = () => {
    if(!this.state.ruleValue) {
      this.setState({
        isRuleErrorPop: true
      })

      return message.error('每次消费金额必填')
    }
  }
  render() {
    let { urls, dataSource,ruleValue,isRulePop,isRuleErrorPop } = this.state;
    const _columns = () => {
      return [
        {
          title: '项目',
          key: 'project',
          dataIndex: 'project',
        },
        {
          title: '积分',
          key: 'rule',
          dataIndex: 'rule',
          editable: true,
        },
        {
          title: '说明',
          key: 'explain',
          dataIndex: 'explain',
        },
      ]
    }
    return (
      <div style={{ marginTop: 10 }}>

        <Row>
          <Col span={4} style={{ fontSize: 12, textAlign: 'right',marginTop: 4,paddingRight: 20 }}>
            规则配置：
          </Col>
          <Col span={20}>
            <GtableEdit
              urls={urls}
              bordered={true}
              isRowSelection={false}
              dataSource={dataSource}
              columns={_columns}
            />
          </Col>
        </Row>

        <Row style={{marginTop: 10}}>
          <Col span={4} style={{ fontSize: 12, textAlign: 'right',marginTop: 8,paddingRight: 20 }}>
            其他：
          </Col>
          <Col span={20} style={{display: 'flex', alignItems:'center', fontSize: 12}}>
            每次消费  <InputNumber value={ruleValue} precision={0} min={1} style={{width: 70, margin: '0 4px',border: isRuleErrorPop?'1px solid #f60': '',}} onChange={this.onRuleChange} onFocus={this.focusInputNumber} onBlur={this.blurInputNumber} />  元可以获得1积分
            { isRulePop && <span style={{color: '#00be00', marginLeft: 20}}>必填</span>}
            { isRuleErrorPop && <span style={{color: '#f60', marginLeft: 20}}>错误</span>}
            <span style={{color: '#999', fontSize: 12,marginLeft: 10}}>金额不足1积分部分将自动省去</span>
          </Col>
        </Row>

        <Row style={{marginTop: 30}}>
          <Col span={4} style={{ fontSize: 12, textAlign: 'right',marginTop: 8,paddingRight: 20 }}>
          </Col>
          <Col span={20} style={{display: 'flex', alignItems:'center', fontSize: 12}}>
            <Button type="primary" onClick={this.ruleSubmit}>提交</Button>
          </Col>
        </Row>
      </div>
    )
  }
}