// Service Errors
export function getErrorMessage({type, major, university}) {
    let action;
    switch (type) {
        case 'login':
            action = 'logging in';
            break;
        case 'logout':
            action = 'logging out';
            break;
        case 'addApplication':
            action = 'adding';
            break;
        case 'updateApplication':
            action = 'updating';
            break;
        case 'removeApplication':
            action = 'removing';
            break;
        case 'retrieveSession':
            action = 'retrieving your login status';
            break;
        case 'retrieveApplications':
            action = 'retrieving your saved applications';
            break;
        default:
            action = '';
    }
    return formatErrorMessage(action, major, university);
}

function formatErrorMessage(action, major, university) {
    if (!action) {
        return `Please try again.`;
    } else if (!major && !university) {
        return `Unexpected error while ${action}. Please try again.`;
    } else {
        return `Unexpected error while ${action} the application '${major}' at '${university}'. Please try again.`;
    }
}

// New Application Input Form Errors
export function getInputError(university, major, date, link) {
    if (!university || !date || !major) {
        return 'Required fields cannot be empty.';
    }
    if (!validateDate(date)) {
        return `Please verify the 'Date Applied' input to be valid and in the mm/dd/yyyy format.`;
    }
    if (link && !validateUrl(link)) {
        return 'Please enter a valid URL including http/https.';
    }
    return '';
}

function validateUrl(url) {
    const urlRegEx = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_.~#?&//=]*)/;
    return urlRegEx.test(url.toLowerCase());
}

function validateDate(date) {
    const dateRegEx = /^(0[1-9]|1[0-2])\/(0[1-9]|[12][0-9]|3[01])\/2\d{3}$/;
    return dateRegEx.test(date);
}