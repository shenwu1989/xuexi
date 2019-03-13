import React, { Component } from 'react';
import { Form, Button, Row, Col, Select, Input, message } from 'antd'
import { jrFetchPost, jrFetchGet, queryNull } from '../../../src/pages/common';
import styleConfig from '../../config/styleConfig';
import { Link } from "react-router-dom";

const FormItem = Form.Item;
const { Option } = Select;
const { TextArea } = Input;

class AddIntentionItem extends Component {
    constructor(props) {
        super(props);
        this.state = {
            button_Switch: true
        }
    }
    componentDidMount() {
        let id = Number(this.props.location.search.substr(1));
        this.setState({
            id
        })
        const getUrl = !!id ? `/ng-lingxi/api/project/external/view/edit/${id}` : `/ng-lingxi/api/project/external/view/create`;
        //新建编辑初始数据
        jrFetchGet(getUrl).then(res => {
            this.setState({
                dataInfo: res.data
            })
        })
    }
    render() {
        const { getFieldDecorator } = this.props.form;
        const { formItemLayout } = styleConfig;
        const { first_industry = [], following_state_list = {}, users = {}, info = {} } = this.state.dataInfo || {};
        const postUrl = !!this.state.id ? `/ng-lingxi/api/project/external/edit` : `/ng-lingxi/api/project/external/create`;
        let xs = { span: 24 }, sm = { span: 8 };
        return (
            <div className={'tabPane'}>
                <Form>
                    <Row>
                        <Col span={22} offset={1}>
                            <h1 className={'title'}>{!!this.state.id ? '编辑' : '新建'}外部意向项目</h1>
                        </Col>
                    </Row>
                    <Row >
                        <Col xs={{ ...xs }} sm={{ ...sm }}>
                            <FormItem label={'项目名称'} {...formItemLayout}>
                                {
                                    getFieldDecorator('name', {
                                        initialValue: info.name || '',
                                        rules: [
                                            {
                                                required: true, message: '必填'
                                            }
                                        ]

                                    })(
                                        <Input placeholder="请输入项目名称" allowClear />
                                    )
                                }
                            </FormItem>
                        </Col>
                        <Col xs={{ ...xs }} sm={{ ...sm }}>
                            <FormItem label={'一级行业'} {...formItemLayout}>
                                {
                                    getFieldDecorator('first_industry', {
                                        initialValue: info.first_industry,
                                    })(
                                        <Select>
                                            {
                                                first_industry.map((item, index) => {
                                                    return <Option key={index} value={index}>{item}</Option>
                                                })
                                            }
                                        </Select>
                                    )
                                }
                            </FormItem>
                        </Col>
                        <Col xs={{ ...xs }} sm={{ ...sm }}>

                            <FormItem label={'二级行业'} {...formItemLayout}>
                                {
                                    getFieldDecorator('second_industry', {
                                        initialValue: info.second_industry || "",
                                    })(
                                        <Input placeholder="请输入二级行业" allowClear />
                                    )
                                }
                            </FormItem>

                        </Col>
                    </Row>
                    <Row>
                        <Col xs={{ ...xs }} sm={{ ...sm }}>

                            <FormItem label={'录入人'} {...formItemLayout}>
                                {
                                    getFieldDecorator('staffing', {
                                        initialValue: !queryNull(info.staffing) ? info.staffing.map(item => item.toString()) : undefined,
                                    })(
                                        <Select mode={"multiple"}>
                                            {
                                                Object.keys(users).map((item, index) => {
                                                    return <Option key={index} value={item}>{users[item]}</Option>
                                                })
                                            }
                                        </Select>
                                    )
                                }
                            </FormItem>

                        </Col>
                        <Col xs={{ ...xs }} sm={{ ...sm }}>

                            <FormItem label={'跟进状态'} {...formItemLayout}>
                                {
                                    getFieldDecorator('following_state', {
                                        initialValue: info.following_up_state && String(info.following_up_state),
                                        rules: [
                                            {
                                                required: true, message: '必填'
                                            }
                                        ]
                                    })(
                                        <Select >
                                            {
                                                Object.keys(following_state_list).map((item, index) => {
                                                    return <Option key={index} value={item}>{following_state_list[item]}</Option>
                                                })
                                            }
                                        </Select>
                                    )
                                }
                            </FormItem>

                        </Col>
                        <Col xs={{ ...xs }} sm={{ ...sm }}>

                            <FormItem label={'历史投资机构'} {...formItemLayout}>
                                {
                                    getFieldDecorator('agency_history', {
                                        initialValue: info.agency_history || ''
                                    })(
                                        <TextArea placeholder="请输入历史投资机构" autosize={{ minRows: 2, maxRows: 6 }} />
                                    )
                                }
                            </FormItem>

                        </Col>
                    </Row>
                </Form>
                <Row>
                    <Col sm={{ span: 8 }} offset={10}>
                        <Button
                            onClick={() => this.state.button_Switch && this.handleSubmit(postUrl)} type={'primary'}
                            style={{ marginRight: '60px', marginTop: '40px' }}
                        >
                            保存
                        </Button>
                        <Button onClick={() => this.props.history.goBack()}>
                            取消
                        </Button>
                    </Col>
                </Row>
            </div>
        );
    }
    //新建编辑提交
    handleSubmit = (url) => {
        this.setState({
            button_Switch: false
        })
        let form = this.props.form;
        let valuse = form.getFieldsValue();
        //处理默认值
        Object.keys(valuse).map(key => {
            if (key === 'first_industry') {
                valuse[key] = valuse[key] === undefined ? 0 : valuse[key]
            }
        })
        let id = this.state.id;
        if (!!id) valuse.pid = id;
        form.validateFields((err) => {
            if (!err) {
                jrFetchPost(url, {
                    ...valuse
                }).then(res => {
                    if (res.code === 0) {
                        message.success('操作成功！', 1, onClose => {
                            this.props.history.goBack();
                        })
                    } else {
                        this.setState({
                            button_Switch: true
                        })
                    }
                })
            } else {
                this.setState({
                    button_Switch: true
                })
            }
        })
    }
}

export default Form.create()(AddIntentionItem);
