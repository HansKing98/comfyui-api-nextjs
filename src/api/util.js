import { getToken, setToken, loginHandler } from "./login"

export let XHost = ''
if(typeof window !== 'undefined'){
    XHost = window.location.host
}

// XHost = 'comfyui-api-nextjs.vercel.app'

// 请求next服务器端 所以是 空字符串
export const baseUrl =''


function commonFetch(method, url, data, checkLogin = true) {
  const access_token = getToken()
  const param = {
    method, // *GET, POST, PUT, DELETE, etc.
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${access_token}`,
      "X-Host": XHost
    },
  }
  if (data) {
    param.body = JSON.stringify(data)
  }
  return fetch(baseUrl + url, param).then(async res => {
    const rt = await res.json()
    if (checkLogin && res.status === 401) {
      setToken('')
      // loginHandler()
      return rt
    } else {
      if (res.status !== 200) {
        console.error('status not 200 error', res)
      }
      return rt
    }
  }).catch(err=>{
    setToken('')
    // loginHandler()
  })
}

export function commonGet(url, checkLogin = true) {
  return commonFetch('GET', url, '', checkLogin)
}

export function commonPut(url, data, checkLogin = true) {
  return commonFetch('PUT', url, data, checkLogin)
}

export function commonPost(url, data, checkLogin = true) {
  return commonFetch('POST', url, data, checkLogin)
}