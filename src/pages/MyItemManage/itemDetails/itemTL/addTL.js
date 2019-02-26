import React, {Component} from 'react';
import {Button, Col, Form, Input, Row, Select, Upload, Icon} from 'antd'
import {jrFetchPost, jrFetchGet} from '../../../common';
import styleConfig from '../../../../config/styleConfig';

const FormItem = Form.Item;
const {Option} = Select;
const {TextArea} = Input;

class AddTl extends Component {
    constructor(props) {
        super(props);

    }

    render() {
        const {getFieldDecorator} = this.props.form;
        const {formItemLayout, maxCol} = styleConfig;
        return (
            <div className={'tlDrawer'}>
                <Form>
                    <Row>
                        <Col span={8}>
                            <FormItem label={'项目名称'} {...formItemLayout}>
                                {
                                    getFieldDecorator('name', {
                                        //initialValue:,
                                        rules: [
                                            {
                                                required: true, message: '必填'
                                            }
                                        ]

                                    })(
                                        <Input placeholder="投资机构"/>
                                    )
                                }
                            </FormItem>
                        </Col>
                        <Col span={8}>
                            <FormItem label={'投资人'} {...formItemLayout}>
                                {
                                    getFieldDecorator('name', {
                                        //initialValue:,
                                    })(
                                        <Input placeholder="请输入投资人"/>
                                    )
                                }
                            </FormItem>
                        </Col>
                        <Col span={8}>
                            <FormItem label={'title'} {...formItemLayout}>
                                {
                                    getFieldDecorator('name', {
                                        //initialValue:,
                                    })(
                                        <Input placeholder="请输入title"/>
                                    )
                                }
                            </FormItem>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={8}>
                            <FormItem label={'参会人'} {...formItemLayout}>
                                {
                                    getFieldDecorator('name', {
                                        //initialValue:,
                                    })(
                                        <Select mode={"multiple"}>
                                            <Option value={1}>111</Option>
                                            <Option value={1}>111</Option>
                                            <Option value={1}>111</Option>
                                        </Select>
                                    )
                                }
                            </FormItem>
                        </Col>
                        <Col span={8}>
                            <FormItem label={'事件状态'} {...formItemLayout}>
                                {
                                    getFieldDecorator('name', {
                                        //initialValue:,
                                    })(
                                        <Select>
                                            <Option value={1}>111</Option>
                                            <Option value={1}>111</Option>
                                            <Option value={1}>111</Option>
                                        </Select>
                                    )
                                }
                            </FormItem>
                        </Col>
                        <Col span={8} className={'item_table'}>
                            <FormItem>
                                <ul>
                                    <li>
                                        <em>待开会议</em>
                                        <i>
                                            {
                                                getFieldDecorator('name1', {})
                                                (
                                                    <input type="text"/>
                                                )
                                            }
                                        </i>
                                    </li>
                                    <li>
                                        <em>项目名称</em>
                                        <i>
                                            {
                                                getFieldDecorator('name2', {})
                                                (
                                                    <input type="text"/>
                                                )
                                            }
                                        </i>
                                    </li>
                                    <li>
                                        <em>参会人员</em>
                                        <i>
                                            {
                                                getFieldDecorator('name3', {})
                                                (
                                                    <input type="text"/>
                                                )
                                            }
                                        </i>
                                    </li>
                                    <li>
                                        <em>投资人</em>
                                        <i>
                                            {
                                                getFieldDecorator('name4', {})
                                                (
                                                    <input type="text"/>
                                                )
                                            }
                                        </i>
                                    </li>
                                    <li>
                                        <em>title</em>
                                        <i>
                                            {
                                                getFieldDecorator('name5', {})
                                                (
                                                    <input type="text"/>
                                                )
                                            }
                                        </i>
                                    </li>
                                    <li>
                                        <em>地点</em>
                                        <i>
                                            {
                                                getFieldDecorator('name6', {})
                                                (
                                                    <input type="text"/>
                                                )
                                            }
                                        </i>
                                    </li>
                                    <li>
                                        <em>时间</em>
                                        <i>
                                            {
                                                getFieldDecorator('name7', {})
                                                (
                                                    <input type="text"/>
                                                )
                                            }
                                        </i>
                                    </li>
                                    <li>
                                        <em>备注</em>
                                        <i>
                                            {
                                                getFieldDecorator('name8', {})
                                                (
                                                    <input type="text"/>
                                                )
                                            }
                                        </i>
                                    </li>
                                </ul>
                            </FormItem>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={16}>
                            <FormItem label={'新增反馈'} {...maxCol}>
                                {
                                    getFieldDecorator('name', {
                                        //initialValue:,
                                    })(
                                        <TextArea autosize={{minRows: 2, maxRows: 6}}/>
                                    )
                                }
                            </FormItem>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={16}>
                            <FormItem label={'下一步跟进'} {...maxCol}>
                                {
                                    getFieldDecorator('name', {
                                        //initialValue:,
                                    })(
                                        <TextArea autosize={{minRows: 2, maxRows: 6}}/>
                                    )
                                }
                            </FormItem>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={16}>
                            <FormItem label={'会议memo'} {...maxCol}>
                                {
                                    getFieldDecorator('name', {
                                        //initialValue:,
                                    })(
                                        <Upload

                                        >
                                            <Button>
                                                <Icon type="upload"/>
                                                继续添加
                                            </Button>
                                        </Upload>
                                    )
                                }
                            </FormItem>
                        </Col>
                    </Row>
                    <Row className={'tl_lsfk'}>
                        <Col span={12}>
                            <em>历史反馈：</em>
                            <p>
                                <span>2019.01.05：XXXXXX;</span>
                                <span>2019.01.05：XXXXXX;</span>
                                <span>2019.01.05：XXXXXX;</span>
                                <span>2019.01.05：XXXXXX;</span>
                                <span>2019.01.05：XXXXXX;</span>
                            </p>
                        </Col>
                        <Col span={12}>
                            <em>修改记录：</em>
                            <p>
                                <span>2019.01.05：事件状态由“加微信”变更为“待开会”;</span>
                                <span>2019.01.05：事件状态由“加微信”变更为“待开会”;</span>
                                <span>2019.01.05：事件状态由“加微信”变更为“待开会”;</span>
                                <span>2019.01.05：事件状态由“加微信”变更为“待开会”;</span>
                                <span>2019.01.05：事件状态由“加微信”变更为“待开会”;</span>
                            </p>
                        </Col>
                    </Row>
                    <Row>

                    </Row>
                </Form>
                <Row>
                    <Col sm={{span: 8}} offset={10}>
                        <Button
                            style={{marginRight: '60px', marginTop: '100px'}}
                            onClick={this.handleExit}
                        >
                            取消
                        </Button>
                        <Button type={'primary'} onClick={this.handleSubmit}>保存</Button>
                    </Col>
                </Row>
            </div>
        );
    }

    handleSubmit = () => {
        let Values = this.props.form.getFieldsValue();
        console.log(Values)
    }
    handleExit = () => {
        this.props.fn()
    }
}

export default Form.create()(AddTl);
