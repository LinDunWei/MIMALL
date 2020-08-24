import myserve from '../request/getRequest'
import user from './user'
import shop from './shop'
import login from './login'

myserve.parseRouter('user',user)
myserve.parseRouter('shop',shop);
myserve.parseRouter('login',login)


export default myserve