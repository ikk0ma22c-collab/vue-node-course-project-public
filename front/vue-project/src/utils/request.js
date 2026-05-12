import router from '@/router'
import axios from 'axios'
import { ElMessage } from 'element-plus'

const host = import.meta.env.PROD ? 'http://47.114.78.151:3000/api/v1' : 'http://localhost:3000/api/v1'

const service = axios.create({
  baseURL: host,
  timeout: 5000,
})

const authFailMessages = ['token过期', 'token无效']

const redirectToLogin = () => {
  localStorage.removeItem('token')

  if (router.currentRoute.value.path !== '/login') {
    router.replace('/login')
  }
}

// 请求拦截
service.interceptors.request.use(
  (config) => {
    const url = config.url || ''

    if (!url.includes('register') && !url.includes('login')) {
      config.headers.Authorization = localStorage.getItem('token')
    }

    return config
  },
  (error) => {
    return Promise.reject(error)
  },
)

// 响应拦截
service.interceptors.response.use(
  (response) => {
    const { code, data, message } = response.data

    if (code === 0) {
      return data
    }

    ElMessage.error(message || '请求失败')

    if (authFailMessages.includes(message)) {
      redirectToLogin()
    }

    return Promise.reject(response.data)
  },
  (error) => {
    ElMessage.error('网络异常，请稍后重试')
    return Promise.reject(error)
  },
)

// 封装请求函数
const request = (options) => {
  if (options.method === 'get') {
    options.params = options.data
  }

  return service(options)
}

export default request
