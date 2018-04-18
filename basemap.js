//console.log("Wallo Helt!");

let myMap = L.map("mapdiv"); // L Leaflet Bibliothek, .map erzeugt neue Karte in mein mapdiv

//Hintergrundkarte mit Openstreet Map
// {z} Zoom; {x} Länge {y} Breite {s} Subdomains, Kacheln
let myLayers = {
    osmlayer: L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"),
    geolandbasemap: L.tileLayer("https://{s}.wien.gv.at/basemap/geolandbasemap/normal/google3857/{z}/{y}/{x}.png",{
        subdomains : ["maps","maps1","maps2","maps3","maps4"],
        attribution : "Datenquelle: <a href = 'https://www.basemap.at'>basemap.at</a>"
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

myMap.addLayer(myLayers.geolandbasemap); // Karte mit Hintergrundlayer verknüpfen

let myMapControl = L.control.layers({
    "OpenStreetMap" : myLayers.osmlayer,
    "BaseMap.at" : myLayers.geolandbasemap,
    "BaseMap Overlay" : myLayers.bmapoverlay,
    "BaseMap Grau" : myLayers.bmapgrau,
    "BaseMap High DPI" : myLayers.bmaphidpi,
    "BaseMap Orthofoto" : myLayers.bmaporthofoto30cm
});
myMap.addControl(myMapControl);

myMap.setView([47.267,11.383],11); //Übergabe Koordinaten (Array, Zentrum) und Zoomfaktor für Karte
