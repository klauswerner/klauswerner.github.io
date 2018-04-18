//console.log("Wallo Helt!");

let myMap = L.map("mapdiv"); // L Leaflet Bibliothek, .map erzeugt neue Karte in mein mapdiv
let myLayer = L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"); //Hintergrundkarte mit Openstreet Map

myMap.addLayer(myLayer); // Karte mit Hintergrundlayer verknüpfen
myMap.setView([47.267,11.383],11); //Übergabe Koordinaten und Zoomfaktor für Karte
