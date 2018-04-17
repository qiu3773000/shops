/**
 * Created by Administrator on 2018/4/13.
 */
import axios from 'axios'
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'
axios.defaults.baseURL = '后台接口公共前缀'
export function fetch(url, params) {
    return new Promise((resolve, reject) => {
        axios.post(url, params)
            .then(response => {
                resolve(response.data)
            })
            .catch((error) => {
                reject(error)
            })
    })
}
export default {
    // 获取我的页面的后台数据
    mineBaseMsgApi() {
        alert('进入api.js')
        return fetch('/api/getBoardList')
    },
    commonApi(url, params) {
        return fetch(url, params)
    }
}