import dotenv from 'dotenv';
dotenv.config();

//SECOND

// TODO: Define an interface for the Coordinates object
interface Coordinates {
  lat: number;
  lon: number;
} 
// TODO: Define a class for the Weather object
class Weather {
  city: string;
  date: string;
  description: string;
  temp: number;
  humidity: number;
  wind: number;
  uv: number;
  icon: string;
  constructor(city: string, date: string, description: string, temp: number, humidity: number, wind: number, uv: number, icon: string) {
    this.city = city;
    this.date = date;
    this.description = description;
    this.temp = temp;
    this.humidity = humidity;
    this.wind = wind;
    this.uv = uv;
    this.icon = icon;
  }
}
  
// TODO: Complete the WeatherService class
class WeatherService {
  // TODO: Define the baseURL, API key, and city name properties
  private baseURL: string;
  private apiKey: string;
  private cityName: string;
  constructor() {
    this.baseURL = 'api.openweathermap.org/data/2.5/forecast?';
    this.cityName = '';
    this.apiKey = '8d80892d4a40a65c0626805c3c6a8cd7';
  }
  // TODO: Create fetchLocationData method
  private async fetchLocationData(query: string) {
    const response = await fetch(`${this.baseURL}/geo/1.0/direct?q=${query}&appid=${this.apiKey}`);
    return response.json();
  }

  // TODO: Create destructureLocationData method
  private destructureLocationData(locationData: Coordinates): Coordinates {
    const { lat, lon } = locationData;
    return { lat, lon };
  }

  // TODO: Create buildGeocodeQuery method
  private buildGeocodeQuery(city: string): string {
    return `${this.baseURL}/geo/1.0/direct?q=${city}&limit=1&appid=${this.apiKey}`;
  }

  // TODO: Create buildWeatherQuery method
  private buildWeatherQuery(coordinates: Coordinates): string {
    return `${this.baseURL}/weather?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${this.apiKey}&units=metric`;
  }

  // TODO: Create fetchAndDestructureLocationData method
  private async fetchAndDestructureLocationData(city: string): Promise<Coordinates> {
    const locationData = await this.fetchLocationData(city);
    return this.destructureLocationData(locationData);
  }

  // TODO: Create fetchWeatherData method
  private async fetchWeatherData(coordinates: Coordinates) {
    const query = this.buildWeatherQuery(coordinates); //Build query string
    const response = await fetch(query); //Fetch data
    return response.json();   //Return JSON data
  }

  // TODO: Build parseCurrentWeather method
  private parseCurrentWeather(response: any) { //Parse data
    const { name, dt, weather, main, wind, uv } = response;
    const { description, icon } = weather[0];
    const { temp, humidity } = main;
    const { speed } = wind;
    return new Weather(name, dt, description, temp, humidity, speed, uv, icon);
  }

  // TODO: Complete buildForecastArray method
  private buildForecastArray(currentWeather: Weather, weatherData: any[]) {
    const forecastArray: Weather[] = [];
    forecastArray.push(currentWeather);
    weatherData.forEach((data: any) => {
      const { dt, weather, main } = data;
      const { description, icon } = weather[0];
      const { temp, humidity } = main;
      const weatherObject = new Weather(this.cityName, dt, description, temp, humidity, 0, 0, icon);
      forecastArray.push(weatherObject);
    });
    return forecastArray;
  }

  // TODO: Complete getWeatherForCity method
  async getWeatherForCity(city: string) {
    this.cityName = city;
    const coordinates = await this.fetchAndDestructureLocationData(city);
    const currentWeather = await this.fetchWeatherData(coordinates);
    const forecastData = await this.fetchWeatherData(coordinates);
    const currentWeatherObject = this.parseCurrentWeather(currentWeather);
    const forecastArray = this.buildForecastArray(currentWeatherObject, forecastData);
    return forecastArray;
  }
}

export default new WeatherService();
a