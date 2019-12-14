// Dependencies
// =============================================================
var express = require("express");
var path = require("path");
const fs = require("fs");
// Sets up the Express App
// =============================================================
var app = express();
var PORT = process.env.PORT || 3000;


//sets up data
const dataTablePath = path.join(__dirname, "data/tables.json")
if (!fs.existsSync(path)) {
    console.log("data/tables.json didnt exists so it was created :)")
    fs.writeFileSync(dataTablePath, JSON.stringify({
        tables: []
    }));
}
else {
    fs.readFileSync(dataTablePath, "UTF-8", function (err, stringdata) {
        console.log("stored data:\n\n", stringdata)
    });
}

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/", function (req, res) {
    res.sendFile(path.join(__dirname, "public/home.html"));
});
app.get("/home", function (req, res) {
    res.sendFile(path.join(__dirname, "public/home.html"));
});
app.get("/res", function (req, res) {
    res.sendFile(path.join(__dirname, "public/res.html"));
});
app.get("/table", function (req, res) {
    res.sendFile(path.join(__dirname, "public/tables.html"));
});

app.post("/api/setres", function (req, res) {
    // req.body hosts is equal to the JSON post sent from the user
    // This works because of our body parsing middleware
    var reservation = req.body;
    console.log(reservation);
    // Using a RegEx Pattern to remove spaces from newCharacter
    // You can read more about RegEx Patterns later https://www.regexbuddy.com/regex.html
    // newCharacter.routeName = newCharacter.name.replace(/\s+/g, "").toLowerCase();


    //id, name, email, phone
    
    fs.readFile(dataTablePath, "UTF-8", function (err, stringdata) {
        let data = JSON.parse(stringdata);
        data.tables.push(data);
    })

    //res.json(newCharacter);
});
app.post("/api/getres", function (req, res) {
    // req.body hosts is equal to the JSON post sent from the user
    // This works because of our body parsing middleware
    var reservation = req.body;
    console.log(reservation);

    //id, name, email, phone

    fs.readFile(dataTablePath, "UTF-8", function (err, stringdata) {
        let data = JSON.parse(stringdata);
        res.json(data);

    })
});


app.listen(PORT, function () {
    console.log("App listening on PORT " + PORT);
});