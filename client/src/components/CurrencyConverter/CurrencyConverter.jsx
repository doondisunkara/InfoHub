import { useState } from "react";

import axios from "axios";

function CurrencyConverter (){
    const [amount, setAmount] = useState(0);
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError]= useState("");

    const convertCurrency = async() => {
        if (amount <= 0) {
            setError("Please enter a Valid amount");
            return;
        }
        setLoading(true);
        
        try{
            const res = await axios.get(`/api/currency?amount=${amount}`);
            setData(res.data);
        }
        catch(err){
            setError("Failed to Fetch Currency Conversion");
        }
        setLoading(false);
    }

    return (
        <div className="text-center">
      <h2 className="text-xl font-semibold mb-3 text-blue-700">Currency Converter</h2>
      <input
        type="number"
        placeholder="Enter amount in INR"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        className="border p-2 rounded-md w-2/3 mb-3"
      />
      <br />
      <button
        onClick={convertCurrency}
        className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-all"
      >
        Convert
      </button>

      {loading && <p className="text-gray-500 mt-3">Loading...</p>}
      {error && <p className="text-red-600 mt-3">{error}</p>}
      {result && (
        <div className="mt-4 text-lg">
          <p>💵 USD: {data.usd.toFixed(2)}</p>
          <p>💶 EUR: {data.eur.toFixed(2)}</p>
        </div>
      )}
    </div>
    )
}

export default CurrencyConverter;