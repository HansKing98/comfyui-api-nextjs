import { store } from '@/util/store'
import { commonGet } from './util'

let token = ''
export function getToken(){
    if(token){
        return token
    } else {
        const oldToken = store.get('access_token')
        if(oldToken){
            token = oldToken
            return token
        } else {
            console.log('no old token')
            return token
        }
    }
}

export function setToken(val) {
    token = val
}

export function getUserInfo() {
    return commonGet(`/user`).catch(err => {
      throw err
    })
  }
  