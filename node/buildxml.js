var htmlparser = require("htmlparser2"),
    builder = require("xmlbuilder"),
    fs = require("fs"),
    headerMaxLength = 300;

function parse(htmlstring) {
    var textList = [];
    var element = "";
    var parser = new htmlparser.Parser({
        onopentag: function(name, attribs) {
            // console.log(name);
            // if (textList.length) {
            //     element = name;
            // }
        },
        ontext: function(text) {
            if (text.replace(/\s*|\n/g, "").length) {
                if (textList.length === 1 && textList.length && textList[0].length < headerMaxLength) {
                    console.log("charCodeAt(0) ", text.charCodeAt());
                    var i = text.search(/\n\n/);
                    var j = textList[0].charCodeAt(textList.length -1) === 10 && text.charCodeAt(0) === 10;
                    if (i != -1 || j ) {
                        var index = i > 1 ? i : 1
                        console.log("THISIS I ", i, j, text);
                        // if (i > 1)
                        textList[0] += text.slice(0, index);
                        textList.push("<p>" + text.slice(index) + "</p>");
                        console.log(index, textList);
                    }
                    // textList[0] += text;
                }
                else if (textList.length) {
                    textList.push("<p>" + text + "</p>");
                    element = ""
                } else {
                    textList.push(text);
                }
            }
        },
        onclosetag: function(tagname) {
            // 
            console.log(tagname);
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

    if (textlist[0].length < headerMaxLength) {
        textblock = textlist[0];
        console.log(textblock)
    } else {
        var divide = textlist[0].substring(0, headerMaxLength).split("").reverse().join("").search(Lpattern);
        divide = textlist[0].substring(0, headerMaxLength).length - divide -1;
        var rest = "<p>" + textlist[0].substring(divide + 1) + "</p>";
        textblock = textlist[0].substring(0, divide + 1);
        textlist.splice(1, 0, rest);
    }
    var allTxt = textlist.slice(1, textlist.length).join("").replace(/\s+|\<span\>|\<\/span\>/g, ' ');
    var left = allTxt.substring(0, allTxt.length / 2).split("").reverse().join("").search(Lpattern);
        console.log("left ", 
            allTxt.substring(0, allTxt.length / 2).split("").reverse().join("").charAt(left+1)
        );
        left = left !== -1 ? left : allTxt.length;
        // console.log(left, allTxt.substring(allTxt.length / 2).search(Rpattern))
    var right = allTxt.substring(allTxt.length / 2).search(Rpattern);
        console.log("right ", allTxt.substring(allTxt.length/2).charAt(right));
        right = right !== -1 ? right : allTxt.length
    console.log(left, right, (allTxt.length/2));
    var index = left < right ? allTxt.substring(0, allTxt.length / 2).length - left-1 : right + Math.floor(allTxt.length / 2);
    // console.log(allTxt.substring(0, allTxt.length / 2), allTxt.charAt(left), "\n\n\n", allTxt.substring(allTxt.length / 2), allTxt.charAt(right), index, allTxt.length / 2, allTxt.charAt(index));
    
    contentBlock1 = allTxt.slice(0, index + 1).trim() + "</p>";
    contentBlock2 = "<p>" + allTxt.slice(index + 1).trim();
    return [textblock, contentBlock1, contentBlock2];
}

module.exports = function(designer, xml) {
    console.log("------------------------------------")
    console.log(designer.name);
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

        console.log(designer.langs[i]);
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