/**
 * Created by leige on 2019/2/26.
 */
import React from 'react';
import ReactDOM from 'react-dom';
import MemoryUtils from './utils/memoryUtils'
import {getItem} from './utils/storageUtils'
import App from './App';
const user = getItem();
if(user && user._id){
    MemoryUtils.user = user
}
ReactDOM.render(<App/>, document.getElementById('root'));