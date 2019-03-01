import React, { Component } from 'react';
import { Button, Col, Form, Input, Row, Select, Upload, Icon, Tooltip } from 'antd'
import { jrFetchPost, jrFetchGet } from '../../../common';
import styleConfig from '../../../../config/styleConfig';

const FormItem = Form.Item;
const { Option } = Select;
const { TextArea } = Input;

class AddTl extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    componentDidMount() {
        this.setState({
            id: this.props.id
        })
        jrFetchGet(`/ng-lingxi/api/project/internal/tl/view/create`).then(res => {
            this.setState({
                dataInfo: res.data
            })
        })
    }

    render() {
        const { getFieldDecorator } = this.props.form;
        const { formItemLayout, maxCol } = styleConfig;
        const { attendee_list = {}, state_list = [] } = this.state.dataInfo || {};
        const { id } = this.state;
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
                                        <Input placeholder="投资机构" />
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
                                        <Input placeholder="请输入投资人" />
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
                                        <Input placeholder="请输入title" />
                                    )
                                }
                            </FormItem>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={8}>
                            <FormItem label={'参会人'} {...formItemLayout}>
                                {
                                    getFieldDecorator('attendee_list', {
                                        //initialValue:,
                                    })(
                                        <Select mode={"multiple"}>
                                            {
                                                Object.keys(attendee_list).map((item, index) => {
                                                    return <Option value={item}
                                                        key={index}>{attendee_list[item]}</Option>
                                                })
                                            }
                                        </Select>
                                    )
                                }
                            </FormItem>
                        </Col>
                        <Col span={8}>
                            <FormItem label={'事件状态'} {...formItemLayout}>
                                {
                                    getFieldDecorator('state_list', {
                                        //initialValue:'0',
                                    })(
                                        <Select onChange={e => this.handleState(e)}>
                                            {
                                                state_list.map((item, index) => {
                                                    return <Option kye={index} value={index}>{item}</Option>
                                                })
                                            }
                                        </Select>
                                    )
                                }
                            </FormItem>
                        </Col>
                        {
                            this.state.stateValue === 4 && <Col span={8} className={'item_table'}>
                                <FormItem>
                                    <ul>
                                        <li>
                                            <em>待开会议</em>
                                            <i>
                                                {
                                                    getFieldDecorator('name1', {})
                                                        (
                                                            <input type="text" />
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
                                                            <input type="text" />
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
                                                            <input type="text" />
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
                                                            <input type="text" />
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
                                                            <input type="text" />
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
                                                            <input type="text" />
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
                                                            <input type="text" />
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
                                                            <input type="text" />
                                                        )
                                                }
                                            </i>
                                        </li>
                                    </ul>
                                </FormItem>
                            </Col>
                        }

                    </Row>
                    <Row>
                        <Col span={16}>
                            <FormItem label={'新增反馈'} {...maxCol}>
                                {
                                    getFieldDecorator('name', {
                                        //initialValue:,
                                    })(
                                        <TextArea autosize={{ minRows: 2, maxRows: 6 }} />
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
                                        <TextArea autosize={{ minRows: 2, maxRows: 6 }} />
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
                                        <span>
                                            {
                                                !!id ?
                                                    <Upload>
                                                        <Button>
                                                            <Icon type="upload" />
                                                            继续添加
                                                        </Button>
                                                    </Upload>
                                                    :
                                                    <Tooltip placement="right" title={'新建事件不能上传文件，请先保存事件，在编辑页面上传文件！'}>
                                                        <Button>
                                                            <Icon type="upload" />
                                                            继续添加
                                                        </Button>
                                                    </Tooltip>
                                            }
                                        </span>
                                    )
                                }
                            </FormItem>
                        </Col>
                    </Row>
                    <Row className={'tl_lsfk'}>
                        <Col span={12}>
                            <em>历史反馈：</em>
                            <div>
                                <p>
                                    <span>2019.01.05：XXXXXX;</span>
                                    <span>2019.01.05：XXXXXX;</span>
                                    <span>2019.01.05：XXXXXX;</span>
                                    <span>2019.01.05：XXXXXX;</span>
                                    <span>2019.01.05：XXXXXX;</span>
                                </p>
                            </div>
                        </Col>
                        <Col span={12}>
                            <em>修改记录：</em>
                            <div>
                                <p>
                                    <span>2019.01.05：事件状态由“加微信”变更为“待开会”;</span>
                                    <span>2019.01.05：事件状态由“加微信”变更为“待开会”;</span>
                                    <span>2019.01.05：事件状态由“加微信”变更为“待开会”;</span>
                                    <span>2019.01.05：事件状态由“加微信”变更为“待开会”;</span>
                                    <span>2019.01.05：事件状态由“加微信”变更为“待开会”;</span>
                                </p>
                            </div>
                        </Col>
                    </Row>
                    <Row>

                    </Row>
                </Form>
                <Row>
                    <Col sm={{ span: 8 }} offset={10}>
                        <Button
                            style={{ marginRight: '60px', marginTop: '100px' }}
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

    //保存
    handleSubmit = () => {
        let Values = this.props.form.getFieldsValue();
        console.log(Values)
    }
    //取消
    handleExit = () => {
        this.props.fn()
    }
    //开会列表显示
    handleState = (e) => {
        let stateValue = e;
        this.setState({
            stateValue
        })
    }
}

export default Form.create()(AddTl);
