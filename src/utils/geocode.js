const request = require('request');
const SECRET_KEY_MAP_BOX= 'pk.eyJ1IjoieW9sYW5tcSIsImEiOiJjazd2d3Z2N3cwaTVzM2ltbzdqY3V3dmtmIn0.C-NNX9_jws17awneYBF22g';
const geocode = (city, callback) => {
    const url = "https://api.mapbox.com/geocoding/v5/mapbox.places/" + encodeURIComponent(city) + ".json?access_token=" + SECRET_KEY_MAP_BOX + "&limit=1";
    request({ url : url, json : true } , (error, {body}) => {
        if (error) {
            callback({error: 'Unable to contact mapbox'}, undefined);
        } else if (body.features.length === 0) {
            callback({error: 'Impossible to request city geocoding'}, undefined);
        } else {
            const location = body.features[0].place_name;
            const [longitude, latitude] = body.features[0].center;
            callback(undefined, {
                latitude,
                longitude,
                location
            })
        }
    })
};

module.exports = geocode;
