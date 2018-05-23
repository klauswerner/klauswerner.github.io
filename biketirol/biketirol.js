/*
    Vorbereitung: GPX Track herunterladen und nach GeoJSON konvertieren
    -------------------------------------------------------------------
    Datenquelle https://www.data.gv.at/suche/?search-term=bike+trail+tirol&searchIn=catalog
    Download Einzeletappen / Zur Ressource ...
    Alle Dateien im unterverzeichnis data/ ablegen
    Die .gpx Datei der eigenen Etappe als etappe00.gpx speichern
    Die .gpx Datei über https://mapbox.github.io/togeojson/ in .geojson umwandeln und als etappe00.geojson speichern
    Die etappe00.geojson Datei in ein Javascript Objekt umwandeln und als etappe00.geojson.js speichern

    -> statt 00 natürlich die eigene Etappe (z.B. 01,02, ...25)
*/

// eine neue Leaflet Karte definieren

// Grundkartenlayer mit OSM, basemap.at, Elektronische Karte Tirol (Sommer, Winter, Orthophoto jeweils mit Beschriftung) über L.featureGroup([]) definieren
// WMTS URLs siehe https://www.data.gv.at/katalog/dataset/land-tirol_elektronischekartetirol

// Maßstab metrisch ohne inch

// Start- und Endpunkte der Route als Marker mit Popup, Namen, Wikipedia Link und passenden Icons für Start/Ziel von https://mapicons.mapsmarker.com/

// GeoJSON Track als Linie in der Karte einzeichnen und auf Ausschnitt zoomen
// Einbauen nicht über async, sondern über ein L.geoJSON() mit einem Javascript Objekt (wie beim ersten Stadtspaziergang Wien Beispiel)

// Baselayer control für OSM, basemap.at, Elektronische Karte Tirol hinzufügen

// Overlay controls zum unabhängigem Ein-/Ausschalten der Route und Marker hinzufügen

// / <reference path = "typings/index.d.ts" />

let myMap = L.map("map");

// für fitBounds
const biketourTrack = L.featureGroup().addTo(myMap);
const biketourMarker = L.featureGroup().addTo(myMap);
const biketourElevation = L.featureGroup().addTo(myMap);

//Hintergrundkarten
let myLayers = {
    osmlayer: L.tileLayer(
        "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
            subdomains: ["a", "b", "c"],
            attribution: "Datenquelle: <a href = 'https://www.openstreetmap.org'>openstreetmap.org</a>"
        }),
    geolandbasemap: L.tileLayer("https://{s}.wien.gv.at/basemap/geolandbasemap/normal/google3857/{z}/{y}/{x}.png", {
        subdomains: ["maps", "maps1", "maps2", "maps3", "maps4"],
        attribution: "Datenquelle: <a href = 'https://www.basemap.at'>basemap.at</a>"
    }
    ), //tilematrix=zoom tilecol=x and tilerow=y 9/273/179 10/548/358 11/1093/716
    gdi_summer: L.tileLayer("http://wmts.kartetirol.at/wmts/gdi_summer/GoogleMapsCompatible/{z}/{x}/{y}.jpeg80", {
    minZoom: 0,
    maxZoom: 18,    
    attribution: "Datenquelle: <a href = 'https://www.tirol.gv.at/statistik-budget/tiris/tiris-geodatendienste/impressum-elektronische-karte-tirol/'>Elektronische Karte Tirol</a>"
    }
    ),
    gdi_winter: L.tileLayer("http://wmts.kartetirol.at/wmts/gdi_winter/GoogleMapsCompatible/{z}/{x}/{y}.jpeg80", {
    minZoom: 0,
    maxZoom: 18,     
    attribution: "Datenquelle: <a href = 'https://www.tirol.gv.at/statistik-budget/tiris/tiris-geodatendienste/impressum-elektronische-karte-tirol/'>Elektronische Karte Tirol</a>"
    }
    ),
    gdi_ortho: L.tileLayer("http://wmts.kartetirol.at/wmts/gdi_ortho/GoogleMapsCompatible/{z}/{x}/{y}.jpeg80", {
    minZoom: 0,
    maxZoom: 18,     
    attribution: "Datenquelle: <a href = 'https://www.tirol.gv.at/statistik-budget/tiris/tiris-geodatendienste/impressum-elektronische-karte-tirol/'>Elektronische Karte Tirol</a>"
    }
    ),
    gdi_nomenklatur: L.tileLayer("http://wmts.kartetirol.at/wmts/gdi_nomenklatur/GoogleMapsCompatible/{z}/{x}/{y}.jpeg80", {
    minZoom: 0,
    maxZoom: 18,     
    attribution: "Datenquelle: <a href = 'https://www.tirol.gv.at/statistik-budget/tiris/tiris-geodatendienste/impressum-elektronische-karte-tirol/'>Elektronische Karte Tirol</a>"
    }
    )
};

