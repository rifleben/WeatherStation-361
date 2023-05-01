/*
    Weather alerts server
    ---------------------
    Start with  'npm run alerts'
    See alerts.http for example requests 
*/

const express = require('express');
const cors = require('cors');
const fetchAllAlerts = require('./fetchAlerts.js')

const app = express();
const ALERT_PORT = 3450;
app.use(cors());

// fetch all alerts for state
app.get('/alerts/:state', async (req, res) => {

    try {
        const alertData = await fetchAllAlerts(req.params.state);
        
        // if fetch successful, send alerts
        if (typeof alertData === 'object') {
            res.status(200).send(alertData);
        } 
        
        // if unsuccessful, send error message with status code
        else {
            res.status(parseInt(`${alertData}`)).send(`Unable to fetch alerts (${alertData})`);
        }

    } catch(err) {
        console.log(`${err}\n`);
    }
});

app.listen(ALERT_PORT, () => {
    console.log(`\nAlerts server is running on port ${ALERT_PORT}\n`);
});