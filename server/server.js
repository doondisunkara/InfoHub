const express = require('express');
const cors = require('cors');

const axios = require('axios');
const dotenv = require('dotenv');

const app = express();
app.use(cors());
app.use(express.json());

dotenv.config();

const {PORT, QUOTE_API_KEY, WEATHER_API_KEY, EXCHANGERATE_API_KEY} = process.env;

const initializingServer = () => {
    app.listen(PORT, console.log(`Server running on PORT: ${PORT}`));
}

const quoteApiController = async(req, res) => {
    try{
        const randomQuote = await axios.get("https://api.api-ninjas.com/v2/randomquotes", {
            headers:{
            "X-Api-Key": QUOTE_API_KEY
        }});
        const quote = randomQuote.data[0].quote;
        res.status(200).send({quote});
    }
    catch(error){
        res.status(500).json({error: error.message});
    }
}

const weatherApiController = async(req, res) => {
    try{
        const {lat, lon} = req.body;
        
        const weatherDetails = await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}`);
        const data = weatherDetails.data;
        const formattedWeatherReport = {
            weather: data.weather[0].main,
            description: data.weather[0].description,
            temp: data.main.temp
        }
        res.status(200).json(formattedWeatherReport);

    }
    catch(error){
        res.status(500).json({error: error.message});
    }
}

const currencyApiController = async(req, res) => {
    try {
        const {amount} = req.query;
        const amountINR = parseFloat(amount);

        if (isNaN(amountINR) || amountINR <= 0){
            res.status(400).json({
                error: "Invalid amount provided"
            });
        }

        const ratesData = await axios.get(`https://v6.exchangerate-api.com/v6/${EXCHANGERATE_API_KEY}/latest/INR`);
        const data = ratesData.data;
        const usdConversion = data.conversion_rates.USD * amountINR ;
        const eurConversion = data.conversion_rates.EUR * amountINR;
        console.log(usdConversion, eurConversion);
        res.status(200).json({usd: usdConversion, eur: eurConversion});
    }
    catch (error){
        console.log(error);
        res.status(500).send(error.message);
    }
}

app.get("/api/quote", quoteApiController);
app.post("/api/weather", weatherApiController);
app.get("/api/currency", currencyApiController);

initializingServer();