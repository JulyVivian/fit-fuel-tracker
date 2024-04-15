import axios from 'axios'

axios.defaults.baseURL = ''  //正式

//post请求头
axios.defaults.headers.post["Content-Type"] = "application/json";
//允许跨域携带cookie信息
axios.defaults.withCredentials = true; 
//设置超时
axios.defaults.timeout = 15000;

axios.defaults.crossDomain = true
//Access-Control-Allow-Origin 指向前端 ip:port

axios.interceptors.request.use(
    config => {
      return config;
    },
    error => {
        return Promise.reject(error);
    }
);

axios.interceptors.response.use(
    response => {
        if (response.status == 200) {
            return Promise.resolve(response);
        } else {
            return Promise.reject(response);
        }
    },
    error => {
        const { response } = error
        console.log(response)
        return Promise.reject(response);
    }
)

export default axios