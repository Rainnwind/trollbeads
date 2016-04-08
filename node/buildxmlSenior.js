var fs = require("fs"),
    path = require("path");

var paths = [
    "../phantom/about/about/products",
    "../phantom/about/about/concept",
];

paths.forEach(function(dir) {
    files = fs.readdirSync(dir);
    files.forEach(function(file) {
        content = require(path.join(dir, file));
        console.log(content.lang);
    });
});