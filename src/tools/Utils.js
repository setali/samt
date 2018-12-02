import cookie from 'react-cookies';
import qs from 'qs';
import {BASE_URL, COOKIE_EXPIRES} from './Constants'

export function Header(options = {}) {
    let token = Token(), headers = new Headers();

    // headers.set('Accept', 'application/json');
    headers.set('Accept', 'application/x-www-form-urlencoded');
    headers.set('Accept-Encoding', 'gzip, deflate, br');
    headers.set('Accept-Language', 'en-US,en;q=0.9,fa;q=0.8');
    headers.set('Authorization', 'Basic c2FtdC1hZG1pbjphYmNAMTIz');
    headers.set('Connection', 'keep-alive');
    headers.set('Content-Length', '13');
    headers.set('Content-Type', 'application/json;charset=UTF-8');
    headers.set('Cookie', 'cookiesession1=1D1712079EAOJHPZVZMAT4GOWLDUC0EE; msdCookie=592daa39f5e3aa64259bf00323160d13b3a180324aqZH5Sxoh2IpfrjPLQ/eJS79ZUkeXZxA6WuJ7EOg1lGKduNvxvUnxQSaCDiNoJOL/x7aSXXL43JdYv2wa7fxXt7dPXYOe6sMf1wmWgVrPMFixzfY18UBSSic+fPPq/bsHTYdl4U4e7eTYlJC2GuDmbLndWbP/S5WQHA+MPNj0PX61MfL/IWOCXgix2QfK2RfCLKefgO/shmQqC1x9vy7EPJ1dOnpELTxjFxXjDYLTWqnKHq5991w+s+Ys9utcWEotzovGOoIKuJEEY=');
    headers.set('Host', 'admin-app.nwms.ir');
    headers.set('Origin', '*');
    headers.set('Access-Control-Allow-Origin', '*');
    // headers.set('Origin', 'https://admin-app.nwms.ir');
    headers.set('Referer', 'https://admin-app.nwms.ir/cardex');
    headers.set('User-Agent', 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/70.0.3538.77 Safari/537.36');



    // token && headers.set('Cookie', token);
    options.headers && Object.entries(options.headers).forEach(([k, v]) => headers.set(k, v));

    options.headers = headers;

    return options;
}

export function Url(url, data = undefined) {
    return BASE_URL + url + (data ? `?${qs.stringify(data)}` : ``);
}

// export function setToken(token) {
//     const expires = new Date();
//     expires.setDate(expires.getDate() + COOKIE_EXPIRES);
//     cookie.save('token', token, {path: '/', expires});
// }

export function Token() {
    let token = cookie.load('Cookie');
    if (token === 'undefined') {
        return undefined;
    }

    return token;
}

export function removeToken() {
    cookie.remove('token', {path: '/'});
}

export function getTokenObject() {
    let token = Token();
    if (token !== undefined) {
        return {Authorization: token}
    }
}

export function formatNumber(value) {
    let f = value.match(/\d+/);
    if (f) return f[0];
    return '';
}