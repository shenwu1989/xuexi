import React, { Component } from 'react';
import { Button, Col, Form, Input, Row, Select, Upload, Icon, Tooltip, DatePicker, LocaleProvider, message, Popconfirm } from 'antd'
import { jrFetchPost, jrFetchGet, dateShift, queryNull, fileSize } from '../../../common';
import { getCookie, cookieConfig } from '../../../Cookie.js';
import styleConfig from '../../../../config/styleConfig';
import zhCN from "antd/lib/locale-provider/zh_CN";
import moment from 'moment';

moment.locale('zh-cn');
const FormItem = Form.Item;
const { Option } = Select;
const { TextArea } = Input;

class AddTl extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showUp: false,
            button_Switch: true
        }
    }

    componentDidMount() {
        let id = this.props.state.id,
            itemId = this.props.state.itemId;
        this.setState({
            id,
            itemId
        })
        !id && jrFetchGet(`/ng-lingxi/api/project/internal/tl/view/create`).then(res => {
            this.setState({
                dataInfo: res.data
            })
        })
        id && this.editDataInfo()
    }

    render() {
        const { getFieldDecorator } = this.props.form;
        const { formItemLayout, maxCol } = styleConfig;
        const { attendee_list = {}, state_list = [], attendee_selected = [], info = {}, schedule = {}, feedback = [], updated = [], memo = [], tl_record_fields = {} } = this.state.dataInfo || {};
        const { agency = '', investor = '', investor_title = '', state, following_up = '' } = info;
        const { attendee, investor: investor_schedule, location, meeting, remark, time, title } = schedule;
        const { id, button_Switch } = this.state;
        const token = getCookie(cookieConfig).access_token;
        const tid = this.state.itemId;
        let updatedConfig = {};
        //解构tl_record_fields获取字典
        Object.keys(tl_record_fields).map(item => {
            let key = tl_record_fields[item].index,
                value = tl_record_fields[item].name
            updatedConfig[key] = value;
        })
        //处理updated
        let sort_update_arr = updated.sort((a, b) => Date.parse(b.created_at) - Date.parse(a.created_at))
        let updated_arr = sort_update_arr.map((item, i) => {
            let find_arr = sort_update_arr.slice(i + 1)
            let edit_data = find_arr.find(it => it.field === item.field)
            let res = edit_data && [item, edit_data] || ""
            return res
        }).filter(Boolean)
        return (
            <LocaleProvider locale={zhCN}>
                <div className={'tlDrawer'}>
                    <Form>
                        <Row>
                            <Col span={8}>
                                <FormItem label={'投资机构'} {...formItemLayout}>
                                    {
                                        getFieldDecorator('agency', {
                                            initialValue: agency,
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
                                        getFieldDecorator('investor', {
                                            initialValue: investor,
                                        })(
                                            <Input placeholder="请输入投资人" />
                                        )
                                    }
                                </FormItem>
                            </Col>
                            <Col span={8}>
                                <FormItem label={'title'} {...formItemLayout}>
                                    {
                                        getFieldDecorator('investor_title', {
                                            initialValue: investor_title,
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
                                        getFieldDecorator('attendee', {
                                            initialValue: queryNull(attendee_selected) ? undefined : [...attendee_selected.join(',').split(',')]
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
                                        getFieldDecorator('state', {
                                            initialValue: state,
                                        })(
                                            <Select onChange={e => this.handleState(e)}>
                                                {
                                                    state_list.map((item, index) => {
                                                        return <Option key={index} value={index}>{item}</Option>
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
                                                        getFieldDecorator('schedule_meeting', {
                                                            initialValue: meeting
                                                        })
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
                                                        getFieldDecorator('schedule_attendee', {
                                                            initialValue: attendee
                                                        })
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
                                                        getFieldDecorator('schedule_investor', {
                                                            initialValue: investor_schedule
                                                        })
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
                                                        getFieldDecorator('schedule_title', {
                                                            initialValue: title
                                                        })
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
                                                        getFieldDecorator('schedule_location', {
                                                            initialValue: location
                                                        })
                                                            (
                                                                <input type="text" />
                                                            )
                                                    }
                                                </i>
                                            </li>
                                            <li>
                                                <em>时间</em>
                                                <i className={'schedule_time'}>
                                                    {
                                                        getFieldDecorator('schedule_time', {
                                                            initialValue: queryNull(time) ? '' : (moment(time, "YYYY-MM-DD HH:mm:ss"))
                                                        })
                                                            (
                                                                <DatePicker
                                                                    allowClear
                                                                    showTime
                                                                />
                                                            )
                                                    }
                                                </i>
                                            </li>
                                            <li>
                                                <em>备注</em>
                                                <i>
                                                    {
                                                        getFieldDecorator('schedule_remark', {
                                                            initialValue: remark
                                                        })
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
                                        getFieldDecorator('feedback', {
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
                                        getFieldDecorator('following_up', {
                                            initialValue: following_up === null ? '' : following_up,
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
                                        getFieldDecorator('memo', {
                                            //initialValue:,
                                        })(
                                            <span>
                                                {
                                                    !!id ?
                                                        <Upload
                                                            name='memo'
                                                            action='/ng-lingxi/api/project/internal/tl/upload_memo'
                                                            multiple={true}
                                                            data={{ token, tid }}
                                                            showUploadList={false}
                                                            beforeUpload={(file) => {
                                                                const isLt2M = file.size / 1024 / 1024 < 20;
                                                                if (!isLt2M) {
                                                                    message.error('上传的文件大小不能超过20MB!');
                                                                }
                                                                return isLt2M
                                                            }}
                                                            onChange={(res) => {
                                                                //开启上传LOADING
                                                                this.setState({
                                                                    showUp: true
                                                                })

                                                                //是否完成所有文件上传
                                                                let show = res.fileList.every(item => {
                                                                    return item.status !== 'uploading'
                                                                })
                                                                show && this.setState({
                                                                    showUp: false
                                                                })
                                                                if (!queryNull(res.file.response) && res.file.response.code === 0) {
                                                                    message.success(`${res.file.name}上传成功！`, 3)
                                                                    this.editDataInfo();
                                                                    this.props.info();
                                                                }
                                                                //上传失败
                                                                if (!queryNull(res.file.response) && res.file.response.code !== 0) {
                                                                    message.info(`上传失败！`)
                                                                }
                                                            }}
                                                        >
                                                            <Button>
                                                                <Icon type={this.state.showUp ? 'loading' : 'upload'} />
                                                                继续添加
                                                            </Button>
                                                            <span></span>
                                                        </Upload>
                                                        :
                                                        <Tooltip placement="right" title={'新建事件不能上传文件，请先保存事件，在编辑页面上传文件！'}>
                                                            <Button>
                                                                <Icon type="upload" />
                                                                继续添加
                                                        </Button>
                                                        </Tooltip>
                                                }
                                                <Col>
                                                    <p style={{ lineHeight: '20px', marginTop: '10px', width: '600px' }}>
                                                        {
                                                            memo.map((item) => {
                                                                return <span key={item.id}>
                                                                    {item.name}({fileSize(item.size)})
                                                                    &nbsp;&nbsp;&nbsp;
                                                                    <a>
                                                                        <Popconfirm title={`确定要删除${item.name}文件吗？`} onConfirm={
                                                                            () => this.handleDelete(item.id)
                                                                        } okText="是" cancelText="否">
                                                                            <Icon type="delete" />
                                                                        </Popconfirm>
                                                                    </a>
                                                                    <br />
                                                                </span>

                                                            })
                                                        }
                                                    </p>
                                                </Col>
                                            </span>
                                        )
                                    }
                                </FormItem>
                            </Col>
                        </Row>
                        {
                            !!id &&
                            <Row className={'tl_lsfk'}>
                                <Col span={12}>
                                    <em>历史反馈：</em>
                                    <div>
                                        <p>
                                            {
                                                feedback.map((item, index) => {
                                                    return <span key={index}>{item.created_at}&nbsp;{item.feedback}</span>
                                                })
                                            }
                                        </p>
                                    </div>
                                </Col>
                                <Col span={24}>
                                    <em>修改记录：</em>
                                    <div>
                                        <p>
                                            {
                                                updated_arr.map(
                                                    i => {
                                                        return i.map((item, index) => {
                                                            let oldValue = i[1].value;
                                                            return index === 0 && <span key={index}>
                                                                {item.created_at}&nbsp;
                                                                <b>{updatedConfig[item.field]}</b> 由“
                                                                <strong>{item.field !== 3 ? oldValue : state_list[oldValue]}</strong> ”变更为“
                                                                <strong>{item.field !== 3 ? item.value : state_list[item.value]}</strong>”
                                                            </span>
                                                        })
                                                    })
                                            }
                                        </p>
                                    </div>
                                </Col>
                            </Row>
                        }
                    </Form>
                    <Row>
                        <Col sm={{ span: 8 }} offset={10}>
                            <Button
                                style={{ marginRight: '60px', marginTop: '100px' }}
                                onClick={this.handleExit}
                            >
                                取消
                        </Button>
                            <Button type={'primary'} onClick={() => button_Switch && this.handleSubmit(id)}>保存</Button>
                        </Col>
                    </Row>
                </div>
            </LocaleProvider>
        );
    }
    //保存
    handleSubmit = (id) => {
        this.setState({
            button_Switch: false
        })
        let Values = this.props.form.getFieldsValue();
        delete Values.memo;
        Values['project'] = this.state.itemId;
        Object.keys(Values).map(key => {
            if (key === 'state') {
                Values[key] = Values[key] === undefined ? 0 : Values[key]
            }
        })
        queryNull(Values.schedule_time) ? Values.schedule_time = '' : Values.schedule_time = dateShift(Values.schedule_time._d, false)
        if (!id) {
            jrFetchPost(`/ng-lingxi/api/project/internal/tl/create`,
                {
                    ...Values
                }).then(res => {
                    if (res.code === 0) {
                        this.props.form.resetFields();
                        message.success('新建成功！', 1, onClose => {
                            this.handleExit();
                            this.props.info();
                        })
                    } else {
                        this.setState({
                            button_Switch: true
                        })
                    }
                })
        } else {
            delete Values.project;
            Values['tid'] = this.state.itemId;
            jrFetchPost(`/ng-lingxi/api/project/internal/tl/edit`, {
                ...Values
            }).then(res => {
                if (res.code === 0) {
                    message.success('操作成功！', 1, onClose => {
                        this.handleExit();
                        this.props.info();
                    })
                } else {
                    this.setState({
                        button_Switch: true
                    })
                }
            }).catch(err => {
                message.info(err.message)
            })
        }
    }
    //取消
    handleExit = () => {
        this.props.fn()
    }
    //编辑用户获取初始信息
    editDataInfo = () => {
        jrFetchGet(`/ng-lingxi/api/project/internal/tl/view/edit/${this.props.state.itemId}`).then(res => {
            this.setState({
                dataInfo: res.data,
                stateValue: res.data.info.state
            })
        })
    }
    //开会列表显示
    handleState = (e) => {
        let stateValue = e;
        this.setState({
            stateValue
        })
    }
    //删除
    handleDelete = (id) => {
        jrFetchGet(`/ng-lingxi/api/project/internal/tl/delete_memo/${id}`).then(res => {
            message.success('删除成功！', 1, onClose => {
                this.editDataInfo();
                this.props.info();
            })
        }).catch(err => {
            message.info(err.message)
        })
    }
}

export default Form.create()(AddTl);
