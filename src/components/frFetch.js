/****
 * fetchGet，fetchPost只包装了最基础的请求，特殊需求，直接使用fetch来编码
 * 参考：https://developer.mozilla.org/zh-CN/docs/Web/API/Fetch_API/Using_Fetch
 */
import {getCookie,checkCookie,cookieConfig} from '../pages/Cookie'
export function fetchGet(requestApi, fetchPrm, successFun, errorFun) {
  let userInfo = getCookie(cookieConfig);
  let token = checkCookie(cookieConfig) ? userInfo.access_token : ""
  let fetchStr = `${requestApi}?`

  for (let item in fetchPrm) {
    fetchStr = fetchStr + `${item}=${encodeURIComponent(fetchPrm[item])}&`
  }
  fetchStr += `token=${token}`
  fetchStr = fetchStr.replace(/(&|\?)$/, '')

  fetch(fetchStr, { credentials: 'include', mode: 'no-cors' })
  .then(resp => resp.json())
  .then(data => {
    successFun(data, fetchStr)
  })
  .catch(() => {
    errorFun && errorFun(`后台错误, GET: ${requestApi}`)
  })
}

export function fetchPost(requestApi, fetchPrm, successFun, errorFun) {
  let userInfo = getCookie(cookieConfig);
  let token = checkCookie(cookieConfig) ? userInfo.access_token : ""
  let formData = ''

  for (let item in fetchPrm) {
    formData = formData + `${item}=${encodeURIComponent(fetchPrm[item])}&`
  }
  formData += `token=${token}`
  formData = formData.replace(/&$/, '')

  const url = requestApi + '**' + formData

  fetch(requestApi, {
    credentials: 'include',
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: formData
  })
  .then(resp => resp.json())
  .then(data => {
    successFun(data, url)
  })
  .catch(() => {
    errorFun && errorFun(`后台错误, POST: ${requestApi}`)
  })
}

export function fetchPostFile(requestApi, fetchPrm, successFun, errorFun) {
  fetch(requestApi, {
    credentials: 'include',
    method: 'POST',
    body: fetchPrm
  })
  .then(resp => resp.json())
  .then(data => {
    successFun(data)
  })
  .catch(() => {
    errorFun && errorFun(`后台错误, POST: ${requestApi}`)
  })
}
