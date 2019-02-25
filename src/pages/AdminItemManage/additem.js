import React, {Component} from 'react';
import {Form, Button, DatePicker, Row, Col, Select, Input, LocaleProvider, message, Drawer} from 'antd'
import {jrFetchPost, jrFetchGet, equalNull, queryNull, judgeState, dateShift} from '../../../src/pages/common';
import styleConfig from '../../config/styleConfig';
import zhCN from "antd/lib/locale-provider/zh_CN";
import moment from 'moment';
import './additem.less';
import 'moment/locale/zh-cn';

moment.locale('zh-cn');

const FormItem = Form.Item;
const {Option} = Select;
const {TextArea} = Input;

class Additem extends Component {
    constructor(props) {
        super(props);
        this.state = {
            evolve: false,
            dataInfo: {},
            login: false
        }
    }

    componentDidMount() {
        //id：0新建非0编辑
        let id = Number(this.props.location.search.substr(1).split('=')[1]);
        /*const userInfo = getCookie(cookieConfig);*/
        this.setState({
            id
        })
        //新增用户获取数据
        !id && jrFetchGet('/ng-lingxi/api/project/internal/view/create').then((ret) => {
            ret.data && this.setState({
                dataInfo: ret.data
            })

        })
        //编辑用户获取数据
        let url = `/ng-lingxi/api/project/internal/view/edit/${id}`
        !!id && jrFetchGet(url).then(ret => {
            this.setState({
                dataInfo: ret.data,
                stateValue: ret.data.info.state
            })
        })

    }