const tirisSommerkarte = L.layerGroup([
    myLayers.gdi_summer,
    myLayers.gdi_nomenklatur,
]);
const tirisWinterkarte = L.layerGroup([
    myLayers.gdi_winter,
    myLayers.gdi_nomenklatur,
]);
const tirisOrthofoto = L.layerGroup([
    myLayers.gdi_ortho,
    myLayers.gdi_nomenklatur,
]);


//Default Hintergrundkarte
myMap.addLayer(myLayers.geolandbasemap);

//Default Overlaykarte
//myMap.addLayer(biketourTrack);

//Kartenansichten schalten und zu Karte hinzufügen(aktivieren)
let myMapControl = L.control.layers({
    "OSM BaseMap": myLayers.osmlayer,
    "BaseMap.at": myLayers.geolandbasemap,
    "Elektronische Karte Tirol Sommer": tirisSommerkarte,
    "Elektronische Karte Tirol Winter": tirisWinterkarte,
    "Elektronische Karte Tirol Orthofoto": tirisOrthofoto,
}, {
        //"biketourTrack Etappe 14": biketourTrack,
        "Start - Ziel": biketourMarker,
        "Steigungslinie": biketourElevation,
    }, {
        collapsed: true
    }).addTo(myMap);

//Kartenansichten Kontrollpanel aktivieren
//myMap.addControl(myMapControl);

//Plugin Eleveation 
//all used options are the default values
let el = L.control.elevation({	
    position: "topright",
    theme: "steelblue-theme", //default: lime-theme
    collapsed: true,
}).addTo(myMap);

//Maßstaß erstellen und hinzufügen
let myMapScale = L.control.scale(
    {
        position: "bottomleft",
        metric: true,
        imperial: false,
        maxWidth: 200
    }
).addTo(myMap);

const SZ_Koordinaten = {
    start : [47.431846, 12.214388],
    ziel : [47.39918, 11.943173],
};

const myIconStart = L.icon({
    iconUrl: 'images/cycling.png',
    iconAnchor: [16, 37]
});

const myIconZiel = L.icon({
    iconUrl: 'images/finish2.png',
    iconAnchor: [16, 37]
});

const markerOptionStart = {
    title: "Westendorf",
    draggable: false,
    opacity: 0.90,
    icon: myIconStart
};

const markerOptionZiel = {
    title: "Innsbrucker Umland",
    draggable: false,
    opacity: 0.90,
    icon: myIconZiel
};

L.marker(SZ_Koordinaten.start, markerOptionStart).bindPopup("<p>Start: Westendorf</p><a href='https://de.wikipedia.org/wiki/Westendorf_(Tirol)'>Westendorf</a>").addTo(biketourMarker);
L.marker(SZ_Koordinaten.ziel, markerOptionZiel).bindPopup("<p>Ziel: Alpbach</p><a href='https://de.wikipedia.org/wiki/Alpbach'>Alpach</a>").addTo(biketourMarker);

