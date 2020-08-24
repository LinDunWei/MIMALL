import axios from 'axios'
import { Message } from 'element-ui'
import { showLoading, hideLoading } from '../plugins/loading'

const serve = axios.create({
    baseURL : '/api',
    timeout : 5000
})

//处理错误请求
const errorHandle = function(status,errorInfo){
    switch (status) {
        case 400: 
            // 请求头和服务器的限制
            console.log(errorInfo);
            Message({
                message : errorInfo.error,
                type : 'error'
            })
        break;
        default :
            console.log(errorInfo);
        break;
    }
}

//拦截
serve.interceptors.request.use(
    config => {
        showLoading()
        return config
    },
    error => {
        hideLoading();
        return Promise.error(error)
    }
)
serve.interceptors.response.use(
    response => {
        hideLoading()
        let path = location.hash;
        let res = response.data
        //注意点 这里的处理状态码只有是成功的状态才不用抛出一个promise的错误
        if(res.status == 0){
            //成功
            return Promise.resolve(res)
        }else if(res.status == 10){
            Message({
                message : '未登录',
                type : 'error'
            })
            if(path != '#/Login'){
                window.location.href = '/#/Login';
            }
            return Promise.reject(res);

        }else{
            Message({
                message : res.msg,
                type : 'error'
            })
            return Promise.reject(res);
        }
    },
    error => {
        hideLoading();
        const {response} = error    //错误信息
        //response包含信息 :
        //   status
        //   data
        if(response){
            errorHandle(response.status,response.data)
            return Promise.reject(response)
        }else{
            console.log('请求中断或者是断网了');
        }
    }
    )


export default serve;

