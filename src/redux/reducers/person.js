export function personIsLoading(state = false, action) {
    switch (action.type) {
        case 'PERSON_IS_LOADING':
            return action.isLoading;

        default:
            return state;
    }
}

export function person(state = [], action) {
    switch (action.type) {
        case 'PERSON':
            return action.person;

        default:
            return state;
    }
}

export function personsIsLoading(state = false, action) {
    switch (action.type) {
        case 'PERSONS_IS_LOADING':
            return action.isLoading;

        default:
            return state;
    }
}

export function persons(state = [], action) {
    switch (action.type) {
        case 'PERSONS':
            return action.persons;

        default:
            return state;
    }
}

export function createPersonIsLoading(state = false, action) {
    switch (action.type) {
        case 'CREATE_PERSON_IS_LOADING':
            return action.createIsLoading;

        default:
            return state;
    }
}

export function createPersonSuccess(state = false, action) {
    switch (action.type) {
        case 'CREATE_PERSON_SUCCESS':
            return action.createSuccess;

        default:
            return state;
    }
}

export function deletePersonIdsLoading(state = [], action) {
    switch (action.type) {
        case 'DELETE_PERSON_IDS_LOADING':
            return action.deleteIdsLoading;

        default:
            return state;
    }
}