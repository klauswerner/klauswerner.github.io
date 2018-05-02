let myMap = L.map("mapdiv"); // http://leafletjs.com/reference-1.3.0.html#map-l-map

// für fitBounds
const wienGroup = L.featureGroup();

const url = "https://data.wien.gv.at/daten/geo?service=WFS&request=GetFeature&version=1.1.0&srsName=EPSG:4326&outputFormat=json&typeName=ogdwien:SPAZIERPUNKTOGD,ogdwien:SPAZIERLINIEOGD"

//Hintergrundkarte mit Openstreet Map
// {z} Zoom; {x} Länge {y} Breite {s} Subdomains, Kacheln
let myLayers = {
    osmlayer: L.tileLayer(  //http://leafletjs.com/reference-1.3.0.html#tilelayer
        "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",{
            subdomains : ["a","b","c"], //https://wiki.openstreetmap.org/wiki/Domain_names
            attribution : "Datenquelle: <a href = 'https://www.openstreetmap.org'>openstreetmap.org</a>"
            }),
    geolandbasemap: L.tileLayer("https://{s}.wien.gv.at/basemap/geolandbasemap/normal/google3857/{z}/{y}/{x}.png",{
        subdomains : ["maps","maps1","maps2","maps3","maps4"], //http://leafletjs.com/reference-1.3.0.html#tilelayer-subdomains
        attribution : "Datenquelle: <a href = 'https://www.basemap.at'>basemap.at</a>" //http://leafletjs.com/reference-1.3.0.html#layer-attribution
        }
    ),
    bmapoverlay: L.tileLayer("https://{s}.wien.gv.at/basemap/bmapoverlay/normal/google3857/{z}/{y}/{x}.png",{
        subdomains : ["maps","maps1","maps2","maps3","maps4"],
        attribution : "Datenquelle: <a href = 'https://www.basemap.at'>basemap.at</a>"
        }
    ),
    bmapgrau: L.tileLayer("https://{s}.wien.gv.at/basemap/bmapgrau/normal/google3857/{z}/{y}/{x}.png",{
        subdomains : ["maps","maps1","maps2","maps3","maps4"],
        attribution : "Datenquelle: <a href = 'https://www.basemap.at'>basemap.at</a>"
        }
    ),
    bmaphidpi: L.tileLayer("https://{s}.wien.gv.at/basemap/bmaphidpi/normal/google3857/{z}/{y}/{x}.jpeg",{
        subdomains : ["maps","maps1","maps2","maps3","maps4"],
        attribution : "Datenquelle: <a href = 'https://www.basemap.at'>basemap.at</a>"
        }
    ),
    bmaporthofoto30cm: L.tileLayer("https://{s}.wien.gv.at/basemap/bmaporthofoto30cm/normal/google3857/{z}/{y}/{x}.jpeg",{
        subdomains : ["maps","maps1","maps2","maps3","maps4"],
        attribution : "Datenquelle: <a href = 'https://www.basemap.at'>basemap.at</a>"
        }
    ),
};

myMap.addLayer(myLayers.geolandbasemap); // http://leafletjs.com/reference-1.3.0.html#map-addlayer Karte mit Hintergrundlayer verknüpfen

let myMapControl = L.control.layers({   //http://leafletjs.com/reference-1.3.0.html#control-layers-l-control-layers
    "OpenStreetMap" : myLayers.osmlayer,
    "BaseMap.at" : myLayers.geolandbasemap,
    "BaseMap Grau" : myLayers.bmapgrau,
    "BaseMap High DPI" : myLayers.bmaphidpi,
    "BaseMap Orthofoto" : myLayers.bmaporthofoto30cm
},{
    "BaseMap Overlay" : myLayers.bmapoverlay,
    "Stadtspaziergang" : wienGroup
},{
    collapsed: false             //http://leafletjs.com/reference-1.3.0.html#control-layers-collapsed
});
myMap.addControl(myMapControl); //http://leafletjs.com/reference-1.3.0.html#map-addcontrol

myMap.setView([47.267,11.383],11); //http://leafletjs.com/reference-1.3.0.html#map-setview Übergabe Koordinaten (Array, Zentrum) und Zoomfaktor für Karte

//http://leafletjs.com/reference-1.3.0.html#control-scale-l-control-scale
let myMapScale = L.control.scale(
    {position: "bottomleft",   // Default bereits bottomleft; http://leafletjs.com/reference-1.3.0.html#control-scale-position
    metric: true,            //http://leafletjs.com/reference-1.3.0.html#control-scale-metric
    imperial: false,          // http://leafletjs.com/reference-1.3.0.html#control-scale-imperial
    maxWidth: 200}             //http://leafletjs.com/reference-1.3.0.html#control-scale-maxwidth
).addTo(myMap);
//myMap.addControl.scale(myMapScale);


//Default aktiviert
myMap.addLayer(wienGroup);

let = geojson = L.geoJSON(wiendata).addTo(wienGroup);
geojson.bindPopup(function(layer){
    const props = layer.feature.properties;
    const popupText = `<h1>${props.NAME}</h1>
    <p>Kategorie: ${props.KATEGORIE} </br> Bemerkung: ${props.BEMERKUNG}</p>`;
    return popupText;

});

myMap.fitBounds(wienGroup.getBounds()); 