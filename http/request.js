import axios from "axios";

// 公共配置的axios
const request = axios.create({
    baseURL: 'https://api.bilibili.com',
    timeout: 10000
})

// 增加响应拦截器,解析响应数据data
request.interceptors.response.use(response => {
    return response.data;
}, error => {
    console.error("请求失败, 请注意. ", error)
    return Promise.reject(error)
})

export default request;





