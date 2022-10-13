const uuid = require('uuid').v4;

function makeApplicationList() {
    const applicationList = {};
    // status options: Applied, In-Review, Declined, Admission
    const applications = {
        ['sampleId']: {
            id: 'sampleId',
            university: 'Northeastern University',
            date: '05/01/2022',
            major: 'Information System',
            status: 'Applied',
            link: 'https://www.northeastern.edu/graduate/program/master-of-science-in-information-systems-boston-5278/',
            note: 'Seattle Campus',
        }
    };

    applicationList.contains = function contains(id) {
        return !!applications[id];
    };

    applicationList.getApplications = function getApplications() {
        return applications;
    };

    applicationList.addApplication = function addApplication(newApplication) {
        const id = uuid();
        applications[id] = {
            id,
            university: newApplication.university,
            date: newApplication.date,
            major: newApplication.major,
            status: 'Applied',
            link: newApplication.link,
            note: newApplication.note
        };
        return id;
    };

    applicationList.getApplication = function getApplication(id) {
        return applications[id];
    };

    applicationList.updateApplication = function updateApplication(id, application) {
        applications[id].university = application.university || applications[id].university;
        applications[id].date = application.date || applications[id].date;
        applications[id].major = application.major || applications[id].major;
        applications[id].status = application.status || application.status;
        applications[id].link = application.link || applications[id].link;
        applications[id].note = application.note || applications[id].note;
    };

    applicationList.deleteApplication = function deleteApplication(id) {
        delete applications[id];
    };

    return applicationList;
};

module.exports = {
    makeApplicationList,
};