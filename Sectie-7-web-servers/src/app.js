const express = require("express"); // express is een functie, gebruikt om een applicatie aan te maken

const app = express(); // genereert een express app, om de server te configureren passen we methodes toe op de app

// hieronder zeggen wat onze express app moet doen

// app.get() // laat ons configureren wat de server moet doen als iemand naarhier surft
// neemt 2 argumenten 1(de route) 2(en een functie)
// 1 de route app.get("")
// 2 een functie => zegt wat we willen doen wanneer iemand deze specifieke route bezoekt

app.get("", (req, res) => { // req => informatie van inkomende informatie // res => een heleboel methodes, waardoor we kunnen kiezen wat we terugsturen naar de requester
    res.send("Hello Express"); // => zend iets terug naar de persoon die de roete bezoekt
})

app.get("/help", (req, res) => {
    res.send({ // stuur een object of array mee, deze wordt als JSON meegegeven aan de requester
        name: "Rik", // als je deze route opzoekt dan zie je geformat json die je kan gebruiken
        age: 22
    });
})

app.get("/about", (req, res) => {
    res.send("<h1>About page</h1>") // je kan er html aan meegeven
})

app.get("/weather", (req, res) => {
    res.send({
        location: "Binkom",
        degrees: 12
    })
})

// de server starten (om het te kunnen bekijken in de browser)
app.listen(3000, () => console.log("Server is up and running"));
// http://localhost:3000/ voor de applicatie te bezoeken.