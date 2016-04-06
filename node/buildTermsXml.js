var htmlparser  = require("htmlparser2"),
    builder     = require("xmlbuilder"),
    fs          = require("fs");

function parse(htmlstring) {
    var textList = [],
        parser = new htmlparser.Parser({

            ontext : function(text) {

            }
        }, {
            decodeEntities : true
        });

    parser.write(htmlstring);
    parser.end();
    return textList;
};

function getText() {

}

module.exports = function(terms, xml) {

}