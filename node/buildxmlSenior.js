var fs = require("fs"),
    path = require("path");

var paths : [
    "./about/about/products",
    "./about/about/concept",
];

paths.forEach(function(dir) {
    files = fs.readdirSync(dir);
    files.forEach(function(file) {
        content = require(path.join(dir, file));
        console.log(content);
    })
});