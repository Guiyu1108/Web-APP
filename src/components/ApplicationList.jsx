import {useState, useEffect} from 'react';
import Application from './Application';

function ApplicationList({applications}) {
    const [filter, setFilter] = useState('All');
    const [applicationApplications, setApplicationApplications] = useState([]);

    useEffect(() => {
            const newApplicationApplication = [];
            for (let currApplicationKey in applications) {
                const currApplication = applications[currApplicationKey];
                if (filter === 'All' || currApplication.status === filter) {
                    newApplicationApplication.push(<Application key={currApplication.id} application={currApplication}/>);
                }
            }
            setApplicationApplications(newApplicationApplication);
        }, [filter, applications]
    );

    return (
        <div className="applicationList verticalLineLeft">
            <h2>Admission Applications</h2>

            <div className="bottomLine tabs">
                <button className={filter === "All" ? "All" : "inactive"}
                        onClick={(e) => setFilter(e.target.value)} value="All">All
                </button>
                <button className={filter === "Applied" ? "Applied" : "inactive"}
                        onClick={(e) => setFilter(e.target.value)} value="Applied">Applied
                </button>
                <button className={filter === "In-Review" ? "In-Review" : "inactive"}
                        onClick={(e) => setFilter(e.target.value)} value="In-Review">In Review
                </button>
                <button className={filter === "Admission" ? "Admission" : "inactive"}
                        onClick={(e) => setFilter(e.target.value)} value="Admission">Admission
                </button>
                <button className={filter === "Declined" ? "Declined" : "inactive"}
                        onClick={(e) => setFilter(e.target.value)} value="Declined">Declined
                </button>
            </div>

            <div>
                <span>University</span>
                <span>Date Applied</span>
                <span>Department / Major</span>
                <span>Status</span>
            </div>
            {Object.keys(applicationApplications).length === 0 ?
                <p className="centerText">No application applications.</p> : <p></p>}
            <ul>{applicationApplications}</ul>
        </div>
    );
}

export default ApplicationList;