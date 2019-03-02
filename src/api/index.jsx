import ajax from './ajax'
import jsonp from 'jsonp'
let prefix = process.env.NODE_ENV === 'development' ? '' : 'http://loaclhost:5000';

export const reqLogin = (username,password)=>ajax(prefix + '/login',{username,password},'POST')

export const reqWeather =(city)=>{
    return new Promise((resolve,reject)=>{
        jsonp(
            `http://api.map.baidu.com/telematics/v3/weather?location=${city}&output=json&ak=3p49MVra6urFRGOT9s8UBWr2`,
            {},
            (err,data)=>{
                if(!err){
                    console.log(data)
                    resolve(data.results[0].weather_data[0])
                }else{
                    reject('请求天气错误')
                }
            }
        )
    })
}
export const reqCategory = parentId =>ajax(prefix+'/manage/category/list',{parentId},'GET')
export const reqAddCategory = (parentId,categoryName) =>ajax(prefix+'manage/category/add',{parentId,categoryName},'POST')
export const reqUpdateCategory = (parentId,categoryName)=>ajax(prefix+'/manage/category/update',{parentId,categoryName},'POST')
