import React from 'react'
import GtableEdit from '../../../../common/GtableEdit'

class IntegralDetail extends React.Component {
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
                    title: '原因',
                    key: 'productCategoryId',
                    render(item) {
                        let str = item.cateName + '/' + item.childCateName
                        return <span>{str}</span>
                    }
                },
                {
                    title: '积分数量',
                    key: 'currentPrice',
                    dataIndex: 'currentPrice',
                },
                {
                    title: '时间',
                    key: 'memberPrice',
                    dataIndex: 'memberPrice',
                },
            ]
        }
        const searchData = [
            { type: 'chooseTime', field: 'createTime', label: '创建时间', beginTime: 'startTime', EndTime: 'endTime' },
            {
                type: 'select', field: 'shopType', width: '170px', label: '类型', placeholder: '请选择类型', list: [
                    { id: 0, value: 0, label: '个人' },
                    { id: 1, value: 1, label: '企业' }
                ]
            },
        ]
        return (
            <div>

                <GtableEdit
                    urls={urls}
                    columns={_columns}
                    searchData={searchData}
                    isRowSelection={false}
                />
            </div>
        )
    }
}

export default IntegralDetail