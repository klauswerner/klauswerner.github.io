let myMap = L.map("mapdiv"); // http://leafletjs.com/reference-1.3.0.html#map-l-map

let markerGroup = L.featureGroup();

let markerGroup2 = L.featureGroup();

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

myMap.addLayer(myLayers.geolandbasemap);    //http://leafletjs.com/reference-1.3.0.html#map-addlayer Karte mit Hintergrundlayer verknüpfen             //

let myMapControl = L.control.layers({   //http://leafletjs.com/reference-1.3.0.html#control-layers-l-control-layers
    "OpenStreetMap" : myLayers.osmlayer,
    "BaseMap.at" : myLayers.geolandbasemap,
    "BaseMap Grau" : myLayers.bmapgrau,
    "BaseMap High DPI" : myLayers.bmaphidpi,
    "BaseMap Orthofoto" : myLayers.bmaporthofoto30cm
},{
    "BaseMap Overlay" : myLayers.bmapoverlay,
    "Marker" : markerGroup,
    "Marker2" : markerGroup2
},{
    collapsed: false             //http://leafletjs.com/reference-1.3.0.html#control-layers-collapsed
});
myMap.addControl(myMapControl); //http://leafletjs.com/reference-1.3.0.html#map-addcontrol

myMap.setView([47.267,11.383],11); //http://leafletjs.com/reference-1.3.0.html#map-setview Übergabe Koordinaten (Array, Zentrum) und Zoomfaktor für Karte

//http://leafletjs.com/reference-1.3.0.html#control-scale-l-control-scale
let myMapScale = L.control.scale(
    {position: "bottomleft",    //Default bereits bottomleft; http://leafletjs.com/reference-1.3.0.html#control-scale-position
    metric: true,               //http://leafletjs.com/reference-1.3.0.html#control-scale-metric
    imperial: false,            //http://leafletjs.com/reference-1.3.0.html#control-scale-imperial
    maxWidth: 200}              //http://leafletjs.com/reference-1.3.0.html#control-scale-maxwidth
).addTo(myMap);
//myMap.addControl.scale(myMapScale);

const Koordinaten = {
    uni : [47.264, 11.385],
    usi : [47.257, 11.356],
    technik: [47.263, 11.343],
    igls : [47.230, 11.408],
    patscherkofl : [47.208, 11.460]
};

const patscherkoflPic = "https://apps.tirol.gv.at/luft/nordkette.jpg";

//myMap.addLayer(markerGroup);  
myMap.addLayer(markerGroup2);  

const markerOptions = {
    title: "Universität Innsbruck",     //http://leafletjs.com/reference-1.3.0.html#marker-title
    draggable: true,                    //http://leafletjs.com/reference-1.3.0.html#marker-draggable
    opacity: 0.80                       //http://leafletjs.com/reference-1.3.0.html#marker-opacity
}

const markerOptions2 = {
    title: "Innsbrucker Umland",     //http://leafletjs.com/reference-1.3.0.html#marker-title
    draggable: true,                    //http://leafletjs.com/reference-1.3.0.html#marker-draggable
    opacity: 0.50                       //http://leafletjs.com/reference-1.3.0.html#marker-opacity
}

L.marker(Koordinaten.uni, markerOptions).addTo(markerGroup);    //http://leafletjs.com/reference-1.3.0.html#marker
L.marker(Koordinaten.usi, markerOptions).addTo(markerGroup);
L.marker(Koordinaten.technik, markerOptions).addTo(markerGroup);

let patscherkoflmarker = L.marker(Koordinaten.patscherkofl, markerOptions2).addTo(markerGroup2); 
L.marker(Koordinaten.igls, markerOptions2).addTo(markerGroup2); 

patscherkoflmarker.bindPopup("<p>Patscherkofl:</p><img style='width:200px'src='https://apps.tirol.gv.at/luft/nordkette.jpg' alt='Patscherkofl' />");

let lift = L.polyline([Koordinaten.igls, Koordinaten.patscherkofl], {color: 'black'}).addTo(myMap);

let uniPolygon = L.polygon([Koordinaten.uni, Koordinaten.usi,Koordinaten.technik]).addTo(myMap);
uniPolygon.bindPopup("Ende!");

myMap.fitBounds(markerGroup.getBounds());                      //myMap.setView(markerGroup,14);