
var bounded1 = false;
var pastLocation1;
var geojson1;


const map1 = L.map('map1').setView([54, 13], 4); //europe

map1.scrollWheelZoom.disable();

const attribution1 = '&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>, Data: <a href="https://ec.europa.eu/commfrontoffice/publicopinion/archives/ebs/ebs_431_en.pdf">European Commission</a>';

const tiles1 = L.tileLayer(tileURL, {
    id: 'mapbox/light-v9',
    attribution: attribution1,
    tileSize: 512,
    zoomOffset: -1
});
tiles1.addTo(map1);



function getColor1(d) {
    return d > 65 ? 'rgb(81, 174, 50)' :
    d > 54 ? 'rgb(145, 232,  119)' :
    d > 0 ? 'rgb(178, 239,  162)' :
    'rgb(245, 253, 244)';
}

function style(feature) {
    return {
        fillColor: getColor1(feature.properties.changedPrivacySettings),
        fillOpacity: 0.75,
        weight: 1,
        opacity: 1,
        dashArray: '3',

        color: '#666'
    };
}

function highlightFeature(e) {
    var layer1 = e.target;

    layer1.setStyle({
       weight: 3,
       color: '#d7f7cf',
       dashArray: '',
       fillOpacity: 0.7
   });

    if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
        layer1.bringToFront();
    }
    info1.update(layer1.feature.properties);
}

function resetHighlight(e) {
    geojson1.resetStyle(e.target);
    info1.update();
}

function zoomToFeature1(e) {
    if (bounded1 && pastLocation1 == e.target._bounds) {
        map1.setView([51.74739, 10], 4);
        bounded1 = false;
    } else {
        switch (e.target.feature.properties.name_long) { // islands far from mainland so need to change bounds
            case 'France':
            map1.fitBounds([
                [51.1, 7.6],
                [41.5, -4.6]
                ]);
            break;

            case 'Spain':
            map1.fitBounds([
                [44.4, 3.9],
                [35.4, -9.2]
                ]);
            break;

            case 'Netherlands':
            map1.fitBounds([
                [53.7, 7.6],
                [50.7, 3.2]
                ]);
            break;

            case 'Portugal':
            map1.fitBounds([
                [42.4, -6.2],
                [36.4, -9.7]
                ]);
            break;

            default: // if not these special case countries then just go to bounds
            map1.fitBounds(e.target.getBounds());
        }
        bounded1 = true;
        pastLocation1 = e.target._bounds;
    }
}

function onEachFeature(feature, layer) {
    layer.on({
        mouseover: highlightFeature,
        mouseout: resetHighlight,
        click: zoomToFeature1
    });
}


// Custom Info Control
var info1 = L.control({
    //position: 'bottomright'
});

info1.onAdd = function(map) {
    this._div = L.DomUtil.create('div', 'info'); // create a div with a class "info"
    this.update();
    return this._div;
};

// method that we will use to update the control based on feature properties passed
info1.update = function(props) {
    this._div.innerHTML = '<h4>Changed privacy settings from default on social media?</h4>' + (props ?
        '<b>' + props.name_long + '</b><br/>' + props.changedPrivacySettings + '% yes' :
        'Hover over a country');
};


// Custom Legend Control
var legend1 = L.control({
    position: 'bottomright'
});

legend1.onAdd = function(map) {

    var div = L.DomUtil.create('div', 'info legend'),
    grades = [0, 54, 65, 100],
    labels = [];

    // loop through our density intervals and generate a label with a colored square for each interval
    for (var i = 0; i < grades.length - 1; i++) {
        div.innerHTML +=
        '<i style="background:' + getColor1(grades[i] + 1) + '"></i> ' +
        grades[i] + (grades[i + 1] ? '% &ndash; ' + grades[i + 1] + '%<br>' : '');
    }

    return div;
};

geojson1 = L.geoJson(europe_data, {
    style: style,
    onEachFeature: onEachFeature
}).addTo(map1);

info1.addTo(map1);
legend1.addTo(map1);