import axios, { AxiosRequestConfig, AxiosResponse, AxiosError } from 'axios';
import { ElMessage, ElNotification } from 'element-plus';
import { da } from 'element-plus/es/locale';
// 定义响应数据的接口
axios.defaults.withCredentials = true;
interface ResponseData {
    code: number;
    message: string;
    [key: string]: any;
}
const service = axios.create({
    baseURL: 'http://localhost:9000',
    timeout: 20000,
});

service.interceptors.request.use(
    (config: AxiosRequestConfig | any) => {
        config.headers['Access-Control-Allow-Origin'] = 'http://localhost:9001';
        config.headers['Access-Control-Allow-Credentials'] = 'true';
        return config;
    },
    (error: AxiosError) => {
        return Promise.reject(new Error(error.message));
    }
);

service.interceptors.response.use(
    (response: any) => {
      const data = response.data;
        if (Object.prototype.hasOwnProperty.call(data, 'isOk')) {
            if (data.isOk === true) {
                return data;
            } else if (data.isOk === false) {
                ElMessage.warning({
                    message: data.msg
                });
                return false;
            }
        } else {
            ElNotification.error({
                title: '错误',
                message: '出现错误，请联系管理员'
            });
            return false;
        } 
    },
    
    (error: AxiosError) => {
        if (error.response) {
            ElNotification.error({
                title: '错误',
                message: '出现错误，请联系管理员'
            });
        }
        return false;
    }
);

export default service;
