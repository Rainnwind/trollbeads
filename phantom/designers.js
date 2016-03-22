var host = "http://www.trollbeads.com";
var designer_ids = [
    "/designers/2", "/designers/1", "/designers/3", "/designers/4", "/designers/5", "/designers/6",
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
// var languages = [
//     "/czech-republic/cs-cz", "/denmark/da-dk", "/nederlands/nl-nl", "/france/fr-fr", "/germany/de-de",
//     "/italy/it-it", "/japan/ja-jp", "/south-korea/ko-kr", "/lithuania/lt-lt", "/spain/es-es"
// ];
var languages = [
    "/czech-republic/cs-cz"
];

//host + lang + designer_id

function build_index() {
    var index = [];
    designer_ids.forEach(function(id) {
        var langs = [];
        index.push({
            designer: id,
            langs: langs
        });
        languages.forEach(function(lang) {
            langs.push({
                lang: lang,
                url: host + lang + id
            });
        });
    });
    return index;
};
var index = build_index();

var designers_folder = "./designers";
var fs = require('fs'),
    system = require("system");

// console.log("Cleaning dir: " + designers_folder);
// try {
//     fs.removeTree(designers_folder)
//     console.log("Cleaned dir: " + designers_folder);
// } catch (err) {
//     console.log(err);
// }

// if (fs.list(designers_folder).length === 0) {
//     if (fs.makeDirectory(designers_folder))
//         console.log('"' + designers_folder + '" was created.');
//     else
//         console.log('"' + designers_folder + '" is NOT created.');
// }



var next_designer = function() {
    var next_languages = function(_designer) {
        //        console.log(JSON.stringify(_designer));
        if (_designer.langs.length === 0) {
            next_designer();
        } else {
            var lang = _designer.langs.splice(0, 1)[0];
            fs.write(designers_folder + "/" + designer.designer.replace(/\//g, "_") + "/name.html", lang.url, 'w');
            //            console.log("Scan: " + lang.url);

            var page = require('webpage').create();


            var statusCode = null;
            page.onResourceReceived = function(resource) {
                statusCode = resource.status;
            };

            page.open(lang.url, {}, function(status) {
                if (statusCode >= 200 && statusCode < 300) {
                    if (status === "success") {
                        if (!page.injectJs("jquery.js")) {
                            console.log("Failed to inject jQuery");
                        } else {
                            var description = page.evaluate(function() {
                                return $(".designer-info h1[itemprop=name]").text();
//                                return $(".designer-info .desc").html();
                            });
                            if (!description) {
                                console.log("No description: " + lang.url);
                                fs.write(designers_folder + "/" + designer.designer.replace(/\//g, "_") + "/name.html", "No description: " + lang.url, 'w');
//                                fs.write(designers_folder + "/" + designer.designer.replace(/\//g, "_") + "/" + lang.lang.replace(/\//g, "_") + ".html", "No description: " + lang.url, 'w');
                            } else {
                                //console.log("Saving description to:\n" + designers_folder + "/" + designer.designer.replace(/\//g, "_") + lang.lang.replace(/\//g, "_") + ".html");
//                                fs.write(designers_folder + "/" + designer.designer.replace(/\//g, "_") + "/" + lang.lang.replace(/\//g, "_") + ".html", description, 'w');
                                fs.write(designers_folder + "/" + designer.designer.replace(/\//g, "_") + "/name.html", description, 'w');
                            }
                        }

                    } else {
                        console.log("Failed to open: " + lang.url);
                        fs.write(designers_folder + "/" + designer.designer.replace(/\//g, "_") + "/name.html", "Failed to open: " + lang.url, 'w');
                    }
                } else {
                    console.log("Failed to open: " + lang.url);
                    fs.write(designers_folder + "/" + designer.designer.replace(/\//g, "_") + "/name.html", "Failed to open: " + lang.url, 'w');
                }
                page.close();
                next_languages(_designer);
            });
        }

    }
    if (index.length === 0)
        phantom.exit(0);
    var designer = index.splice(0, 1)[0];
    // //Create folder for designer
    // //    console.log("Creating folder for: " + designers_folder + "/" + designer.designer.replace(/\//g, "_"));
    // if (fs.makeDirectory(designers_folder + "/" + designer.designer.replace(/\//g, "_")))
    //     console.log('"' + designers_folder + "/" + designer.designer.replace(/\//g, "_") + '" was created.');
    // else
    //     console.log('"' + designers_folder + "/" + designer.designer.replace(/\//g, "_") + '" is NOT created.');
    next_languages(designer);
}
next_designer();