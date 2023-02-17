import axios from 'axios';
import axiosCookieJarSupport from 'axios-cookiejar-support';
import {CookieJar} from 'tough-cookie';


async function login(baseURL, credentials) {
    const jar = new CookieJar();
    const http = axios.create({baseURL, withCredentials: true, jar});
    axiosCookieJarSupport.wrapper(http);
    if(await loginPOST(http,credentials) !== 'AuthSuccess') {
        throw new Error('Invalid credentials');
    }
    const cookies = jar.getCookiesSync(baseURL);
    const token = cookies.find((x) => x.key === 'XSRF-TOKEN');
    if (token) {
        http.defaults.headers['X-XSRF-TOKEN'] = token.value;
    }
    return http;
}

async function loginPOST(http, credentials){
    return (await http.post("/api/login", credentials)).data;
}



export {login};