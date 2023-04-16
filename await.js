const axios = require('axios');

// async function getActivityII () {
//     let response = await axios.get('https://www.boredapi.com/api/activity');
//     return(response.data);
// }

// async function main () {
//     let activity =  getActivity();
//     let activityII = getActivityII();
//     output = await Promise.all([activity, activityII])
//     console.log(output);
// }

async function getForecast() {
    try{
        let forecast = await axios.get("https://api.weatherapi.com/v1/forecast.json?key=7fd6ee5501c748e3b7a73000233003&q=Seattle")
        console.log(forecast.data)
    } catch (error) {
        console.error(error);
    }
}

getForecast();

