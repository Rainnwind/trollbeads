var htmlparser = require("htmlparser2"),
    builder = require("xmlbuilder"),
    fs = require("fs");

function parse(htmlstring) {
    var textList = [];
    var element = "";
    var parser = new htmlparser.Parser({
        onopentag: function(name, attribs) {
            if (textList.length) {
                element = name;
            }
        },
        ontext: function(text) {
            if (text.replace(/\s*|\n/g, "").length) {
                if (element && element !== "br") {
                    textList.push("<" + element + ">" + text + "</" + element + ">");
                    element = ""
                } else {
                    textList.push(text);
                }
            }
        },
        onclosetag: function(tagname) {
            // 
        }
    }, {
        decodeEntities: true
    });
    parser.write(htmlstring);
    parser.end();
    return textList;
}
//var txt = fs.readFileSync("_designers_1/_denmark_da-dk.html");

// var xml = builder.create("library", {
//     "xmlns": "http://www.demandware.com/xml/impex/library/2006-10-31",
//     "library-id": "SharedLibrary"
// });

/*
 * getText(block : {number}) 
 *
 * @param block {number} The block number needed. 1 indicates the text block
 * and 2 and 3 are the contentblock 1 and 2
 */
var getText = function(textlist, block) {
        var index = Math.ceil((textlist.length - 1) / 2),
            start = ((block - 2) * index) + 1,
            end = ((block - 2) * index) + index + 1;
        if (!textlist[0])
            return [
                [],
                []
            ];
        if (block == 1) {
            if (textlist[0].length < 400) {
                // console.log(textlist[0].length);
                return [textlist[0], textlist];
            }
            var divide = textlist[0].substring(0, 400).lastIndexOf("\.")
            var textblock = textlist[0].substring(0, divide + 1);
            var rest = "<p>" + textlist[0].substring(divide + 1) + "</p>";
            textlist.splice(1, 0, rest);
            // console.log(textlist);
            // console.log(divide);
            console.log(typeof(rest));
            return [textblock, textlist];
        } else {
            console.log("block number ", block-2, start, end, textlist.length-1);
            // console.log("some other block ", textlist);
            return [textlist.slice(start, end).join(""), textlist] || ["", textlist];
        }

    }
    // getText(parse(txt), 2);
    // console.log(getText(parse(txt), 1)[0]);
    // console.log(
    //     "header:\n",
    //     getText(parse(txt), 1)[0],
    //     "\ncontentblock1\n",
    //     getText(parse(txt), 2)[0],
    //     "\ncontentblock2\n",
    //     getText(parse(txt), 3)[0],
    //     "\n\nParsed input\n", 
    //     parse(txt)
    // );

module.exports = function(designer, xml) {

    var container = xml.ele("content", {
        "content-id": designer.id
    });
    container.ele("display-name", {
        "xml:lang": "x-default"
    });
    container.ele("online-flag", true);
    container.ele("searchable-flag", false);
    var textcontainer = container.ele("custom-attributes");
    for (var i = 0; i < designer.langs.length; i++) {

        parsedList = parse(designer.contents[i]);
        /*
            Because text head may update textlist if the text is too long
            then the remaining text is inserted at the 2nd position in textlist
        */
        textHead = getText(parsedList, 1);
        parsedList = textHead[1];
        // console.log(parsedList);
        console.log(designer.langs[i]);
        if (designer.langs[i] == "da-DK")
            console.log(getText(parsedList,2)[0]);
            // console.log(parsedList.slice(1,3).join(""), parsedList.slice(3,5).join(""));

        textcontainer.ele(
            "custom-attributes", {
                "attribute-id": "blockContent2",
                "xml:lang": designer.langs[i]
            },
            getText(parsedList, 3)[0]);

        textcontainer.ele(
            "custom-attributes", {
                "attribute-id": "blockContent1",
                "xml:lang": designer.langs[i]
            },
            getText(parsedList, 2)[0]);



        textcontainer.ele(
            "custom-attributes", {
                "attribute-id": "blockText",
                "xml:lang": designer.langs[i]
            },
            textHead[0]);
    }
    container.ele("folder-links").ele("classification-link", {
        "folder-id": "designer"
    });
}