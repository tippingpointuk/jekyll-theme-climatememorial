---
---

console.log(messagesData);

var actionsMap = L.map("Message-Map",{
                    center: [20,0],
                    crs: L.CRS.EPSG3857,
                    zoom: 3,
                    zoomControl: true,
                    preferCanvas: false,
                });
var customMarker = L.icon({
    iconUrl: "/assets/images/fist_pointer_shadow.png",
    shadowUrl: "/assets/images/red_fist_marker.png",
    iconSize: [70,125],
    shadowSize: [125,125],
    iconAnchor:   [35,125], // point of the icon which will correspond to marker's location
    shadowAnchor: [0,125],  // the same for the shadow
    popupAnchor:  [0, -125] // point from which the popup should open relative to the iconAnchor
})

var redMarker = new L.Icon({
 iconUrl: '/assets/marker-icon-red.png',
 shadowUrl: '/assets/marker-shadow.png',
 iconSize: [25, 41],
 iconAnchor: [12, 41],
 popupAnchor: [1, -34],
 shadowSize: [41, 41]
});

var titleLayer = L.tileLayer(
  "https://stamen-tiles-{s}.a.ssl.fastly.net/watercolor/{z}/{x}/{y}.jpg",{
    "attribution": "Map tiles by \u003ca href=\"http://stamen.com\"\u003eStamen Design\u003c/a\u003e, under \u003ca href=\"http://creativecommons.org/licenses/by/3.0\"\u003eCC BY 3.0\u003c/a\u003e. Data by \u0026copy; \u003ca href=\"http://openstreetmap.org\"\u003eOpenStreetMap\u003c/a\u003e, under \u003ca href=\"http://creativecommons.org/licenses/by-sa/3.0\"\u003eCC BY SA\u003c/a\u003e.",
    "detectRetina": false,
    "maxNativeZoom": 18,
    "maxZoom": 18,
    "minZoom": 0,
    "noWrap": false,
    "opacity": 1,
    "subdomains": "abc",
    "tms": false
  }
).addTo(actionsMap);

var markerCluster = L.markerClusterGroup({
  // maxClusterRadius: 25,
});
for (i in messagesData){
  console.log(messagesData[i]["location"])
  var pointerLocation = JSON.parse(messagesData[i]["location"])
  console.log(pointerLocation)
  var newMarker = L.marker(pointerLocation,{icon: redMarker});
  newMarker.actionData = messagesData[i]
  newMarker.bindPopup(messagesData[i]['message']);
  newMarker.addTo(markerCluster);
}
markerCluster.addTo(actionsMap);
