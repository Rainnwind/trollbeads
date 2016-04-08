var fs = require("fs"),
    path = require("path");


var types = {
    products: [
        "half-block-text-the-products-trollbeads",
        "half-block-text-the-products-inspiration",
        "half-block-text-the-products-inspiration-2",
        "half-block-text-the-products-idea-to-collection",
        "half-block-text-the-products-material-and-production",
        "INT_halfblock_text_aboutus_theproducts_designers",
        "INT_halfblock_text_aboutus_theproducts_distributionandretailers"
    ],
    concept: [
        "INT_deckwithcontent_artfuldesign_aboutus_theconcept",
        "INT_halfblock_text_artful deisgn_aboutus_theconcept_behindtrollbeads",
        "INT_halfblock_text_artfuldesign_aboutus_theconcept_behindtrollbeads2",
        "INT_halfblock_text_artful deisgn_aboutus_theconcept_customerinteraction",
    ],
    mantra: [
        "INT_deckwithcontent_footer_trollbeadmantra_header"
    ],
    the_story: [
        "INT_deckwithcontent_footer_the story_header",
        "INT_deckwithcontent_footer_thestory2",
        "INT_deckwithcontent_footer_thestory3"
    ],
    our_responsibility: [
        "INT_deckwithcontent_footer_abouttrollbeads_ourresponsibility",
        "INT_halfblock_text_footer_abouttrollbeads_ourresponsibility",
        "INT_halfblock_text_footer_abouttrollbeads_ourresponsibility2",
        "INT_halfblock_text_footer_abouttrollbeads_ourresponsibility3",
        "INT_halfblockwithimageandtext_footer_abouttrollbeads_ourresponsibility",
        "INT_halfblockwithimageandtext_footer_abouttrollbeads_ourresponsibility2"
    ],
    lets_play: [
        "INT_deckwithcontent_artfuldesign_aboutus_letsplay_header",
        "INT_deckwithcontent_artfuldesign_aboutus_letsplay2",
        "INT_halfblock_text_aboutus_letsplay",
        "INT_halfblock_text_aboutus_letsplay2",
        "INT_deckwithcontent_artfuldesign_aboutus_letsplay"
    ]
}

var template = {

};

var textDiv = require("./textDivider.js");

fs.readdirSync("../phantom/about/about/").forEach(function(folder) {
    fs.readdirSync(path.join("../phantom/about/about/", folder)).forEach(function(file) {
        try {
            var content = fs.readFileSync(path.join("../phantom/about/about/", folder, file));
            var js = JSON.parse(content);
            if (!template[js.type])
                template[js.type] = [];
            template[js.type].push({
                contents: textDiv(js.strings, types[js.type]),
                lang: js.lang
            });
            console.log(template);

        } catch (er) {
            console.log(path.join("../phantom/about/about/", folder, file));
            console.log(er);
        }
    });
});