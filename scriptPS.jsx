#include json2.js

(function main() {
    var writeups = loadJson('test.json');
    for (var i=0; i<writeups.length; i++) {
        var writeup = writeups[i];
        processWriteup(writeup);
    }
})();

function processWriteup(writeup) {
    var doc = app.activeDocument;
    
    var toEditGroup = doc.layerSets.getByName('toEdit');                          //Select the toEdit Group.
    var titleLayer = toEditGroup.layers.getByName('title');                       //Select the Title layer.
    var writerLayer = toEditGroup.layers.getByName('writer');                     //Select the Writer layer.
    
    var shortieGroup = toEditGroup.layerSets.getByName('shortie');                //Select the Shortie Group.
    var scribbleGroup = toEditGroup.layerSets.getByName('scribble');              //Select the Scribble Group.
    var poemGroup = toEditGroup.layerSets.getByName('poem');                      //Select the Poem Group.
    var storyGroup = toEditGroup.layerSets.getByName('story');                    //Select the Story Group.
    
    hideLayers();                                                                 //Hide all the layers.
    
    titleLayer.textItem.contents = writeup.title;                                 //Add the Title of the writeup.
    writerLayer.textItem.contents = 'by ' + writeup.writer;                       //Add the Writer of the writeup.
    
    if (writeup.type == 1) {                                                      //If writeup is a shortie.
        var content = shortieGroup.layers.getByName('shortieContent');            
        content.textItem.contents = writeup.content;
        shortieGroup.visible = true;
        titleLayer.visible = true;
        writerLayer.visible = true;
        centerTextLayer(content);
    }
    
    else if (writeup.type == 2) {                                                 //If writeup is a scribble.
        var content = scribbleGroup.layers.getByName('scribbleContent');
        content.textItem.contents = writeup.content;
        scribbleGroup.visible = true;
        titleLayer.visible = true;
        writerLayer.visible = true;
        centerTextLayer(content);
    }
    
    else if (writeup.type == 3) {                                                 //If writeup is a poem.
        var content = poemGroup.layers.getByName('poemContent');
        content.textItem.contents = writeup.content;
        poemGroup.visible = true;
        titleLayer.visible = true;
        writerLayer.visible = true;
        centerTextLayer(content);
        
    }
    
    else if (writeup.type == 4) {                                                 //If writeup is a story.
        var content = storyGroup.layers.getByName('storyContent');
        content.textItem.contents = writeup.content;
        storyGroup.visible = true;
        titleLayer.visible = true;
        writerLayer.visible = true;
        centerTextLayer(content);
    }
    
    saveJPEG(writeup.id);                                                         //Save the template.
    hideLayers();                                                                 //Hide all the layers for next iteration.
    
    function hideLayers() {
        shortieGroup.visible = false;
        scribbleGroup.visible = false;
        poemGroup.visible = false;
        storyGroup.visible = false;
        
        titleLayer.visible = false;
        writerLayer.visible = false;
    }
}

function loadJson(relPath) {
    var script = new File($.fileName);
    var jsonFile = new File(script.path + '/' + relPath);
    
    jsonFile.open('r');                                                           //Open the JSON file for reading.
    var str = jsonFile.read();                                                    //Read everything and store it in variable 'str'.
    jsonFile.close();
    
    return JSON.parse(str);
}

function saveJPEG(name) {
    var doc = app.activeDocument;
    var file = new File(doc.path + '/Output/' + name + '.jpg');                   //Creates and specifies the path of the file which will be saved.
    var opts = new JPEGSaveOptions();                                             //Tells PS the details of how to save the JPEG File.
    opts.quality = 10;                                                            //Sets Quality of JPEG output file to 10.
    doc.saveAs(file, opts, true);                                                 //Saves the file.
}

function centerTextLayer(textContent) {
    var doc = app.activeDocument;
    var background = doc.layers.getByName('Background');
    background.isBackgroundLayer = true;
    
    var bounds = textContent.bounds;
    
	var allLock = textContent.allLocked;                                          //Remember text layer lock state.
	var posLock = textContent.positionLocked;

	textContent.allLocked = false;                                                //Unlock text layer.
	textContent.positionLocked = false;
    
    var docWidth = Number(doc.width);                                             //Save document dimensions.
	var docHeight = Number(doc.height);

	var textContentWidth = Number(bounds[2] - bounds[0]);                         //Get text layer dimensions
	var textContentHeight = Number(bounds[3] - bounds[1]);

	var dX = (docWidth - textContentWidth) / 2 - Number(bounds[0]);               //Calculate offsets.
	var dY = (docHeight - textContentHeight) / 2 - Number(bounds[1]);

	textContent.translate(dX, dY);                                                //Centers text layer.

	textContent.allLocked = allLock;                                              //Restore original layer lock state.
	textContent.positionLocked = posLock;
}

/*
Thanks to StackOverFlow, the Adobe Community, Juriy Bura, and my Mom.
*/
