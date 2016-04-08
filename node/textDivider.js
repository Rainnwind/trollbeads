var maxHeaderLength = 300,
    maxTextLength   = 500,
    maxSubHeaderLength = 300;


/*
*   @param htmlList 
*   @param blockTypes   {list}  List of strings, each string will become a key where the value is the text
                                that belongs to it. 
*/
module.exports =  function(htmlList, blockTypes) {
    var textBlocks  = {},
        Rpattern    = /\.(\<|\s|$)|\"\s|\u3002/,
        Lpattern    = /(\<|\s|^)\.|\s\"|\u3002/;

    if(htmlList.length === blockTypes.length) {
        // Assume 1:1 relationship
        blockTypes.forEach(function(type, index) {
            // do the logic dance
            textBlocks[type] = htmlList[index];
        });
    } else {
        // different number of blocks expected, so parse and divide
        textString = htmlList.join(" ")
        // textBlocks = getTextBlocks(htmlString, content.blocks);
    
        blockTypes.forEach(function(blockType, index) {
            var maxLength,
                useLastDot = true; 
            switch (blockType) {

                case "blockHeader":
                    maxLength = maxHeaderLength;
                    useLastDot = false;
                    break;

                case "blockText":
                    // maxLength = maxTextLength;
                    maxLength = Infinity;
                    break;

                case "blockSubHeader":
                    maxLength = maxSubHeaderLength;
                    useLastDot = false;
                    break;
                default: 
                    maxlength = Infinity;
            }

            if (blockTypes.length === 1  ||
                index === blockTypes.length -1) {

                textBlocks[blockType] = textString;

            } else  {

                var portion = textString.length / blockTypes.length;
                    if (portion > maxLength) {
                        portion = maxLength;
                    }

                    portion = textString.slice(0, portion);

                if (useLastDot) {

                    var lastDot = portion.split("").reverse().join("").search(Lpattern);
                        lastDot = portion.length - lastDot;

                        textBlocks[blockType] = textString.slice(0, lastDot - 1);
                        textString = textString.slice(lastDot);
                } else {
                    var lastDot = portion.search(Rpattern);

                    textBlocks[blockType] = textString.slice(0, lastDot +1 );
                    textString = textString.slice(lastDot + 2);
                }


            }
        });
    }

    return textBlocks;

}