console.log("LOL")
var host = "http://www.trollbeads.com";
var languages = {
    "/china/zh-cn/": "zh",
    "/czech-republic/cs-cz/": "cs-CZ",
    "/denmark/da-dk/": "da-DK",
    "/france/fr-fr/": "fr-FR",
    "/germany/de-de/": "de-DK",
    "/italy/it-it/": "it-IT",
    "/japan/ja-jp/": "ja-JP",
    "/lithuania/lt-lt/": "lt-LT",
    "/nederlands/nl-nl/": "nl-NL",
    "/south-korea/ko-kr/": "ko-KR",
    "/spain/es-es/": "es-ES",
    regex: /\/china\/zh-cn\/|\/czech-republic\/cs-cz\/|\/denmark\/da-dk\/|\/france\/fr-fr\/|\/germany\/de-de\/|\/italy\/it-it\/|\/japan\/ja-jp\/|\/lithuania\/lt-lt\/|\/nederlands\/nl-nl\/|\/south-korea\/ko-kr\/|\/spain\/es-es\//
};

var pages = [{
    name: "products",
    list: [
        '/china/zh-cn/关于卓璧思/关于产品',
        '/czech-republic/cs-cz/více-o-trollbeads/produkty',
        '/denmark/da-dk/om-os/produkter',
        '/france/fr-fr/about-trollbeads/the-products',
        '/germany/de-de/about-trollbeads/die-produkte',
        '/italy/it-it/su-di-noi/i-prodotti-trollbeads',
        '/japan/ja-jp/トロールビーズについて/製品について',
        '/lithuania/lt-lt/apie-trollbeads/the-products',
        '/nederlands/nl-nl/about-trollbeads/the-products',
        '/south-korea/ko-kr/트롤비즈-란/제-품',
        '/spain/es-es/acerca-de-trollbeads/los-productos'
    ]
}, {
    name: "concept",
    list: [
        '/china/zh-cn/关于卓璧思/卓璧思的背后',
        '/czech-republic/cs-cz/více-o-trollbeads/kdo-se-ukrývá-za-trollbeads',
        '/denmark/da-dk/om-os/bagom-troldekugler',
        '/france/fr-fr/about-trollbeads/behind-tb',
        '/germany/de-de/about-trollbeads/hintergrund',
        '/italy/it-it/su-di-noi/dietro-la-favola',
        '/japan/ja-jp/トロールビーズについて/トロールビーズ社の運営',
        '/lithuania/lt-lt/apie-trollbeads/už-trollbeads',
        '/nederlands/nl-nl/about-trollbeads/behind-tb',
        '/south-korea/ko-kr/트롤비즈-란/트롤비즈-숨은-이야기',
        '/spain/es-es/acerca-de-trollbeads/detrás-de-trollbeads'
    ]
}, {
    name: "mantra",
    list: [
        '/china/zh-cn/关于卓璧思/我们的信念',
        '/czech-republic/cs-cz/více-o-trollbeads/trollbeads-mantra',
        '/denmark/da-dk/om-os/troldekugler-mantraet',
        '/france/fr-fr/about-trollbeads/the-tb-mantra',
        '/germany/de-de/about-trollbeads/das-motto-von-trollbeads',
        '/italy/it-it/su-di-noi/the-tb-mantra',
        '/japan/ja-jp/トロールビーズについて/トロールビーズが求めるもの',
        '/lithuania/lt-lt/apie-trollbeads/the-tb-mantra',
        '/nederlands/nl-nl/about-trollbeads/the-tb-mantra',
        '/spain/es-es/acerca-de-trollbeads/tb-mantra'
    ]
}, {
    name: "the_story",
    list: [
        '/china/zh-cn/关于卓璧思/品牌故事',
        '/czech-republic/cs-cz/více-o-trollbeads/náš-příběh',
        '/denmark/da-dk/om-os/historien',
        '/france/fr-fr/about-trollbeads/the-story',
        '/germany/de-de/about-trollbeads/die-geschichte',
        '/italy/it-it/su-di-noi/la-storia',
        '/japan/ja-jp/トロールビーズについて/トロールビーズの歴史',
        '/lithuania/lt-lt/apie-trollbeads/istorija',
        '/nederlands/nl-nl/about-trollbeads/the-story',
        '/south-korea/ko-kr/트롤비즈-란/트롤비즈-이야기',
        '/spain/es-es/acerca-de-trollbeads/la-historia'
    ]
}, {
    name: "our_responsibility",
    list: [
        '/china/zh-cn/关于卓璧思/我们的责任',
        '/czech-republic/cs-cz/více-o-trollbeads/naše-záruka',
        '/denmark/da-dk/om-os/vores-ansvar',
        '/france/fr-fr/about-trollbeads/our-responsibility',
        '/france/fr-fr/about-trollbeads/our-responsibility',
        '/germany/de-de/about-trollbeads/unsere-verantwortung',
        '/italy/it-it/su-di-noi/le-nostre-responsabilità',
        '/japan/ja-jp/トロールビーズについて/社会的責任について',
        '/lithuania/lt-lt/apie-trollbeads/our-responsibility',
        '/nederlands/nl-nl/about-trollbeads/our-responsibility',
        '/south-korea/ko-kr/트롤비즈-란/우리의-책임',
        '/spain/es-es/acerca-de-trollbeads/nuestra-responsabilidad'
    ]
}, {
    name: "lets_play",
    list: [
        '/china/zh-cn/关于卓璧思/今日的卓璧思',
        '/czech-republic/cs-cz/více-o-trollbeads/trollbeads-dnes',
        '/denmark/da-dk/om-os/troldekugler-i-dag',
        '/france/fr-fr/about-trollbeads/trollbeads-today',
        '/france/fr-fr/about-trollbeads/trollbeads-today',
        '/germany/de-de/about-trollbeads/trollbeads-heute',
        '/italy/it-it/su-di-noi/trollbeads-oggi',
        '/japan/ja-jp/トロールビーズについて/今日のトロールビーズ',
        '/lithuania/lt-lt/apie-trollbeads/trollbeads-today',
        '/nederlands/nl-nl/about-trollbeads/trollbeads-today',
        '/south-korea/ko-kr/트롤비즈-란/트롤비즈-현황',
        '/spain/es-es/acerca-de-trollbeads/trollbeads-hoy'
    ]
}];


