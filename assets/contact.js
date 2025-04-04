// CONTACT PAGE FUNCTIONALITY
document.addEventListener('DOMContentLoaded', () => {
    // Initialize map
    initMap();
    
    // Contact form submission
    const contactForm = document.getElementById('havocContactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Get form values
            const name = document.getElementById('contactName').value;
            const email = document.getElementById('contactEmail').value;
            const subject = document.getElementById('contactSubject').value;
            const message = document.getElementById('contactMessage').value;
            
            // Simulate "encrypted" submission
            alert(`[ENCRYPTED MESSAGE SENT]\n\nFrom: ${name}\nEmail: ${email}\nSubject: ${subject}\n\nMessage content has been encrypted with AES-256.`);
            
            // Reset form
            contactForm.reset();
        });
    }
});

function initMap() {
    // Initialize Leaflet map
    const map = L.map('havocMap').setView([20, 0], 2);
    
    // Add tile layer (OpenStreetMap)
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        maxZoom: 18,
    }).addTo(map);
    
    // Add custom marker icon
    const havocIcon = L.icon({
        iconUrl: 'assets/images/map-marker.png',
        iconSize: [32, 32],
        iconAnchor: [16, 32],
        popupAnchor: [0, -32]
    });
    
    // Add operational locations
    const locations = [
        { coords: [40.7128, -74.0060], name: "North America Ops" },
        { coords: [-1.28333,36.81667], name: "Africa Ops" },
        { coords: [51.5074, -0.1278], name: "European Division" },
        { coords: [35.6762, 139.6503], name: "Asia-Pacific Unit" },
        { coords: [-33.8688, 151.2093], name: "Southern Hemisphere Team" }
    ];
    
    locations.forEach(loc => {
        L.marker(loc.coords, { icon: havocIcon })
            .addTo(map)
            .bindPopup(`<b>${loc.name}</b><br>Secure undisclosed location`);
    });
    
    // Add connection lines
    const latlngs = locations.map(loc => loc.coords);
    L.polyline(latlngs, {
        color: '#00ff9d',
        weight: 2,
        dashArray: '5, 5'
    }).addTo(map);
}