/*
    Weather alerts server
    ---------------------
    Start with  'npm run alerts'
    See alerts.http for example requests 
*/

const express = require('express');
const cors = require('cors');
const fetchAllAlerts = require('./fetchAlerts.js');
const filterCity = require('./filterCity.js');

const app = express();
const ALERT_PORT = 3450;
app.use(cors());

// fetch alerts for state
app.get('/alerts/state/:state', async (req, res) => {

    try {
        const alertData = await fetchAllAlerts(req.params.state);
        
        // if fetch successful, send alerts
        if (typeof alertData === 'object') {
            console.log(`Alerts received for ${req.params.state}. Sending...`);
            res.status(200).send(alertData);
            console.log('Alerts sent!')
        } 
        
        // if unsuccessful, send error message with status code
        else {
            console.log(`Unable to fetch alerts (${alertData})`);
            res.status(parseInt(`${alertData}`)).send(`Unable to fetch alerts (${alertData})`);
        }

    } catch(err) {
        console.log(`GET error: ${err}\n`);
    }
});

// fetch alerts for city
app.get('/alerts/city/:city-:state', async (req, res) => {

    try {
        const alertData = await fetchAllAlerts(req.params.state);
        const cityAlerts = await filterCity(alertData, req.params.city);
        
        // if fetch successful, send alerts
        if (typeof cityAlerts === 'object') {
            console.log(`Alerts received for ${req.params.city}, ${req.params.state}. Sending...`);
            res.status(200).send(cityAlerts);
            console.log(cityAlerts)
            console.log('Alerts sent!')
        } 
        
        // if unsuccessful, send error message with status code
        else {
            console.log(`Unable to fetch alerts (${alertData})`);
            res.status(parseInt(`${alertData}`)).send(`Unable to fetch alerts (${alertData})`);
        }

    } catch(err) {
        console.log(`GET error: ${err}\n`);
    }
});

app.listen(ALERT_PORT, () => {
    console.log(`\nAlerts server is running on port ${ALERT_PORT}\n`);
});