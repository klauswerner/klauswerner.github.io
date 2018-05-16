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

let myMap = L.map("map");

// für fitBounds
const biketourTrack = L.featureGroup().addTo(myMap);
const biketourMarker = L.featureGroup().addTo(myMap);

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
    )
};

//Default Hintergrundkarte
myMap.addLayer(myLayers.geolandbasemap);

//Default Overlaykarte
//myMap.addLayer(biketourTrack);

//Kartenansichten schalten und zu Karte hinzufügen(aktivieren)
let myMapControl = L.control.layers({
    "OSM BaseMap": myLayers.osmlayer,
    "BaseMap.at": myLayers.geolandbasemap,
    "Elektronische Karte Tirol Sommer": myLayers.gdi_summer,
    "Elektronische Karte Tirol Winter": myLayers.gdi_winter,
    "Elektronische Karte Tirol Orthofoto": myLayers.gdi_ortho
}, {
        "biketourTrack Etappe 14": biketourTrack,
        "Start - Ziel": biketourMarker,
    }, {
        collapsed: true
    }).addTo(myMap);

//Kartenansichten Kontrollpanel aktivieren
//myMap.addControl(myMapControl);

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
let gpxTrack = new L.GPX("data/etappe14.gpx", {async: true}).addTo(myMap);
gpxTrack.on("loaded",function(evt){

    /*console.log(evt.target.get_distance().toFixed(0));
    console.log(evt.target.get_elevation_min().toFixed(0));
    console.log(evt.target.get_elevation_max().toFixed(0));
    console.log(evt.target.get_elevation_min().toFixed(0));
    console.log(evt.target.get_elevation_max().toFixed(0));*/
    let laenge = evt.target.get_distance().toFixed(0);
    document.getElementById("laenge").innerHTML = laenge;
    myMap.fitBounds(evt.target.getBounds());

});

