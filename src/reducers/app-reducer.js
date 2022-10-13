export const initialState = {
    username: '',
    applications: {},
    isLoaded: false,
    error: ''
}

export function reducer(state, action) {
    switch (action.type) {
        case 'login':
            return {
                ...state,
                error: '',
                isLoaded: true,
                username: action.username,
                applications: action.applications,
            };
        case 'logout':
            return {
                ...state,
                error: '',
                isLoaded: false,
                username: '',
                applications: {}
            };
        case 'addApplication':
            return {
                ...state,
                error: '',
                applications: {
                    ...state.applications,
                    [action.newApplication.id]: {
                        ...action.newApplication,
                    }
                }
            };
        case 'removeApplication':
            const newApplications = {...state.applications};
            delete newApplications[action.id];
            return {
                ...state,
                error: '',
                applications: {
                    ...newApplications
                }
            };
        case 'updateApplicationStatus':
            return {
                ...state,
                error: '',
                applications: {
                    ...state.applications,
                    [action.id]: {
                        ...state.applications[action.id],
                        status: action.status,
                    }
                }
            };
        case 'showError':
            return {
                ...state,
                error: action.error
            };
        default:
            return state;
    }
}