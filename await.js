const axios = require('axios');

async function getActivity () {
    let response = await axios.get('https://www.boredapi.com/api/activity');
    return(response.data);
}

async function getActivityII () {
    let response = await axios.get('https://www.boredapi.com/api/activity');
    return(response.data);
}

async function main () {
    let activity =  getActivity();
    let activityII = getActivityII();
    output = await Promise.all([activity, activityII])
    console.log(output);
}

main();
