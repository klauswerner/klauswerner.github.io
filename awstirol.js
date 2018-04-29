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

let myMapScale = L.control.scale(
    {position: "bottomleft",
    metric: true,
    imperial: false,
    maxWidth: 200}
).addTo(myMap);

//Koordinaten
const KoordinatenAWS = {
    Gehrenspitze : [47.387131, 11.133717],
    Hafelekar : [47.312079,11.383623],
    Hohe_Munde_Gipfel : [47.346295,11.080385],
    Hohe_Munde_WS :[47.346612,11.083694],
    Nassereith_Wannig :[47.336922,10.862333],
    Nassereith_Alm :[47.344376,10.849554],
    Puitegg : [47.394844,11.152817],
    Rauthhütte : [47.345909, 11.104943],
    Rosshütte_WS : [47.342025,11.227903],
    Seegrube : [47.3063819943737,11.3779335010812],
    Dalfazkamm : [47.448514,11.751511],
    Erfurterhütte : [47.441861,11.762127],
    Agetwoad : [47.069889,10.862306],
    Breiter_GK_SS : [47.0839527777778,11.0273833333333],
    Breiter_GK_WS : [47.1010555555556,11.0230388888889],
    Falkaunsalpe : [47.071488,10.76282],
    FS_Hütte_HS : [47.099611,11.15541667],
    FS_Hütte_KH : [47.0960000187559,11.1623888694066],
    Lampsenspitze_SS : [47.153491,11.120722],
    Lampsenspitze_WS : [47.156075,11.095642],
    Roter_Schrofen : [47.04,10.7181],
    Schlicker_Alm : [47.154432,11.303207],
    Seirlöcher_Kogel : [47.0339,10.8528],
    Lämmerbichlalm : [47.181266,11.751717],
    Rastkogel_WS : [47.192132,11.767481],
    Sonntagsköpfl : [47.2750109996958,11.7520860028295],
    Sonntagsköpfl_WS : [47.271989,11.755802],
    Tuxerjoch_SS : [47.093149,11.648053],
    Tuxerjoch_WS : [47.089717,11.648987],
    Wandspitze_SS : [47.121858,11.661969],
    Wandspitze_WS : [47.120752,11.658062],
};

