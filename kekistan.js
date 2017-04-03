/**
 * Created by Evan on 4/2/2017.
 */
(function() {
    'use strict';
    console.log('Loaded /r/place Coordination Script');
    $.ajaxSetup({ cache: false });
    var getData = function(action) {
        $.getJSON('https://raw.githubusercontent.com/anonkek/Place_Wall/master/kekistan.json', function(data) {
            action(data);
        });
    },
        test = false;
    r.placeModule("placePaintBot", function(loader) {
        var c = loader("canvasse"),
            client = loader("client"),
            color;
        var draw = function(options) {
            var p = r.place;
            if (!test && p.getCooldownTimeRemaining() > 200) {
                return;
            }
            var image_data = [],
                colorsABGR = [];
            if(test){
                for(var i = 0; i < client.palette.length; i++){
                    colorsABGR[i] = client.getPaletteColorABGR(i);
                }
            }

            for (var i = 0; i < image_data.length; i += 3) {
                var j = Math.floor((Math.random() * image_data.length) / 3) * 3,
                    x = image_data[j],
                    y = image_data[j + 1],
                    color = image_data[j + 2],
                    currentColor = p.state[c.getIndexFromCoords(x, y)];
                if (currentColor != color) {
                    console.log("set color for", x, y, "old", currentColor, "new", color);
                    if(test){
                        c.drawTileAt(x, y, colorsABGR[color]);
                    }
                    else{
                        p.setColor(color);
                        p.drawTile(x, y);
                    }
                    return;
                }
            }
        };

        setInterval(function() {
            getData(draw);
        }, test ? 100 : 1500);
    });
})();