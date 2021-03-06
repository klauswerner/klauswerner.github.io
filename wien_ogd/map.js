// Leaflet Karte initialisieren
let karte = L.map("divKarte");

// Gruppe für GeoJSON Layer definieren
let geojsonGruppe = L.featureGroup().addTo(karte);

// Grundkartenlayer definieren
const grundkartenLayer = {
    osm: L.tileLayer(
        "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
            subdomains: ["a", "b", "c"],
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }
    ),
    geolandbasemap: L.tileLayer(
        "https://{s}.wien.gv.at/basemap/geolandbasemap/normal/google3857/{z}/{y}/{x}.png", {
            subdomains: ["maps", "maps1", "maps2", "maps3", "maps4"],
            attribution: "Datenquelle: <a href='https://www.basemap.at'>basemap.at</a>"
        }
    ),
    bmapoverlay: L.tileLayer(
        "https://{s}.wien.gv.at/basemap/bmapoverlay/normal/google3857/{z}/{y}/{x}.png", {
            subdomains: ["maps", "maps1", "maps2", "maps3", "maps4"],
            attribution: "Datenquelle: <a href='https://www.basemap.at'>basemap.at</a>"
        }
    ),
    bmapgrau: L.tileLayer(
        "https://{s}.wien.gv.at/basemap/bmapgrau/normal/google3857/{z}/{y}/{x}.png", {
            subdomains: ["maps", "maps1", "maps2", "maps3", "maps4"],
            attribution: "Datenquelle: <a href='https://www.basemap.at'>basemap.at</a>"
        }
    ),
    bmaphidpi: L.tileLayer(
        "https://{s}.wien.gv.at/basemap/bmaphidpi/normal/google3857/{z}/{y}/{x}.jpeg", {
            subdomains: ["maps", "maps1", "maps2", "maps3", "maps4"],
            attribution: "Datenquelle: <a href='https://www.basemap.at'>basemap.at</a>"
        }
    ),
    bmaporthofoto30cm: L.tileLayer(
        "https://{s}.wien.gv.at/basemap/bmaporthofoto30cm/normal/google3857/{z}/{y}/{x}.jpeg", {
            subdomains: ["maps", "maps1", "maps2", "maps3", "maps4"],
            attribution: "Datenquelle: <a href='https://www.basemap.at'>basemap.at</a>"
        }
    ),
}

// Map control mit Grundkarten und GeoJSON Overlay definieren
let kartenAuswahl = L.control.layers({
    "Openstreetmap": grundkartenLayer.osm,
    "basemap.at Grundkarte": grundkartenLayer.geolandbasemap,
    "basemap.at grau": grundkartenLayer.bmapgrau,
    "basemap.at Orthofoto": grundkartenLayer.bmaporthofoto30cm,
}, {
    "GeoJSON Layer": geojsonGruppe,
});
karte.addControl(kartenAuswahl);

// Grundkarte "grau" laden
karte.addLayer(grundkartenLayer.bmapgrau)

// Maßstabsleiste metrisch hinzufügen
L.control.scale({
    maxWidth: 200,
    imperial: false,
}).addTo(karte);

// asynchrone Funktion zum Laden eines GeoJSON Layers
async function ladeGeojsonLayer(datenattribute) {
    const response = await fetch(datenattribute.json);
    const response_json = await response.json();

    // GeoJSON Geometrien hinzufügen und auf Ausschnitt zoomen
    const geojsonObjekt = L.geoJSON(response_json,{
       // für alle Layer alle Attribute als PopUps einbinden!
        onEachFeature: function(feature, layer){
            //console.log(feature.properties);
            let popup = "<h3>Attribute:<br/></h3>";
            for(attribut in feature.properties){ //neumoderne for Schleife
                let wert = feature.properties[attribut];
                if(wert && wert.toString().startsWith("http")){ // Abfrage, wenn wert vorhanden, dann umwandeln zu string
                    popup += `${attribut} : <a href="${wert}">Weblink</a> <br/>`; 
                }else{
                //console.log(attribut, feature.properties[attribut]);
                popup += `${attribut} : ${wert} <br/>`; // += wichtig, fügt bei jeder for Iteration hinzu und ersetzt nicht!
            }}
            //console.log(popup);
            layer.bindPopup(popup,{
                maxWidth: 600,
            });
        },
            pointToLayer : function (geoJsonPoint, latlng) {
                if(datenattribute.icon){
                    return L.marker(latlng, {
                        icon: L.icon({
                            iconUrl: datenattribute.icon,
                            iconAnchor: [16, 32],
                            popupAnchor: [0,-32],
                        })
                    }); 
                   // console.log(datenattribute.icon);
                }else{
                    //console.log("null");  
                    return L.marker(latlng);
                }
            }
        
    });
    
    geojsonGruppe.addLayer(geojsonObjekt);
    karte.fitBounds(geojsonGruppe.getBounds());
}

//Alphabetisch Sortieren
wienDatensaetze.sort(
    function(a,b){
        if(a.titel < b.titel){
            return -1;
        }else if(a.titel > b.titel){
            return 1;
        }else{
            return 0;
        }
    }
);

// den GeoJSON Layer für Grillplätze laden - Default
ladeGeojsonLayer(wienDatensaetze[0]);
//console.log(wienDatensaetze);

//Pull Down Menü einbauen
let layerAuswahl = document.getElementById("layerAuswahl");

for (i = 0; i < wienDatensaetze.length; i++){
    layerAuswahl.innerHTML += `<option value="${i}">${wienDatensaetze[i].titel}</option>` 
    //console.log(i,wienDatensaetze[i].titel);
}

//Events einbauen
layerAuswahl.onchange = function(evt){
    geojsonGruppe.clearLayers();
    let i = evt.target.value;
    //console.log(i, wienDatensaetze[i]);
    ladeGeojsonLayer(wienDatensaetze[i]);
};

//Plugin Fullscreen
karte.addControl(new L.Control.Fullscreen());