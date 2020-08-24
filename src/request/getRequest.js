import serve from './http'
import qs from 'qs'

function myserve(){
    //login : {}

    this.handle = null;
}
myserve.prototype.v = function(obj){
    this.handle = obj;
    return this
}


//举例在api/index文件中调用parseRouter方法用来批量生成login业务模块的接口函数： myserve.parseRouter('login',login)
myserve.prototype.parseRouter = function(name,urlObj){
    var obj = this[name] = {};  //相当于给这个myserve函数创建了一个叫 name 的空模块对象，举例第五行注释代码
    Object.keys(urlObj).forEach(item=>{     //遍历urlObj对象的key值，举例`/apilogin`文件暴露出来的login对象
        //用key值给这个login对象绑定一个`key`方法，通过bind绑定this指向和传入一个形参，这里形参就是（例举/api/login 对象中的接口地址）
        obj[item] = this.sendMes.bind(this,name,item,urlObj[item])      //this.sendMes.bind(this,'login',loginIn,'/api/loginIn')

        //防止重复提交的操作
        obj[item].state = 'ready'   //给每一个接口方法挂一个state （在login对象下的loginIn函数里加一个state:'ready'的属性）
    })
}

myserve.prototype.sendMes = function(moduleName,name,url,config){
    // console.log(config.data);
    //发送请求
    var config = config || {};
    var type = config.type || 'get';
    var data = config.data || {};
    var parameterId = config.parameterId || ''
    var repeat = config.repeat || false     //是否开启防止重复提交
    var bindName = config.bindName || name     //bindName不传默认为name，通过v函数形参拿到的组件对象this，将数据绑定到同名的属性上

    var noQuestion = config.noQuestion || false     //是否使用参数不带问号的拼接方式调用get请求
    var that = this;
    var before = function(res){
        // console.log(res)
        that[moduleName][name].state = 'ready'
        return res
    }
    var defalutFn = function(res){
        //数据自动绑定
        // console.log(res);
        that.handle[bindName] = res.data
        // console.log(that.handle[bindName]);
    }
    var success = config.success || defalutFn;
    var callback = function(res){
        // console.log(res);
        success(res,defalutFn)
    }

    var state = {
        get : function(){
            // console.log(type,url);
            var qsUrl = noQuestion? url + '/' + data : url + '?' + qs.stringify(data);
            serve.get(qsUrl).then(before).then(callback)
        },
        post : function(){
            serve.post(url,data).then(before).then(callback)
        },
        put : function(){
            var qsUrl;
            if(noQuestion){
                qsUrl = url + '/' +parameterId;
                console.log(parameterId);
                serve.put(qsUrl,data).then(before).then(callback)
            }else{
                // qsUrl = url + '/' + qs.stringify(data);
            }
        },
        delete : function(){
            var qsUrl;
            if(noQuestion){
                qsUrl = url + '/' +parameterId;
                console.log(parameterId);
                serve.delete(qsUrl,data).then(before).then(callback)
            }else{
                // qsUrl = url + '/' + qs.stringify(data);
            }
        }
    }
    //判断创建的login对象下的loginIn方法绑定的state
    // if(that[moduleName][name].state == 'ready'){
    //     that[moduleName][name].state = 'pending'
    //     state[type]();
    // }
    if(repeat){
        if(that[moduleName][name].state == 'ready'){
            that[moduleName][name].state = 'pending'
            state[type]();
        }
    }
    else{
        state[type]();
    }
}

export default new myserve