    render() {
        const {getFieldDecorator} = this.props.form;
        const {formItemLayout, formItemStyle, maxStyle} = styleConfig;
        const xs = {span: 24}, sm = {span: 8};
        const {contract_state, currency, first_industry, info, names = this.state.dataInfo.users, phase, round, state} = this.state.dataInfo;
        const {
            name, pause_reason, amount, staffing, progress, agency_history, second_industry, establish_time, pause_time, currency: info_currency = 1,
            state: info_state = 0, phase: info_phase = 0, round: info_round = 0, first_industry: infofirst_industry = 0, contract_state: info_contract_state = 0
        } = info || {};
        let {stateValue} = this.state;
        return (
            <LocaleProvider locale={zhCN}>
                <div className={'additem '}>
                    <Row>
                        <Col span={22} offset={1}>
                            <h1 className={'title'}>{!!this.state.id ? '编辑项目' : '新建项目'}</h1>
                        </Col>
                    </Row>
                    <Form>
                        <Row>
                            <Col xs={{...xs}} sm={{...sm}}>
                                <FormItem label={'项目名称'} {...formItemLayout}>
                                    {
                                        getFieldDecorator('name', {
                                            initialValue: name,
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
                                            initialValue: infofirst_industry,
                                        })(
                                            <Select>
                                                {
                                                    !!first_industry && first_industry.map((item, index) => {
                                                        return <Option key={index} value={index}>{item}</Option>
                                                    })
                                                }
                                            </Select>
                                        )
                                    }
                                </FormItem>
                            </Col>
                            <Col xs={{...xs}} sm={{...sm}}>
                                <FormItem label={'二级行业'} {...formItemLayout}>
                                    {
                                        getFieldDecorator('second_industry', {
                                            initialValue: queryNull(second_industry) ? '' : second_industry,
                                        })(
                                            <Input placeholder="请输入项目名称"/>
                                        )
                                    }
                                </FormItem>
                            </Col>
                        </Row>
                        <Row>
                            <Col xs={{...xs}} sm={{...sm}}>
                                <FormItem label={'轮次'} {...formItemLayout}>
                                    {
                                        getFieldDecorator('round', {
                                            initialValue: info_round,
                                        })(
                                            <Select>
                                                {
                                                    !!round && round.map((item, index) => {
                                                        return <Option key={index} value={index}>{item}</Option>
                                                    })
                                                }
                                            </Select>
                                        )
                                    }
                                </FormItem>
                            </Col>
                            <Col xs={{...xs}} sm={{...sm}}>
                                <FormItem label={'项目阶段'} {...formItemLayout}>
                                    {
                                        getFieldDecorator('phase', {
                                            initialValue: info_phase,
                                        })(
                                            <Select>
                                                {
                                                    phase && phase.map((item, index) => {
                                                        return <Option key={index} value={index}>{item}</Option>
                                                    })
                                                }
                                            </Select>
                                        )
                                    }
                                </FormItem>
                            </Col>
                            <Col xs={{...xs}} sm={{...sm}}>
                                <FormItem label={'立项时间'} {...formItemLayout}>
                                    {
                                        getFieldDecorator('establish_time', {
                                            initialValue: queryNull(establish_time) ? '' : (moment(establish_time, "YYYY-MM-DD")),
                                        })(
                                            <DatePicker
                                                placeholder="请选择立项时间"
                                            />
                                        )
                                    }
                                </FormItem>
                            </Col>
                        </Row>
                        <Row>
                            <Col xs={{...xs}} sm={{...sm}}>
                                <FormItem label={'项目状态'} {...formItemLayout}>
                                    {
                                        getFieldDecorator('state', {
                                            initialValue: info_state
                                        })(
                                            <Select onChange={(e) => this.getStateValue(e)}>
                                                {
                                                    state && state.map((item, index) => {
                                                        return <Option key={index} value={index}>{item}</Option>
                                                    })
                                                }
                                            </Select>
                                        )
                                    }
                                </FormItem>
                            </Col>
                            {
                                judgeState(stateValue) && <span>
                                    <Col xs={{...xs}} sm={{...sm}}>
                                        <FormItem label={stateValue === 2 ? '暂停时间' : 'close时间'} {...formItemLayout}>
                                            {
                                                getFieldDecorator('pause_time', {
                                                    initialValue: equalNull(pause_time) ? '' : (moment(pause_time, "YYYY-MM-DD")),
                                                })(
                                                    <DatePicker
                                                        placeholder="请选择时间"
                                                    />
                                                )
                                            }
                                        </FormItem>
                                    </Col>
                                    <Col xs={{...xs}} sm={{...sm}}>
                                        <FormItem label={stateValue === 2 ? '暂停原因' : 'close原因'} {...formItemLayout}>
                                            {
                                                getFieldDecorator('pause_reason', {
                                                    initialValue: pause_reason
                                                })(
                                                    <TextArea placeholder="请输入原因"
                                                              autosize={{minRows: 2, maxRows: 6}}/>
                                                )
                                            }
                                        </FormItem>
                                    </Col>
                                </span>
                            }
                        </Row>
                        <Row>
                            <Col s={{span: 24}} sm={{span: 9}}>
                                <FormItem label={'融资金额'} {...formItemStyle}>
                                    {

                                        <span>
                                            {
                                                getFieldDecorator('amount', {
                                                    initialValue: equalNull(amount) ? '' : amount.toString(),
                                                })(
                                                    <Input placeholder="请输入额度" type={'Number'}
                                                           style={{width: '45%'}}/>
                                                )
                                            }
                                            &nbsp;(万)&nbsp;
                                            {
                                                getFieldDecorator('currency', {
                                                    initialValue: info_currency.toString()
                                                })(
                                                    <Select style={{width: '35%'}}>
                                                        {
                                                            currency && Object.keys(currency).map((item, index) => {
                                                                return <Option key={index}
                                                                               value={item}>{currency[item]}</Option>
                                                            })
                                                        }
                                                    </Select>
                                                )
                                            }
                                        </span>

                                    }
                                </FormItem>
                            </Col>
                            <Col s={{span: 24}} sm={{span: 7}}>
                                <FormItem label={'合同状态'} {...formItemLayout}>
                                    {
                                        getFieldDecorator('contract_state', {
                                            initialValue: info_contract_state
                                        })(
                                            <Select>
                                                {
                                                    contract_state && contract_state.map((item, index) => {
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
                            <Col xs={{...xs}} sm={{...sm}}>
                                <FormItem label={'staffing'} {...formItemLayout}>
                                    {
                                        getFieldDecorator('names', {
                                            initialValue: staffing && staffing.map(item => item.toString()),
                                            rules: [
                                                {
                                                    required: true, message: '必填'
                                                }
                                            ]

                                        })(
                                            <Select mode={"multiple"}>
                                                {
                                                    names && Object.keys(names).map((item, index) => {
                                                        return <Option key={index} value={item}>{names[item]}</Option>
                                                    })
                                                }
                                            </Select>
                                        )
                                    }
                                </FormItem>
                            </Col>
                            <Col xs={{...xs}} sm={{...sm}}>
                                <FormItem label={'历史投资机构'} {...formItemLayout}>
                                    {
                                        getFieldDecorator('agency_history', {
                                            initialValue: agency_history
                                        })(
                                            <TextArea placeholder="请输入历史投资机构" autosize={{minRows: 2, maxRows: 6}}/>
                                        )
                                    }
                                </FormItem>
                            </Col>
                            <Col xs={{...xs}} sm={{...sm}}>
                                <FormItem label={'新增进展'} {...formItemLayout}>
                                    {
                                        getFieldDecorator('progress', {})(
                                            <TextArea placeholder="请输入最新进展情况" autosize={{minRows: 2, maxRows: 6}}/>
                                        )
                                    }
                                </FormItem>
                            </Col>
                            {
                                !!this.state.id && <Col xs={{span: 24}} sm={{span: 24}}>
                                    <FormItem label={'历史进展'} {...maxStyle} >
                                        {
                                            !queryNull(progress) &&
                                            <span>

                                                    <span>
                                                        <em>{progress['0'].created_at}:</em>{progress['0'].progress}&nbsp;&nbsp;
                                                        <Button onClick={this.handleShow} type={"primary"}
                                                                size={"small"}>
                                                            {this.state.evolve ? '收起' : '更多'}
                                                        </Button>
                                                    </span>

                                                {
                                                    this.state.evolve &&
                                                    <Drawer
                                                        title={'历史进展'}
                                                        placement='top'
                                                        closable={false}
                                                        onClose={this.onClose}
                                                        visible={true}
                                                        width='100%'
                                                        height='auto'
                                                        mask={false}
                                                    >
                                                        <div className={'primaryDiv'}>
                                                            <Row className={'primaryheader'}>
                                                                <span>
                                                                    <Col xs={{...xs}} sm={{span: 4}}><h3>时间</h3></Col>
                                                                    <Col xs={{...xs}} sm={{span: 20}}
                                                                         className={'primaryCol'}><h3>进展</h3></Col>
                                                                </span>
                                                            </Row>
                                                            {
                                                                progress.map((item, index) => {
                                                                    return <Row className={'primaryContent'}>
                                                                            <span key={index}>
                                                                               <Col xs={{...xs}}
                                                                                    sm={{span: 4}}> <em>{item.created_at}</em></Col>
                                                                                <Col xs={{...xs}} sm={{span: 20}}
                                                                                     className={'primaryCol'}> <i>{item.progress}</i> </Col>
                                                                            </span>

                                                                    </Row>
                                                                })
                                                            }
                                                        </div>
                                                    </Drawer>
                                                }
                                            </span>
                                        }

                                    </FormItem>
                                </Col>
                            }
                        </Row>
                        <Row>
                            <Col sm={{span: 8}} offset={10}>
                                <Button style={{marginRight: '60px', marginTop: '40px'}} onClick={() => {
                                    this.props.history.goBack();
                                }}>取消</Button>
                                <Button type={'primary'} onClick={this.handleSubmit}>保存</Button>
                            </Col>
                        </Row>
                    </Form>
                </div>
            </LocaleProvider>
        );
    }


    //提交
    handleSubmit = () => {
        let userInfo = this.props.form.getFieldsValue();
        queryNull(userInfo.pause_time) ? userInfo.pause_time = '' : (userInfo.pause_time = dateShift(userInfo.pause_time._d));
        queryNull(userInfo.establish_time) ? userInfo.establish_time = '' : (userInfo.establish_time = dateShift(userInfo.establish_time._d));
        userInfo.staffing = userInfo.names;
        delete userInfo.names;
        if (this.state.id === 0) {//保存
            this.props.form.validateFields(
                (err) => {
                    if (!err) {
                        jrFetchPost(`/ng-lingxi/api/project/internal/create`, {
                            ...userInfo
                        }).then(ret => {
                            if (ret.code === 0)
                                message.success('新建成功！', 1, onClose => {
                                    this.props.history.goBack();
                                })
                        })
                    }
                }).catch((err) => {
                console.log(err)
            })
        } else {//编辑
            userInfo.pid = this.state.id;
            this.props.form.validateFields(
                (err) => {
                    if (!err) {
                        jrFetchPost(`/ng-lingxi//api/project/internal/edit`, {
                            ...userInfo
                        }).then(ret => {
                            if (ret.code === 0)
                                message.success('编辑成功！', 1, onClose => {
                                    this.props.history.goBack();
                                })
                        })
                    }
                }).catch((err) => {
                console.log(err)
            })
        }

    }
    //显示更多
    handleShow = () => {
        this.setState({
            evolve: !this.state.evolve
        })
    }
    //获取StateValue
    getStateValue = (e) => {
        let stateValue = e;
        this.setState({
            stateValue
        })
    }

}

export default Form.create()(Additem);