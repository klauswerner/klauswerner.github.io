let myMap = L.map("mapdiv");

// für fitBounds
const wienGroup_cb = L.featureGroup();
const clmarkers = L.markerClusterGroup();

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
    bmapoverlay: L.tileLayer("https://{s}.wien.gv.at/basemap/bmapoverlay/normal/google3857/{z}/{y}/{x}.png", {
        subdomains: ["maps", "maps1", "maps2", "maps3", "maps4"],
        attribution: "Datenquelle: <a href = 'https://www.basemap.at'>basemap.at</a>"
    }
    ),
    bmapgrau: L.tileLayer("https://{s}.wien.gv.at/basemap/bmapgrau/normal/google3857/{z}/{y}/{x}.png", {
        subdomains: ["maps", "maps1", "maps2", "maps3", "maps4"],
        attribution: "Datenquelle: <a href = 'https://www.basemap.at'>basemap.at</a>"
    }
    ),
    bmaphidpi: L.tileLayer("https://{s}.wien.gv.at/basemap/bmaphidpi/normal/google3857/{z}/{y}/{x}.jpeg", {
        subdomains: ["maps", "maps1", "maps2", "maps3", "maps4"],
        attribution: "Datenquelle: <a href = 'https://www.basemap.at'>basemap.at</a>"
    }
    ),
    bmaporthofoto30cm: L.tileLayer("https://{s}.wien.gv.at/basemap/bmaporthofoto30cm/normal/google3857/{z}/{y}/{x}.jpeg", {
        subdomains: ["maps", "maps1", "maps2", "maps3", "maps4"],
        attribution: "Datenquelle: <a href = 'https://www.basemap.at'>basemap.at</a>"
    }
    ),
};

//Default Hintergrundkarte
myMap.addLayer(myLayers.geolandbasemap);

//Default Overlaykarte
myMap.addLayer(wienGroup_cb);

//Kartenansichten schalten und zu Karte hinzufügen(aktivieren)
let myMapControl = L.control.layers({
    "BaseMap.at": myLayers.geolandbasemap,
    "BaseMap Orthofoto": myLayers.bmaporthofoto30cm
}, {
        "CityBikes": wienGroup_cb,
        "CityBikes Cluster": clmarkers
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

//Daten vom Server über URL holen und Laden
const url = "https://data.wien.gv.at/daten/geo?service=WFS&request=GetFeature&version=1.1.0&typeName=ogdwien:CITYBIKEOGD&srsName=EPSG:4326&outputFormat=json"

async function addGeoJson(url) {
    //console.log("URL wird geladen: ...", url);
    const response = await fetch(url);
    //console.log("Response: ",response);
    const wiendata = await response.json();
    //console.log("GeoJSON: ", wiendata);
    const geojson = L.geoJSON(wiendata, {
        style: function (feature) {
            return { color: "#ff0000" };
        },  //Icons definieren
        pointToLayer: function (geoJsonPoint, latlng) {
            return L.marker(latlng, {
                icon: L.icon({
                    iconUrl: "images/cycling.png",
                    iconAnchor: [16, 37]
                })
            });
        }
    });

    //Einzelne Punkte aus der GEOJson zur MarkerGroup hinzufügen
    wienGroup_cb.addLayer(geojson);

    //Popups erstellen
    geojson.bindPopup(function (layer) {
        const props = layer.feature.properties;
        const popupText = `<h1>${props.STATION}</h1>
        <p>Bezirk: ${props.BEZIRK} </br> CityBike Nummer: ${props.SE_SDO_ROWID}</p>`;
        return popupText;
    });

    //Default Zoom Ansicht auf MarkerGroup
    myMap.fitBounds(wienGroup_cb.getBounds());

    //Leaflet Hash Plugin
    const hash = new L.Hash(myMap);

    //Leaflet MarkerCluster Plugin
    clmarkers.addLayer(wienGroup_cb);
    //myMap.addLayer(clmarkers);

    //Leaflet Search als Control hinzufügen
    myMap.addControl(new L.Control.Search({
        layer: wienGroup_cb,
        propertyName: "STATION"
        })
    );

}

//Aufruf der Funktion
addGeoJson(url);