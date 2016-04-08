var handlebars  = require("handlebars"),
    fs          = require("fs");

var lorem  = ["Lorem ipsum dolor sit amet. Consectetur adipisicing elit, sed do eiusmod \
tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,\
quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo\
consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse\
cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non\
proident, sunt in culpa qui officia deserunt mollit anim id est laborum."]

var txml = require("./txml.js");

contID = "INT_deckwithcontent_artfuldesign_aboutus_theconcept";

var template = {}
template[contID] = []


template[contID].push(txml(
    {
        lang : "danish", 
        contID  : "INT_deckwithcontent_artfuldesign_aboutus_letsplay", 
        htmlList : lorem

    })
);


template[contID].push(txml({
    lang : "danish",
    contID : "half-block-text-the-products-inspiration-2",
    htmlList : lorem
}));


// console.log(template);

var source = fs.readFileSync("./xmltemplate.xml", "utf8");

console.log(typeof(source));

var hbarsCompile = handlebars.compile(source);
var result = hbarsCompile(template);

console.log(result)

fs.writeFileSync("compiledTemplateTest", result, "utf8");