import {message} from 'antd';
import {ERROR_MESSAGE, SUCCESS_MESSAGE, CONFLICT_MESSAGE} from './Constants';

export function error(content = ERROR_MESSAGE) {
    message.error(content)
}

export function success(content = SUCCESS_MESSAGE) {
    message.success(content)
}

export function conflict(content = CONFLICT_MESSAGE) {
    message.error(content)
}

export function warning(content) {
    message.warning(content)
}

export function info(content) {
    message.info(content)
}