//1. Map erstellen und mit div verbinden
let myMap = L.map("mapdiv"); 

//Marker zu einer Gruppe zusammenfassen
let markerAWS = L.featureGroup();

//layers erstellen (BaseMap und Orthofoto)
let myLayers = {
    geolandbasemap: L.tileLayer("https://{s}.wien.gv.at/basemap/geolandbasemap/normal/google3857/{z}/{y}/{x}.png",{
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

//Einstellung Default Layer
myMap.addLayer(myLayers.geolandbasemap); //Karte mit Hintergrundlayer verknüpfen

let myMapControl = L.control.layers({   
    "BaseMap.at" : myLayers.geolandbasemap,
    "BaseMap Orthofoto" : myLayers.bmaporthofoto30cm
},{
    "Marker" : markerAWS,
},{
    collapsed: true
});
myMap.addControl(myMapControl);

//myMap.setView([47.267,11.383],11); //Übergabe Koordinaten (Array, Zentrum) und Zoomfaktor für Karte

let myMapScale = L.control.scale(
    {position: "bottomleft",
    metric: true,
    imperial: false,
    maxWidth: 200}
).addTo(myMap);

//Koordinaten
const Koordinaten = {
    uni : [47.264, 11.385],
    usi : [47.257, 11.356],
    technik: [47.263, 11.343],
    igls : [47.230, 11.408],
    patscherkofl : [47.208, 11.460]
};

//Marker
const markerOptions = {
    title: "Universität Innsbruck",     //http://leafletjs.com/reference-1.3.0.html#marker-title
    draggable: true,                    //http://leafletjs.com/reference-1.3.0.html#marker-draggable
    opacity: 0.80                       //http://leafletjs.com/reference-1.3.0.html#marker-opacity
}

//L.marker(Koordinaten.uni, markerOptions).addTo(markerGroup);    //http://leafletjs.com/reference-1.3.0.html#marker
//L.marker(Koordinaten.usi, markerOptions).addTo(markerGroup);
//L.marker(Koordinaten.technik, markerOptions).addTo(markerGroup);

//PopUps
//let patscherkoflmarker = L.marker(Koordinaten.patscherkofl, markerOptions2).addTo(markerGroup2); 
//L.marker(Koordinaten.igls, markerOptions2).addTo(markerGroup2); 

//patscherkoflmarker.bindPopup("<p>Patscherkofl:</p><img style='width:200px'src='https://apps.tirol.gv.at/luft/nordkette.jpg' alt='Patscherkofl' />");

//Start Zoom
//myMap.fitBounds(markerAWS.getBounds()); 
myMap.setView([47.267,11.383],11);