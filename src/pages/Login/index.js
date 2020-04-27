import { Form, Input, Button, Checkbox } from 'antd'
import React from 'react'
import { Redirect } from 'react-router-dom'
import connect from '../../utils/connect'
// import { login } from './service'
import './index.less'
import lb_bg from '../../asset/login/lb_bg.png'
@connect
class NormalLoginForm extends React.Component {
    handleSubmit = e => {
        const _this = this
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                _this.authChange({ ...values, lang: 0, rememberMe: 0 })
            } else {
                console.log(err)
            }
        })
    }

    onNextChange = (e) => {
        console.log(`checked = ${e.target.checked}`);
    }

    authChange = (values) => {
        const { dispatch, authChangeAction } = this.props
        // login(values).then(res => {
        //     console.log(res)
        //     const action = authChangeAction(res.data)
        //     dispatch(action)
        // }).catch(err => {
        //     console.log(err)
        //     message.error(err.message)
        // })

        setTimeout(() => {
            let res = {
                message: 'token获取成功',
                code: 1,
                data: {
                    token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFkbWluIiwiaWF0IjoxNTgwMjg0MTI2LCJleHAiOjE1ODAzNzA1MjZ9.-uRlY6nl1QFpH9HUKwyvoZYlc-iMMNvAuJINTv0TtG4'
                }
            }
            const action = authChangeAction(res.data.token)
            dispatch(action)
        }, 100);
    }

    render() {
        if (this.props.state.authed || localStorage.getItem('authed')) {
            return (
                <Redirect to="/user" />
            )
        }
        const { getFieldDecorator } = this.props.form;
        return (
            <div className="wrapper_login">


                <div className="login_left">

                    <div className="login_box_cont">

                        <div className="login_bg_box">
                            <img src={lb_bg} alt="图片" />
                        </div>

                        <div className="login_wlo">Welcome</div>

                        <div className="login_left_text">欢迎登录国惠商城后台管理系统</div>
                    </div>


                </div>
                <div className="login_right">
                    <div className="login_box_cont">

                        <Form onSubmit={this.handleSubmit} className="login-form login-form-login">
                            <div style={{ textAlign: 'left', fontSize: 32, color: '#333', marginBottom: 30 }}> 登陆 </div>
                            {/* <div className="login-title">账号登陆</div> */}
                            <Form.Item>
                                {getFieldDecorator('username', {
                                    rules: [{ required: true, message: 'Please input your username!' }],
                                })(
                                    <Input
                                        style={{ height: 42, paddingLeft: 20 }}
                                        // prefix={<img className="input-icon" src={phone} alt="icon" />}
                                        placeholder="username"
                                    />
                                )}
                            </Form.Item>
                            <Form.Item>
                                {getFieldDecorator('password', {
                                    rules: [{ required: true, message: 'Please input your Password!' }],
                                })(
                                    <Input
                                        style={{ height: 42, paddingLeft: 20 }}
                                        // prefix={<img className="input-icon" src={password} alt="icon" />}
                                        type="password"
                                        placeholder="password"
                                    />,
                                )}
                            </Form.Item>

                            <div className="login-record">

                                <div>
                                    <Checkbox onChange={this.onNextChange}>下次自动登录</Checkbox>
                                </div>
                                <div style={{ fontSize: 10, color: '#3983FB', cursor: 'pointer' }}>忘记密码</div>
                            </div>
                            <Form.Item>
                                <Button type="primary" htmlType="submit" className="login-form-button">
                                    登录
                        </Button>
                            </Form.Item>
                            <Form.Item>
                                <div className="loginTip">用户为admin的时候，能够看到所有的权限列表</div>
                            </Form.Item>
                        </Form>
                    </div>

                </div>
            </div>
        );
    }
}

const WrappedNormalLoginForm = Form.create({ name: 'normal_login' })(NormalLoginForm)
export default WrappedNormalLoginForm
