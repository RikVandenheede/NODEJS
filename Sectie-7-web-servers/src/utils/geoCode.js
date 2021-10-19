const request = require("request");

const apiKey = 'pk.eyJ1Ijoic2N1ZnRpbmdzIiwiYSI6ImNrdTQ2YmlnaTFmOGQycHQ5MjJlMTI3ZDMifQ.HIwX9BQpU5XNJ3zlPLqApA';

const geoCode = (address, callback) => {
    const encodedAddress = encodeURIComponent(address);
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodedAddress}.json?access_token=${apiKey}&limit=1`;

    request({url, json: true}, (error, {body}) => {
        if(error) callback("server error", undefined);
        else if(body.features.length === 0) callback("niets gevonden", undefined);
        else {
            callback(undefined, {
                location: body.features[0].text,
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0]
            })
        }
    })
}

const test = () => {}

module.exports = {
    geoCode, test
}