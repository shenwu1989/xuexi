import React, {Component} from 'react';
import {Form, Button, Row, Col, Select, Input} from 'antd'
import {jrFetchPost, jrFetchGet} from '../../../src/pages/common';
import styleConfig from '../../config/styleConfig';
import {Link} from "react-router-dom";

const FormItem = Form.Item;
const {Option} = Select;
const {TextArea} = Input;

class AddIntentionItem extends Component {
    constructor(props) {
        super(props);

    }

    render() {
        const {getFieldDecorator} = this.props.form;
        const {formItemLayout} = styleConfig;
        let xs = {span: 24}, sm = {span: 8};
        return (
            <div className={'tabPane'}>
                <Form>
                    <Row>
                        <Col span={22} offset={1}>
                            <h1 className={'title'}>新建/编辑外部意向项目</h1>
                        </Col>
                    </Row>
                    <Row style={{marginTop: '50px'}}>
                        <Col xs={{...xs}} sm={{...sm}}>
                            <FormItem label={'项目名称'} {...formItemLayout}>
                                {
                                    getFieldDecorator('name', {
                                        //initialValue: info && info.name,
                                        rules: [
                                            {
                                                required: true, message: '必填'
                                            }
                                        ]

                                    })(
                                        <Input placeholder="请输入项目名称"/>
                                    )
                                }
                            </FormItem>
                        </Col>
                        <Col xs={{...xs}} sm={{...sm}}>
                            <FormItem label={'一级行业'} {...formItemLayout}>
                                {
                                    getFieldDecorator('first_industry', {
                                        //initialValue: info && info.first_industry,
                                    })(
                                        <Select>
                                            {/* {
                                                first_industry && first_industry.map((item, index) => {
                                                    return <Option key={index} value={index}>{item}</Option>
                                                })
                                            }*/}
                                        </Select>
                                    )
                                }
                            </FormItem>
                        </Col>
                        <Col xs={{...xs}} sm={{...sm}}>

                            <FormItem label={'二级行业'} {...formItemLayout}>
                                {
                                    getFieldDecorator('second_industry', {
                                        //initialValue: info && info.second_industry,
                                    })(
                                        <Input placeholder="请输入项目名称"/>
                                    )
                                }
                            </FormItem>

                        </Col>
                    </Row>
                    <Row>
                        <Col xs={{...xs}} sm={{...sm}}>

                            <FormItem label={'录入人'} {...formItemLayout}>
                                {
                                    getFieldDecorator('names', {
                                        //initialValue: info && info.staffing.map(item => item.toString()),
                                        rules: [
                                            {
                                                required: true, message: '必填'
                                            }
                                        ]

                                    })(
                                        <Select mode={"multiple"}>
                                            {/* {
                                                    names && Object.keys(names).map((item, index) => {
                                                        return <Option key={index} value={item}>{names[item]}</Option>
                                                    })
                                                }*/}
                                        </Select>
                                    )
                                }
                            </FormItem>

                        </Col>
                        <Col xs={{...xs}} sm={{...sm}}>

                            <FormItem label={'跟进状态'} {...formItemLayout}>
                                {
                                    getFieldDecorator('names', {})(
                                        <Select mode={"multiple"}>

                                        </Select>
                                    )
                                }
                            </FormItem>

                        </Col>
                        <Col xs={{...xs}} sm={{...sm}}>

                            <FormItem label={'历史投资机构'} {...formItemLayout}>
                                {
                                    getFieldDecorator('agency_history', {
                                        //initialValue: info && info.agency_history
                                    })(
                                        <TextArea placeholder="请输入历史投资机构" autosize={{minRows: 2, maxRows: 6}}/>
                                    )
                                }
                            </FormItem>

                        </Col>
                    </Row>
                </Form>
                <Row>
                    <Col sm={{span: 8}} offset={10}>
                        <Button onClick={this.handleSubmit} type={'primary'}
                                style={{marginRight: '60px', marginTop: '40px'}}>保存</Button>
                        <Button>
                            <Link to={'/admin/itemwarehouse'}>取消</Link>
                        </Button>
                    </Col>
                </Row>
            </div>
        );
    }
}

export default Form.create()(AddIntentionItem);
