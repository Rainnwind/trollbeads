var htmlparser  = require("htmlparser2"),
    builder     = require("xmlbuilder"),
    handlebars  = require("handlebars"),
    fs          = require("fs"),
    maxHeaderLength = 300,
    maxTextLength   = 500,
    maxSubHeaderLength = 300;


// var getTextString = function (htmlstring) {
//     var textString;
//     parser = new htmlparser.Parser({
//         onopentag   : function() {

//         }, 
//         ontext      : function(text) {
//             textString += text;
//         },
//         onclosetag  : function() {

//         }
//     });
//     parser.write(htmlstring);
//     parser.end();
//     return textString;
// }

var getTextBlocks = function(textString, blockTypes) {
    var textBlocks  = {},
        Rpattern    = /\.(\<|\s|$)|\"\s|\u3002/,
        Lpattern    = /(\<|\s|^)\.|\s\"|\u3002/;

    blockTypes.forEach(function(type, index) {
        var maxLength;
        switch (blockType) {

            case "blockHeader":
                maxLength = maxHeaderLength;
                break;

            case "blockText":
                // maxLength = maxTextLength;
                maxLength = Infinity;
                break;

            case "blockSubHeader":
                maxLength = maxSubHeaderLength;
                break;
        }

        if (blockTypes.length === 1  ||
            index === blockTypes.length -1) {

            textBlocks[type] = textString;

        } else  {

            var portion = textString.length / blockTypes.length;
                if (portion > maxLength) {
                    portion = maxLength;
                }

                portion = textString.slice(0, portion);

            var lastDot = portion.split("").reverse().join("").search(Lpattern);
                lastDot = portion.length - lastDot;

            textBlocks[type] = textString.slice(0, lastDot - 1);
            textString = textString.slice(lastDot);

        }
    });

}

/*
*   @param content {object}     Object has the form:
        ```
        {
            lang        : {string}
            contID      : {string},
            blocks      : {list},
            htmlList    : {string}
        }
        ```
*/
module.exports = function(content) {
    // var divider = blocks.length;
    var contID = content.contID.replace(/\s+/g, "_");
    var textBlocks = {};

    if(content.htmlList.length === content.blocks.length) {
        // Assume 1:1 relationship
        content.blocks.forEach(function(type, index)) {
            // do the logic dance
            textBlocks[type] = content.htmlList[index];
        }
    } else {
        // different number of blocks expected, so parse and divide
        htmlString = htmlList.join(" ")
        getTextBlocks(htmlString, content.blocks);
    }

}


/*
var template = handlebars.compile("./xmltemplate.xml");
template({
    contID1 : [{da}, {it}],
    contID2 : [{da}, {it}]
});
*/