import { useState } from "react";
import axios from "axios";

function QuoteGenerator () {
    const [quote, setQuote] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const fetchQuote = async() => {
        try {
            setLoading(true);
            const res = await axios.get("/api/quote");
            setQuote(res.data.quote);
        }catch(err){
            setError("Failed to Fetch Quote");
        }
        setLoading(false);
    }

    return (
    <div className="text-center">
      <h2 className="text-xl font-semibold mb-3 text-blue-700">Motivational Quote</h2>
      <button
        onClick={fetchQuote}
        className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-all"
      >
        Get Quote
      </button>

      {loading && <p className="text-gray-500 mt-3">Loading...</p>}
      {error && <p className="text-red-600 mt-3">{error}</p>}
      {quote && (
        <p className="mt-4 text-lg italic text-gray-800">“{quote}”</p>
      )}
    </div>
    )
}

export default QuoteGenerator;