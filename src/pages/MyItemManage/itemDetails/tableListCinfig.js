
import React, {Component} from 'react';
//import {Popconfirm} from 'antd'

//项目列表
const columns = [
    {
        title: 'ID',
        align: 'center',
        width: 20,
        dataIndex: 'id',
        defaultSortOrder: 'ascend',
        sorter: (a, b) => a.id - b.id,
    },
    {
        title: '投资机构',
        width: 100,
        align: 'center',
        dataIndex: 'phone'
    },
    {
        title: '投资人',
        width: 100,
        align: 'center',
        dataIndex: 'email'
    },
    {
        title: '事件状态',
        width: 100,
        align: 'center',
        dataIndex: 'email1'
    },
    {
        title: '参会人',
        width: 100,
        align: 'center',
        dataIndex: 'email2'
    },
    {
        title: '历史反馈',
        width: 100,
        align: 'center',
        dataIndex: 'email3'
    },
    {
        title: '下一步跟进',
        width: 100,
        align: 'center',
        dataIndex: 'email4'
    },
    {
        title: '详情',
        width: 100,
        align: 'center',
        dataIndex: 'email5'
    }
]

export default columns;
