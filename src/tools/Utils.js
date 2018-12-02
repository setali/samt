import cookie from 'react-cookies';
import qs from 'qs';
import {BASE_URL, COOKIE_EXPIRES} from './Constants'

export function Header(options = {}) {
    let token = Token(), headers = new Headers();

    headers.set('Accept', 'application/json');
    // headers.set('Accept', 'application/x-www-form-urlencoded');
    headers.set('Accept-Encoding', 'gzip, deflate, br');
    headers.set('Accept-Language', 'en-US,en;q=0.9,fa;q=0.8');
    headers.set('Authorization', 'Basic c2FtdC1hZG1pbjphYmNAMTIz');
    headers.set('Connection', 'keep-alive');
    headers.set('Content-Length', '13');
    headers.set('Content-Type', 'application/json;charset=UTF-8');
    headers.set('Cookie', 'cookiesession1=1D1712079EAOJHPZVZMAT4GOWLDUC0EE; msdCookie=fa2d9f338e942ab800a60a80c1af9b72060b6a3b+DzyFzVLtps3eFUwH7jfGE++f56r0wS+dsjMC3nHwU91PYskjDB1LHpBfpDfQdmY3grgUSzNTeLw2C06MRfzM4v0UVba3AELAezxVtnEF6aQzY0L63ZmyVKWGNGjUnW1NJfpEysNv/J0wXciDzP0EVDu+oouZNhtK/e/nL7VcGRfTFzSE/AcsithZB+rO9m2YRTRrTH0IRd/xbzcohMzanZwjN1rNnuCUn+VlXpnrE6hQTXo4SSff4de7+WQbtGogMnnTrblQJl312s=');
    // headers.set('Host', 'admin-app.nwms.ir');
    // headers.set('Origin', '*');
    headers.set('Access-Control-Allow-Origin', '*');
    // headers.set('Origin', 'httpss://admin-app.nwms.ir');
    // headers.set('Referer', 'https://admin-app.nwms.ir/cardex');
    // headers.set('User-Agent', 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/70.0.3538.77 Safari/537.36');



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