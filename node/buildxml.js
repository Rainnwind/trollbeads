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

var getText = function(textlist) {
    if (!textlist[0])
        return;

    var textblock,
        contentBlock1,
        contentBlock2;

    var Rpattern = /\.(\<|\s|$)|\"\s|\u3002\s/
    var Lpattern = /(\<|\s|^)\.|\s\"|\s\u3002/

    if (textlist[0].length < 400) {
        textblock = textlist[0];
    } else {
        var divide = textlist[0].substring(0, 400).split("").reverse().join("").search(Lpattern);
        divide = textlist[0].substring(0, 400).length - divide -1;
        var rest = "<p>" + textlist[0].substring(divide + 1) + "</p>";
        textblock = textlist[0].substring(0, divide + 1);
        textlist.splice(1, 0, rest);
    }
    var allTxt = textlist.slice(1, textlist.length).join("").replace(/\s+|\<span\>|\<\/span\>/g, ' ');
    var left = allTxt.substring(0, allTxt.length / 2).split("").reverse().join("").search(Lpattern);
        // console.log("left ", 
        //     allTxt.substring(0, allTxt.length / 2).split("").reverse().join("").charAt(left+1), 
        //     left, allTxt.substring(0, allTxt.length / 2).split("").reverse().join("")
        // );
        left = left !== -1 ? left : allTxt.length;
        // console.log(left, allTxt.substring(allTxt.length / 2).search(Rpattern))
    var right = allTxt.substring(allTxt.length / 2).search(Rpattern);
        right = right !== -1 ? right : allTxt.length
    // console.log(left, right, (allTxt.length/2));
    var index = left < right ? allTxt.substring(0, allTxt.length / 2).length - left-1 : right + Math.floor(allTxt.length / 2);
    // console.log(allTxt.substring(0, allTxt.length / 2), allTxt.charAt(left), "\n\n\n", allTxt.substring(allTxt.length / 2), allTxt.charAt(right), index, allTxt.length / 2, allTxt.charAt(index));
    
    contentBlock1 = allTxt.slice(0, index + 1).trim() + "</p>";
    contentBlock2 = "<p>" + allTxt.slice(index + 1).trim();
    return [textblock, contentBlock1, contentBlock2];
}

module.exports = function(designer, xml) {
    // console.log("------------------------------------")
    // console.log(designer.name);
    var container = xml.ele("content", {
        "content-id": designer.id
    });
    container.ele("display-name", {
        "xml:lang": "x-default"
    }, designer.name);
    container.ele("online-flag", true);
    container.ele("searchable-flag", false);
    container.ele("page-attributes");
    var textcontainer = container.ele("custom-attributes");
    for (var i = 0; i < designer.langs.length; i++) {

        // console.log(designer.langs[i]);
        var parsedList = parse(designer.contents[i]),
            text = getText(parsedList);

        if (!text)
            continue;
        textcontainer.ele(
            "custom-attribute", {
                "attribute-id": "blockText",
                "xml:lang": designer.langs[i]
            },
            text[0]);

        textcontainer.ele(
            "custom-attribute", {
                "attribute-id": "blockContent1",
                "xml:lang": designer.langs[i]
            },
            text[1]);

        textcontainer.ele(
            "custom-attribute", {
                "attribute-id": "blockContent2",
                "xml:lang": designer.langs[i]
            },
            text[2]);
    }
    container.ele("folder-links").ele("classification-link", {
        "folder-id": "designer"
    });
}