let awsdata = [
    {"lat":"47.387131","lng":"11.133717","name":"Gehrenspitze","temperatur":"0.6","datum":"2018-04-26T08:00:00+02:00","link":"https://lawine.tirol.gv.at/data/grafiken/540/standard/dreitage/puitegg.png"},
    {"lat":"47.312079","lng":"11.383623","name":"Hafelekar","temperatur":"1.6","datum":"2018-04-26T08:10:00+02:00","link":"https://lawine.tirol.gv.at/data/grafiken/540/standard/dreitage/seegrube.png"},
    {"lat":"47.346295","lng":"11.080385","name":"Hohe Munde Gipfel","temperatur":"","datum":"2018-04-26T08:00:00+02:00","link":"https://lawine.tirol.gv.at/data/grafiken/540/standard/woche/hohemunde.png"},
    {"lat":"47.346612","lng":"11.083694","name":"Hohe Munde Windstation","temperatur":"-4.1","datum":"2018-04-26T08:00:00+02:00","link":"https://lawine.tirol.gv.at/data/grafiken/540/standard/dreitage/rauthhuette.png"},
    {"lat":"47.336922","lng":"10.862333","name":"Nassereith Wannig","temperatur":"-1.2","datum":"2018-04-26T08:00:00+02:00","link":"https://lawine.tirol.gv.at/data/grafiken/540/standard/dreitage/nassereith.png"},
    {"lat":"47.344376","lng":"10.849554","name":"Nassereither Alm","temperatur":"4","datum":"2018-04-26T08:00:00+02:00","link":"https://lawine.tirol.gv.at/data/grafiken/540/standard/dreitage/nassereith.png"},
    {"lat":"47.394844","lng":"11.152817","name":"Puitegg","temperatur":"5.3","datum":"2018-04-26T08:00:00+02:00","link":"https://lawine.tirol.gv.at/data/grafiken/540/standard/dreitage/puitegg.png"},
    {"lat":"47.345909","lng":"11.104943","name":"Rauthhütte","temperatur":"11.7","datum":"2018-04-26T08:00:00+02:00","link":"https://lawine.tirol.gv.at/data/grafiken/540/standard/dreitage/rauthhuette.png"},
    {"lat":"47.342025","lng":"11.227903","name":"Rosshütte Windstation","temperatur":"4.1","datum":"2018-04-26T08:00:00+02:00","link":"https://lawine.tirol.gv.at/data/grafiken/540/standard/dreitage/rosshuette.png"},
    {"lat":"47.3063819943737","lng":"11.3779335010812","name":"Seegrube","temperatur":"3.1","datum":"2018-04-26T08:10:00+02:00","link":"https://lawine.tirol.gv.at/data/grafiken/540/standard/dreitage/seegrube.png"},
    {"lat":"47.448514","lng":"11.751511","name":"Dalfazkamm","temperatur":"0.4","datum":"2018-04-26T08:00:00+02:00","link":"https://lawine.tirol.gv.at/data/grafiken/540/standard/dreitage/erfurterhuette.png"},
    {"lat":"47.441861","lng":"11.762127","name":"Erfurterhütte","temperatur":"2.4","datum":"2018-04-26T08:00:00+02:00","link":"https://lawine.tirol.gv.at/data/grafiken/540/standard/dreitage/erfurterhuette.png"},
    {"lat":"47.069889","lng":"10.862306","name":"Agetwoad","temperatur":"1.5","datum":"2018-04-26T08:00:00+02:00","link":"https://lawine.tirol.gv.at/data/grafiken/540/standard/dreitage/agetwoad.png"},
    {"lat":"47.0839527777778","lng":"11.0273833333333","name":"Breiter Grieskogel Schneestation","temperatur":"1.1","datum":"2018-04-26T08:00:00+02:00","link":"https://lawine.tirol.gv.at/data/grafiken/540/standard/dreitage/breiter_grieskogel.png"},
    {"lat":"47.1010555555556","lng":"11.0230388888889","name":"Breiter Grieskogel Windstation","temperatur":"-3.4","datum":"2018-04-26T08:00:00+02:00","link":"https://lawine.tirol.gv.at/data/grafiken/540/standard/dreitage/breiter_grieskogel.png"},
    {"lat":"47.071488","lng":"10.76282","name":"Falkaunsalpe","temperatur":"2.2","datum":"2018-04-26T08:00:00+02:00","link":"https://lawine.tirol.gv.at/data/grafiken/540/standard/dreitage/falkaunsalpe.png"},
    {"lat":"47.099611","lng":"11.15541667","name":"Franz-Senn-Hütte Horntaler Spitzl","temperatur":"4.3","datum":"2018-04-25T20:40:00+02:00","link":"https://lawine.tirol.gv.at/data/grafiken/540/standard/dreitage/franz_senn_huette.png"},
    {"lat":"47.0960000187559","lng":"11.1623888694066","name":"Franz-Senn-Hütte Kl Horntal","temperatur":"5.5","datum":"2018-04-25T20:40:00+02:00","link":"https://lawine.tirol.gv.at/data/grafiken/540/standard/dreitage/franz_senn_huette.png"},
    {"lat":"47.153491","lng":"11.120722","name":"Lampsenspitze Schneestation","temperatur":"1.7","datum":"2018-04-26T08:00:00+02:00","link":"https://lawine.tirol.gv.at/data/grafiken/540/standard/dreitage/lampsenspitze.png"},
    {"lat":"47.156075","lng":"11.095642","name":"Lampsenspitze Windstation","temperatur":"-0.8","datum":"2018-04-26T08:00:00+02:00","link":"https://lawine.tirol.gv.at/data/grafiken/540/standard/dreitage/lampsenspitze.png"},
    {"lat":"47.04","lng":"10.7181","name":"Roter Schrofen","temperatur":"-1","datum":"2018-04-26T08:00:00+02:00","link":"https://lawine.tirol.gv.at/data/grafiken/540/standard/dreitage/falkaunsalpe.png"},
    {"lat":"47.154432","lng":"11.303207","name":"Schlicker Alm","temperatur":"6.5","datum":"2018-04-26T07:50:00+02:00","link":"https://lawine.tirol.gv.at/data/grafiken/540/standard/dreitage/schlickeralm.png"},
    {"lat":"47.0339","lng":"10.8528","name":"Seirlöcher Kogel","temperatur":"0","datum":"2018-04-26T08:00:00+02:00","link":"https://lawine.tirol.gv.at/data/grafiken/540/standard/dreitage/seirloecherkogel.png"},
    {"lat":"47.181266","lng":"11.751717","name":"Lämmerbichlalm","temperatur":"3","datum":"2018-04-26T08:00:00+02:00","link":"https://lawine.tirol.gv.at/data/grafiken/540/standard/dreitage/laemmerbichlalm.png"},
    {"lat":"47.192132","lng":"11.767481","name":"Rastkogel Windstation","temperatur":"0.1","datum":"2018-04-26T08:00:00+02:00","link":"https://lawine.tirol.gv.at/data/grafiken/540/standard/dreitage/laemmerbichlalm.png"},
    {"lat":"47.2750109996958","lng":"11.7520860028295","name":"Sonntagsköpfl","temperatur":"1.2","datum":"2018-04-26T08:00:00+02:00","link":"https://lawine.tirol.gv.at/data/grafiken/540/standard/dreitage/sonntagskoepfl.png"},
    {"lat":"47.271989","lng":"11.755802","name":"Sonntagsköpfl Windstation","temperatur":"3.3","datum":"2018-04-26T08:00:00+02:00","link":"https://lawine.tirol.gv.at/data/grafiken/540/standard/dreitage/sonntagskoepfl.png"},
    {"lat":"47.093149","lng":"11.648053","name":"Tuxerjoch Schneestation","temperatur":"6","datum":"2018-04-26T08:00:00+02:00","link":"https://lawine.tirol.gv.at/data/grafiken/540/standard/dreitage/tuxerjoch.png"},
    {"lat":"47.089717","lng":"11.648987","name":"Tuxerjoch Windstation","temperatur":"1.5","datum":"2018-04-26T08:00:00+02:00","link":"https://lawine.tirol.gv.at/data/grafiken/540/standard/dreitage/tuxerjoch.png"},
    {"lat":"47.121858","lng":"11.661969","name":"Wandspitze Schneestation","temperatur":"1.3","datum":"2018-04-26T08:00:00+02:00","link":"https://lawine.tirol.gv.at/data/grafiken/540/standard/dreitage/wandspitze.png"},
    {"lat":"47.120752","lng":"11.658062","name":"Wandspitze Windstation","temperatur":"-0.3","datum":"2018-04-26T08:00:00+02:00","link":"https://lawine.tirol.gv.at/data/grafiken/540/standard/dreitage/wandspitze.png"}
    ];