var designers_folder = "./designers";
var fs = require('fs'),
    system = require("system");

fs.makeDirectory("./about");

var next_about_page = function() {
    var next_page = function(_about_page) {
        if (_about_page.list.length === 0) {
            next_about_page();
        } else {
            var current_page = _about_page.list.splice(0, 1)[0];
            var url = host + current_page;
            var page = require('webpage').create();

            page.onResourceRequested = function(requestData, networkRequest) {

                if (/\.(jpeg|jpg|png|css|woff)/.test(requestData.url)) {
                    // console.log(requestData.url);
                    return networkRequest.abort();
                }
            };

            var statusCode = null;
            page.onResourceReceived = function(resource) {
                statusCode = resource.status;
                // console.log(resource.status, resource.url);
            };
            console.log("Opening page");
            var save_file = "./about/" + about_page.name + "/" + current_page.replace(/\//g, "_") + ".js";
            console.log("save_file", save_file);
            page.open(encodeURI(url), {}, function(status) {
                console.log(status);
                console.log(statusCode)
                if (status === "success") {
                    if (statusCode >= 200 && statusCode < 300) {
                        if (!page.injectJs("jquery.js")) {
                            console.log("Failed to inject jQuery");
                        } else {
                            console.log("evaluating");
                            var result = page.evaluate(function() {
                                var _result = {
                                    strings: [],
                                    lang: "",
                                    type: ""
                                };

                                function remove_images(elem) {
                                    $.each($(elem).children(), function() {
                                        if ($(this).prop("tagName").toLowerCase() === "img")
                                            $(this).remove();
                                        else
                                            remove_images(this);
                                    });
                                };

                                $.each($("#content .content-w-left-menu .row .col-xs-12 > *"), function() {
                                    remove_images(this);
                                    if ($(this).text().trim())
                                        _result.strings.push($(this).text().replace(/\n/g, "").trim());
                                });
                                return _result;
                            });
                            console.log("Evaluated");
                            if (!result) {
                                console.log("No content: " + current_page);
                                fs.write(save_file, "no_content", 'w');
                            } else {
                                var lang_match = current_page.match(languages.regex);
                                console.log(lang_match);
                                if (lang_match) {
                                    console.log(languages[lang_match[0]]);
                                    console.log("write");
                                    result.lang = languages[lang_match[0]];
                                    result.type = _about_page.name;
                                }
                                fs.write(save_file, "module.exports = " + JSON.stringify(result) + ";", 'w');
                            }
                        }

                    } else {
                        console.log("Failed to load page, statusCode: " + statusCode);
                        fs.write(save_file, "Failed to load page, statusCode: " + statusCode, 'w');
                    }
                } else {
                    console.log("Failed to load page, status: " + status);
                    fs.write(save_file, "Failed to load page, status: " + status, 'w');
                }
                page.close();
                next_page(_about_page);
            });
        }

    }
    if (pages.length === 0)
        phantom.exit(0);
    var about_page = pages.splice(0, 1)[0];
    fs.makeDirectory("./about/" + about_page.name);
    next_page(about_page);
}
next_about_page();