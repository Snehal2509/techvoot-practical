import {reactLocalStorage} from 'reactjs-localstorage';

const config = {
    baseURL: 'http://localhost/laravel/techvoot-backend/public/api/',

    saveTokenData(data,done) {        
        reactLocalStorage.set('userData', JSON.stringify(data));
        reactLocalStorage.set('is_admin', data.is_admin);
        done({})
    }
};

export default config;