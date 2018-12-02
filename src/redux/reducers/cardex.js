export function cardexIsLoading(state = false, action) {
    switch (action.type) {
        case 'CARDEX_IS_LOADING':
            return action.isLoading;

        default:
            return state;
    }
}

export function cardex(state = [], action) {
    switch (action.type) {
        case 'CARDEX':
            return action.cardex;

        default:
            return state;
    }
}