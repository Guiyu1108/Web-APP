import {useEffect, useReducer} from 'react';
import {
    fetchSession,
    fetchLogin,
    fetchLogout,
    fetchApplications,
    fetchDeleteApplication,
    fetchAddApplication,
    fetchUpdateApplication
} from './services';
import {reducer, initialState} from './reducers/app-reducer';
import {getErrorMessage} from './errors';
import ApplicationListContext from './context/ApplicationListContext';
import Login from './components/Login';
import ManagementPage from './components/ManagementPage';
import './App.css';

function App() {
    const [state, dispatch] = useReducer(reducer, initialState);

    function handleLogin(username) {
        fetchLogin(username)
            .then(applications => {
                dispatch({type: 'login', username, applications});
            })
            .catch(err => {
                console.log(err.error);
                if (err.error === 'auth-insufficient') {
                    dispatch({type: 'showError', error: `Username cannot be 'null'.`});
                }
                if (err.error === 'auth-invalidname') {
                    dispatch({type: 'showError', error: `Username cannot be 'dog'.`});
                } else {
                    dispatch({type: 'showError', error: getErrorMessage({type: 'login'})});
                }
            });
    }

    function handleLogout() {
        fetchLogout()
            .then(() => {
                dispatch({type: 'logout'});
            })
            .catch(err => {
                console.log(err.error);
                dispatch({type: 'showError', error: getErrorMessage({type: 'logout'})});
            });
    }

    function handleNewApplication(university, major, date, link, note) {
        fetchAddApplication({university, major, date, link, note})
            .then(result => {
                dispatch({type: 'addApplication', newApplication: result});
            })
            .catch(err => {
                console.log(err.error);
                dispatch({type: 'showError', error: getErrorMessage({type: 'addApplication', major, university})});
            });
    }

    function handleRemoveApplication(id, major, university) {
        fetchDeleteApplication(id)
            .then(() => {
                dispatch({type: 'removeApplication', id});
            })
            .catch(err => {
                console.log(err.error);
                dispatch({type: 'showError', error: getErrorMessage({type: 'removeApplication', major, university})});
            });
    };

    function handleUpdateApplicationStatus(id, university, major, status) {
        const applicationToUpdate = state.applications[id];
        applicationToUpdate.status = status;
        fetchUpdateApplication(id, applicationToUpdate)
            .then(() => {
                dispatch({type: 'updateApplicationStatus', id, status});
            })
            .catch(err => {
                console.log(err.error);
                dispatch({type: 'showError', error: getErrorMessage({type: 'updateApplication', major, university})});
            });
    };

    useEffect(() => {
        fetchSession()
            .then(session => {
                fetchApplications()
                    .then(applications => {
                        dispatch({type: 'login', username: session.username, applications})
                    })
                    .catch(err => {
                        console.log(err.error);
                        dispatch({type: 'showError', error: getErrorMessage({type: 'retrieveApplications'})});
                    });
            })
            .catch(err => {
                console.log(err.error);
                if (err.error !== 'auth-missing') {
                    dispatch({type: 'showError', error: getErrorMessage({type: 'retrieveSession'})});
                }
            });
    }, []);

    return (
        <div className="App">
            {state.username && !state.isLoaded && <span>Retrieving...</span>}
            <ApplicationListContext.Provider value={{
                handleLogin,
                handleLogout,
                handleNewApplication,
                handleRemoveApplication,
                handleUpdateApplicationStatus
            }}>
                {state.username && state.isLoaded &&
                    <ManagementPage username={state.username} applications={state.applications} error={state.error}/>
                }
                {!state.username && <Login error={state.error}/>}
            </ApplicationListContext.Provider>
        </div>
    );
}

export default App;
