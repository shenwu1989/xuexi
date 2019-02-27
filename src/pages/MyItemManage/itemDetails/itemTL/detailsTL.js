import React, {Component} from 'react';
import {Button, Col, Form, Input, Row, Select, Upload, Icon} from 'antd'
import {jrFetchPost, jrFetchGet} from '../../../common';
import styleConfig from '../../../../config/styleConfig';

const FormItem = Form.Item;
const {Option} = Select;
const {TextArea} = Input;

class DetailsTl extends Component {
    constructor(props) {
        super(props);
        this.state = {
            stateValue: 0,
        }
    }

    componentDidMount() {
        console.log(this.props.id)
    }

    render() {
        const {getFieldDecorator} = this.props.form;
        const {formItemLayout, maxCol} = styleConfig;
        return (
            <div className={'detailsTl'}>
                <Row className={'detailsTl_rol'}>
                    <Col span={8}>
                        <em>投资机构：</em>
                        <p>
                            <span>华兴资本</span>
                        </p>
                    </Col>
                    <Col span={8}>
                        <em>投资人：</em>
                        <p>
                            <span>包不凡</span>
                        </p>
                    </Col>
                    <Col span={8}>
                        <em>title：</em>
                        <p>
                            <span>MD</span>
                        </p>
                    </Col>
                </Row>
                <Row className={'detailsTl_rol'}>

                    <Col span={8}>
                        <em>参会人：</em>
                        <p>
                            <span>张艺兴</span>
                        </p>
                    </Col>
                    <Col span={8} className={'gj'}>
                        <em>下一步跟进：</em>
                        <p>
                            <span>收到NDA，已发资料</span>
                        </p>
                    </Col>
                    <Col span={8}>
                        <em>事件状态：</em>
                        <p>
                            <span>待开会</span>
                        </p>
                        {
                            this.state.stateValue === 4 &&
                            <Col span={24} className={'item_table'}>
                                <ul>
                                    <li>
                                        <em>待开会议</em>
                                        <i>123</i>
                                    </li>
                                    <li>
                                        <em>项目名称</em>
                                        <i>123</i>
                                    </li>
                                    <li>
                                        <em>参会人员</em>
                                        <i>123</i>
                                    </li>
                                    <li>
                                        <em>投资人</em>
                                        <i>123</i>
                                    </li>
                                    <li>
                                        <em>title</em>
                                        <i>123</i>
                                    </li>
                                    <li>
                                        <em>地点</em>
                                        <i>123</i>
                                    </li>
                                    <li>
                                        <em>时间</em>
                                        <i>123</i>
                                    </li>
                                    <li>
                                        <em>备注</em>
                                        <i>123</i>
                                    </li>
                                </ul>
                            </Col>
                        }
                    </Col>
                </Row>
                <Row className={'tl_lsfk detailsTl_rol'}>
                    <Col span={this.state.stateValue === 4 ? 18 : 12}>
                        <em>历史反馈：</em>
                        <div>
                            <p>
                                <span>2019.01.05：XXXXXXXXXXX;</span>
                                <span>2019.01.05：XXXXXXXXXXXX;</span>
                                <span>2019.01.05：XXXXXXXXXXXXXX;</span>
                                <span>2019.01.05：XXXXXXXXXXXXXXX;</span>
                                <span>2019.01.05：XXXXXXXXXXXXXXXX;</span>
                                <span>2019.01.05：XXXXXXXXXXXXXXXX;</span>
                                <span>2019.01.05：XXXXXXXXXXXXXXXX;</span>
                                <span>2019.01.05：XXXXXXXXXXXXXXXX;</span>
                                <span>2019.01.05：XXXXXXXXXXXXXXXX;</span>
                            </p>
                        </div>
                    </Col>
                    <Col span={this.state.stateValue === 4 ? 18 : 12}>
                        <em>修改记录：</em>
                        <div>
                            <p>
                                <span>2019.01.05：事件状态由“加微信”变更为“待开会”;</span>
                                <span>2019.01.05：事件状态由“加微信”变更为“待开会”;</span>
                                <span>2019.01.05：事件状态由“加微信”变更为“待开会”;</span>
                                <span>2019.01.05：事件状态由“加微信”变更为“待开会”;</span>
                                <span>2019.01.05：事件状态由“加微信”变更为“待开会”;</span>
                                <span>2019.01.05：事件状态由“加微信”变更为“待开会”;</span>
                                <span>2019.01.05：事件状态由“加微信”变更为“待开会”;</span>
                                <span>2019.01.05：事件状态由“加微信”变更为“待开会”;</span>
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
                    <Col>
                        <em>会议memo：</em>
                        <p>
                            <span>Test纪要.doc (395K)</span>
                            <span>测试B.pdf (1.32MB)</span>
                        </p>
                    </Col>
                </Row>
                <Row>
                    <Col sm={{span: 14}} offset={9}>
                        <Button onClick={this.handleExit}>返回</Button>
                        <Button onClick={this.handleSubmit}>删除</Button>
                        <Button type={'primary'} onClick={this.handleSubmit}>编辑</Button>
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

export default Form.create()(DetailsTl);
