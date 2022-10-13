export function fetchSession() {
    return fetch('/api/session', {
        method: 'GET',
    })
        .catch(() => Promise.reject({error: 'networkError'}))
        .then(response => {
            if (response.ok) {
                return response.json();
            }
            return response.json()
                .catch(error => Promise.reject({error}))
                .then(err => Promise.reject(err));
        });
}

export function fetchLogin(username) {
    return fetch('/api/session', {
        method: 'POST',
        headers: new Headers({
            'content-type': 'application/json'
        }),
        body: JSON.stringify({username}),
    })
        .catch(() => Promise.reject({error: 'networkError'}))
        .then(response => {
            if (response.ok) {
                return response.json();
            }
            return response.json()
                .catch(error => Promise.reject({error}))
                .then(err => Promise.reject(err));
        });
}

export function fetchLogout() {
    return fetch('/api/session', {
        method: 'DELETE',
    })
        .catch(() => Promise.reject({error: 'networkError'}))
        .then(response => {
            if (response.ok) {
                return response.json();
            }
            return response.json()
                .catch(error => Promise.reject({error}))
                .then(err => Promise.reject(err));
        });
}

export function fetchApplications() {
    return fetch('/api/applications')
        .catch(() => Promise.reject({error: 'networkError'}))
        .then(response => {
            if (response.ok) {
                return response.json();
            }
            return response.json()
                .catch(error => Promise.reject({error}))
                .then(err => Promise.reject(err));
        });
}

export function fetchAddApplication(newApplication) {
    return fetch('/api/applications', {
        method: 'POST',
        headers: new Headers({
            'content-type': 'application/json',
        }),
        body: JSON.stringify(newApplication),
    })
        .catch(() => Promise.reject({error: 'networkError'}))
        .then(response => {
            if (response.ok) {
                return response.json();
            }
            return response.json()
                .catch(error => Promise.reject({error}))
                .then(err => Promise.reject(err));
        });
}

export function fetchDeleteApplication(id) {
    return fetch(`/api/applications/${id}`, {
        method: 'DELETE',
    })
        .catch(() => Promise.reject({error: 'networkError'}))
        .then(response => {
            if (response.ok) {
                return response.json();
            }
            return response.json()
                .catch(error => Promise.reject({error}))
                .then(err => Promise.reject(err));
        });
}

export function fetchUpdateApplication(id, applicationToUpdate) {
    return fetch(`/api/applications/${id}`, {
        method: 'PATCH',
        headers: new Headers({
            'content-type': 'application/json',
        }),
        body: JSON.stringify(applicationToUpdate),
    })
        .catch(() => Promise.reject({error: 'networkError'}))
        .then(response => {
            if (response.ok) {
                return response.json();
            }
            return response.json()
                .catch(error => Promise.reject({error}))
                .then(err => Promise.reject(err));
        });
}