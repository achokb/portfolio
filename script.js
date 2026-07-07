
// ==========================
// Scroll Progress Bar
// ==========================
window.addEventListener("scroll", () => {
    const scrollTop = window.scrollY;

    const documentHeight =
        document.documentElement.scrollHeight - window.innerHeight;

    const scrollPercent =
        (scrollTop / documentHeight) * 100;

    document.getElementById("progress-bar").style.width =
        scrollPercent + "%";
});

// ==========================
// Scroll Reveal
// ==========================

const hiddenElements = document.querySelectorAll(".hidden");

const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.classList.add("show");
        }
    });
});

hiddenElements.forEach((element) => {
    observer.observe(element);
});

// ==========================
// Active Navigation
// ==========================

const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll("nav a");

window.addEventListener("scroll", () => {
    let currentSection = "";

    sections.forEach((section) => {
        const sectionTop = section.offsetTop - 200;

        if (window.scrollY >= sectionTop) {
            currentSection = section.getAttribute("id");
        }
    });

    navLinks.forEach((link) => {
        link.classList.remove("active");

        if (link.getAttribute("href") === "#" + currentSection) {
            link.classList.add("active");
        }
    });
});

// ==========================
// Back to Top Button
// ==========================

const backToTopButton = document.getElementById("back-to-top");

window.addEventListener("scroll", () => {
    if (window.scrollY > 500) {
        backToTopButton.classList.add("show-button");
    } else {
        backToTopButton.classList.remove("show-button");
    }
});

backToTopButton.addEventListener("click", () => {
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
});

// ==========================
// Weather Widget
// ==========================

const apiKey = "07b7190a6d5741b3b4d35444260707";
const weatherWidget = document.getElementById("weather-widget");

function getUserLocation() {
    if (!navigator.geolocation) {
        document.getElementById("weather-source").textContent =
            "📍 Default location";
        loadWeather("Houston");
        return;
    }

    navigator.geolocation.getCurrentPosition(
        (position) => {
            const latitude = position.coords.latitude;
            const longitude = position.coords.longitude;

            document.getElementById("weather-source").textContent =
                "📍 Your current location";

            loadWeather(`${latitude},${longitude}`);
        },
        () => {
            document.getElementById("weather-source").textContent =
                "📍 Default location";
            loadWeather("Houston");
        }
    );
}

async function loadWeather(locationQuery) {
    try {
        const response = await fetch(
            `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${locationQuery}`
        );

        const data = await response.json();

        const iconUrl = "https:" + data.current.condition.icon;
        const temp = Math.round(data.current.temp_f);
        const feelsLike = Math.round(data.current.feelslike_f);

        document.getElementById("weather-icon").src = iconUrl;
        document.getElementById("weather-temp").textContent = `${temp}°F`;
        document.getElementById("weather-location").textContent = data.location.name;

        document.getElementById("weather-city").textContent =
            `${data.location.name}, ${data.location.region}`;

        document.getElementById("weather-description").textContent =
            data.current.condition.text;

        document.getElementById("weather-current-temp").textContent = `${temp}°F`;

        document.getElementById("weather-feels-like").textContent =
            `Feels like ${feelsLike}°F`;

        document.getElementById("weather-humidity").textContent =
            `${data.current.humidity}%`;

        document.getElementById("weather-wind").textContent =
            `${Math.round(data.current.wind_mph)} mph`;

        document.getElementById("weather-visibility").textContent =
            `${data.current.vis_miles} mi`;

        document.getElementById("weather-pressure").textContent =
            `${data.current.pressure_in} inHg`;

        document.getElementById("weather-updated").textContent =
            `Updated ${data.current.last_updated}`;

    } catch (error) {
        document.getElementById("weather-temp").textContent = "Weather unavailable";
        console.error(error);
    }
}

weatherWidget.addEventListener("click", () => {
    weatherWidget.classList.toggle("open");
});

document.addEventListener("click", (event) => {
    if (!weatherWidget.contains(event.target)) {
        weatherWidget.classList.remove("open");
    }
});

getUserLocation();

setInterval(getUserLocation, 900000);