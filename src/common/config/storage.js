// 封装storage缓存


//storage缓存是以key/val的形式保存的，这里我们将缓存的信息用json格式保存，例如 ： mall : {"user":{"username":"ldw","age":"23"}}
//key值user为每一个缓存模块，例如 user为模块名moduleName
//当需要设置或者获取某一个模块下一级的key/value时，我们在getItem和setItem加多一个形参module_name，通过递归的方法来实现要的效果
const STORAGE_KEY = 'mall';
export default{
    //存储值
    setItem(key,value,module_name){
        //先判断有无模块名，是否需要设置更深层的key/value
        if(module_name){
            let val = this.getItem(module_name);   
            //要设置的key
            val[key] = value;
            this.setItem(module_name,val)
        }else{
            let val = this.getStorage();
            val[key] = value;
            window.sessionStorage.setItem(STORAGE_KEY,JSON.stringify(val))
        }
    },
    //获取值
    getItem(key,module_name){
        if(module_name){
            let val = this.getItem(module_name);    
            if(val) return val[key]
        }
        return this.getStorage()[key]
    },
    //获取全部浏览器缓存信息    
    getStorage(){
        return JSON.parse(window.sessionStorage.getItem(STORAGE_KEY) || '{}')
    },
    clear(key,module_name){
        let val = this.getStorage();
        if(module_name){
            if(!val[module_name]) return
            delete val[module_name][key]
        }else{
            delete val[key]
        }
        // 重新写入缓存
        window.sessionStorage.setItem(STORAGE_KEY,JSON.stringify(val))
    }
}