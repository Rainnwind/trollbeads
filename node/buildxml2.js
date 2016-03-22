var htmlparser = require("htmlparser2"),
    builder = require("xmlbuilder"),
    xml_root = builder.create("root", {
        "encoding": "UTF-8"
    }),

    xml_library = xml_root.ele("library", {
        "xmlns": "http://www.demandware.com/xml/impex/library/2006-10-31",
        "library-id": "SharedLibrary"
    });

module.exports = function(content_object) {
    // console.log(content_object.langs);
    //  console.log(content_object.contents);
    //  console.log(content_object.id);
    //console.log(content_object.name);
    var xml_content = xml_library.ele("content", {
        "content-id": content_object.id
    });
    xml_content.ele("display-name", {
        "xml:lang": "x-default"
    }, content_object.name)

    var custom = xml_content.ele("custom-attributes");


    var get_division = function(_content) {
        var division = {
            blockText: "",
            blockContent1: "",
            blockContent2: ""
        }
        if (_content.length === 0)
            return division;

        var depth = 0;
        var max_length_blockText = 200;
        var tmp = "";
        var rest = "";
        var parser = new htmlparser.Parser({
            onopentag: function(tagname, attribs) {
                depth++;
                tmp += "<" + tagname + ">";
            },
            ontext: function(text) {
                if (max_length_blockText > 0) {
                    if (max_length_blockText.length - text.length > 0)
                        tmp += text;
                    else {
                        tmp += text;
                        max_length_blockText = 0;
                    }
                } else {

                }
            },
            onclosetag: function(tagname) {
                depth--;
                tmp += "</" + tagname + ">";

                if (depth === 0) {
                    console.log(tmp);
                    if (max_length_blockText > 0) {
                        if (division.blockText.length - tmp.length) {
                            division.blockText += tmp;
                        } else {
                            max_length_blockText = 0;
                            rest += tmp;
                        }
                        tmp = "";
                    }
                }
            }
        }, {
            decodeEntities: true
        });
        parser.write(_content);
        parser.end();



        //        console.log(_content.length);
    };


    var i,
        l = content_object.langs.length;
    for (i = 0; i < l; i++) {
        custom.ele("custom-attribute", {
            "xml:lang": content_object.langs[i]
        });
        var division = get_division(content_object.contents[i]);
    }
    console.log(xml_root.end({
        pretty: true
    }));
}