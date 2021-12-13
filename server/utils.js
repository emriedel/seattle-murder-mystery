class sceneWithOptions {
    constructor (introText, optionsList) {
        this.introText = introText;
        this.optionsList = optionsList;
    }
}

module.exports = {

    // returns an object that maps sceneIds to scenes
    // a scene has introText and a list of options
    // an option has text and a destination, which is another sceneId
    parseScenesTextFile : function (setScenesData) {
        var filename = "./server/files/scenes.txt";
        var lineReader = require('line-reader');
        var lines = [];
        var scenes = {};

        lineReader.eachLine(filename, function(line, last) {
            lines.push(line);
            
            if(last){
                var sceneId = null;
                var introText = null;
                var options = [];
                var option = {
                    text : null,
                    destination : null,
                }
                
                for (var i = 0; i < lines.length; i++) {
                    var line = lines[i];
                    if (!line || line.length === 0) {
                        //add the new scene
                        scenes[sceneId] = new sceneWithOptions(introText, options)
                        
                        //reset the scene for the new one
                        sceneId = null;
                        introText = null;
                        options = [];
                        option = {
                            text : null,
                            destination : null,
                        }

                        continue;
                    }
        
                    if (sceneId === null) {
                        sceneId = line;
                        continue;
                    }
        
                    if (introText === null) {
                        introText = line;
                        continue;
                    }
        
                    if (option.text === null) {
                        option.text = line;
                        continue;
                    }

                    if (option.destination === null) {
                        option.destionation = line;
                        options.push(option);
                        var option = {
                            text : null,
                            destination : null,
                        }
                        continue;
                    }

                    console.log("something is wrong if it made it here", line);
                }

                //console.log(scenes);
                setScenesData(scenes);
            }
        });
        
    },

    // returns a object that maps location pairs to the starting scenes for those locations
    parseLocationsTextFile : function (setLocationsData) {
        var filename = "./server/files/locationTriggers.txt";
        var lineReader = require('line-reader');
        var lines = [];
        var locations = {};

        lineReader.eachLine(filename, function(line, last) {
            lines.push(line);
            
            if(last){
                var location = null;
                var destinationScene = null;
                
                for (var i = 0; i < lines.length; i++) {
                    var line = lines[i];
                    if (!line || line.length === 0) {
                        continue;
                    }
        
                    if (location === null) {
                        location = line;
                        continue;
                    }
        
                    if (destinationScene === null) {
                        destinationScene = line;

                        //add the new location
                        locations[location] = destinationScene
                        
                        //reset everything
                        location = null;
                        destinationScene = null;
                        continue;
                    }

                    console.log("something is wrong if it made it here", line);
                }

                //console.log(locations);
                setLocationsData(locations);
            }
        });
        
    },
    
    // finds distance in feet between the two coordinate pairs
    findDistanceBetweenCoordinates : function (lat1, long1, lat2, long2) {
        lat1 = lat1 / (180/Math.PI);
        long1 = long1 / (180/Math.PI);
        lat2 = lat2 / (180/Math.PI);
        long2 = long2 / (180/Math.PI);

        let distance = 3963 * Math.acos((Math.sin(lat1) * Math.sin(lat2)) + Math.cos(lat1) * Math.cos(lat2) * Math.cos(long2-long1));
        distance = distance * 5280;
        return distance;
    },
}