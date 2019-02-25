import React, {Component} from 'react';
import {Form, Button, Row, Col, Select, Input, Table} from 'antd'
import {jrFetchPost, jrFetchGet} from '../../../src/pages/common';
import styleConfig from '../../config/styleConfig';
import {Link} from "react-router-dom";
import tableListConfig from './tableListConfig'

const FormItem = Form.Item;
const {Option} = Select;

class Index extends Component {
    constructor(props) {
        super(props);

    }

    render() {
        const columns = tableListConfig;
        const {getFieldDecorator} = this.props.form;
        const {formItemLayout} = styleConfig;
        const xs = {span: 24}, sm = {span: 8};

        return (
            <div>
                <Row>
                    <Col span={22} offset={1}>
                        <h1 className={'title'}>项目公司库</h1>
                    </Col>
                </Row>
                <Form>
                    <Row>
                        <Col xs={{...xs}} sm={{...sm}}>
                            <FormItem label={'项目名称'} {...formItemLayout}>
                                {
                                    getFieldDecorator('name', {})(
                                        <Input placeholder="请输入项目名称"/>
                                    )
                                }
                            </FormItem>
                        </Col>
                        <Col xs={{...xs}} sm={{...sm}}>
                            <FormItem label={'一级行业'} {...formItemLayout}>
                                {
                                    getFieldDecorator('second_industry', {})(
                                        <Select placeholder={'请选择一级行业'}>
                                            <Option value={'1'}>试试</Option>
                                        </Select>
                                    )
                                }
                            </FormItem>
                        </Col>
                        <Col xs={{...xs}} sm={{...sm}}>
                            <FormItem label={'二级行业'} {...formItemLayout}>
                                {
                                    getFieldDecorator('name', {})(
                                        <Input placeholder="请输入二级行业"/>
                                    )
                                }
                            </FormItem>
                        </Col>
                    </Row>
                    <Row>
                        <Col xs={{...xs}} sm={{...sm}}>
                            <FormItem label={'staffing/录入人'} {...formItemLayout}>
                                {
                                    getFieldDecorator('second_industry', {})(
                                        <Select placeholder={'请选择轮次'} mode={"multiple"}>
                                            <Option value={'1'}>试试</Option>
                                        </Select>
                                    )
                                }
                            </FormItem>
                        </Col>
                        <Col xs={{...xs}} sm={{...sm}}>
                            <FormItem label={'跟进状态'} {...formItemLayout}>
                                {
                                    getFieldDecorator('second_industry', {})(
                                        <Select placeholder={'请选择准备阶段'}>
                                            <Option value={'1'}>试试</Option>
                                        </Select>
                                    )
                                }
                            </FormItem>
                        </Col>
                        <Col xs={{...xs}} sm={{...sm}}>
                            <FormItem label={'项目阶段'} {...formItemLayout}>
                                {
                                    getFieldDecorator('second_industry', {})(
                                        <Select placeholder={'请选择项目状态'}>
                                            <Option value={'1'}>试试</Option>
                                        </Select>
                                    )
                                }
                            </FormItem>
                        </Col>
                    </Row>
                    <Row>
                        <Col xs={{...xs}} sm={{...sm}}>
                            <FormItem label={'历史投资机构'} {...formItemLayout}>
                                {
                                    getFieldDecorator('second_industry', {})(
                                        <Select mode="multiple" placeholder={'请选择项目人员'}>
                                            <Option value={'1'}>试试</Option>
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
                            <Link to={'/admin/intentionItem'}>新建外部意向项目</Link>
                        </Button>
                    </Col>
                </Row>
                <Row style={{marginTop: '20px'}}>
                    <Table
                        columns={columns}
                        pagination={false}
                        rowKey={'id'}
                        bordered
                        //dataSource={this.state.dataSource || []}
                    />
                </Row>
            </div>
        );
    }

    //搜索
    handleSeek = () => {

    }

}

export default Form.create()(Index);