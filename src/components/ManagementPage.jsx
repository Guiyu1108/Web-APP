import {useReducer, useContext} from 'react';
import {reducer, initialState} from '../reducers/input-reducer';
import {getInputError} from '../errors';
import ApplicationList from './ApplicationList';
import ApplicationListContext from '../context/ApplicationListContext';

function ManagementPage({username, applications, error}) {
    const {handleLogout, handleNewApplication} = useContext(ApplicationListContext);
    const [state, dispatch] = useReducer(reducer, initialState);

    function onSubmitLogout(e) {
        e.preventDefault();
        handleLogout();
    }

    function onSubmitApplication(e) {
        e.preventDefault();
        const trimmedNewUniversity = state.newUniversity.trim();
        const trimmedNewMajor = state.newMajor.trim();
        const trimmedNewDate = state.newDate.trim();
        const trimmedNewLink = state.newLink.trim();
        const trimmedNewNote = state.newNote.trim();

        const inputError = getInputError(trimmedNewUniversity, trimmedNewMajor, trimmedNewDate, trimmedNewLink);
        if (inputError) {
            dispatch({type: 'setInputError', inputError});
        } else {
            handleNewApplication(trimmedNewUniversity, trimmedNewMajor, trimmedNewDate, trimmedNewLink, trimmedNewNote);
            dispatch({type: 'clearInputFields'});
        }
    }

    return (
        <div className="mainPage">
            <h1>Application Management System</h1>
            <div className="headerPanel">
                {error && <span className="errorMsg">{error}</span>}
                <span>Hello, <strong>{username}</strong></span>
                <button id="logoutBtn" onClick={onSubmitLogout}> Logout</button>
            </div>
            <br/>

            <div className="mainPanel">
                <ApplicationList applications={applications}/>
                <form className="newApplicationPanel" onSubmit={onSubmitApplication}>
                    <label>University <span className="red">*</span><br/>
                        <input value={state.newUniversity}
                               onChange={(e) => dispatch({type: 'setNewUniversity', input: e.target.value})}/>
                    </label><br/>
                    <label>Department / Major <span className="red">*</span><br/>
                        <input value={state.newMajor}
                               onChange={(e) => dispatch({type: 'setNewMajor', input: e.target.value})}/>
                    </label><br/>
                    <label>Date Applied <span className="red">*</span><br/>
                        <input value={state.newDate}
                               onChange={(e) => dispatch({type: 'setNewDate', input: e.target.value})}
                               placeholder="mm/dd/yyyy"/>
                    </label><br/>
                    <label>Application Link<br/>
                        <input value={state.newLink}
                               onChange={(e) => dispatch({type: 'setNewLink', input: e.target.value})}/>
                    </label><br/>
                    <label>Additional Information<br/>
                        <textarea rows="3" cols="23" value={state.newNote}
                                  onChange={(e) => dispatch({type: 'setNewNote', input: e.target.value})}/>
                    </label><br/>
                    <input type="submit" id="submitBtn" value="Add"/>
                    {state.inputError && <p className="errorMsg">{state.inputError}</p>}
                </form>
            </div>
        </div>
    );
}

export default ManagementPage;