<template>
  <div class="container">
    <div class="header">
      <h1>WEATHER APP</h1>

      <div class="search-bar">
        <input
          type="text"
          v-model="city"
          placeholder="Enter city name"
          class="search-input"
        />
        <button @click="searchByCity" class="search-button">Search</button>
      </div>
    </div>

    <main>
      <div v-if="weatherData" class="result">
        <h2 class="place">
          {{ weatherData.name }}, {{ weatherData.sys.country }}
        </h2>

        <div class="summary">
          <img :src="iconUrl" alt="Weather Icon" class="icon" />
          <p class="temp">{{ temperature }} °C</p>
        </div>

        <span class="desc">{{ weatherData.weather[0].description }}</span>
      </div>
    </main>
  </div>
</template>

<script>
import axios from "axios";

const apikey = "b6e358aa7b09609f1605568579a1fa3f";

export default {
  name: "GetWeather",
  data() {
    return {
      city: "",
      weatherData: null,
    };
  },
  computed: {
    temperature() {
      return this.weatherData
        ? Math.floor(this.weatherData.main.temp - 273)
        : null;
    },
    iconUrl() {
      return this.weatherData
        ? `https://openweathermap.org/img/w/${this.weatherData.weather[0].icon}.png`
        : null;
    },
  },
  mounted() {
    this.fetchCurrentLocationWeather();
  },
  methods: {
    async searchByCity() {
      if (!this.city.trim()) return;
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(
        this.city
      )}&appid=${apikey}`;
      await this.fetchWeatherData(url);
    },
    async fetchCurrentLocationWeather() {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(async (position) => {
          const { latitude, longitude } = position.coords;
          const url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apikey}`;
          await this.fetchWeatherData(url);
        });
      }
    },
    async fetchWeatherData(url) {
      try {
        const response = await axios.get(url);
        this.weatherData = response.data;
      } catch (error) {
        console.error("Error fetching weather data:", error);
        this.weatherData = null;
      }
    },
  },
};
</script>

<style scoped>
.container {
  max-width: 760px;
  margin: 0 auto;
  padding: 24px 16px 48px;
  text-align: center;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica,
    Arial, "Apple Color Emoji", "Segoe UI Emoji";
}

.header h1 {
  font-size: 56px;
  letter-spacing: 2px;
  margin: 16px 0 12px;
}

.search-bar {
  display: inline-flex;
  align-items: center;
  gap: 0;
  margin: 8px 0 24px;
}

.search-input {
  height: 40px;
  width: 280px;
  padding: 0 10px;
  font-size: 16px;
  border: 2px solid #444;
  border-right: none;
  border-radius: 6px 0 0 6px;
  outline: none;
}

.search-button {
  height: 44px;
  padding: 0 16px;
  font-size: 16px;
  border: 2px solid #444;
  border-left: none;
  border-radius: 0 6px 6px 0;
  background: #666;
  color: #fff;
  cursor: pointer;
}

.result .place {
  font-size: 40px;
  margin: 10px 0 20px;
}

.summary {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 6px;
  margin-bottom: 8px;
}

.icon {
  width: 56px;
  height: 56px;
  opacity: 0.7;
}

.temp {
  font-size: 20px;
  margin: 0;
}

.desc {
  display: inline-block;
  margin-top: 10px;
  font-size: 18px;
  color: #222;
}
</style>
