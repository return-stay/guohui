import React from 'react'
import GtableEdit from '../../../../common/GtableEdit'
import { Divider, Modal, Form, Select, Input } from "antd";
import { withRouter } from 'react-router-dom'
import { getOptionsList } from "../../../../utils";
const { TextArea } = Input
class IntegralManage extends React.Component {
    constructor() {
        super()

        this.state = {
            urls: {
                list: '/product/search',
                listMethod: 'POST',
                add: '',
                edit: '',
                delete: '/product/delete',
                deleteMethod: 'POPST'
            },
        }
    }

    checkDetiai = (item) => {
        this.props.history.push('/user/integral/detail?id=' + item.productId)
    }
    edit = (item) => {
        this.editChild.edit(item)
    }
    render() {

        let { urls } = this.state;
        const _columns = (that) => {
            return [
                {
                    title: '序号',
                    key: 'productName',
                    render(item) {
                        return (
                            <div>{item.productName}</div>
                        )
                    }
                },
                {
                    title: '用户名',
                    key: 'productCategoryId',
                    render(item) {
                        let str = item.cateName + '/' + item.childCateName
                        return <span>{str}</span>
                    }
                },
                {
                    title: '姓名',
                    key: 'currentPrice',
                    dataIndex: 'currentPrice',
                },
                {
                    title: '手机号',
                    key: 'memberPrice',
                    dataIndex: 'memberPrice',
                },
                {
                    title: '获取积分数量',
                    key: 'stock',
                    dataIndex: 'stock',
                    sorter: true,
                },
                {
                    title: '消耗积分数量',
                    key: 'startSalesVolume',
                    dataIndex: 'startSalesVolume',
                    sorter: true,
                },
                {
                    title: '剩余积分数量',
                    key: 'statusStr',
                    dataIndex: 'statusStr',
                },
                {
                    title: '操作',
                    render: (item) => {
                        const spanStyle = { color: '#1890ff', cursor: 'pointer' }
                        return (
                            <>
                                <span style={spanStyle} onClick={() => { this.checkDetiai(item) }}>查看详情</span>
                                <Divider type="vertical" />
                                <span style={spanStyle} onClick={() => this.edit(item)}>积分编辑</span>
                            </>
                        )
                    }
                }
            ]
        }
        const searchData = [
            { type: 'input', field: 'dianpu', label: '用户名', placeholder: '请输入用户名/手机号' },
        ]
        return (
            <div>

                <GtableEdit
                    rowKey={record => record.productSpecId}
                    urls={urls}
                    columns={_columns}
                    searchData={searchData}
                    isRowSelection={false}
                />

                <IntegralEditFrom triggerRef={ref => this.editChild = ref} />
            </div>
        )
    }
}

export default withRouter(IntegralManage)



class IntegralEdit extends React.Component {
    constructor() {
        super()

        this.state = {
            visible: false,
            title: '积分编辑'
        }
    }
    componentDidMount() {
        this.props.triggerRef && this.props.triggerRef(this)
    }

    edit = (item) => {
        this.show()
    }

    show = () => {
        this.setState({
            visible: true,
        })
    }
    onCancel = () => {
        this.setState({
            visible: false,
        })
    }
    onOk = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                console.log(values)
            }
        })
    }
    render() {
        const formLayout = {
            labelCol: { span: 6 },
            wrapperCol: { span: 15 },
        };
        const { visible, title } = this.state
        const { getFieldDecorator } = this.props.form;
        return (
            <Modal
                title={title}
                visible={visible}
                onCancel={this.onCancel}
                onOk={this.onOk}
            >

                <Form {...formLayout}>

                    <Form.Item label="操作">
                        {getFieldDecorator('shopId', { valuePropName: 'value', rules: [{ required: true, message: '请选择所属店铺' }] })(
                            <Select placeholder='请选择所属店铺'>
                                {getOptionsList([
                                    { id: 0, value: '0', label: 'one店铺' },
                                    { id: 1, value: '1', label: '第er 店铺' },
                                ])}
                            </Select>
                        )}
                    </Form.Item>

                    <Form.Item label="数量">
                        {getFieldDecorator('productName', { valuePropName: 'value', rules: [{ required: true, message: '请输入名称' }] })(<Input placeholder='请输入名称' />)}
                    </Form.Item>

                    <Form.Item label="原因">
                        {getFieldDecorator('原因', { valuePropName: 'value', rules: [{ required: true, message: '请输入原因' }] })(<TextArea placeholder='请输入名称' />)}
                    </Form.Item>

                </Form>

            </Modal>
        )
    }
}


const IntegralEditFrom = Form.create()(IntegralEdit)


