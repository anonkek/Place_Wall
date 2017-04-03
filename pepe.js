/**
 * Created by Evan on 4/2/2017.
 */
(function() {
    'use strict';

    console.log('Loaded /r/place Cooridination Script');

    $.ajaxSetup({ cache: false });
    var start = new Date();

    r.placeModule("placePaintBot", function(loader) {
        var c = loader("canvasse");

        var draw = function(options) {
            var p = r.place;

            if (p.getCooldownTimeRemaining() > 200) {
                return;
            }

            var image_data = [];
            for (var relY = 0; relY < options.image.length; relY++) {
                var row = options.image[relY];
                for (var relX = 0; relX < row.length; relX++) {
                    var color = options.colors[row[relX]] || -1;
                    if (color < 0) {
                        continue;
                    }
                    var absX = options.x + relX;
                    var absY = options.y + relY;
                    image_data.push(absX);
                    image_data.push(absY);
                    image_data.push(color);
                }
            }

            //p.panX = options.x;
            //p.panY = options.y;`
            for (var i = 0; i < image_data.length; i += 3) {
                var j = Math.floor((Math.random() * image_data.length) / 3) * 3;
                var x = image_data[j + 0];
                var y = image_data[j + 1];
                var color = image_data[j + 2];
                var currentColor = p.state[c.getIndexFromCoords(x, y)];

                if (currentColor != color) {
                    console.log("set color for", x, y, "old", currentColor, "new", color);
                    p.setColor(color);
                    p.drawTile(x, y);
                    return;
                }
            }
            console.log("noop");
        };

        var getData = function(action) {


            $.getJSON('https://raw.githubusercontent.com/anonkek/Place_Wall/master/pepe.json', function(data) {

                // Removed the time delay so that it starts drawing immediately
//             if (!data.time) {
//               console.log('Waiting...');
//               return;
//             }

//             var launch = new Date(data.time);
//             if (launch < start) {
//               console.log('Waiting...');
//               return;
//             }

//             var now = new Date();
//             if (now < launch) {
//               console.log('Launch time set for ' + data.time + '. Waiting...');
//               return;
//             }
                action(data);
            });
        };

        setInterval(function() {
            getData(draw);
        }, 1500);
    });
})();