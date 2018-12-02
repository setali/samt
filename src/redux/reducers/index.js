import {combineReducers} from 'redux';
import {person, personIsLoading, persons, personsIsLoading, createPersonIsLoading, createPersonSuccess, deletePersonIdsLoading} from './person';
import {cardex, cardexIsLoading} from './cardex';

export default combineReducers({
    person,
    personIsLoading,
    persons,
    personsIsLoading,
    createPersonIsLoading,
    createPersonSuccess,
    deletePersonIdsLoading,
    cardex,
    cardexIsLoading,
});
