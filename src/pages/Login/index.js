import React, {Component} from 'react';
import {Button, Form, Input, Icon, Tooltip, Row, Col} from 'antd';
import {jrFetchPost} from "../common";
import {cookieConfig, setCookie, checkCookie, getCookie} from '../Cookie';
import md5 from 'md5';
import './index.less';

const FormItem = Form.Item;

class Index extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    componentDidMount() {
        if (checkCookie(cookieConfig)) {
            let userInfo = getCookie(cookieConfig);
            userInfo.user_admin === 'true' ? this.props.history.push(`/admin/adminitemmanage`) : this.props.history.push(`/admin/myitemmanage`);
        }
    }

    render() {
        const {getFieldDecorator} = this.props.form;
        return (
            <div className="login">
                <div className="content">
                    <p className="title">灵犀资本管理系统</p>
                    <div className="box">
                        <Form>
                            <FormItem>
                                {
                                    getFieldDecorator('phone', {
                                        initialValue: '',
                                        rules: [
                                            {
                                                required: true,
                                                message: '用户名不能为空'
                                            },
                                            {
                                                len: 11,
                                                message: '请输入手机号'
                                            },
                                            {
                                                pattern: /^\d+$/g,
                                                message: '手机号必须为数字'
                                            },
                                        ]
                                    })(
                                        <Input prefix={<Icon type="user"/>} placeholder={'请输入手机账号'}/>
                                    )
                                }

                            </FormItem>
                            <FormItem>
                                {
                                    getFieldDecorator('password', {
                                        initialValue: '',
                                        rules: [
                                            {
                                                required: true,
                                                message: '密码不能为空'
                                            }
                                        ]
                                    })(
                                        <Input type="password" prefix={<Icon type="lock"/>} placeholder={'请输入密码'}/>
                                    )
                                }
                            </FormItem>
                            <Row>
                                <Col xs={{span: 24}} sm={{span: 12}}>
                                    <FormItem>
                                        {/* {
                                            getFieldDecorator('remember', {
                                                valuePropName: 'checked',
                                                initialValue: true
                                            })(
                                                <Checkbox className={'setpswd'}>记住密码</Checkbox>
                                            )
                                        } */}
                                    </FormItem>
                                </Col>
                                <Col xs={{span: 24}} sm={{span: 12}} style={{marginBottom:'10px'}}>
                                    <Tooltip placement="bottomRight" title={
                                        '普通用户请联系admin,admin用户请联系工作人员重置密码'
                                    }>
                                        <p className={'forget'}>忘记密码？</p>
                                    </Tooltip>
                                </Col>
                            </Row>
                        </Form>
                        <Button onClick={this.handleSubmit} className={'button'}>登录</Button>
                    </div>
                </div>
            </div>
        );
    }

    handleSubmit = () => {
        let userInfo = this.props.form.getFieldsValue();
        let {password, phone} = userInfo;
        let loading = false;
        password = md5(password)
        this.props.form.validateFields((err, values) => {
            if (!err) {
                jrFetchPost(' /ng-lingxi/api/user/login', {
                    password, phone
                }, loading).then(ret => {
                    let userInfo = {...ret.data, phone};
                    setCookie(userInfo);
                    if(ret.code === 0){
                        userInfo.user_admin  ? this.props.history.push(`/admin/adminitemmanage`) : this.props.history.push(`/admin/myitemmanage`);
                    }
                })
            }

        })
    }
}

export default Form.create()(Index);