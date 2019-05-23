import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
// import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import * as serviceWorker from './serviceWorker';
import axios from 'axios'
 axios.defaults.headers.post['Content-Type']='application/json';
// axios.defaults.baseURL='http://jsonplaceholder.typicode222.com';
axios.interceptors.request.use(request=>{
    console.log(request);
    return request
},error=>{
    console.log(error)
    return Promise.reject(error)
})

axios.interceptors.response.use(response=>{
    console.log(response);
    return response
},error=>{
    console.log(error)
    return Promise.reject(error)
})

ReactDOM.render(<App />, document.getElementById('root'));

serviceWorker.unregister();
