import React from 'react'
import { getOptionsList } from '../../utils'
import { Input, Select, Form, Button, DatePicker, Checkbox, Cascader, InputNumber } from 'antd'
import moment from 'moment'
const FormItem = Form.Item
const InputGroup = Input.Group;
class FilterForm extends React.Component {
    creatFormList = () => {
        //用于双向数据绑定
        const { getFieldDecorator } = this.props.form
        const data = this.props.data;
        const list = [];
        data.forEach((item, index) => {
            const { type, field, label, initialValue, rules, width, placeholder, disabled, beginTime, EndTime, options,
                min, minValue, max, maxValue,changeOnSelect } = item;
            switch (type) {
                case 'input':
                    const inputItem = <FormItem key={field} label={label}>
                        {getFieldDecorator(field, {
                            initialValue,
                            rules,
                        })(
                            <Input style={{ width }} type="text" placeholder={placeholder} disabled={disabled} />
                        )}
                    </FormItem>
                    list.push(inputItem);
                    break;
                case 'inputnumber':
                    const inputNumberItem = <FormItem key={field} label={label}>
                        {getFieldDecorator(field, {
                            initialValue,
                            rules,
                        })(
                            <InputNumber style={{ width }} type="text" placeholder={placeholder} disabled={disabled} />
                        )}
                    </FormItem>
                    list.push(inputNumberItem);
                    break;
                case 'inputnumbergroup':
                    const inputNumberGroupItem = <FormItem key={field} label={label}>
                        <InputGroup compact>
                            {getFieldDecorator(min || 'min', {
                                initialValue: minValue,
                                rules,
                            })(<InputNumber style={{ width: 100, textAlign: 'center' }} placeholder="最小值" />)}
                            <Input
                                style={{ width: 30, borderLeft: 0, pointerEvents: 'none', backgroundColor: '#fff' }}
                                placeholder="~"
                                disabled
                            />
                            {getFieldDecorator(max || 'max', {
                                initialValue: maxValue,
                                rules,
                            })(<InputNumber style={{ width: 100, textAlign: 'center', borderLeft: 0 }} placeholder="最大值" />)}
                        </InputGroup>
                    </FormItem>
                    list.push(inputNumberGroupItem);
                    break;
                case 'inputgroup':
                    const inputGroupItem = <FormItem key={field} label={label}>
                        <InputGroup compact>
                            {getFieldDecorator(min || 'min', {
                                initialValue: minValue,
                                rules,
                            })(<Input style={{ width: 100, textAlign: 'center' }} placeholder="最小值" />)}
                            <Input
                                style={{ width: 30, borderLeft: 0, pointerEvents: 'none', backgroundColor: '#fff' }}
                                placeholder="~"
                                disabled
                            />
                            {getFieldDecorator(max || 'max', {
                                initialValue: maxValue,
                                rules,
                            })(<Input style={{ width: 100, textAlign: 'center', borderLeft: 0 }} placeholder="最大值" />)}
                        </InputGroup>
                    </FormItem>
                    list.push(inputGroupItem);
                    break;
                case 'select':
                    const selectItem = <FormItem key={field} label={label}>
                        {getFieldDecorator(field, {
                            initialValue,
                        })(
                            <Select style={{ width }} disabled={disabled} placeholder={placeholder}>
                                {getOptionsList(item.list)}
                            </Select>
                        )}
                    </FormItem>
                    list.push(selectItem);
                    break;
                case 'cascader':
                    const cascaderItem = <FormItem key={field} label={label}>
                        {getFieldDecorator(field, {
                            initialValue,
                        })(
                            <Cascader style={{ width }} options={options} changeOnSelect={changeOnSelect || false} disabled={disabled} placeholder={placeholder}></Cascader>
                        )}
                    </FormItem>
                    list.push(cascaderItem);
                    break;
                case 'checkbox':
                    const checkboxItem = <FormItem key={field} label={label}>
                        {getFieldDecorator(field, {
                            valuePropName: ' ',
                        })(
                            <Checkbox style={{ width }} disabled={disabled}></Checkbox>
                        )}
                    </FormItem>
                    list.push(checkboxItem);
                    break;
                case 'chooseTime':
                    const beginTimeItem = <FormItem key={beginTime || 'beginTime'} label={label}>
                        {getFieldDecorator(beginTime || 'beginTime')(
                            <DatePicker showTime={true} placeholder={placeholder} format="YYYY-MM-DD HH:mm:ss" disabled={disabled} />
                        )}
                    </FormItem>
                    list.push(beginTimeItem);
                    const endTimeItem = <FormItem key={EndTime || 'EndTime'} label="~" colon={false} >
                        {
                            getFieldDecorator(EndTime || 'EndTime')(
                                <DatePicker showTime={true} placeholder={placeholder} format="YYYY-MM-DD HH:mm:ss" disabled={disabled} />
                            )
                        }
                    </FormItem>
                    list.push(endTimeItem)
                    break;
                default:
            }
        })
        return list;
    }
    reset = () => {
        this.props.form.resetFields();
    }
    handleFilterSubmit = () => {
        // const data = this.props.form.getFieldsValue();
        // console.log(data)
        this.props.form.validateFields((err, fieldsValue) => {
            if (err) {
                return;
            }
            console.log(fieldsValue)
            fieldsValue.startTime = fieldsValue.startTime && moment(fieldsValue.startTime).format('YYYY-MM-DD HH:mm:ss')
            fieldsValue.endTime = fieldsValue.endTime && moment(fieldsValue.endTime).format('YYYY-MM-DD HH:mm:ss')
            this.props.handleSearch(fieldsValue);
        })
    }
    render() {
        return (
            <Form layout='inline'>
                {this.creatFormList()}
                <FormItem>
                    <Button type="primary" style={{ margin: '0 20px' }} onClick={this.handleFilterSubmit}>搜索</Button>
                    <Button onClick={this.reset}>重置</Button>
                </FormItem>
            </Form>
        )
    }
}

export default Form.create()(FilterForm);