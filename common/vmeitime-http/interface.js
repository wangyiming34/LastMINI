/**
 * 通用uni-app网络请求
 * 基于 Promise 对象实现更简单的 request 使用方式，支持请求和响应拦截
 */

/*
// 开放的接口
import http from './interface'

http.config.baseUrl = "http://localhost:8080/api/"

http.request(url:'user/list',method:'GET').then((res)=>{
	console.log(JSON.stringify(res))
})
http.get('user/list').then((res)=>{
	console.log(JSON.stringify(res))
})
http.get('user/list', {status: 1}).then((res)=>{
	console.log(JSON.stringify(res))
})
http.post('user', {id:1, status: 1}).then((res)=>{
	console.log(JSON.stringify(res))
})
http.put('user/1', {status: 2}).then((res)=>{
	console.log(JSON.stringify(res))
})
http.delete('user/1').then((res)=>{
	console.log(JSON.stringify(res))
}) 

*/
// if(process.env.NODE_ENV === 'development'){
//     console.log('开发环境')
// }else{
//     console.log('生产环境')
// }
export default {
	config: {
		baseUrl: "https://apis.zhongemaoyi.com/api",
		// baseUrl: "https://app.detion.com/api",
		header: {
			'Content-Type':'application/json;charset=UTF-8',
			'Content-Type':'application/x-www-form-urlencoded'
		},  
		data: {},
		method: "POST",
		dataType: "json",  /* 如设为json，会对返回的数据做一次 JSON.parse */
		responseType: "text",
		success() {},
		fail() {},
		complete() {}
	},
	interceptor: {
		request: null,
		response: null
	},
	request(options) {
		if (!options) {
			options = {}
		}
		options.baseUrl = options.baseUrl || this.config.baseUrl
		options.dataType = options.dataType || this.config.dataType
		options.url = options.baseUrl + options.url
		options.data = options.data || {}
		options.method = options.method || this.config.method
		
		//TODO 加密数据
		
		//TODO 数据签名
		/* 
		_token = {'token': getStorage(STOREKEY_LOGIN).token || 'undefined'},
		_sign = {'sign': sign(JSON.stringify(options.data))}
		options.header = Object.assign({}, options.header, _token,_sign) 
		*/
	   
		return new Promise((resolve, reject) => {
			let _config = null
			
			options.complete = (response) => {
				let statusCode = response.statusCode
				response.config = _config
				if (process.env.NODE_ENV === 'development') {
					if (statusCode === 200) {
						// console.log("【" + _config.requestId + "】 结果：" + JSON.stringify(response.data))
					}
				}
				if (this.interceptor.response) {
					let newResponse = this.interceptor.response(response)
					if (newResponse) {
						response = newResponse
					}
				}
				// 统一的响应日志记录
				_reslog(response)
				if (statusCode === 200) { //成功
					resolve(response);
				} else {
					reject(response)
				}
			}

			_config = Object.assign({}, this.config, options)
			_config.requestId = new Date().getTime()

			if (this.interceptor.request) {
				this.interceptor.request(_config)
			}
			
			// 统一的请求日志记录
			_reqlog(_config)

			if (process.env.NODE_ENV === 'development') {
				// console.log("【" + _config.requestId + "】 地址：" + _config.url)
				if (_config.data) {
					// console.log("【" + _config.requestId + "】 参数：" + JSON.stringify(_config.data))
				}
			}

			uni.request(_config);
		});
	},
	get(url, data, options) {
		if (!options) {
			options = {}
		}
		options.url = url
		options.data = data
		options.method = 'GET'  
		return this.request(options)
	},
	post(url, data, options) {
		if (!options) {
			options = {}
		}
		options.url = url
		options.data = data
		options.method = 'POST'
		return this.request(options)
	},
	put(url, data, options) {
		if (!options) {
			options = {}
		}
		options.url = url
		options.data = data
		options.method = 'PUT'
		return this.request(options)
	},
	delete(url, data, options) {
		if (!options) {
			options = {}
		}
		options.url = url
		options.data = data
		options.method = 'DELETE'
		return this.request(options)
	}
}


/**
 * 请求接口日志记录
 */
function _reqlog(req) {
	if (process.env.NODE_ENV === 'development') {
		// console.log("【" + req.requestId + "】 地址：" + req.url)
		if (req.data) {
			// console.log("【" + req.requestId + "】 请求参数：" + JSON.stringify(req.data))
		}
	}
	//TODO 调接口异步写入日志数据库
}

/**
 * 响应接口日志记录
 */
function _reslog(res) {
	let _statusCode = res.statusCode;
	if (process.env.NODE_ENV === 'development') {
		// console.log("【" + res.config.requestId + "】 地址：" + res.config.url)
		if (res.config.data) {
			// console.log("【" + res.config.requestId + "】 请求参数：" + JSON.stringify(res.config.data))
		}
		// console.log("【" + res.config.requestId + "】 响应结果：" + JSON.stringify(res))
	}
	//TODO 除了接口服务错误外，其他日志调接口异步写入日志数据库
	switch(_statusCode){
		 case 400:
		        console.log('错误请求')
		        break
		      case 401:
		        console.log('未授权，请重新登录')
		        break
		      case 403:
		        console.log('拒绝访问')
		        break
		      case 404:
		        console.log('请求错误,未找到该资源')
		        break
		      case 405:
		        console.log('请求方法未允许')
		        break
		      case 408:
		        console.log('请求超时')
		        break
		      case 500:
		        console.log('服务器端出错')
		        break
		      case 501:
		        console.log('网络未实现')
		        break
		      case 502:
		        console.log('网络错误')
		        break
		      case 503:
		        console.log('服务不可用')
		        break
		      case 504:
		        console.log('网络超时')
		        break
		      case 505:
		        console.log('http版本不支持该请求')
		        break
		      default:
		        // console.log(`状态码${_statusCode}`)
				break
		// case 200:
		// 	break;
		// case 401:
		// 	break;
		// case 404:
		// 	break;
		// default:
		// 	break;
	}
}

