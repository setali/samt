import _ from 'lodash';
import {PERSON_PATH } from '../../tools/Constants'
import {Url, Header} from '../../tools/Utils';
import {success, error} from '../../tools/Message';

export function personIsLoading(bool) {
    return {
        type: 'PERSON_IS_LOADING',
        isLoading: bool
    };
}

export function setPerson(person) {
    return {
        type: 'PERSON',
        person
    };
}

export function personsIsLoading(bool) {
    return {
        type: 'PERSONS_IS_LOADING',
        isLoading: bool
    };
}

export function setPersons(persons) {
    return {
        type: 'PERSONS',
        persons
    };
}

export function createPersonIsLoading(bool) {
    return {
        type: 'CREATE_PERSON_IS_LOADING',
        createIsLoading: bool
    };
}

export function createPersonSuccess(bool) {
    return {
        type: 'CREATE_PERSON_SUCCESS',
        createSuccess: bool
    };
}

export function deletePersonIdsLoading(ids) {
    return {
        type: 'DELETE_PERSON_IDS_LOADING',
        deleteIdsLoading: ids
    };
}

export function getPerson(person_id) {
    return (dispatch) => {
        dispatch(personIsLoading(true));

        fetch(Url(PERSON_PATH + '/' + person_id), Header())
            .then((response) => {
                if (!response.ok) {
                    throw Error(response.statusText);
                }

                dispatch(personIsLoading(false));

                return response;
            })
            .then((response) => response.json())
            .then((data) => {
                dispatch(setPerson(data));
            })
            .catch(() => error());
    };
}

export function getPersons(query = undefined) {
    return (dispatch) => {
        dispatch(personsIsLoading(true));

        fetch(Url(PERSON_PATH, query), Header())
            .then((response) => {
                if (!response.ok) {
                    throw Error(response.statusText);
                }

                dispatch(personsIsLoading(false));

                return response;
            })
            .then((response) => response.json())
            .then((data) => {
                dispatch(setPersons(data));
            })
            .catch(() => error());
    };
}

export function deletePersons(ids) {
    return (dispatch, getState) => {
        let loadings = [...ids, ...getState().deletePersonIdsLoading];
        dispatch(deletePersonIdsLoading(loadings));

        fetch(Url(PERSON_PATH), Header({
            method: 'DELETE',
            body: JSON.stringify({ids: ids}),
        }))
            .then((response) => {
                if (!response.ok) {
                    throw Error(response.statusText);
                }

                return response;
            })
            .then((response) => response.json())
            .then((data) => {
                let all = {...getState().persons};
                ids.forEach(id => {_.remove(all.docs, (el) => {return id === el._id})});

                loadings = [...getState().deletePersonIdsLoading];
                ids.forEach(id => {_.remove(loadings, (el) => {return id === el})});

                success();
                dispatch(deletePersonIdsLoading(loadings));

                all.docs.length ? dispatch(setPersons(all)) : dispatch(getPersons());
            })
            .catch(() => error());
    };
}

export function createPerson(data, method = 'POST') {
    return (dispatch) => {
        dispatch(createPersonIsLoading(true));

        fetch(Url(PERSON_PATH), Header({
            method: method,
            body: JSON.stringify(data),
        }))
            .then((response) => {
                if (!response.ok) {
                    throw Error(response.statusText);
                }

                dispatch(createPersonIsLoading(false));

                return response;
            })
            .then((response) => response.json())
            .then((person) => {
                dispatch(createPersonSuccess(true));
                dispatch(createPersonSuccess(false));
                dispatch(setPerson(person));
            })
            .catch((response) => error());
    };
}