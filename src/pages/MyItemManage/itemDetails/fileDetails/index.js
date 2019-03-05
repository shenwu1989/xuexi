import React, {Component} from 'react';
import {Form, Button, Popconfirm, Table, Upload} from 'antd'
import {jrFetchPost, jrFetchGet} from '../../../../../src/pages/common';

const FormItem = Form.Item;
const data = [];
for (let i = 0; i < 5; i++) {
    data.push({
        key: i,
        name: `Edward King ${i}`,
        age: '1MB',
        address: `2019-02-1${i}`,
    });
}
const columns = [{
    title: ' 文件名',
    dataIndex: 'name',
    width: 250
}, {
    title: '大小',
    dataIndex: 'age',
    width: 150
}, {
    title: '上传日期',
    dataIndex: 'address',
    width: 200
}];

class Index extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedRowKeys: []
        }
    }

    onSelectChange = (selectedRowKeys) => {
        console.log('selectedRowKeys changed: ', selectedRowKeys);
        this.setState({selectedRowKeys});
    }

    render() {
        const {getFieldDecorator} = this.props.form;
        const {selectedRowKeys} = this.state;
        const rowSelection = {
            selectedRowKeys,
            onChange: this.onSelectChange,
        };
        return (
            <div className={'file'}>
                <Form>
                    <Table
                        rowSelection={rowSelection}
                        columns={columns}
                        dataSource={data}
                        pagination={false}
                        bordered={true}
                    />
                </Form>
                <div className={'file_button'}>
                    <Button onClick={this.handleExit}>关闭</Button>
                    <Upload>
                        <Button>上传</Button>
                    </Upload>
                    <Button onClick={this.handleExit}>下载</Button>
                    <Popconfirm placement="top" title={'确定要删除吗'} onConfirm={this.handleRemove} okText="是" cancelText="否">
                        <Button type={'danger'}>删除</Button>
                    </Popconfirm>

                </div>
            </div>
        );
    }

    //取消
    handleExit = () => {
        this.props.fn()
    }
    //删除
    handleRemove = () => {
        console.log(this.state.selectedRowKeys.map(i => data[i]))
    }
}

export default Form.create()(Index);
