import {CARDEX_PATH } from '../../tools/Constants'
import {Url, Header} from '../../tools/Utils';
import {error} from '../../tools/Message';

export function cardexIsLoading(bool) {
    return {
        type: 'CARDEX_IS_LOADING',
        isLoading: bool
    };
}

export function setCardex(cardex) {
    return {
        type: 'CARDEX',
        cardex
    };
}

export function getCardex(query = undefined) {
    return (dispatch) => {
        dispatch(cardexIsLoading(true));

        fetch(Url(CARDEX_PATH, query), Header({method: 'POST'}))
            .then((response) => {
                if (!response.ok) {
                    throw Error(response.statusText);
                }

                dispatch(cardexIsLoading(false));

                return response;
            })
            .then((response) => response.json())
            .then((data) => {
                dispatch(setCardex(data));
            })
            .catch(() => error());
    };
}