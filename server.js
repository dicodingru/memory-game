var express = require("express");
var app = express();
var path = require("path");

app.use(express.static(path.join(__dirname)));
app.use("/styles", express.static(__dirname));
app.use("/images", express.static(__dirname + "/assets"));
app.use("/scripts", express.static(__dirname + "/js"));

// viewed at based directory http://localhost:8080/
app.get("/", function(req, res) {
  res.sendFile(path.join(__dirname + "/index.html"));
});

app.listen(process.env.PORT || 8080);
