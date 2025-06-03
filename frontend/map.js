const token = localStorage.getItem('token');
if (!token) window.location.href = 'login.html';

document.getElementById('logout-btn').addEventListener('click', () => {
  localStorage.removeItem('token');
  window.location.href = 'login.html';
});

let map;
let markers = [];

async function initMap() {
  map = new google.maps.Map(document.getElementById("map"), {
    zoom: 5,
    center: { lat: 20.5937, lng: 78.9629 },
  });

  await loadChargersOnMap();
}

async function loadChargersOnMap() {
  try {
    const res = await fetch('http://localhost:5000/api/chargers', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    if (!res.ok) {
      alert('Failed to load chargers. Please login again.');
      localStorage.removeItem('token');
      window.location.href = 'login.html';
      return;
    }

    const chargers = await res.json();

 
    markers.forEach(marker => marker.setMap(null));
    markers = [];

    chargers.forEach(charger => {
      const position = {
        lat: charger.location.latitude,
        lng: charger.location.longitude
      };

      const marker = new google.maps.Marker({
        position,
        map,
        title: charger.name,
      });

      const infoWindow = new google.maps.InfoWindow({
        content: `
          <div>
            <h3>${charger.name}</h3>
            <p><b>Status:</b> ${charger.status}</p>
            <p><b>Power Output:</b> ${charger.powerOutput} kW</p>
            <p><b>Connector Type:</b> ${charger.connectorType}</p>
            <p><b>Location:</b> ${position.lat.toFixed(5)}, ${position.lng.toFixed(5)}</p>
          </div>
        `
      });

      marker.addListener('click', () => {
        infoWindow.open(map, marker);
      });

      markers.push(marker);
    });
  } catch (error) {
    alert('Network error while loading chargers');
  }
}
