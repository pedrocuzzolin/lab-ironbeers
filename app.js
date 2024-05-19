const express = require("express");
const app = express();
const hbs = require("hbs");

app.set("views", __dirname + "/views");

app.set("view engine", "hbs");
app.use(express.static(`${__dirname}/public`));

hbs.registerPartials(__dirname + "/views/partials");

app.get("/", (req, res) => {
  
    res.render("index");
    
});
app.get("/brewery", (req, res) => {
 
    fetch("https://api.openbrewerydb.org/v1/breweries")
    .then((response) => response.json())
    .then((response) =>  {
        res.render("beers", { breweries: response});
    });
});
    
app.get("/random-brewery", (req, res) => {
    fetch("https://api.openbrewerydb.org/v1/breweries/random")
    .then((response) => response.json())
    .then((response) => res.render("random-brewery", { brewery: response[0] })); 
});

app.get("/breweries/:id", (req, res) => {
   const id = req.params.id;
    fetch(`https://api.openbrewerydb.org/v1/breweries/${id}`)
    .then((response) => response.json())
    .then((response) => res.render("random-brewery", { brewery: response }));
});




app.listen(3000, () => {
    console.log("Server listening...")
});