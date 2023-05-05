// fetch all weather alerts for state from NWS
const fetchAllAlerts = async (state) => {

    const url = `https://api.weather.gov/alerts/active?area=${state}`;
    let stateAlerts = [];

    // fetch alerts
    let response;
    try {
        response = await fetch(url, {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        });
    } catch (err) {
        console.log(`Fetch error: ${err}\n`)
        return;
    }
    if (response.status !== 200) {
        console.log(`(fetchAllAlerts) Fetch status ${response.status} for URL:`)
        console.log(`${url}\n`)
        return response.status
    }

    // push areas, headline, description object to stateAlerts
    const alertsObject = await response.json();
    for await (const feature of alertsObject.features) {
        let alert = {}
        alert['areas'] = feature.properties.areaDesc;
        alert['headline'] = feature.properties.headline;
        alert['description'] = feature.properties.description;
        stateAlerts.push(alert);
    }

    return stateAlerts;
}

module.exports = fetchAllAlerts;