const ipAddress = document.querySelector('.ipAddress');
const loc = document.querySelector('.location');
const timezone = document.querySelector('.timezone');
const isp = document.querySelector('.isp');
const SearchIconBox = document.querySelector('.SearchIconBox');
const MapSection = document.querySelector('.MapSection');

function fetchLocation(ip = '') {
  let url =
    'https://geo.ipify.org/api/v1?apiKey=at_5xpKYTsrZJNjkRnVikhEhokVnGLGa';

  if (ip !== '') {
    url = url + `&ipAddress=${ip}`;
  }

  axios.get(url).then((res) => {
    ipAddress.innerHTML = res.data.ip;
    timezone.innerHTML = res.data.location.timezone;
    isp.innerHTML = res.data.isp;
    loc.innerHTML = res.data.location.city + ', ' + res.data.location.country;

    setMap(res.data.location.lat, res.data.location.lng);
  });
}

function setMap(lat, lng) {
  let mapid1 = document.getElementById('mapid');
  mapid1.remove();

  let mapid2 = document.createElement('div');
  mapid2.setAttribute('id', 'mapid');

  MapSection.append(mapid2);

  let map = L.map('mapid');

  let markerIcon = L.icon({
    iconUrl: './images/icon-location.svg',

    iconSize: [46, 56], // size of the icon
    iconAnchor: [23, -20], // point of the icon which will correspond to marker's location
  });
  map.setView([lat, lng], 15);

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: false,
  }).addTo(map);

  L.marker([lat, lng], { icon: markerIcon }).addTo(map);
}

SearchIconBox.addEventListener('click', () => {
  const input = document.querySelector('input').value;
  fetchLocation(input);
});

fetchLocation();

// 192.212.174.101
