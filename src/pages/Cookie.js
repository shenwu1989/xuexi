import { Buffer } from 'buffer'
//检测常规不符合参数
function judgeAry(ary) {
    if (ary !== null && ary !== 'null' && ary.toString() !== '[object Object]' && typeof ary !== "number" && typeof ary !== "string") {
        return true
    }
    return false
}
function judgeObj(obj) {
    if (obj !== null && obj !== 'null' && !Array.isArray(obj) && typeof obj !== "number" && typeof obj !== "string") {
        return true
    }
    return false
}

//设置Cookie参数为对象 expires_in为时间单位为秒，可按需修改变量不传默认为0,对token和user_admin不加密
export function setCookie(obj = {}) {
    if (judgeObj(obj)) {
        let { ...newObj } = obj, { expires_in: time = 0 } = obj, newtiem = new Date();
        delete newObj.expires_in;
        newtiem.setTime(newtiem.getTime() + (time * 1000));
        let expires = ";expires=" + newtiem.toUTCString();
        Object.keys(newObj).map(i => {
            let val = obj[i];
            let str = '';
            if (i === 'token' || i === 'user_admin') {
                str = val
            } else {
                str = enBuffer(val)
            }
            return document.cookie = enBuffer(i) + '=' + str + expires + ';path=/'
        })
    } else {
        console.log('传参错误,请传对象{a:1,b:2}形式')
    }
}

//获取Cookie 参数为数组 返回对象，对token和user_admin不解密
export function getCookie(ary = []) {
    if (judgeAry(ary)) {
        let cokie = document.cookie.split(';');
        let obj = {};
        ary = ary.map(i => enBuffer(i))
        ary.map(i => {
            let name = i + '=';
            cokie.forEach((x, index) => {
                let vul = cokie[index].trim();
                if (vul.indexOf(name) == 0) {
                    obj[unBuffer(i)] = (unBuffer(i) === 'token' || unBuffer(i) == 'user_admin' ? vul.substring(name.length, vul.length) : unBuffer(vul.substring(name.length, vul.length)));
                }
            })
        })
        return obj;
    } else {
        console.log('传参错误,请传数组[1，2，3]形式')
    }
}
//删除Cookie
export function removeCookie(ary = []) {
    if (judgeAry(ary)) {
        let obj = getCookie(ary);
        obj['expires_in'] = -18000;
        setCookie(obj);
        window.location.href = '/login';
    }
}
//检测Cookie 参数为数组 返回布尔值
export function checkCookie(ary = []) {
    if (judgeAry(ary)) {
        return JSON.stringify(getCookie(ary)) === '{}' ? false : true;
    }
    return false
}
//Buffer加密
function enBuffer(str) {
    return str = new Buffer(str).toString('base64');
}
//Buffer解密
function unBuffer(str) {
    return str = new Buffer(str, 'base64').toString();
}
//查询配置
export const cookieConfig = ['access_token', 'token_type', 'user_admin', 'user_name', 'phone'];