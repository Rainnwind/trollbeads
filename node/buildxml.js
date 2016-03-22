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

    if (textlist[0].length < 400) {
        textblock = textlist[0];
    } else {
        var divide = textlist[0].substring(0, 400).lastIndexOf("\.")
        var rest = "<p>" + textlist[0].substring(divide + 1) + "</p>";
        textblock = textlist[0].substring(0, divide + 1);
        textlist.splice(1, 0, rest);
    }
    var allTxt = textlist.slice(1, textlist.length).join("");
    var left = allTxt.substring(0, allTxt.length / 2).lastIndexOf("\.");
    var right = allTxt.substring(allTxt.length / 2).indexOf("\.");
    var index = Math.abs(left - allTxt.length / 2) < Math.abs(right - allTxt.length / 2) ? left : right;
    contentBlock1 = allTxt.slice(0, index + 1).trim() + "</p>";
    contentBlock2 = "<p>" + allTxt.slice(index + 1).trim();
    return [textblock, contentBlock1, contentBlock2];
}

module.exports = function(designer, xml) {

    var container = xml.ele("content", {
        "content-id": designer.id
    });
    container.ele("display-name", {
        "xml:lang": "x-default"
    }, designer.name);
    container.ele("online-flag", true);
    container.ele("searchable-flag", false);
    container.ele("page-attributes");
    console.log(designer.langs, designer.langs.length);
    var textcontainer = container.ele("custom-attributes");
    for (var i = 0; i < designer.langs.length; i++) {

        var parsedList = parse(designer.contents[i]),
            text = getText(parsedList);

        console.log(designer.langs[i]);
        if(designer.langs[i] == "ko-KR".toLowerCase())
            console.log(parsedList);
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