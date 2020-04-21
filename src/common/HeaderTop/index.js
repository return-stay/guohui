import React from 'react'
import { withRouter } from 'react-router-dom'

class HeaderTop extends React.Component {
    render() {
        const { parent, current } = this.props
        console.log(this.props)
        return (
            <div className="user-cont-title">
                <p style={{ padding: '10px 0', marginBottom: 0 }}>{parent}</p>
                {current && <h2 style={{ fontSize: 20, paddingBottom: 16 }}>商品列表</h2>}
            </div>
        )
    }
}

export default withRouter(HeaderTop)