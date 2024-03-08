import React, { useState, useEffect } from "react";
import axios from "axios";
import "./WeatherApp.css";
import { Grid } from "@mui/material";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import WetherImg from "../img/weather-icon.webp";

const Dashboard = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [city, setCity] = useState(""); // Set default city here

  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: "center",
    color: theme.palette.text.secondary,
    margin: 10,
  }));

  useEffect(() => {
    const fetchData = async () => {
      try {
        const apiKey = "585212d9807bccd7476fabd764cebead";
        const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;

        const response = await axios.get(apiUrl);
        setWeatherData(response.data);
      } catch (error) {
        console.error("Error fetching weather data:", error);
      }
    };

    fetchData();
  }, [city]);

  const handleCityChange = (event) => {
    setCity(event.target.value);
  };

  return (
    <Grid
      container
      spacing={2}
      sx={{ marginLeft: 2, marginRight: 2, marginTop: 2 }}
    >
      <Grid item xs={6} md={3}>
        <input
          style={{ width: "85%", margin: "10px" }}
          type="text"
          placeholder="Search for places"
          value={city}
          onChange={handleCityChange}
        />
        <Item>
          <h1>Weather App</h1>

          {weatherData && (
            <div className="weather-info">
              <img
                src={`http://openweathermap.org/img/w/${weatherData?.weather[0]?.icon}.png`}
                alt={WetherImg}
              />
              <h2>
                {weatherData.name}, {weatherData.sys.country}
              </h2>
              <p>{weatherData.weather[0].description}</p>
              <p>Temperature: {weatherData.main.temp} °C</p>
              <p>Humidity: {weatherData.main.humidity}%</p>
            </div>
          )}
        </Item>
      </Grid>
      <Grid item xs={6} md={8} sx={{ marginLeft: 5 }}>
        <h4 style={{ marginBottom: "50px" }}>Today's Highlights</h4>
        {weatherData && (
          <Box sx={{ flexGrow: 1 }}>
            <Grid
              container
              spacing={{ xs: 2, md: 6 }}
              columns={{ xs: 4, sm: 8, md: 12 }}
            >
              <Grid xs={2} sm={4} md={4}>
                <Item>
                  <p>UV index: {weatherData.main.humidity}%</p>
                </Item>
              </Grid>
              <Grid xs={2} sm={4} md={4}>
                <Item>
                  <p>Wind Status: {weatherData.wind.speed} km/h</p>
                </Item>
              </Grid>
              <Grid xs={2} sm={4} md={4}>
                <Item>
                  <p>Sunrise: {weatherData.sys.sunrise} </p>
                  <p>Sunset: {weatherData.sys.sunset} </p>
                </Item>
              </Grid>
              <Grid xs={2} sm={4} md={4}>
                <Item>
                  <p>Humidity: {weatherData.main.humidity}%</p>
                </Item>
              </Grid>
              <Grid xs={2} sm={4} md={4}>
                <Item>
                  <p>Visibility: {weatherData.visibility}</p>
                </Item>
              </Grid>
              <Grid xs={2} sm={4} md={4}>
                <Item>
                  <p>Air Quality: {weatherData.cod}</p>
                </Item>
              </Grid>
              {/* <Grid md={12}>
                <Item>xs=2</Item>
              </Grid> */}
            </Grid>
          </Box>
        )}
      </Grid>
    </Grid>
  );
};

export default Dashboard;
