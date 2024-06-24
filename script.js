// Naman Sharma
// 100410289
// Constants
const DEFAULT_ZOOM = 13;
const EARTH_RADIUS_IN_KILOMETERS = 6371;
const KPU_LIBRARY_LOCATION = { lat: 49.133129, lng: -122.871460 };

// Calculate Distance Function
function getDistanceBetweenTwoPoints(lat1, lon1, lat2, lon2) {
  // Convert degrees to radians
  const lat1InRadians = lat1 * Math.PI / 180;
  const lat2InRadians = lat2 * Math.PI / 180;
  const deltaLatitude = (lat2 - lat1) * Math.PI / 180;
  const deltaLongitude = (lon2 - lon1) * Math.PI / 180;

  // Calculate distance using Haversine formula
  const a = Math.sin(deltaLatitude / 2) * Math.sin(deltaLatitude / 2) +
    Math.cos(lat1InRadians) * Math.cos(lat2InRadians) * Math.sin(deltaLongitude / 2) * Math.sin(deltaLongitude / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return EARTH_RADIUS_IN_KILOMETERS * c;
}

// Initialize Map Function
function setupMap() {
  const mapElement = document.getElementById('map');
  const map = L.map(mapElement).setView([KPU_LIBRARY_LOCATION.lat, KPU_LIBRARY_LOCATION.lng], DEFAULT_ZOOM);

  // Add OpenStreetMap tiles
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap contributors'
  }).addTo(map);

  // Add marker for KPU Library
  const libraryMarker = L.marker([KPU_LIBRARY_LOCATION.lat, KPU_LIBRARY_LOCATION.lng]).addTo(map)
    .bindPopup('KPU Library (Surrey Location)')
    .openPopup();

  return map;
}

// Get User Location and Update Map Function
function updateUserLocationOnMap(map) {
  navigator.geolocation.getCurrentPosition((position) => {
    // Define the user's location
    const userLocation = {
      lat: position.coords.latitude,
      lng: position.coords.longitude
    };

    // Set map view to user's location
    map.setView([userLocation.lat, userLocation.lng], DEFAULT_ZOOM);

    // Add marker for user's location
    const userMarker = L.marker([userLocation.lat, userLocation.lng]).addTo(map)
      .bindPopup('You are here right now')
      .openPopup();

    // Calculate and display the distance to KPU Library
    const distanceToLibrary = getDistanceBetweenTwoPoints(userLocation.lat, userLocation.lng, KPU_LIBRARY_LOCATION.lat, KPU_LIBRARY_LOCATION.lng);
    document.getElementById('distance').textContent = `You are ${distanceToLibrary.toFixed(2)} km away from KPU Surrey Library`;
  });
}

// Initialize the map and get user's location
const map = setupMap();
updateUserLocationOnMap(map);