//Marker definieren, erstellen, Gruppieren und Einbinden
const markerOptionsAWS = {
    title: "Automatische Wetterstationen Tirol",
    //draggable: true,
    opacity: 0.95
}

let GehrenspitzeMarker = L.marker(KoordinatenAWS.Gehrenspitze, markerOptionsAWS).addTo(markerAWS);
let HafelekarMarker = L.marker(KoordinatenAWS.Hafelekar, markerOptionsAWS).addTo(markerAWS);
let Hohe_Munde_GipfelMarker = L.marker(KoordinatenAWS.Hohe_Munde_Gipfel, markerOptionsAWS).addTo(markerAWS);
let Hohe_Munde_WSMarker = L.marker(KoordinatenAWS.Hohe_Munde_WS, markerOptionsAWS).addTo(markerAWS);
let Nassereith_WannigMarker = L.marker(KoordinatenAWS.Nassereith_Wannig, markerOptionsAWS).addTo(markerAWS);
let Nassereith_AlmMarker = L.marker(KoordinatenAWS.Nassereith_Alm, markerOptionsAWS).addTo(markerAWS);
let PuiteggMarker = L.marker(KoordinatenAWS.Puitegg, markerOptionsAWS).addTo(markerAWS);
let RauthhütteMarker = L.marker(KoordinatenAWS.Rauthhütte, markerOptionsAWS).addTo(markerAWS);
let Rosshütte_WSMarker = L.marker(KoordinatenAWS.Rosshütte_WS, markerOptionsAWS).addTo(markerAWS);
let SeegrubeMarker = L.marker(KoordinatenAWS.Seegrube, markerOptionsAWS).addTo(markerAWS);
let DalfazkammMarker = L.marker(KoordinatenAWS.Dalfazkamm, markerOptionsAWS).addTo(markerAWS);
let ErfurterhütteMarker = L.marker(KoordinatenAWS.Erfurterhütte, markerOptionsAWS).addTo(markerAWS);
let AgetwoadMarker = L.marker(KoordinatenAWS.Agetwoad, markerOptionsAWS).addTo(markerAWS);
let Breiter_GK_SSMarker = L.marker(KoordinatenAWS.Breiter_GK_SS, markerOptionsAWS).addTo(markerAWS);
let Breiter_GK_WSMarker = L.marker(KoordinatenAWS.Breiter_GK_WS, markerOptionsAWS).addTo(markerAWS);
let FalkaunsalpeMarker = L.marker(KoordinatenAWS.Falkaunsalpe, markerOptionsAWS).addTo(markerAWS);
let FS_Hütte_HSMarker = L.marker(KoordinatenAWS.FS_Hütte_HS, markerOptionsAWS).addTo(markerAWS);
let FS_Hütte_KHMarker = L.marker(KoordinatenAWS.FS_Hütte_KH, markerOptionsAWS).addTo(markerAWS);
let Lampsenspitze_SSMarker = L.marker(KoordinatenAWS.Lampsenspitze_SS, markerOptionsAWS).addTo(markerAWS);
let Lampsenspitze_WSMarker = L.marker(KoordinatenAWS.Lampsenspitze_WS, markerOptionsAWS).addTo(markerAWS);
let Roter_SchrofenMarker = L.marker(KoordinatenAWS.Roter_Schrofen, markerOptionsAWS).addTo(markerAWS);
let Schlicker_AlmMarker = L.marker(KoordinatenAWS.Schlicker_Alm, markerOptionsAWS).addTo(markerAWS);
let Seirlöcher_KogelMarker = L.marker(KoordinatenAWS.Seirlöcher_Kogel, markerOptionsAWS).addTo(markerAWS);
let LämmerbichlalmMarker = L.marker(KoordinatenAWS.Lämmerbichlalm, markerOptionsAWS).addTo(markerAWS);
let Rastkogel_WSMarker = L.marker(KoordinatenAWS.Rastkogel_WS, markerOptionsAWS).addTo(markerAWS);
let SonntagsköpflMarker = L.marker(KoordinatenAWS.Sonntagsköpfl, markerOptionsAWS).addTo(markerAWS);
let Sonntagsköpfl_WSMarker = L.marker(KoordinatenAWS.Sonntagsköpfl_WS, markerOptionsAWS).addTo(markerAWS);
let Tuxerjoch_SSMarker = L.marker(KoordinatenAWS.Tuxerjoch_SS, markerOptionsAWS).addTo(markerAWS);
let Tuxerjoch_WSMarker = L.marker(KoordinatenAWS.Tuxerjoch_WS, markerOptionsAWS).addTo(markerAWS);
let Wandspitze_SSMarker = L.marker(KoordinatenAWS.Wandspitze_SS, markerOptionsAWS).addTo(markerAWS);
let Wandspitze_WSMarker = L.marker(KoordinatenAWS.Wandspitze_WS, markerOptionsAWS).addTo(markerAWS);

