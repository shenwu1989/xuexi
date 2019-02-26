import {fetchGet, fetchPost, fetchPostFile} from '../components/frFetch'
import moment from 'moment'
import {CODE_SUCCESS, CODE_UNLOGIN, CODE_LOGIN, CODE_PHONE} from './consts'
import React from 'react'
import {SpinLogin} from '../admin'
import message from 'antd/lib/message';
import notification from 'antd/lib/notification';


const stateAllfetchArr = []

export function getParamsType(obj) {
    return ({}).toString.call(obj).match(/\s([a-zA-Z]+)/)[1].toLowerCase()
}

export const renderNull = (item) => item || '-';


export function changeGlobalFetchState() {
    if (stateAllfetchArr.length > 0) {
        SpinLogin.setLogin(true)
    } else {
        SpinLogin.setLogin(false)
    }
}

export function updateFetchState(state) {
    state ? stateAllfetchArr.push(1) : stateAllfetchArr.pop()
    changeGlobalFetchState()
}

export function jrFetchGet(jrApi, fetchPrm, loading = true) {
    const initPrm = {}

    for (const item in fetchPrm) {
        typeof fetchPrm[item] === 'undefined' && (fetchPrm[item] = '')
    }

    Object.assign(initPrm, fetchPrm)

    return new Promise(resolve => {
        loading && updateFetchState(true)
        fetchGet(jrApi, initPrm, ret => {
            // successFun
            loading && updateFetchState(false)
            switch (ret.code) {
                case CODE_SUCCESS:
                    resolve(ret)
                    break
                case CODE_UNLOGIN:
                    message.info(ret.message || ret.msg)
                    window.location.href = '/admin'
                    break
                default:
                    message.info(ret.message || ret.msg)
                    window.location.href = '/login'
            }
        }, err => {
            // errorFun
            loading && updateFetchState(false)
            message.info(err)
        })
    })
}

export function jrFetchPost(jrApi, fetchPrm, loading = true) {
    const initPrm = {}

    for (const item in fetchPrm) {
        typeof fetchPrm[item] === 'undefined' && (fetchPrm[item] = '')
    }

    Object.assign(initPrm, fetchPrm)

    loading && updateFetchState(true)

    return new Promise(resolve => {
        fetchPost(jrApi, initPrm, ret => {
            // successFun
            loading && updateFetchState(false)
            switch (ret.code) {
                case CODE_SUCCESS:
                    resolve(ret)
                    break
                case CODE_UNLOGIN:
                    message.info(ret.message || ret.msg)
                    window.location.href = '/admin'
                    break
                case CODE_LOGIN:
                    message.info(ret.message || ret.msg)
                    break
                case CODE_PHONE:
                    message.info(ret.message || ret.msg)
                    break
                default:
                    message.info(ret.message || ret.msg)
                    //window.location.href = '/login'
            }
        }, err => {
            // errorFun
            loading && updateFetchState(false)
            message.info(err)
        })
    })
}

export function jrFetchPostFile(jrApi, fetchPrm, loading) {
    const formData = new FormData()

    for (const item in fetchPrm) {
        typeof fetchPrm[item] === 'undefined' && (fetchPrm[item] = '')
        formData.append(item, fetchPrm[item])
    }

    loading && updateFetchState(true)
    return new Promise(resolve => {
        fetchPostFile(jrApi, formData, ret => {
            // successFun
            loading && updateFetchState(false)
            switch (ret.code) {
                case CODE_SUCCESS:
                    resolve(ret)
                    break
                case CODE_UNLOGIN:
                    message.info(ret.message || ret.msg)
                    window.location.href = '/admin'
                    break
                default:
                    message.info(ret.message || ret.msg)
                    window.location.href = '/login'
            }
        }, err => {
            // errorFun
            loading && updateFetchState(false)
            message.info(err)
        })
    })
}

export const jrTip = function (type, msg, des, duration = 4.5) {
    // success info warning error
    notification[type]({
        message: msg,
        description: des,
        duration
    })
}

export const formItemLayout = {
    labelCol: {
        xs: {span: 24},
        sm: {span: 5},
    },
    wrapperCol: {
        xs: {span: 24},
        sm: {span: 14},
    }
}

export const getRouteString = (routeArray, index) => {
    let rs = ''
    for (let i = 0; i < index; i++) {
        rs = rs + routeArray[i]['path'] + '/'
    }
    return rs
}

export const fun_date = (days) => {
    const date1 = new Date()
    const date2 = new Date(date1)
    date2.setDate(date1.getDate() + days)
    const time2 = date2.getFullYear() + '-' + (date2.getMonth() + 1) + '-' + date2.getDate()

    return time2
}

export const formatDate = (now, flag = true) => {
    const year = now.getFullYear()
    const month = now.getMonth() + 1
    const date = now.getDate()
    const hour = now.getHours()
    const minute = now.getMinutes()
    const second = now.getSeconds()
    if (flag) {
        return year + '-' + month + '-' + date + '   ' + hour + ':' + minute + ':' + second
    }
    return year + '-' + month + '-' + date
}

export const getLoadigOption = () => {
    const option = {
        color: '#108EE9',
        textColor: '#000',
        maskColor: 'rgba(255, 255, 255, 0.8)',
        zlevel: 0
    }
    return option
}

