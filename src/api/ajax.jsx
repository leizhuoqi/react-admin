
import axios from 'axios';
import {message} from 'antd';

export default function ajax(url,data={},method='GET'){
    let promise = null
    if(method === 'GET'){
       promise = axios.get(url,{params:data})
    }else if(method ==='POST'){
       promise = axios.post(url,data)
    }
    return new Promise((resolve,reject)=>{
        promise
            .then(res=>{
            resolve(res.data)
        })
            .catch(err=>{
                console.log('请求失败')
                message.error('请求失败：',err)
            })
    })
}