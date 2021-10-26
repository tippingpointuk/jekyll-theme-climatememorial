console.log(messagesData);
const MAX_MESSAGES = 100;
var messageMap = L.map("Message-Map",{
                    center: [10,0],
                    crs: L.CRS.EPSG3857,
                    zoom: 2,
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
  "https://stamen-tiles-{s}.a.ssl.fastly.net/watercolor/{z}/{x}/{y}.jpg",
  {
    "attribution": "Map tiles by \u003ca href=\"http://stamen.com\"\u003eStamen Design\u003c/a\u003e, under \u003ca href=\"http://creativecommons.org/licenses/by/3.0\"\u003eCC BY 3.0\u003c/a\u003e. Data by \u0026copy; \u003ca href=\"http://openstreetmap.org\"\u003eOpenStreetMap\u003c/a\u003e, under \u003ca href=\"http://creativecommons.org/licenses/by-sa/3.0\"\u003eCC BY SA\u003c/a\u003e.",
    "detectRetina": false,
    "maxNativeZoom": 18,
    "maxZoom": 18,
    "minZoom": 2,
    "noWrap": false,
    "opacity": 1,
    // "subdomains": "abc",
    "tms": false,
    // "bounds": [
    //   [],
    //   []
    // ]
  }
).addTo(messageMap);

var markerCluster = L.markerClusterGroup({
  // maxClusterRadius: 25,
});

var messageListElement = document.getElementsByClassName("Message-List")[0]

for (i in messagesData){
  var pointerLocation = JSON.parse(messagesData[i]["location"])
  var newMarker = L.marker(pointerLocation,{icon: redMarker});
  messagesData[i].slug = encodeURIComponent(messagesData[i]['message'])
  newMarker.actionData = messagesData[i]
  newMarker.bindPopup(messagesData[i]['message']);
  newMarker.addEventListener("click",markerClicked);
  newMarker.addTo(markerCluster);
}
markerCluster.addTo(messageMap);

function getVisablePoints(bounds){
  var msgsVisable = [];
  var count = 0;
  for (i in messagesData){
    count += 1;
    // if (count>MAX_MESSAGES){
    //   break
    // }
    var markerLocation = JSON.parse(messagesData[i]["location"]);
    var latlng = L.latLng(markerLocation);
    if (bounds.contains(latlng)){
      msgsVisable.push(messagesData[i])
    }
  }
  return msgsVisable
}

function getMessagesListHtml(messages){
  var actionslisthtml = "";

  for (i in messages){
    if (messages[i].pin == "TRUE"){
      var attr = "pinned"
    }else{
      var attr = ""
    }
    actionslisthtml +=
      "<div class=\"Message Floating-Box\" id=" + messages[i].slug + " " + attr + ">"
      + "<p>" + messages[i]['message'] + "</p>" +
      "</div>";
    // if (i > 100){
    //   actionslisthtml = actionslisthtml.concat(`...`);
    //   break
    // }
  }
  return actionslisthtml;
}

function mapMoved() {
  var messages = getVisablePoints(messageMap.getBounds());
  var msgHtml = getMessagesListHtml(messages);
  console.log("Move")
  console.log(msgHtml)
  messageListElement.innerHTML = msgHtml;
}

function markerClicked(e){
  // return
  console.log(e)
  var lastMarker = document.querySelector(".Message-List .Message.first")
  var thisMarker = document.getElementById(e.target.actionData.slug);
  if (lastMarker){
   lastMarker.classList.remove('first');
  }
  if (thisMarker){
    thisMarker.classList.add('first');
  }
}

messageListElement.innerHTML = getMessagesListHtml(messagesData);
// map moved event handling
messageMap.addEventListener("zoomend",function(e){
  mapMoved()
})
messageMap.addEventListener("moveend",function(e){
  mapMoved()
})
