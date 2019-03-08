import React, { Component } from 'react';
import { Form, Button, Row, Col, Select, Input, Table } from 'antd'
import { jrFetchPost, jrFetchGet } from '../../../src/pages/common';
import styleConfig from '../../config/styleConfig';
import { Link } from "react-router-dom";
import TableListConfig from './tableListConfig';
import './index.less';
const FormItem = Form.Item;
const { Option } = Select;

class Index extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    render() {
        const { getFieldDecorator } = this.props.form;
        const { formItemLayout } = styleConfig;
        const { first_industry = [], following_state = [], phase = [], users = {} } = this.state.dataInfo || {};
        const xs = { span: 24 }, sm = { span: 8 };
        return (
            <div>
                <Row>
                    <Col span={22} offset={1}>
                        <h1 className={'title'}>项目公司库</h1>
                    </Col>
                </Row>
                <Form>
                    <Row>
                        <Col xs={{ ...xs }} sm={{ ...sm }}>
                            <FormItem label={'项目名称'} {...formItemLayout}>
                                {
                                    getFieldDecorator('name', {})(
                                        <Input placeholder="请输入项目名称" allowClear/>
                                    )
                                }
                            </FormItem>
                        </Col>
                        <Col xs={{ ...xs }} sm={{ ...sm }}>
                            <FormItem label={'一级行业'} {...formItemLayout}>
                                {
                                    getFieldDecorator('first_industry', {
                                        initialValue: 0,
                                    })(
                                        <Select placeholder={'请选择一级行业'}>
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
                                    })(
                                        <Input placeholder="请输入二级行业" allowClear/>
                                    )
                                }
                            </FormItem>
                        </Col>
                    </Row>
                    <Row>
                        <Col xs={{ ...xs }} sm={{ ...sm }}>
                            <FormItem label={'staffing/录入人'} {...formItemLayout}>
                                {
                                    getFieldDecorator('staffing', {})(
                                        <Select placeholder={'请选择轮次'} mode={"multiple"}>
                                            {
                                               Object.keys(users).map((item,index)=>{
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
                                    getFieldDecorator('state', {
                                        initialValue: 0,
                                    })(
                                        <Select placeholder={'请选择准备阶段'}>
                                            {
                                                following_state.map((item, index) => {
                                                    return <Option key={index} value={index}>{item}</Option>
                                                })
                                            }
                                        </Select>
                                    )
                                }
                            </FormItem>
                        </Col>
                        <Col xs={{ ...xs }} sm={{ ...sm }}>
                            <FormItem label={'项目阶段'} {...formItemLayout}>
                                {
                                    getFieldDecorator('phase', {
                                        initialValue: 0,
                                    })(
                                        <Select placeholder={'请选择项目状态'}>
                                            {
                                                phase.map((item, index) => {
                                                    return <Option key={index} value={index}>{item}</Option>
                                                })
                                            }
                                        </Select>
                                    )
                                }
                            </FormItem>
                        </Col>
                    </Row>
                    <Row>
                        <Col offset={20}>
                            <Button type={"primary"} size={"large"} onClick={this.handleSeek}>查询</Button>
                        </Col>
                    </Row>
                </Form>
                <Row>
                    <Col offset={1}>
                        <Button type={"primary"} size={"large"} >
                            <Link to={'/admin/addintentionitem?0'}>新建外部意向项目</Link>
                        </Button>
                    </Col>
                </Row>
                <Row style={{ marginTop: '20px' }}>
                    <TableListConfig fn={this.getChildrenData} data={this.state.dataInfo}/>
                </Row>
            </div>
        );
    }
    //获取子级数据
    getChildrenData = (data) => {
        this.setState({
            dataInfo: data
        })
    }
    //搜索
    handleSeek = () => {
        let itemInfo = this.props.form.getFieldsValue();
        jrFetchGet(`/ng-lingxi/api/project/external/list`,{
            ...itemInfo
        }).then(res => {
            this.setState({
                dataInfo:res.data
            })
        })
    }

}

export default Form.create()(Index);