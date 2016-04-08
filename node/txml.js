var htmlparser = require("htmlparser2"),
    builder = require("xmlbuilder"),
    handlebars = require("handlebars"),
    fs = require("fs"),
    getTextBlocks = require("./textDivider.js");

var relations = {

    "half-block-text-the-products-trollbeads": ["blockHeader", "blockText"],
    "half-block-text-the-products-inspiration": ["blockHeader", "blockText"],
    "half-block-text-the-products-inspiration-2": ["blockText"],
    "half-block-text-the-products-idea-to-collection": ["blockHeader", "blockText"],
    "half-block-text-the-products-material-and-production": ["blockHeader", "blockText"],
    "INT_halfblock_text_aboutus_theproducts_designers": ["blockHeader", "blockText"],
    "INT_halfblock_text_aboutus_theproducts_distributionandretailers": ["blockHeader", "blockText"],
    "INT_deckwithcontent_artfuldesign_aboutus_theconcept": ["blockHeader", "blockSubHeader","blockText"],
    "INT_halfblock_text_artful_deisgn_aboutus_theconcept_behindtrollbeads": ["blockHeader", "blockText"],
    "INT_halfblock_text_artfuldesign_aboutus_theconcept_behindtrollbeads2": ["blockText"],
    "INT_halfblock_text_artful_deisgn_aboutus_theconcept_customerinteraction": ["blockHeader","blockText"],
    "INT_deckwithcontent_footer_trollbeadmantra_header" :["blockHeader", "blockText"],
    "INT_deckwithcontent_footer_the_story_header": ["blockHeader", "blockText"],
    "INT_deckwithcontent_footer_thestory2": ["blockText"],
    "INT_deckwithcontent_footer_thestory3": ["blockText"],
    "INT_deckwithcontent_footer_abouttrollbeads_ourresponsibility": ["blockHeader","blockSubHeader"],
    "INT_halfblock_text_footer_abouttrollbeads_ourresponsibility": ["blockText"],
    "INT_halfblock_text_footer_abouttrollbeads_ourresponsibility2": ["blockHeader", "blockText"],
    "INT_halfblock_text_footer_abouttrollbeads_ourresponsibility3": ["blockText"],
    "INT_halfblockwithimageandtext_footer_abouttrollbeads_ourresponsibility": ["blockText"],
    "INT_halfblockwithimageandtext_footer_abouttrollbeads_ourresponsibility2": ["blockText"],
    "INT_deckwithcontent_artfuldesign_aboutus_letsplay_header": ["blockHeader","blockText"],
    "INT_deckwithcontent_artfuldesign_aboutus_letsplay2": ["blockHeader","blockText"],
    "INT_halfblock_text_aboutus_letsplay": ["blockHeader","blockText"],
    "INT_halfblock_text_aboutus_letsplay2": ["blockHeader","blockText"],
    "INT_deckwithcontent_artfuldesign_aboutus_letsplay": ["blockHeader","blockText"]

}

        /*
*   @param content {object}     Object has the form:
        ```
        {
            lang        : {string},
            contID      : {string},
            htmlList    : {string}
        }
        ```
*/
        module.exports = function(content) {


            blocks = relations[content.contID.replace(/\s/g, "_")];

            var textBlocks = getTextBlocks(content.htmlList, blocks);

            textBlocks.lang = content.lang;

            return textBlocks;
        }





        /*
var template = handlebars.compile("./xmltemplate.xml");
template({
    contID1 : [{da}, {it}],
    contID2 : [{da}, {it}]
});
*/