// 获取时间格式为YYYY-MM-DD  参数为  -1 前一天  1 后一天
export const getDefaultDate = (day) => {
    let defaultDay = ''
    let now = new Date()
    now = Date.parse(now)
    if (day) {
        if (day < 0) {
            day = +day
        }
        defaultDay = now + day * 24 * 60 * 60 * 1000
        defaultDay = moment(defaultDay).format('YYYY-MM-DD')
    } else {
        defaultDay = moment().format('YYYY-MM-DD')
    }
    return defaultDay
}

// 格式化checkbox项的值
export const getOpt = (obj, name = 'name', id = 'id') => {

    return obj.map(item => ({label: item[name], value: item[id]}))

}
// 获取checkbox select 选中的值
export const getOptSelect = (obj = [], id = 'id', select = 'selected') => {

    const objData = obj[0]
    if (getParamsType(objData) === 'array') {
        return objData.filter(v => +v[select]).map(v => v[id])
    }

    console.error(`数据源不是array: ${getParamsType(objData)}`)
    return []
}

// 遍历select option 的值
export const getSelectOpt = (obj, id = 'value', label = 'label') => {
    const data = []
    obj && obj.map((v) => {
        if (getParamsType(v) === 'object') {
            data.push(<option key={v[id]} value={v[id]}>{v[label]}</option>)
        } else {
            data.push(<option key={v} value={v}>{v}</option>)
        }
    })
    return data
}

export const formatRange = (type, momentFlag = false, format = 'YYYY-MM-DD') => {

    const date = new Date()
    const res = []
    const millisecond = 1000 * 60 * 60 * 24
    switch (type) {
        case 1:
            res.push(formatDate(date))
            res.push(formatDate(new Date(date.getTime() + (type * millisecond))))
            break;
        case 7:
            const week = date.getDay()
            const minusDay = week !== 0 ? week - 1 : 6
            res.push(new Date(date.getTime() - (minusDay * millisecond)))
            res.push(formatDate(new Date(res[0].getTime() + type * millisecond)))
            res[0] = formatDate(res[0])
            break;
        case 30:
            const nowMonth = date.getMonth()
            const nowYear = date.getFullYear()
            res.push(new Date(nowYear, nowMonth, 1))
            res.push(formatDate(new Date(nowYear, nowMonth + 1, 1)))
            res[0] = formatDate(res[0])
            break;
    }
    if (!momentFlag) {
        return res
    }
    return [moment(res[0], format), moment(res[1], format)]

}

export const formateFormVal = (obj, str = '请选择', replaceStr = '') => {
    if (getParamsType(obj) !== 'object') {
        console.error('数据源（obj）请传入JSON对象')
        return {}
    }
    Object.keys(obj).map(v => {
        (obj[v].indexOf(str) !== -1) && (obj[v] = replaceStr)
    })
    return obj
}

// 字段是否为空
export function equalNull(text) {
    if (text === 'undefined' || text === 'null') {
        return true
    }
    if (text || text === 0) {
        return false
    }
    return true
}

// 生成id
export function createId() {
    return Math.random().toString().slice(13) + new Date().getTime().toString().slice(5)
}

// 解析url查询字符串
export function parseSearchStr(searchStr) {
    const ret = {}
    if (equalNull(searchStr)) {
        return ret
    }
    searchStr.replace('?', '').split('&')
        .forEach(item => {
            const arr = item.split('=')
            ret[arr[0]] = arr[1]
        })
    return ret
}

//检测是否是空对象或数组
export function queryNull(obj) {

    if (JSON.stringify(obj) === '[]' || JSON.stringify(obj) === '{}') {
        return true
    }
    if (obj == 'undefined' || obj == 'null' || obj == null || obj === '') {
        return true
    }
    return false


}

//判断state状态
export function judgeState(text) {
    if (typeof text === 'undefined' || text === 'null') {
        return false
    }
    if (text === 0 || text === 1) {
        return false
    }
    return true
}

//日期转换
export function dateShift(date) {
    let oldDate = new Date(date),
        timeYear = oldDate.getFullYear(),
        timeMonth = oldDate.getMonth() + 1,
        timeDate = oldDate.getDate() - 1;
    let newDate = timeYear + '-' + (timeMonth < 10 ? '0' + timeMonth : timeMonth) + '-' + (timeDate < 10 ? '0' + timeDate : timeDate);
    return newDate
}

//分页
function judgeObj(obj) {
    if (obj !== null && obj !== 'null' && !Array.isArray(obj) && typeof obj !== "number" && typeof obj !== "string") {
        return true
    }
    return false
}

//obj是对象传入页码，每页显示条数，data数据，sort排序方式
export function getPagination(obj) {
    if (judgeObj(obj)) {
        let {page, pageSize, dataList, sort} = obj;
        let pageLen = dataList.length;
        switch (sort) {
            case 'date':
                dataList.sort((a, b) => {
                    let {establish_time: a_establish_time} = a;
                    let {establish_time: b_establish_time} = b;
                    a_establish_time === null ? a_establish_time = 0 : a_establish_time = a_establish_time.toString().replace(/-/g, '');
                    b_establish_time === null ? b_establish_time = 0 : b_establish_time = b_establish_time.toString().replace(/-/g, '');
                    return a_establish_time - b_establish_time
                }).reverse();
                break;
        }

        let ary = [], len = (page - 1) * pageSize + pageSize, start = (page - 1) * pageSize;
        for (let i = start; i < len; i++) {
            if (!!dataList[i]) {
                ary.push(dataList[i])
            }
        }
        let newObj = {pageLen, dataSource: ary};
        return newObj
    }
}