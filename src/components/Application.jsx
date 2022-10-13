import {useContext} from 'react';
import ApplicationListContext from '../context/ApplicationListContext';

function Application({application}) {
    const {handleRemoveApplication, handleUpdateApplicationStatus} = useContext(ApplicationListContext);
    return (
        <li key={application.id}>
            <span>{application.university}</span>
            <span>{application.date}</span>
            <span>
                {application.link ? <a href={application.link} target="_blank"
                                       rel="noreferrer">{application.major}</a> : application.major}
            </span>
            <span>
                <select name="status" id="status-select" className={application.status} value={application.status}
                        onChange={(e) => handleUpdateApplicationStatus(application.id, application.university, application.major, e.target.value)}>
                    <option value="Applied">Applied</option>
                    <option value="In-Review">In Review</option>
                    <option value="Admission">Admission</option>
                    <option value="Declined">Declined</option>
                </select>
            </span>
            <div>
                <button id="removeBtn"
                        onClick={() => handleRemoveApplication(application.id, application.major, application.university)}>X
                </button>
            </div>
            {application.note && <p className="notes">{application.note}</p>}
        </li>
    );
}

export default Application;