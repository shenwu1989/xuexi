import md5 from 'md5';
import {jrFetchPost, jrFetchGet} from '../common';
import React, {PureComponent} from 'react'
import {getCookie,cookieConfig} from '../Cookie';

import {Form, Input, Button, message, Row, Col} from 'antd'


const FormItem = Form.Item;

class AccountManage extends PureComponent {
    constructor(props, context) {
        super(props, context);
        this.state={}
    }


    componentDidMount() {
        const userInfo = getCookie(cookieConfig);
           this.setState({
               phone:userInfo.phone
           })
    }

    render() {
        const {form} = this.props;
        const {getFieldDecorator} = form;
        const formItemLayoutShort = {
            labelCol: {span: 6},
            wrapperCol: {span: 8},
        };
        const formItemLayoutButton = {
            wrapperCol: {offset: 6},
        };
        return (
            <div className='mainview'>
                <Row>
                    <Col span={22} offset={1}>
                        <h1 className={'title'}>密码修改</h1>
                    </Col>
                </Row>
                <div className='container'>
                    <Form style={{marginTop: 50}}>
                        <FormItem
                            {...formItemLayoutShort}
                            label="登录账号"
                        >
                            <Input disabled={true} value={this.state.phone}/>
                        </FormItem>
                        <FormItem
                            {...formItemLayoutShort}
                            label="当前密码"
                        >
                            {
                                getFieldDecorator("old_pwd", {
                                    rules: [
                                        {required: true, message: '请输入当前密码！'},
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
                                getFieldDecorator("new_pwd_set", {
                                    rules: [
                                        {required: true, message: '请输入新密码！'},
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
                                getFieldDecorator("new_pwd", {
                                    rules: [
                                        {required: true, message: '请确认新密码！'},
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
                            <Button style={{marginRight: 20}} onClick={this.handleClear}>清空</Button>
                            <Button type="primary" onClick={this.handleSubmit}>确认</Button>
                        </FormItem>
                    </Form>
                </div>


            </div>
        )
    }

    //发送请求
    handleSubmit = () => {
        const {form} = this.props;
        form.validateFields((err) => {
            if (!err) {
                const formObj = form.getFieldsValue();
                if (formObj.new_pwd_set != formObj.new_pwd) {
                    message.warn("两次新密码输入不同！");
                    return;
                }
                /*jrFetchPost("/ng-open_platform/api/changePwd", {
                    new_pwd: md5(formObj.new_pwd + ".mifeng888"),
                    old_pwd: md5(formObj.old_pwd + ".mifeng888"),
                }).then((ret) => {

                    message.info("更改成功！");
                })*/
            }
        });
    }
    //清空
    handleClear = () => {
        const {form} = this.props;
        form.resetFields();
    }
}


export default Form.create()(AccountManage);