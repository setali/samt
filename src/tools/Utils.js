import cookie from 'react-cookies';
import qs from 'qs';
import {BASE_URL, COOKIE_EXPIRES} from './Constants'

export function Header(options = {}) {
    let token = Token(), headers = new Headers();

    headers.set('Accept', 'application/json, text/plain, */*');
    headers.set('Content-Type', 'application/json;charset=UTF-8');
    headers.set('Origin', 'https://app.nwms.ir');

    token && headers.set('Cookie', token);
    options.headers && Object.entries(options.headers).forEach(([k, v]) => headers.set(k, v));

    options.headers = headers;

    return options;
}

export function Url(url, data = undefined) {
    return BASE_URL + url + (data ? `?${qs.stringify(data)}` : ``);
}

export function setToken(token) {
    const expires = new Date();
    expires.setDate(expires.getDate() + COOKIE_EXPIRES);
    cookie.save('token', token, {path: '/', expires});
}

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