// lokales geojson wird eingebunden 

//const geojson = L.geoJSON(biketourTrackdata).addTo(biketourTrack);
/*
geojson.bindPopup(function(layer){
    const props = layer.feature.properties;
    const popupText = `<h2>${props.name}</h2>
    <p>Westendorf - Alpbach</p>`;
    return popupText;
});*/

//myMap.fitBounds(biketourTrack.getBounds()); 

//Plugin Fullscreen
myMap.addControl(new L.Control.Fullscreen());

//Plugin GPX
let gpxTrack = new L.GPX("data/etappe14.gpx", {async: true});//.addTo(biketourTrack);
gpxTrack.on("loaded",function(evt){

    /*console.log(evt.target.get_distance().toFixed(0));
    console.log(evt.target.get_elevation_min().toFixed(0));
    console.log(evt.target.get_elevation_max().toFixed(0));
    console.log(evt.target.get_elevation_min().toFixed(0));
    console.log(evt.target.get_elevation_max().toFixed(0));*/
    let laenge = evt.target.get_distance().toFixed(0);
    let tPkt = evt.target.get_elevation_min().toFixed(0);
    let hPkt = evt.target.get_elevation_max().toFixed(0);
    let aufs = evt.target.get_elevation_gain().toFixed(0);
    let abs = evt.target.get_elevation_loss().toFixed(0);

    document.getElementById("laenge").innerHTML = laenge;
    document.getElementById("tPkt").innerHTML = tPkt;
    document.getElementById("hPkt").innerHTML = hPkt;
    document.getElementById("aufs").innerHTML = aufs;
    document.getElementById("abs").innerHTML = abs;
    
    myMap.fitBounds(evt.target.getBounds());

});

gpxTrack.on("addline",function(evt){
    el.addData(evt.line);
    //console.log(evt.line);
    //console.log(evt.line.getLatLngs());
    //console.log(evt.line.getLatLngs()[0]);
    //console.log(evt.line.getLatLngs()[0].lat);
    //console.log(evt.line.getLatLngs()[0].lng);
    //console.log(evt.line.getLatLngs()[0].meta);
    //console.log(evt.line.getLatLngs()[0].meta.ele);

    //alle Segmente der Steigungslinie hinzufügen
    const gpxlinie = evt.line.getLatLngs();
    for(i = 1; i < gpxlinie.length; i++ ){
        let p1 = gpxlinie[i-1];
        let p2 = gpxlinie[i];
    //Anstand zwischen Puntke berechnen
        let dist = myMap.distance(
            [p1.lat,p1.lng],
            [p2.lat,p2.lng]
        );
    //Höhenunterschied berechnen
        let delta = p2.meta.ele - p1.meta.ele
    
    //Steigung in Prozent berechnen
    //Neumoderne IF: Bedingung ? Ausdruck1 : Ausdruck2
        let prot = (dist > 0) ? (delta/dist*100.0).toFixed(0) : 0;

       /* alt
        let prot = 0;
        if(dist>0){
        let prot = (delta/dist*100.0).toFixed(1);
        }*/

        //console.log(p1.lat, p1.lng, p1.meta.ele, p2.lat, p2.lng, p2.meta.ele, dist, delta, prot);

        let farbe = 
            prot > 10   ? "#a50f15" : 
            prot > 6    ? "#de2d26" : 
            prot > 2    ? "#fb6a4a" : 
            prot > 0    ? "#fcae91" : 
            prot > -2   ? "#bae4b3" : 
            prot > -6   ? "#74c476" : 
            prot > -10  ? "#31a354" : 
                          "#006d2c";

        let segment = L.polyline(
            [
                [p1.lat,p1.lng], 
                [p2.lat,p2.lng],
            ],{
            color: farbe,
            weight: 8.0,
        }).addTo(biketourElevation);
    }

});

