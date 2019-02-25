
import React, {Component} from 'react';
//import {Popconfirm} from 'antd'

//项目列表
const columns = [
    {
        title: 'ID',
        align: 'center',
        width: 30,
        dataIndex: 'id',
        defaultSortOrder: 'ascend',
        sorter: (a, b) => a.id - b.id,
    },
    {
        title: '项目',
        align: 'center',
        width: 150,
        dataIndex: 'name'
    },
    {
        title: '一级行业',
        width: 100,
        align: 'center',
        dataIndex: 'phone'
    },
    {
        title: '二级行业',
        width: 100,
        align: 'center',
        dataIndex: 'email'
    },
    {
        title: 'staffing',
        width: 100,
        align: 'center',
        dataIndex: 'email1'
    },
    {
        title: '轮次',
        width: 100,
        align: 'center',
        dataIndex: 'email2'
    },
    {
        title: '项目阶段',
        width: 100,
        align: 'center',
        dataIndex: 'email3'
    },
    {
        title: '项目状态',
        width: 100,
        align: 'center',
        dataIndex: 'email4'
    },
    {
        title: '融资金额',
        width: 100,
        align: 'center',
        dataIndex: 'email5'
    },
    {
        title: '立项时间',
        width: 100,
        align: 'center',
        dataIndex: 'email6'
    }
]

export default columns;
