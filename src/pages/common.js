import { fetchGet, fetchPost, fetchPostFile } from '../components/frFetch'
import moment from 'moment'
import { CODE_SUCCESS, CODE_UNLOGIN, CODE_INVALID } from './consts'
import React from 'react'
import { SpinLogin } from '../admin'
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
                case CODE_INVALID:
                    message.info(ret.message || ret.msg)
                    window.location.href = '/login'
                    break
                default:
                    message.info(ret.message || ret.msg)
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
                case CODE_INVALID:
                    message.info(ret.message || ret.msg)
                    window.location.href = '/login'
                    break
                default:
                    message.info(ret.message || ret.msg)
                    resolve(ret)
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
                case CODE_INVALID:
                    message.info(ret.message || ret.msg)
                    window.location.href = '/login'
                    break
                default:
                    message.info(ret.message || ret.msg)
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
        xs: { span: 24 },
        sm: { span: 5 },
    },
    wrapperCol: {
        xs: { span: 24 },
        sm: { span: 14 },
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
        return year + '-' + month + '-' + date + ' ' + hour + ':' + minute + ':' + second
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

    return obj.map(item => ({ label: item[name], value: item[id] }))

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
export function dateShift(date, time = true) {
    let oldDate = new Date(date);
    if (!time) {
        oldDate = new Date(oldDate.toUTCString(oldDate.setTime(oldDate.getTime() - (1000 * 60 * 60 * 8))));
    }
    let timeYear = oldDate.getFullYear(),
        timeMonth = oldDate.getMonth() + 1,
        timeDate = oldDate.getDate(),
        timeHour = oldDate.getHours(),
        timeminute = oldDate.getMinutes(),
        timesecond = oldDate.getSeconds();
    function switchTime(t) {
        if (t < 10) {
            return '0' + t;
        }
        return t;
    }
    if (time) {
        let newDate = timeYear + '-' + switchTime(timeMonth) + '-' + switchTime(timeDate);
        return newDate
    } else {
        let newDate = timeYear + '-' + switchTime(timeMonth) + '-' + switchTime(timeDate) + ' ' + switchTime(timeHour) + ':' + switchTime(timeminute) + ':' + switchTime(timesecond);
        return newDate
    }

}

//分页验证参数
function judgeObj(obj) {
    if (obj !== null && obj !== 'null' && !Array.isArray(obj) && typeof obj !== "number" && typeof obj !== "string") {
        return true
    }
    return false
}
//obj是对象传入页码，每页显示条数，data数据，sort排序方式默认ID排序，返回一个新的对象
export function getPagination(obj) {
    if (judgeObj(obj)) {
        let { page, pageSize, dataList, sort = '' } = obj;
        let pageLen = dataList.length;
        switch (sort) {
            case 'date'://日期排序日期为空以ID做比较
                dataList.sort((a, b) => {
                    let { establish_time: a_establish_time } = a;
                    let { establish_time: b_establish_time } = b;
                    a_establish_time === null ? a_establish_time = a.id : a_establish_time = a_establish_time.toString().replace(/-/g, '');
                    b_establish_time === null ? b_establish_time = b.id : b_establish_time = b_establish_time.toString().replace(/-/g, '');
                    return a_establish_time - b_establish_time
                }).reverse();
                break;
            default:
                dataList.sort((a, b) => a.id - b.id);
                break;
        }
        let ary = [], len = (page - 1) * pageSize + pageSize, start = (page - 1) * pageSize;
        for (let i = start; i < len; i++) {
            if (!!dataList[i]) {
                ary.push(dataList[i])
            }
        }
        ary.map((a, b) => a.sortId = page === 1 ? b + 1 : (page - 1) * pageSize + 1 + b);
        let newObj = { pageLen, dataSource: ary };
        return newObj
    }
}
//分页切换事件,请传入原列表数据不要传入已被处理的列表
export function getVule(page, pageSize, dataList = [], sort = '') {
    let obj = { pageSize, page, dataList, sort };
    let { pageLen, dataSource } = getPagination(obj);
    this.setState({
        dataSource,
        pageLen
    })
}
//处理传入列表数据处理,默认起始显示条数
export function seekList(dataList, pageSize = 10, sort = '') {
    let obj = { pageSize, page: 1, dataList, sort };
    let { pageLen, dataSource } = getPagination(obj);
    this.setState({
        dataSource,
        pageLen
    })
}
//计算文件大小
export function fileSize(str) {
    let ren = str.toString().length;
    if (ren <= 3) {
        return str + 'B';
    } else if (ren <= 6) {
        return Math.round(str / 1000) + 'KB';
    } else if (ren <= 9) {
        return (str / 1000 / 1000).toFixed(1) + 'MB';
    }
}
//
export function qk() {
    const { form } = this.props;
    form.resetFields();
}