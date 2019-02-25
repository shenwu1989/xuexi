import React, {Component} from 'react';
import {Col, Form, Row, Progress, Input, Select} from 'antd'
import {jrFetchPost, jrFetchGet} from '../../../../src/pages/common';
import styleConfig from '../../../config/styleConfig';

const FormItem = Form.Item;

const {Option} = Select;

class ItemTl extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const {getFieldDecorator} = this.props.form;
        const {formItemLayout,minStyle} = styleConfig;
        const xs = {span: 24}, sm = {span: 6};
        return (
            <div className={'itemTl'}>
                <Form>
                    <Row>
                        <Col xs={{...xs}} sm={{...sm}}>
                            <div>
                                <em>已推送机构：</em>
                                <b>18</b>
                                <p>
                                    <Progress type="circle" percent={30} width={50} strokeColor={'#199ED8'} />
                                </p>
                            </div>
                        </Col>
                        <Col xs={{...xs}} sm={{...sm}}>
                            <div>
                                <em>已开会机构:</em>
                                <b>18</b>
                                <p>
                                    <Progress type="circle" percent={30} width={50} strokeColor={'#199ED8'} />
                                </p>
                            </div>
                        </Col>
                        <Col xs={{...xs}} sm={{...sm}}>
                            <div>
                                <em>在跟进机构：</em>
                                <b>18</b>
                                <p>
                                    <Progress type="circle" percent={30} width={50} strokeColor={'#199ED8'} />
                                </p>
                            </div>
                        </Col>
                        <Col xs={{...xs}} sm={{...sm}}>
                            <div>
                                <em>待排会机构：</em>
                                <b>18</b>
                                <p>
                                    <Progress type="circle" percent={30} width={50} strokeColor={'#199ED8'} />
                                </p>
                            </div>
                        </Col>
                    </Row>
                    <Row>
                        <Col xs={{...xs}} sm={{span:8}}>
                            <FormItem label={'投资机构'} {...minStyle}>
                                {
                                    getFieldDecorator('name', {
                                    })(
                                        <Input placeholder="姓名重复时系统自动添加后缀区别"/>
                                    )
                                }
                            </FormItem>
                        </Col>
                        <Col xs={{...xs}} sm={{span:8}}>
                            <FormItem label={'参会人'} {...minStyle}>
                                {
                                    getFieldDecorator('name1', {
                                    })(
                                        <Select mode="multiple" placeholder={'请选择参会人'}>
                                            <Option value={'1'}>金融</Option>
                                            <Option value={'2'}>金融2</Option>
                                            <Option value={'3'}>金融3</Option>
                                        </Select>
                                    )
                                }
                            </FormItem>
                        </Col>
                        <Col xs={{...xs}} sm={{span:8}}>
                            <FormItem label={'事件状态'} {...minStyle}>
                                {
                                    getFieldDecorator('name2', {
                                    })(
                                        <Select  placeholder={'请选择事件状态'}>
                                            <Option value={'1'}>金融</Option>
                                            <Option value={'2'}>金融2</Option>
                                            <Option value={'3'}>金融3</Option>
                                        </Select>
                                    )
                                }
                            </FormItem>
                        </Col>
                    </Row>
                </Form>
            </div>
        );
    }
}

export default Form.create()(ItemTl);
