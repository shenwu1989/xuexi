import md5 from 'md5';
import { jrFetchPost } from '../common';
import React, { PureComponent } from 'react'
import { getCookie, cookieConfig, removeCookie } from '../Cookie';

import { Form, Input, Button, message, Row, Col, Modal } from 'antd'


const FormItem = Form.Item;

class AccountManage extends PureComponent {
    constructor(props, context) {
        super(props, context);
        this.state = {}
    }


    componentDidMount() {
        const userInfo = getCookie(cookieConfig);
        this.setState({
            phone: userInfo.phone
        })
    }

    render() {
        const { form } = this.props;
        const { getFieldDecorator } = form;
        const formItemLayoutShort = {
            labelCol: { span: 6 },
            wrapperCol: { span: 8 },
        };
        const formItemLayoutButton = {
            wrapperCol: { offset: 6 },
        };
        return (
            <div className='mainview'>
                <Row>
                    <Col span={22} offset={1}>
                        <h1 className={'title'}>密码修改</h1>
                    </Col>
                </Row>
                <div className='container'>
                    <Form style={{ marginTop: 50 }}>
                        <FormItem
                            {...formItemLayoutShort}
                            label="登录账号"
                        >
                            <Input disabled={true} value={this.state.phone} />
                        </FormItem>
                        <FormItem
                            {...formItemLayoutShort}
                            label="当前密码"
                        >
                            {
                                getFieldDecorator("pre", {
                                    rules: [
                                        { required: true, message: '请输入当前密码！' },
                                    ],
                                })(
                                    <Input
                                        placeholder="请输入当前密码"
                                    />
                                )
                            }
                        </FormItem>
                        <FormItem
                            {...formItemLayoutShort}
                            label="设置新密码"
                        >
                            {
                                getFieldDecorator("post", {
                                    rules: [
                                        { pattern: /^[\w_-]{6,16}$/, required: true, message: `请输入新密码,6-16位字母数字！` },
                                    ],
                                })(
                                    <Input
                                        placeholder="请输入6-16位新密码"
                                    />
                                )
                            }
                        </FormItem>
                        <FormItem
                            {...formItemLayoutShort}
                            label="确认新密码"
                        >
                            {
                                getFieldDecorator("new_post", {
                                    rules: [
                                        { pattern: /^[\w_-]{6,16}$/, required: true, message: '请确认新密码,6-16位字母数字！' },
                                    ],
                                })(
                                    <Input
                                        placeholder="请输入新密码"
                                    />
                                )
                            }
                        </FormItem>
                        <FormItem
                            {...formItemLayoutButton}
                        >
                            <Row>
                                <Col offset={3}>
                                    <Button style={{ marginRight: 20 }} onClick={this.handleClear}>清空</Button>
                                    <Button type="primary" onClick={this.handleSubmit}>确认</Button>
                                </Col>
                            </Row>
                        </FormItem>
                    </Form>
                </div>


            </div>
        )
    }

    //发送请求
    handleSubmit = () => {
        const { form } = this.props;
        let _this = this;
        form.validateFields((err) => {
            if (!err) {
                const formObj = form.getFieldsValue();
                if (formObj.post !== formObj.new_post) {
                    message.warn("两次新密码输入不同！");
                    return;
                }
                jrFetchPost("/ng-lingxi/api/user/update/password", {
                    post: md5(formObj.post),
                    pre: md5(formObj.pre),
                }).then(ret => {
                    if (ret.code === 0) {
                        Modal.success({
                            title: '密码修改成功！',
                            content: '修改成功后需要重新登录',
                            onOk() {
                                sessionStorage.clear();
                                jrFetchPost(`/ng-lingxi/api/user/logout`).then(res => {
                                    removeCookie(cookieConfig)
                                })
                            },
                        })
                    }
                })
            }
        });
    }
    //清空
    handleClear = () => {
        const { form } = this.props;
        form.resetFields();
    }
    hideModal = () => {
        console.log(1);
    }
}


export default Form.create()(AccountManage);