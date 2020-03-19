const express = require('express');
const path = require('path');
const app = express();
const hbs = require('hbs');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');
const port = process.env.PORT || 3000;
const publicDirectoryPath = path.join(__dirname,'../public');
const viewsDirectoryPath = path.join(__dirname,'../templates/views');
const partialDirectoryPath = path.join(__dirname,'../templates/partials');

app.set('views', viewsDirectoryPath);
app.set('view engine', 'hbs');
hbs.registerPartials(partialDirectoryPath);

app.use(express.static(publicDirectoryPath));

app.get('', (req, res) => {
    res.render('index', {
        siteTitle: "Weather App",
        title: 'Weather App',
        name: 'Yolan Maldonado'
    })
});


app.get('/help', (req, res) => {
    res.render('help', {
        siteTitle: "Help",
        title: 'Je sais pas',
        message: "va regarder : "
    })
});

app.get('/about', (req, res) => {
    res.render('about', {
        siteTitle: "À propos",
        title : "À propos",
        about : "Voilà les boules d'un tanuki </br> Ce site utilise aussi mapbox et darksky pour récupérer les données. <br> Mais regardez moi ces boules!"
    })
});

app.get('/weather', (req, res) => {
    if(!req.query.location)
        return res.send({
            error: 'You must provide a search term'
        });

    geocode(req.query.location, (error, {latitude, longitude, location}={}) => {
        if(error) return res.send(error);
        forecast(location, latitude, longitude, (error, {summary, temperature, precipProbability, apparentTemperature}={}) => {
            if(error) return res.send(error);
            res.send({
                location,
                temperature,
                apparentTemperature,
                precipProbability,
                summary,
            })
        });
    });
});

app.get('/help/*', (req, res) => {
    res.render('404', {
        errorMessage: "Help article not found"
    })
});

app.get('*', (req, res) => {
    res.render('404', {
        errorMessage: "Page not found"
    })
});
app.listen(port, () => {
    console.log("Running on " + port);
});