//Marker Gruppe zur Karte hinzu
myMap.addLayer(markerAWS);  

//PopUps
GehrenspitzeMarker.bindPopup("<p>Station: Gehrenspitze </br> Temperatur: 0.6 </br> Datum: 2018-04-26</p><img style='width:300px' src='https://lawine.tirol.gv.at/data/grafiken/540/standard/dreitage/puitegg.png' alt='Gehrenspitze' />");
HafelekarMarker.bindPopup("<p>Station: Hafelekar </br> Temperatur: 1.6 </br> Datum: 2018-04-26</p><img style='width:300px' src='https://lawine.tirol.gv.at/data/grafiken/540/standard/dreitage/seegrube.png' alt='Hafelekar' />");
Hohe_Munde_GipfelMarker.bindPopup("<p>Station: Hohe Munde Gipfel </br> Temperatur: </br> Datum: 2018-04-26</p><img style='width:300px' src='https://lawine.tirol.gv.at/data/grafiken/540/standard/woche/hohemunde.png' alt='Hohe_Munde_Gipfel' />");
Hohe_Munde_WSMarker.bindPopup("<p>Station: Hohe Munde Windstation </br> Temperatur: -4.1 </br> Datum: 2018-04-26</p><img style='width:300px' src='https://lawine.tirol.gv.at/data/grafiken/540/standard/dreitage/rauthhuette.png' alt='Hohe_Munde_Windstation' />");
Nassereith_WannigMarker.bindPopup("<p>Station: Nassereith Wannig </br> Temperatur: -1.2 </br> Datum: 2018-04-26</p><img style='width:300px' src='https://lawine.tirol.gv.at/data/grafiken/540/standard/dreitage/nassereith.png' alt='Nassereith Wannig' />");
Nassereith_AlmMarker.bindPopup("<p>Station: Nassereither Alm </br> Temperatur: 4 </br> Datum: 2018-04-26</p><img style='width:300px' src='https://lawine.tirol.gv.at/data/grafiken/540/standard/dreitage/nassereith.png' alt='Nassereither Alm' />");
PuiteggMarker.bindPopup("<p>Station: Puitegg </br> Temperatur: 5.3 </br> Datum: 2018-04-26</p><img style='width:300px' src='https://lawine.tirol.gv.at/data/grafiken/540/standard/dreitage/puitegg.png' alt='Puitegg' />");
RauthhütteMarker.bindPopup("<p>Station: Rauthhütte </br> Temperatur: 11.7 </br> Datum: 2018-04-26</p><img style='width:300px' src='https://lawine.tirol.gv.at/data/grafiken/540/standard/dreitage/rauthhuette.png' alt='Rauthhütte' />");
Rosshütte_WSMarker.bindPopup("<p>Station: Rosshütte Windstation </br> Temperatur: 4.1 </br> Datum: 2018-04-26</p><img style='width:300px' src='https://lawine.tirol.gv.at/data/grafiken/540/standard/dreitage/rosshuette.png' alt='Rosshütte Windstation' />");
SeegrubeMarker.bindPopup("<p>Station: Seegrube </br> Temperatur: 3.1 </br> Datum: 2018-04-26</p><img style='width:300px' src='https://lawine.tirol.gv.at/data/grafiken/540/standard/dreitage/seegrube.png' alt='Seegrube' />");
DalfazkammMarker.bindPopup("<p>Station: Dalfazkamm </br> Temperatur: 0.4 </br> Datum: 2018-04-26</p><img style='width:300px' src='https://lawine.tirol.gv.at/data/grafiken/540/standard/dreitage/erfurterhuette.png' alt='Dalfazkamm' />");
ErfurterhütteMarker.bindPopup("<p>Station: Erfurterhütte </br> Temperatur: 2.4 </br> Datum: 2018-04-26</p><img style='width:300px' src='https://lawine.tirol.gv.at/data/grafiken/540/standard/dreitage/erfurterhuette.png' alt='Erfurterhütte' />");
AgetwoadMarker.bindPopup("<p>Station: Agetwoad </br> Temperatur: 1.5 </br> Datum: 2018-04-26</p><img style='width:300px' src='https://lawine.tirol.gv.at/data/grafiken/540/standard/dreitage/agetwoad.png' alt='Agetwoad' />");
Breiter_GK_SSMarker.bindPopup("<p>Station: Breiter Grieskogel Schneestation </br> Temperatur: 1.1 </br> Datum: 2018-04-26</p><img style='width:300px' src='https://lawine.tirol.gv.at/data/grafiken/540/standard/dreitage/breiter_grieskogel.png' alt='Breiter Grieskogel Schneestation' />");
Breiter_GK_WSMarker.bindPopup("<p>Station: Breiter Grieskogel Windstation </br> Temperatur: -3.4 </br> Datum: 2018-04-26</p><img style='width:300px' src='https://lawine.tirol.gv.at/data/grafiken/540/standard/dreitage/breiter_grieskogel.png' alt='Breiter Grieskogel Windstation' />");
FalkaunsalpeMarker.bindPopup("<p>Station: Falkaunsalpe </br> Temperatur: 2.2 </br> Datum: 2018-04-26</p><img style='width:300px' src='https://lawine.tirol.gv.at/data/grafiken/540/standard/dreitage/falkaunsalpe.png' alt='Falkaunsalpe' />");
FS_Hütte_HSMarker.bindPopup("<p>Station: Franz-Senn-Hütte Horntaler Spitzl </br> Temperatur: 4.3 </br> Datum: 2018-04-25</p><img style='width:300px' src='https://lawine.tirol.gv.at/data/grafiken/540/standard/dreitage/franz_senn_huette.png' alt='Franz-Senn-Hütte Horntaler Spitzl' />");
FS_Hütte_KHMarker.bindPopup("<p>Station: Franz-Senn-Hütte Kl Horntal </br> Temperatur: 5.5 </br> Datum: 2018-04-25</p><img style='width:300px' src='https://lawine.tirol.gv.at/data/grafiken/540/standard/dreitage/franz_senn_huette.png' alt='Franz-Senn-Hütte Kl Horntal' />");
Lampsenspitze_SSMarker.bindPopup("<p>Station: Lampsenspitze Schneestation </br> Temperatur: 1.7 </br> Datum: 2018-04-26</p><img style='width:300px' src='https://lawine.tirol.gv.at/data/grafiken/540/standard/dreitage/lampsenspitze.png' alt='Lampsenspitze Schneestation' />");
Lampsenspitze_WSMarker.bindPopup("<p>Station: Lampsenspitze Windstation </br> Temperatur: -0.8 </br> Datum: 2018-04-26</p><img style='width:300px' src='https://lawine.tirol.gv.at/data/grafiken/540/standard/dreitage/lampsenspitze.png' alt='Lampsenspitze Windstation' />");
Roter_SchrofenMarker.bindPopup("<p>Station: Roter Schrofen </br> Temperatur: -1 </br> Datum: 2018-04-26</p><img style='width:300px' src='https://lawine.tirol.gv.at/data/grafiken/540/standard/dreitage/falkaunsalpe.png' alt='Roter Schrofen' />");
Schlicker_AlmMarker.bindPopup("<p>Station: Schlicker Alm </br> Temperatur: 6.5 </br> Datum: 2018-04-26</p><img style='width:300px' src='https://lawine.tirol.gv.at/data/grafiken/540/standard/dreitage/schlickeralm.png' alt='Schlicker Alm' />");
Seirlöcher_KogelMarker.bindPopup("<p>Station: Seirlöcher Kogel </br> Temperatur: 0 </br> Datum: 2018-04-26</p><img style='width:300px' src='https://lawine.tirol.gv.at/data/grafiken/540/standard/dreitage/seirloecherkogel.png' alt='Seirlöcher Kogel' />");
LämmerbichlalmMarker.bindPopup("<p>Station: Lämmerbichlalm </br> Temperatur: 3 </br> Datum: 2018-04-26</p><img style='width:300px' src='https://lawine.tirol.gv.at/data/grafiken/540/standard/dreitage/laemmerbichlalm.png' alt='Lämmerbichlalm' />");
Rastkogel_WSMarker.bindPopup("<p>Station: Rastkogel Windstation </br> Temperatur: 0.1 </br> Datum: 2018-04-26</p><img style='width:300px' src='https://lawine.tirol.gv.at/data/grafiken/540/standard/dreitage/laemmerbichlalm.png' alt='Rastkogel Windstation' />");
SonntagsköpflMarker.bindPopup("<p>Station: Sonntagsköpfl </br> Temperatur: 1.2 </br> Datum: 2018-04-26</p><img style='width:300px' src='https://lawine.tirol.gv.at/data/grafiken/540/standard/dreitage/sonntagskoepfl.png' alt='Sonntagsköpfl' />");
Sonntagsköpfl_WSMarker.bindPopup("<p>Station: Sonntagsköpfl Windstation </br> Temperatur: 3.3 </br> Datum: 2018-04-26</p><img style='width:300px' src='https://lawine.tirol.gv.at/data/grafiken/540/standard/dreitage/sonntagskoepfl.png' alt='Sonntagsköpfl Windstation' />");
Tuxerjoch_SSMarker.bindPopup("<p>Station: Tuxerjoch Schneestation </br> Temperatur: 6 </br> Datum: 2018-04-26</p><img style='width:300px' src='https://lawine.tirol.gv.at/data/grafiken/540/standard/dreitage/tuxerjoch.png' alt='Tuxerjoch Schneestation' />");
Tuxerjoch_WSMarker.bindPopup("<p>Station: Tuxerjoch Windstation </br> Temperatur: 1.5 </br> Datum: 2018-04-26</p><img style='width:300px' src='https://lawine.tirol.gv.at/data/grafiken/540/standard/dreitage/tuxerjoch.png' alt='Tuxerjoch Windstation' />");
Wandspitze_SSMarker.bindPopup("<p>Station: Wandspitze Schneestation </br> Temperatur: 1.3 </br> Datum: 2018-04-26</p><img style='width:300px' src='https://lawine.tirol.gv.at/data/grafiken/540/standard/dreitage/wandspitze.png' alt='Wandspitze Schneestation' />");
Wandspitze_WSMarker.bindPopup("<p>Station: Wandspitze Windstation </br> Temperatur: -0.3 </br> Datum: 2018-04-26</p><img style='width:300px' src='https://lawine.tirol.gv.at/data/grafiken/540/standard/dreitage/wandspitze.png' alt='Wandspitze Windstation' />");

//Start Ansicht - Zoom
myMap.fitBounds(markerAWS.getBounds()); 
//myMap.setView([47.267,11.383],11);