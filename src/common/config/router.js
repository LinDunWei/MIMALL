let routes = [
    {
        path: '/',
        name: 'home',
        component : 'Home',
        redirect : {  name:'Index' },
        children: [
            {
                //主页
                component : 'Index/index'
            },
            {
                //产品页
                component : 'Product/index'
			},
			{
				//商品详情
				component : 'Detail/index'
			}
        ]

	},
	{
		//购物车
		component : 'Cart/index'
	},
	{
		//订单
		component : 'Order/index',
		children:[
			{
				//订单列表
				component : 'Order/list'
			},
			{
				//订单确认
				component : 'Order/confirm'
			},
			{
				//订单支付
				component : 'Order/pay'
			},
			{
				//loading
				component : 'Order/alipay'
			}
		]
	},
	{
		//登录
		component : 'Login/index'
	}
]

let getRoutes = function(){
	// 自动生成路由
	createRoute(routes)
	return routes
}

function createRoute(arr){
    for (let i = 0; i < arr.length; i++) {
		if (!arr[i].component) return
		// 去除index
		let val = getValue(arr[i].component)
		// 生成name
		arr[i].name = arr[i].name || val.replace(/\//g,'_')
		// 生成path
		arr[i].path = arr[i].path || `/${val}`
		// 自动生成component
		let componentFun = import(`../../views/${arr[i].component}.vue`)
		arr[i].component = ()=>componentFun
		if (arr[i].children && arr[i].children.length > 0) {
			createRoute(arr[i].children)
		}
	}
}
// 去除index
function getValue(str) {
	// str = login/index
	// 获取最后一个/的索引
	let index = str.lastIndexOf('/')
	// 获取最后一个/后面的值
	let val = str.substring(index+1,str.length)
	// 判断是不是index结尾
	if (val === 'index') {
		return str.substring(index,-1)
	}
	return str
}

export default getRoutes()