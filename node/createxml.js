var buildxml = require("./buildxml.js"),
    builder = require("xmlbuilder"),
    htmlparser = require("htmlparser2"),


    xml = builder.create("library", {
        "encoding": "UTF-8"
    });

xml.att("xmlns", "http://www.demandware.com/xml/impex/library/2006-10-31");
xml.att("library-id", "SharedLibrary");

var designer_ids = [
    "designer-1", "designer-2", "designer-3", "designer-4", "designer-5", "designer-6",
    "designer-7", "designer-8", "designer-9", "designer-10", "designer-11", "designer-12",
    "designer-13", "designer-14", "designer-15", "designer-16", "designer-17", "designer-18",
    "designer-19", "designer-20", "designer-21", "designer-22", "designer-24", "designer-25",
    "designer-26", "designer-27", "designer-28", "designer-29", "designer-30", "designer-31",
    "designer-32", "designer-33", "designer-34", "designer-35", "designer-36", "designer-37",
    "designer-38", "designer-39", "designer-40", "designer-41", "designer-42", "designer-43",
    "designer-44", "designer-45", "designer-46", "designer-47", "designer-48", "designer-49",
    "designer-50", "designer-51", "designer-52", "designer-53", "designer-54", "designer-55",
    "designer-56", "designer-57", "designer-58", "designer-59", "designer-61", "designer-60",
    "designer-62", "designer-63", "designer-64", "designer-65", "designer-66", "designer-67",
    "designer-68", "designer-69", "designer-70", "designer-71", "designer-75", "designer-72",
    "designer-76", "designer-79", "designer-80", "designer-81", "designer-82", "designer-83",
    "designer-84", "designer-85", "designer-86", "designer-87", "designer-88", "designer-89",
    "designer-90", "designer-91", "designer-92", "designer-94", "designer-96", "designer-93",
    "designer-95", "designer-73", "designer-97", "designer-98"
];

var designer_ids_orig = [
    "/designers/1", "/designers/2", "/designers/3", "/designers/4", "/designers/5", "/designers/6",
    "/designers/7", "/designers/8", "/designers/9", "/designers/10", "/designers/11", "/designers/12",
    "/designers/13", "/designers/14", "/designers/15", "/designers/16", "/designers/17", "/designers/18",
    "/designers/19", "/designers/20", "/designers/21", "/designers/22", "/designers/24", "/designers/25",
    "/designers/26", "/designers/27", "/designers/28", "/designers/29", "/designers/30", "/designers/31",
    "/designers/32", "/designers/33", "/designers/34", "/designers/35", "/designers/36", "/designers/37",
    "/designers/38", "/designers/39", "/designers/40", "/designers/41", "/designers/42", "/designers/43",
    "/designers/44", "/designers/45", "/designers/46", "/designers/47", "/designers/48", "/designers/49",
    "/designers/50", "/designers/51", "/designers/52", "/designers/53", "/designers/54", "/designers/55",
    "/designers/56", "/designers/57", "/designers/58", "/designers/59", "/designers/61", "/designers/60",
    "/designers/62", "/designers/63", "/designers/64", "/designers/65", "/designers/66", "/designers/67",
    "/designers/68", "/designers/69", "/designers/70", "/designers/71", "/designers/75", "/designers/72",
    "/designers/76", "/designers/79", "/designers/80", "/designers/81", "/designers/82", "/designers/83",
    "/designers/84", "/designers/85", "/designers/86", "/designers/87", "/designers/88", "/designers/89",
    "/designers/90", "/designers/91", "/designers/92", "/designers/94", "/designers/96", "/designers/93",
    "/designers/95", "/designers/73", "/designers/97", "/designers/98"
];

var languages_orig = [
    "/czech-republic/cs-cz", "/denmark/da-dk", "/nederlands/nl-nl", "/france/fr-fr", "/germany/de-de",
    "/italy/it-it", "/japan/ja-jp", "/south-korea/ko-kr", "/lithuania/lt-lt", "/spain/es-es", "/china/zh-cn"
];
var languages = ["cs-CZ", "da-DK", "nl", "fr", "de", "it", "ja-JP", "ko-KR", "lt-LT", "es", "zh-cn"];

var fs = require("fs"),
    path = require("path");

var i, l = designer_ids_orig.length,
    j, k = languages_orig.length;

for (i = 0; i < l; i++) {
    // if (designer_ids_orig[i] != "/designers/10")
    //     continue;
    var name_address = path.join(__dirname, "../phantom/designers", designer_ids_orig[i].replace(/\//g, "_"), "name.html");
    try {
        var name = fs.readFileSync(name_address, "utf-8");
    } catch (err) {
        var name = "";
    };

    var content_object = {
        langs: [],
        contents: [],
        id: designer_ids[i],
        name: name
    };
    for (j = 0; j < k; j++) {
        if (languages[j] != "zh-cn") 
            continue;
        var content_address = path.join(__dirname, "../phantom/designers", designer_ids_orig[i].replace(/\//g, "_"), languages_orig[j].replace(/\//g, "_") + ".html");
        try {
            var content = fs.readFileSync(content_address, "utf-8");
            if (/^No\sdescription/i.test(content) || /^Failed\sto\sopen/i.test(content))
                content = "";
        } catch (err) {
            var content = "";
        }

        content_object.langs.push(languages[j]);
        content_object.contents.push(content);
    }
    buildxml(content_object, xml);
}

fs.writeFileSync("chinese.xml", xml.end({
    pretty: true
}));