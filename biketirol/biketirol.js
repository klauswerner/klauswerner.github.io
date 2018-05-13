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
const biketour = L.featureGroup();

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
    ),
    gdi_base_summer: L.tileLayer("http://wmts.kartetirol.at/wmts/gdi_base_summer/GoogleMapsCompatible/11/2/84.jpeg80", {
        //subdomains: ["maps", "maps1", "maps2", "maps3", "maps4"],
        attribution: "Datenquelle: <a href = 'https://www.tirol.gv.at/statistik-budget/tiris/tiris-geodatendienste/impressum-elektronische-karte-tirol/'>Elektronische Karte Tirol</a>"
    }
    ),
    gdi_base_winter: L.tileLayer("http://wmts.kartetirol.at/wmts/gdi_base_winter/{TileMatrixSet}/{TileMatrix}/{TileCol}/{TileRow}.jpeg80", {
        //subdomains: ["maps", "maps1", "maps2", "maps3", "maps4"],
        attribution: "Datenquelle: <a href = 'https://www.tirol.gv.at/statistik-budget/tiris/tiris-geodatendienste/impressum-elektronische-karte-tirol/'>Elektronische Karte Tirol</a>"
    }
    ),
    gdi_ortho: L.tileLayer("http://wmts.kartetirol.at/wmts/gdi_ortho/{TileMatrixSet}/{TileMatrix}/{TileCol}/{TileRow}.jpeg80", {
        //subdomains: ["maps", "maps1", "maps2", "maps3", "maps4"],
        attribution: "Datenquelle: <a href = 'https://www.tirol.gv.at/statistik-budget/tiris/tiris-geodatendienste/impressum-elektronische-karte-tirol/'>Elektronische Karte Tirol</a>"
    }
    ),
};

//Default Hintergrundkarte
myMap.addLayer(myLayers.geolandbasemap);

//Default Overlaykarte
myMap.addLayer(biketour);

//Kartenansichten schalten und zu Karte hinzufügen(aktivieren)
let myMapControl = L.control.layers({
    "OSM BaseMap": myLayers.osmlayer,
    "BaseMap.at": myLayers.geolandbasemap,
    "Elektronische Karte Tirol Sommer": myLayers.gdi_base_summer,
    "Elektronische Karte Tirol Winter": myLayers.gdi_base_winter,
    "Elektronische Karte Tirol Orthofoto": myLayers.gdi_ortho
}, {
        "Biketour Etappe 14": biketour,
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

myMap.setView([47.4457314,11.9750545],11);


/*
// lokales geojson wird eingebunden
//Default aktiviert
myMap.addLayer(wienGroup);

let = geojson = L.geoJSON(wiendata).addTo(wienGroup);
geojson.bindPopup(function(layer){
    const props = layer.feature.properties;
    const popupText = `<h1>${props.NAME}</h1>
    <p>Kategorie: ${props.KATEGORIE} </br> Bemerkung: ${props.BEMERKUNG}</p>`;
    return popupText;

});
*/
//myMap.fitBounds(wienGroup.getBounds()); 