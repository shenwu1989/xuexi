import React, { Component } from 'react';
import { Form, Button, Popconfirm, Table, Upload, message, Icon, Tooltip } from 'antd';
import { jrFetchGet, fileSize, queryNull, } from '../../../../../src/pages/common';
import { getCookie, cookieConfig } from '../../../Cookie';

const columns = [{
    title: ' 文件名',
    dataIndex: 'name',
    width: 250
}, {
    title: '大小',
    dataIndex: 'size',
    width: 150,
    render: (r) => {
        return fileSize(r);
    }
}, {
    title: '上传日期',
    dataIndex: 'upload_time',
    width: 200
}];

class Index extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedRowKeys: [],
            showUp: false,
            radio_on: false
        }
    }

    componentDidMount() {
        this.dataInfo();
    }

    render() {
        const { selectedRowKeys, docs = [], radio_on } = this.state;
        const token = getCookie(cookieConfig).access_token;
        const rowSelection = {
            selectedRowKeys,
            type: 'radio',
            onChange: this.onSelectChange,
        };
        const { folder, project } = this.props.folder

        return (
            <div className={'file'}>
                <Form>
                    <Table
                        rowSelection={rowSelection}
                        columns={columns}
                        rowKey={'id'}
                        dataSource={docs}
                        pagination={false}
                        bordered={true}
                    />
                </Form>
                <div className={'file_button'}>
                    <Button onClick={this.handleExit}>关闭</Button>
                    <Upload
                        name='doc'
                        action='/ng-lingxi/api/project/internal/doc/upload'
                        multiple={true}
                        data={{ doc: 'xx', folder, project, token }}
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
                                this.dataInfo();
                                this.props.fn('on');
                            }
                            //上传失败
                            if (!queryNull(res.file.response) && res.file.response.code !== 0) {
                                message.info(`上传失败！`)
                            }
                        }}
                    >

                        <Button>
                            <Icon type={this.state.showUp ? 'loading' : 'upload'} />
                            上传
                        </Button>
                    </Upload>
                    {
                        radio_on ?
                            <Button onClick={this.handleDownLoad}>下载</Button>
                            :
                            <Tooltip placement="bottom" title={'请先选择文件'}><Button disabled={true}>下载</Button></Tooltip>
                    }
                    {
                        radio_on ?
                            <Popconfirm placement="top" title={'确定要删除吗'} onConfirm={this.handleRemove} okText="是" cancelText="否">
                                <Button type={'danger'}>删除</Button>
                            </Popconfirm>
                            :
                            <Tooltip placement="bottom" title={'请先选择文件'}><Button type={'danger'} disabled={true}>删除</Button></Tooltip>
                    }
                </div>
            </div>
        );
    }
    //初始数据
    dataInfo = () => {
        jrFetchGet(`/ng-lingxi/api/project/internal/doc/folder`, {
            ...this.props.folder
        }).then(res => {
            this.setState({
                docs: res.data.docs
            })
        })
    }
    //选择事件
    onSelectChange = (selectedRowKeys) => {
        this.setState({
            radio_on: true
        })
        let objSelect;
        for (let item of selectedRowKeys) {
            objSelect = this.state.docs.map(i => {
                if (i.id === item) {
                    return i
                }
            }).filter(Boolean)
        }
        this.setState({ selectedRowKeys, objSelect });
    }
    //取消
    handleExit = () => {
        this.props.fn('off')
    }
    //下载
    handleDownLoad = () => {
        let url = this.state.objSelect[0].url;
        window.open(`${url}`,`download`, `_blank`);
    }
    //删除
    handleRemove = () => {
        let key = this.state.selectedRowKeys;
        jrFetchGet(`/ng-lingxi/api/project/internal/doc/delete/${key}`)
            .then(res => {
                this.dataInfo();
                this.props.fn('on')
                message.success('删除成功');
            })
    }
}

export default Form.create()(Index);
