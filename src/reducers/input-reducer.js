export const initialState = {
    newUniversity: '',
    newMajor: '',
    newDate: '',
    newLink: '',
    newNote: '',
    inputError: '',
}

export function reducer(state, action) {
    switch (action.type) {
        case 'clearInputFields':
            return {
                newUniversity: '',
                newMajor: '',
                newDate: '',
                newLink: '',
                newNote: '',
                inputError: '',
            };
        case 'setNewUniversity':
            return {
                ...state,
                newUniversity: action.input
            };
        case 'setNewMajor':
            return {
                ...state,
                newMajor: action.input
            };
        case 'setNewDate':
            return {
                ...state,
                newDate: action.input
            };
        case 'setNewLink':
            return {
                ...state,
                newLink: action.input
            };
        case 'setNewNote':
            return {
                ...state,
                newNote: action.input
            };
        case 'setInputError':
            return {
                ...state,
                inputError: action.inputError
            };
        default:
            return state;
    }
}