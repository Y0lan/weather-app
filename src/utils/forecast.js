const request = require('request');
const SECRET_KEY_DARK_SKY = '965722e1c7d20508a622e7c0d0761ea2';
const forecast = (city, latitude, longitude, callback) => {
    const url = "https://api.darksky.net/forecast/" + SECRET_KEY_DARK_SKY + "/" + latitude + "," + longitude + "?units=auto&lang=fr";

    request({url, json: true}, (error, { body }) => {
        if(error){
            callback({error: 'Unable to connect to weather service'}, undefined);
        } else if( body.error) {
            callback({error: 'Impossible to get the weather for city'}, undefined);
        } else {
            const {summary} = body.daily;
            const {temperature, precipProbability} = body.currently;
            callback(undefined, {
                summary,
                temperature,
                precipProbability
            })
        }
    });
};

module.exports = forecast;
