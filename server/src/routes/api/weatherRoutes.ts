import { Router, type Request, type Response } from 'express';
const router = Router();

import HistoryService from '../../service/historyService.js';
import WeatherService from '../../service/weatherService.js';

// TODO: POST Request with city name to retrieve weather data
router.post('/', async (req: Request, res: Response) => { 
  const { city } = req.body;  // Destructure city from the request body

  if (!city) { // Check if city is provided
    return res.status(400).json({ error: 'City name is required' }); // Respond with an error if city is not provided
  }

  try {
    // Fetch weather data for the city
    const weatherData = await WeatherService.getWeatherForCity(city);

    // Save the city to search history
    await HistoryService.addCity(city);

    // Respond with the weather data
    return res.json({ weather: weatherData });
  } catch (error) {
    return res.status(500).json({ error: 'Failed to retrieve weather data' });
  }
});8

// TODO: GET search history
router.get('/history', async (req: Request, res: Response) => {
  try {
    const history = await HistoryService.getCities();
    return res.json({ history });
  } catch (error) {
    return res.status(500).json({ error: 'Failed to retrieve search history' });
  }
});

// * BONUS TODO: DELETE city from search history
router.delete('/history/:id', async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const result = await HistoryService.removeCity(id);
    
    if (result === 'City not found') {
      return res.status(404).json({ error: 'City not found' });
    } 
     return res.json({ message: result });
    } catch (error) {
      return res.status(500).json({ error: 'Failed to remove city' });
    }
});

export default router;


//FOURTH