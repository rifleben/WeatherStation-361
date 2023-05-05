// filter alerts by city
const filterCity = async (stateAlerts, city) => {

    let cityAlerts = [];
    for (const i in stateAlerts) {
        if (stateAlerts[i].areas.includes(city)){
            cityAlerts.push(stateAlerts[i]);
        }
    }

    return cityAlerts;
}
module.exports = filterCity;