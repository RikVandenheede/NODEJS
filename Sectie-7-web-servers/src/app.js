const path = require("path"); // core node module
const express = require("express"); // express is een functie, gebruikt om een applicatie aan te maken
const hbs = require("hbs");
const geoCode = require("./utils/geoCode");
const forecast = require("./utils/forecast");

// nodemon src/app.js -e js,hbs // laat weten dat deze ook moeten geupdate worden door de e flag

// console.log(__dirname); // geeft de route van de map waar deze file in zit terug
// console.log(path.join(__dirname, "../public")); // geeft het path naar de public map // kijk lijn 10

const app = express(); // genereert een express app, om de server te configureren passen we methodes toe op de app
// hieronder zeggen wat onze express app moet doen
const publicDirPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials"); // laat handlebars weten waar hij moet zoeken, lijn 17

app.use(express.static(publicDirPath));// cinfiguered express app
app.set("views", viewsPath);
app.set("view engine", "hbs"); // laat express weten welke template engine we gebruiken
hbs.registerPartials(partialsPath);


// app.get() // laat ons configureren wat de server moet doen als iemand naarhier surft
// neemt 2 argumenten 1(de route) 2(en een functie)
// 1 de route app.get("")
// 2 een functie => zegt wat we willen doen wanneer iemand deze specifieke route bezoekt

app.get("", (req, res) => { // req => informatie van inkomende informatie // res => een heleboel methodes, waardoor we kunnen kiezen wat we terugsturen naar de requester
    //res.send("Hello Express"); // => zend iets terug naar de persoon die de roete bezoekt
    res.render("index", {// moet matchen met de naam in de views folder, door de hbs engine weet express dat hij daar moet kijken
        title: "Weather app", // in de index kan je nu {{title}} gebruiken
        name: "Rik"
    }); 
})

app.get("/help", (req, res) => {
    res.render("help", {
        title: "Help",
        message: "Dit is de help message :)",
        name: "Rik"
    })
})

app.get("/about", (req, res) => {
    res.render("about", {
        title: "About page",
        name: "Rik"
    })
})

app.get("/weather", (req, res) => {
    console.log(req.query);
    if(!req.query.address){
        return res.send({
            error: "Geef een locatie in"
        })
    }
    geoCode(req.query.address, (error, {latitude, longitude, location} = {}) => {
        if(!error) {
            forecast(latitude, longitude, (error, forecast) => {
                if(!error) {
                    res.send({
                        forecast,
                        location,
                        address: req.query.address
                    })
                }
            })
        }else {
            return res.send(error);
        }
    })
})

app.get("/products", (req, res) => {
    if(!req.query.search) { // doet deze if als er GEEN searsch query is
        return res.send({ // door return stopt de functie en verzend hij geen 2de response.
            error: "You must provide a search term"
        })
    }
    console.log(req.query.search);
    res.send({
        products: []
    })
})

// deze matcht met geen enkele pagina hierboven maar wel met een foute /help/...
app.get("/help/*", (req, res) => {
    res.render("404", {
        message: "Help article not found"
    });
})

// deze moet als laatste omdat express voor een "match zoekt" en begint vanboven
app.get("*", (req, res) => {
    res.render("404", {
        message: "My 404 page"
    })
})

// de server starten (om het te kunnen bekijken in de browser)
app.listen(3000, () => console.log("Server is up and running"));
// http://localhost:3000/ voor de applicatie te bezoeken.