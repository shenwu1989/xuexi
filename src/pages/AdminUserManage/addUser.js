import React, {Component} from 'react';
import {Form, Button, Row, Col, Select, Input, message} from 'antd';
import md5 from 'md5';
import {jrFetchPost, jrFetchGet} from '../../../src/pages/common';
import styleConfig from '../../config/styleConfig';
import {getCookie, cookieConfig} from '../Cookie';

const FormItem = Form.Item;
const {Option} = Select;

class AddUser extends Component {
    constructor(props) {
        super(props);
        this.state = {
            projects_list: []
        }

    }

    componentDidMount() {
        let id = Number(this.props.location.search.substr(1).split('=')[1]);
        const userInfo = getCookie(cookieConfig);
        this.setState({
            id
        })
        jrFetchGet(`/ng-lingxi/api/project/internal/all`).then(res => {
            this.setState({
                projectsData: res
            })
        })
        //新建验证权限
        if (!id && !userInfo.user_admin) {
            this.props.history.goBack();
        }
        //编辑用户获取数据
        id && jrFetchGet(`/ng-lingxi/api/user/view/${id}`).then((ret) => {
            ret.data.user && this.setState({
                dataUser: ret.data.user,
                projects_selected: ret.data.projects_selected,
                projects_list: Object.keys(ret.data.projects_list)

            })
        })
    }

    render() {
        const {getFieldDecorator} = this.props.form;
        const {formItemLayout} = styleConfig;
        const {name = '', phone = '', email = ''} = this.state.dataUser || {};
        const projects_list = this.state.projects_list;
        const projects_selected = this.state.projects_selected || [];
        const {data = {}} = this.state.projectsData || {};
        return (
            <div>
                <Row>
                    <Col span={22} offset={1}>
                        <h1 className={'title'}>{!!this.state.id ? '用户编辑' : '用户新增'}</h1>
                    </Col>
                </Row>
                <Form>
                    <Row>
                        <Col xs={{span: 24}} sm={{span: 12}}>
                            <FormItem label={'姓名'} {...formItemLayout}>
                                {
                                    getFieldDecorator('name', {
                                        initialValue: name,
                                        rules: [
                                            {
                                                pattern: /^[^\s]*$/,
                                                required: true, message: '姓名不能为空不能输入空格'
                                            }

                                        ]
                                    })(
                                        <Input placeholder="姓名重复时系统自动添加后缀区别"/>
                                    )
                                }
                            </FormItem>
                        </Col>
                        <Col xs={{span: 24}} sm={{span: 12}}>
                            <FormItem label={'手机号'} {...formItemLayout}>
                                {
                                    getFieldDecorator('phone', {
                                        initialValue: phone,
                                        rules: [
                                            {
                                                len: 11,
                                                required: true, message: '请输入11位手机号'
                                            },
                                            {
                                                pattern: /^\d+$/g,
                                                message: '手机号必须为数字'
                                            },

                                        ]
                                    })(
                                        <Input placeholder="请输入11位手机号"/>
                                    )
                                }
                            </FormItem>
                        </Col>
                    </Row>
                    <Row>
                        <Col xs={{span: 24}} sm={{span: 12}}>
                            <FormItem label={'邮箱'} {...formItemLayout}>
                                {
                                    getFieldDecorator('email', {
                                        initialValue: email,
                                        rules: [
                                            {
                                                pattern: /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/,
                                                required: true, message: '请输入正确的邮箱xxx@xxx.xxx'
                                            }
                                        ]
                                    })(
                                        <Input placeholder="请输入邮箱"/>
                                    )
                                }
                            </FormItem>
                        </Col>
                        <Col xs={{span: 24}} sm={{span: 12}}>
                            <FormItem label={'初始密码'} {...formItemLayout}>
                                {
                                    <p>888888</p>
                                }
                            </FormItem>
                        </Col>
                    </Row>
                    <Row>
                        <Col xs={{span: 24}} sm={{span: 12}}>
                            <FormItem label={'关联项目'} {...formItemLayout}>
                                {
                                    getFieldDecorator('projects', {
                                        initialValue:projects_selected.map(i=>{return i+''}),
                                    })(
                                        <Select mode="multiple" placeholder={'请选择关联项目'}>
                                            {
                                                Object.keys(data).map((tiem, index) => {
                                                    return <Option key={index} value={tiem}>{data[tiem]}</Option>
                                                })
                                            }
                                        </Select>
                                    )
                                }
                            </FormItem>
                        </Col>
                    </Row>
                    <Row>
                        <Col sm={{span: 8}} offset={10}>
                            <Button style={{marginRight: '60px', marginTop: '100px'}} onClick={() => {
                                this.props.history.goBack();
                            }}>取消</Button>
                            <Button type={'primary'} onClick={this.handleSubmit}>保存</Button>
                        </Col>
                    </Row>
                </Form>
            </div>
        );
    }

    //提交数据
    handleSubmit = () => {
        let userInfo = this.props.form.getFieldsValue();
        let md5Password = md5(888888);
        this.props.form.validateFields(
            (err) => {
                if (!err) {
                    userInfo.password = md5Password;
                    userInfo.uid = this.state.id;
                    jrFetchPost(`/ng-lingxi/api/user/edit`, {
                        ...userInfo
                    }).then(ret => {
                        if (ret.code === 0)
                            message.success('操作成功！', 1, onClose => {
                                this.props.history.goBack();
                            })
                    }).catch((err) => {
                        console.log(err)
                    })
                }
            }
        );
    }

    //检测用户名是否重复
    /*handleBlur = () => {
        let name = this.props.form.getFieldValue('name');
        let reg = /^[^\s]*$/;
        !(!!this.state.id) &&
        reg.test(name) &&
        jrFetchGet('/ng-lingxi/api/user/list', {
            name
        }).then((ret) => {
            if (!(ret.data.length === 0))
                this.props.form.setFields({name: {value: name + '1'}})
        })
    }*/
}

export default Form.create()(AddUser);

