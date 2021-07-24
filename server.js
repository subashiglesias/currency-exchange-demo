let express = require("express");
let app = express();
let path = require("path");
let port = process.env.PORT || 3000;

app.get("/", function (req, res) {
    res.sendFile(path.join(__dirname + "/build/index.html"));
});

app.use(express.static("build"));

app.listen(port);