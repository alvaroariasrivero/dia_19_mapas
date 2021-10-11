const mapId = 'map';
const initialCoordinates = [34.0194, -118.411] //[40.4169473, -3.7057172] // Estas son de Madrid // Plaza del Sol en Madrid [lat, lng]
const map = L.map(mapId).setView(initialCoordinates, 13);

const MAPBOX_API = 'https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}'

const ATTRIBUTION = 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>'; // Este token será el que obtengamos en la web de Mapbox
const ACCESS_TOKEN = 'pk.eyJ1IjoiY2Nhc3RpbGxvMDZtYiIsImEiOiJja2k1eXpybXU3em1mMnRsNjNqajJ0YW12In0.aFQJlFDBDQeUpLHT4EiRYg';

L.tileLayer(MAPBOX_API, {
    attribution: ATTRIBUTION,
    maxZoom: 18,
    id: 'mapbox/streets-v11',
    tileSize: 512,
    zoomOffset: -1,
    accessToken: ACCESS_TOKEN
  }).addTo(map);


// navigator.geolocation.getCurrentPosition(position => {
//     console.log(position)
//         L.marker([position.coords.latitude, position.coords.longitude]).bindPopup("En verdad no estás aquí, pero casi").addTo(map);
//     }, error => {
//        console.warn(`Error! - ${error}`);
//    });


async function buses() {
    try{
        let response = await fetch('https://api.metro.net/agencies/lametro/vehicles')
        let data = await response.json()
        let autobus = await data.items
        for(let i = 0; i < autobus.length; i++) {
            let lat = autobus[i].latitude
            let long = autobus[i].longitude
            let id = autobus[i].id
            L.marker([lat, long]).bindPopup(`Este es el id: ${id}`).addTo(map)
        } 
        
    }
    catch{}
}

buses()


//    fetch('https://api.metro.net/agencies/lametro/vehicles')
//     .then(res => res.json())
//     .then(json => console.log(json))