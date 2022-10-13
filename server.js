const express = require('express');
const cookieParser = require('cookie-parser');
const app = express();
const PORT = 4000;

const applications = require('./src/models/applications');
const sessions = require('./src/models//sessions');
const users = require('./src/models//users');

app.use(cookieParser());
app.use(express.static('./build'));
app.use(express.json());

function getSidAndUsername(request) {
    const sid = request.cookies.sid;
    const username = sid ? sessions.getSessionUser(sid) : '';
    return {sid, username};
}

// Sessions
app.get('/api/session', (req, res) => {
    const {sid, username} = getSidAndUsername(req);
    if (!sid || !username) {
        res.status(401).json({error: 'auth-missing'});
        return;
    }
    res.json({username});
});

app.post('/api/session', (req, res) => {
    const {username} = req.body;
    if (!username) {
        res.status(400).json({error: 'required-username'});
        return;
    }
    if (username === 'null') {
        res.status(403).json({error: 'auth-insufficient'});
        return;
    }

    if (username === 'dog') {
        res.status(400).json({error: 'auth-invalidname'});
        return;
    }
    const sid = sessions.addSession(username);
    const existingUserData = users.getUserData(username);
    if (!existingUserData) {
        users.addUserData(username, applications.makeApplicationList());
    }
    res.cookie('sid', sid);
    res.json(users.getUserData(username).getApplications());
});

app.delete('/api/session', (req, res) => {
    const {sid, username} = getSidAndUsername(req);
    if (sid) {
        res.clearCookie('sid');
    }
    if (username) {
        sessions.deleteSession(sid);
    }
    res.json({username});
});

// Applications
app.get('/api/applications', (req, res) => {
    const {sid, username} = getSidAndUsername(req);
    if (!sid || !username) {
        res.status(401).json({error: 'auth-missing'});
        return;
    }
    res.json(users.getUserData(username).getApplications());
});

app.post('/api/applications', (req, res) => {
    const {sid, username} = getSidAndUsername(req);
    if (!sid || !username) {
        res.status(401).json({error: 'auth-missing'});
        return;
    }
    const {university, date, major, link, note} = req.body;
    if (!university || !date || !major) {
        res.status(400).json({error: 'required-inputs'});
        return;
    }
    const applicationList = users.getUserData(username);
    const id = applicationList.addApplication({university, date, major, link, note});
    res.json(applicationList.getApplication(id));
});

app.patch('/api/applications/:id', (req, res) => {
    const {sid, username} = getSidAndUsername(req);
    if (!sid || !username) {
        res.status(401).json({error: 'auth-missing'});
        return;
    }
    const {id} = req.params;
    const {university, date, major, status, link, note} = req.body;
    const applicationList = users.getUserData(username);
    if (!applicationList.contains(id)) {
        res.status(404).json({error: `noSuchId`, message: `No application with id ${id}`});
        return;
    }
    applicationList.updateApplication(id, {university, date, major, status, link, note});
    res.json(applicationList.getApplication(id));
});

app.delete('/api/applications/:id', (req, res) => {
    const {sid, username} = getSidAndUsername(req);
    if (!sid || !username) {
        res.status(401).json({error: 'auth-missing'});
        return;
    }
    const {id} = req.params;
    const applicationList = users.getUserData(username);
    const exists = applicationList.contains(id);
    if (exists) {
        applicationList.deleteApplication(id);
    }
    res.json({message: exists ? `application ${id} deleted` : `application ${id} did not exist`});
});

app.listen(PORT, () => console.log(`http://localhost:${PORT}`));