// Store our API endpoint inside queryUrl=>M1.0+ Earthquakes
var queryUrl = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson";

// Perform a GET request to the query URL
d3.json(queryUrl).then(function (data) {
    console.log(data.features);
    // Once we get a response, send the data.features object to the createFeatures function
    createFeatures(data.features);
});

    function createFeatures(earthquakes) {

        // Define streetmap and create the tile layer that will be the background of our map
        var streetmap = L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
            attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
            tileSize: 512,
            maxZoom: 18,
            zoomOffset: -1,
            id: "mapbox/streets-v11",
            accessToken: API_KEY
        });

        // // create the map with our layers => mapid per html
        // var myMap = L.map("map", {
        //     center: [
        //         37.09, -95.71
        //     ],
        //     zoom: 5,
        //     layer: streetmap
        // })

        // // add the streat map to our map
        // streetmap.addTo(myMap);

        //Array that holds all circles
        var myCircleArray = new Array();

        // Loop through the cities array 
        for (var i = 0; i < earthquakes.length; i++) {

            coordinates = [earthquakes[i].geometry.coordinates[1], earthquakes[i].geometry.coordinates[0]]
            properties = earthquakes[i].properties;


            // mapcolor function based on the magnitude using switch and case statements
            function magColor(mag) {
                switch (true) {
                    case mag > 1:
                        return "#eaea2c";
                    case mag > 2:
                        return "#eaa82c";
                    case mag > 3:
                        return "#ea822c";
                    case mag > 4:
                        return "##ea5b2c";
                    case mag > 5:
                        return "#ea422c";
                }
            }
            // Add circles to map
            var myCircle = L.circle(coordinates, {
                fillOpacity: 0.75,

                color: magColor,
                fillColor: magColor,

                radius: (properties.mag * 10000)
            }).bindPopup("<h3>" + properties.place +
                "</h3><hr><p>" + new Date(properties.time) + "</p>");

            myCircleArray.push(myCircle);
        }

        //  create the map with our layers => mapid per html
        var myMap = L.map("map", {
            center: [
                37.09, -95.71
            ],
            zoom: 5,
            layer: streetmap
        })
    // add the streat map to our map
        streetmap.addTo(myMap);
    }
