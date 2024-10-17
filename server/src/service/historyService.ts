import fs from 'fs';


// TODO: Define a City class with name and id properties
interface City {
  name: string;
  id: string;
}
// TODO: Complete the HistoryService class
class HistoryService {
  // TODO: Define a read method that reads from the searchHistory.json file
  private async read(): Promise<City[]> {  
    return new Promise((resolve, reject) => {  //return a promise that takes in resolve and reject as arguments 
      fs.readFile('searchHistory.json', 'utf8', (err, data) => { //read the searchHistory.json file
        if (err) {    
          reject(err);  
        } else { 
          resolve(JSON.parse(data)); //parse the data and resolve it
        }
      });
    });
  }
  // TODO: Define a write method that writes the updated cities array to the searchHistory.json file
  private async write(cities: City[]) { 
    return new Promise((resolve, reject) => { //return a promise that takes in resolve and reject as arguments
      fs.writeFile('searchHistory.json', JSON.stringify(cities), (err) => { //write the cities array to the searchHistory.json file
        if (err) {
          reject(err);
        } else {
          resolve('Success');
        }
      });
    });
  }

  // TODO: Define a getCities method that reads the cities from the .json file and returns them as an array of City objects
  async getCities() {
    const cities = await this.read(); //read the cities from the searchHistory.json file
    return cities;
  }
  // TODO Define an addCity method that adds a city to the searchHistory.json file
  async addCity(city: string) {  
    const cities = await this.read(); //read the cities from the searchHistory.json file
    const newCity = { name: city, id: Date.now().toString() }; //create a new city object with the city name and the current date as the id
    cities.push(newCity); //push the new city object to the cities array
    await this.write(cities); //write the updated cities array to the searchHistory.json file
    return newCity; //return the new city object
  }
  
  // * BONUS TODO: Define a removeCity method that removes a city from the searchHistory.json file
  async removeCity(id: string) {
    const cities = await this.read();
    const index = cities.findIndex((city) => city.id === id);
    if (index === -1) {
      return 'City not found';
    }
    cities.splice(index, 1);
    await this.write(cities);
    return 'City removed';
  }
}

export default new HistoryService();

//THIRD