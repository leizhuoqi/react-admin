
import store from 'store';
const user_key =  'user'

export const setItem=value=>{
    if(value && typeof value !== 'function'){
        store.set(user_key,value)
    }else{
        console.log('保存失败，保存数据为空或者函数')
    }
}
export const getItem=()=>{
    const value = store.get(user_key)
    return value || ''
}

export const removeItem=()=>{
    store.remove(user_key)
}