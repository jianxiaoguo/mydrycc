import axios from 'axios'
import { Toast } from 'vant'

// 环境的切换
axios.defaults.baseURL = process.env.NODE_ENV == 'development' ? '//d.uucin.com' : '//d.uucin.com'
axios.defaults.withCredentials = true
axios.defaults.headers.post['Content-Type'] = 'application/json'

axios.interceptors.request.use(
    (config)=>{
        let token = sessionStorage.getItem('csrftoken')
        if(token){
            config.headers['X-CSRFToken'] = token;
        }
        return config
    }
)

// 响应拦截器
axios.interceptors.response.use(
    response => {
      // 如果返回的状态码为200，说明接口请求成功，可以正常拿到数据
      // 否则的话抛出错误
      if (response.status === 200) {
        return Promise.resolve(response);
      } else {
        return Promise.reject(response);
      }
    },
    // 服务器状态码不是2开头的的情况
    // 这里可以跟你们的后台开发人员协商好统一的错误状态码
    // 然后根据返回的状态码进行一些操作，例如登录过期提示，错误提示等等
    // 下面列举几个常见的操作，其他需求可自行扩展
    error => {
      if (error.response.status) {
        switch (error.response.status) {
            // 401: 未登录
            // 未登录则跳转登录页面，并携带当前页面的路径
            // 在登录成功后返回当前页面，这一步需要在登录页操作。
          case 401:
            window.location.replace("http://d.uucin.com/login/drycc/");
            break;

            // 403 token过期
            // 登录过期对用户进行提示
            // 清除本地token和清空vuex中token对象
            // 跳转登录页面
          case 403:
              console.log("error.response.data.detail: ", error.response.data.detail)
              if(error.response.data.detail.indexOf('Authentication credentials were not provided.') >= 0){
                  window.location.replace("http://d.uucin.com/login/drycc/");
                  break;
              }else {
                  console.log({
                      message: error.response.data.message,
                      duration: 1500,
                      forbidClick: true
                  });
              }

            // 404请求不存在
          case 404:
            Toast({
              message: '网络请求不存在',
              duration: 1500,
              forbidClick: true
            });
            break;
            // 其他错误，直接抛出错误提示
          default:
            console.log({
              message: error.response.data.message,
              duration: 1500,
              forbidClick: true
            });
        }
        return Promise.reject(error.response);
      }
    }
);

export default axios
