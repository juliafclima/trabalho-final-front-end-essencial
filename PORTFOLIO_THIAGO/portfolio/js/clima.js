document.addEventListener("DOMContentLoaded", () => {
    if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(function (position) {
            const latitude = position.coords.latitude;
            const longitude = position.coords.longitude;

            const apiKey = "5ccd1cef2dec9f71b4357c2e78dbd9e8";
            const apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;

            fetch(apiUrl)
                .then((response) => response.json())
                .then((data) => {
                    console.log(data);
                    const imgClima = document.getElementById("img-clima");
                    const locationElement = document.getElementById("localizacao");
                    const temperatureElement = document.getElementById("temp");

                    switch (data.weather[0].main) {
                        case "Clear":
                            imgClima.src = "img/ensolarado.png";
                            break;
                        case "Rain":
                            imgClima.src = "img/chuvoso.png";
                            break;
                        case "Clouds":
                            imgClima.src = "img/nublado.png";
                            break;
                        case "Haze":
                            imgClima.src = "img/nevoeiro.png";
                            break;
                    }

                    locationElement.textContent = `${data.name}, ${data.sys.country}`;
                    temperatureElement.textContent = `${parseInt(data.main.temp)}°C`;
                })
                .catch((error) => {
                    console.error("Erro ao buscar dados do clima:", error);
                });
        });
    } else {
        console.error("Geolocalização não suportada pelo navegador.");
    }
});
