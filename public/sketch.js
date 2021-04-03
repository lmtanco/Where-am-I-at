Location();

function Location() {
    if ('geolocation' in navigator) {
        let lat;
        let lon;
        console.log('geolocation available');
        navigator.geolocation.getCurrentPosition(async position => {
            console.log(position);
            lat = position.coords.latitude;
            document.getElementById("latitude").textContent = lat;
            lon = position.coords.longitude;
            document.getElementById("longitude").textContent = lon;

            // ATENCIÓN: AQUÍ MANDO EL CÓDIGO AL SERVIDOR CON UN POST
            const data = { lat, lon };
            const options = {
                method: 'POST',
                body: JSON.stringify(data),
                headers: {
                    "Content-Type": "application/json",
                },
            };
            const response = await fetch('/api', options);   // para poner aquí await y coger la promise he puesto arriba async
            const json = await response.json();
            console.log(json);

            const mymap = L.map('mapid').setView([lat, lon], 10);

            const attribution = '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors';
            const tileURL = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
            const tiles = L.tileLayer(tileURL, { attribution });
            tiles.addTo(mymap);

            const circle = L.circle([lat, lon], {
                color: 'red',
                fillColor: '#f03',
                fillOpacity: 0.5,
                radius: position.coords.accuracy
            }).addTo(mymap);

        });

    } else {
        console.log('geolocation not available');
    }
}


