import React from 'react'
import { Form, Select, InputNumber, DatePicker, Button, Input, Radio } from 'antd'
import { getOptionsList } from '../../../../utils'

import './index.less'

const { RangePicker } = DatePicker;
class CouponIssue extends React.Component {
    constructor() {
        super()

        this.state = {
            freeValue: '2',
            typeValue: '0',
        }
    }
    onDateChange = (value, dateString) => {
        console.log(value, dateString)
        let startDate = dateString[0]
        let endDate = dateString[1]
        console.log(startDate, endDate)
    }

    confimIssue = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                console.log(values)
                const { typeValue } = this.state
                switch (typeValue) {
                    case '1':
                        break;
                    default:

                }
            }
        })
    }

    freeChange = (e) => {
        this.setState({
            freeValue: e.target.value,
        })
    }
    typeChange = (e) => {
        this.setState({
            typeValue: e
        })
    }
    render() {
        const options = [
            { value: '1', label: '1次包邮' },
            { value: '2', label: '半年包邮' },
            { value: '3', label: '全年包邮' },
        ];

        const formLayout = {
            labelCol: { span: 6 },
            wrapperCol: { span: 17 },
        };

        const { getFieldDecorator } = this.props.form;
        const { typeValue, freeValue } = this.state
        return (
            <div className="coupon-issue">
                <h1 style={{ fontSize: 20, marginBottom: 20 }}>优惠券发放</h1>
                <div style={{ display: 'flex' }}>
                    <div style={{ width: 600, flexShrink: 0 }}>

                        <Form {...formLayout}>
                            <Form.Item label="优惠券类型">
                                {getFieldDecorator('type', {
                                    valuePropName: 'value',
                                    rules: [{ required: true, message: '请选择优惠券类型' }]
                                })(
                                    <Select placeholder='请选择优惠券类型' style={{ width: 400 }} onChange={this.typeChange}>
                                        {getOptionsList([
                                            { id: 1, value: '1', label: '满减' },
                                            { id: 2, value: '2', label: '折扣券' },
                                            { id: 3, value: '3', label: '充值返现' },
                                            { id: 4, value: '4', label: '现金券' },
                                            { id: 5, value: '5', label: '生日礼券' },
                                            { id: 6, value: '6', label: '包邮券' },
                                        ])}
                                    </Select>
                                )}
                            </Form.Item>
                            <Form.Item label="适用商品范围">
                                {getFieldDecorator('goods', {
                                    valuePropName: 'value',
                                    rules: [{ required: true, message: '请选择适用商品范围' }]
                                })(
                                    <Select placeholder='请选择适用商品范围' style={{ width: 400 }}>
                                        {getOptionsList([
                                            { id: 0, value: '0', label: 'one店铺' },
                                            { id: 1, value: '1', label: '第er 店铺' },
                                        ])}
                                    </Select>
                                )}
                            </Form.Item>
                            {
                                (typeValue === '0' || typeValue === '1' || typeValue === '2' || typeValue === '3') && <Form.Item label="适用用户范围">
                                    {getFieldDecorator('shop', {
                                        valuePropName: 'value',
                                        rules: [{ required: true, message: '请选择适用用户范围' }]
                                    })(
                                        <Select placeholder='请选择适用用户范围' style={{ width: 400 }}>
                                            {getOptionsList([
                                                { id: 0, value: '0', label: 'one店铺' },
                                                { id: 1, value: '1', label: '第er 店铺' },
                                            ])}
                                        </Select>
                                    )}
                                </Form.Item>
                            }
                            <Form.Item label="数量">
                                {getFieldDecorator('number', {
                                    valuePropName: 'value',
                                    rules: [{ required: true, message: '请输入数量' }]
                                })(
                                    <InputNumber style={{ width: 150 }} />
                                )}
                            </Form.Item>
                            <Form.Item label="可适用日期">
                                {getFieldDecorator('date', {
                                    valuePropName: 'value',
                                    rules: [{ required: true, message: '请输入可适用日期' }]
                                })(
                                    <RangePicker
                                        style={{ width: 400 }}
                                        showTime={{ format: 'HH:mm' }}
                                        format="YYYY-MM-DD HH:mm"
                                        placeholder={['开始日期', '结束日期']}
                                        onChange={this.onDateChange}
                                    />
                                )}
                            </Form.Item>

                            <Form.Item wrapperCol={{ span: 14, offset: 6 }} style={{ marginTop: 40 }}>
                                <Button type="primary" onClick={this.confimIssue}>确认发放</Button>
                            </Form.Item>
                        </Form>

                    </div>
                    <div>
                        {
                            typeValue === '1' && <div className="form-item" >
                                <span>优惠金额：</span>
                                <span style={{ marginRight: 6 }}>满</span>
                                <Input placeholder="¥" style={{ width: 60 }} />
                                <span style={{ marginRight: 6, marginLeft: 6 }}>减</span>
                                <Input placeholder="¥" style={{ width: 60 }} />
                            </div>
                        }
                        {
                            typeValue === '2' && <div className="form-item" >
                                <span>折扣力度：</span>
                                <Input placeholder="请输入" style={{ width: 120 }} />
                                <span style={{ marginRight: 6, marginLeft: 6 }}>折</span>
                            </div>
                        }
                        {
                            typeValue === '3' && <div className="form-item" >
                                <span>优惠金额：</span>
                                <span style={{ marginRight: 6 }}>充</span>
                                <Input placeholder="¥" style={{ width: 60 }} />
                                <span style={{ marginRight: 6, marginLeft: 6 }}>返</span>
                                <Input placeholder="¥" style={{ width: 60 }} />
                            </div>
                        }
                        {
                            typeValue === '4' && <div>
                                <div className="form-item" >
                                    <span>现金：</span>
                                    <Input placeholder="¥" style={{ width: 60 }} />
                                    <span style={{ marginRight: 6, marginLeft: 6 }}>/张</span>
                                </div>
                                <div className="form-item" >
                                    <span>满价可用：</span>
                                    <span style={{ marginRight: 6 }}>满</span>
                                    <Input placeholder="¥" style={{ width: 60 }} />
                                    <span style={{ marginRight: 6, marginLeft: 6 }}>可用</span>
                                </div>
                                <div className="form-place">
                                    <p>不可提现、转让</p>
                                    <p>所有券之间不可叠加使用</p>
                                </div>
                            </div>
                        }
                        {
                            typeValue === '5' && <div>
                                <div className="form-item" >
                                    <span>礼券金额：</span>
                                    <Input placeholder="¥" style={{ width: 60 }} />
                                    <span style={{ marginRight: 6, marginLeft: 6 }}>/张</span>
                                </div>
                                <div className="form-item" >
                                    <span>满价可用：</span>
                                    <span style={{ marginRight: 6 }}>满</span>
                                    <Input placeholder="¥" style={{ width: 60 }} />
                                    <span style={{ marginRight: 6, marginLeft: 6 }}>可用</span>
                                </div>
                                <div className="form-place">
                                    <p>所有券之间不可叠加使用</p>
                                </div>
                            </div>
                        }
                        {
                            typeValue === '6' && <div>
                                <div className="form-item" >
                                    <Radio.Group options={options} onChange={this.freeChange} value={freeValue} />
                                </div>
                                <div className="form-place">
                                    <p>仅支持单选</p>
                                </div>
                            </div>
                        }
                    </div>
                </div>
            </div>
        )
    }
}


export default Form.create()(CouponIssue)