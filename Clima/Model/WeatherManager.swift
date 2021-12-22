import Foundation

protocol WeatherManagerDelegate {
    func didUpdateWeather(_ WeatherManager : WeatherManager, weather: WeatherModel)
    func didFailWithError(error : Error)
}
struct WeatherManager {
    let weatherURL = "https://api.openweathermap.org/data/2.5/weather?appid=1a966573ccd7d4f8c332f395af59d6f1&units=metric"
    
    var delegate: WeatherManagerDelegate?
    
    func fetchWeather(cityName: String)
    {
    let urlString = "\(weatherURL)&q=\(cityName)"
        print(urlString)
        performRequest(urlString: urlString)
    }
    
    func performRequest(urlString : String)
    {
        if let url = URL(string: urlString)
        {
            
            let session = URLSession(configuration: .default)
            let task = session.dataTask(with: url) { data, response, error in
                if error != nil {
                    self.delegate?.didFailWithError(error: error!)
                    return
                }
                if let safeData = data
                {
                    if let weather = self.parseJSON(weatherData: safeData){
                        delegate?.didUpdateWeather(self, weather : weather)
                    }
                }
            }
            
            task.resume()
        }
    }
    func parseJSON(weatherData: Data) -> WeatherModel? {
        let decoder = JSONDecoder()
        do {
           let decodedData =  try decoder.decode(WeatherData.self , from: weatherData)
           let id = decodedData.weather[0].id
           let temp = decodedData.main.temp
           let name = decodedData.name
           
           let weather = WeatherModel(conditionId: id , cityName: name, temperature: temp)
           return weather
            
        } catch {
            delegate?.didFailWithError(error: error)
            return nil
        }
    }

   
}
