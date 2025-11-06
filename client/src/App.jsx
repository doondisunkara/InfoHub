import { useState } from 'react';
import QuoteGenerator from './components/QuoteGenerator/QuoteGenerator';
import WeatherModule from './components/WeatherModule/WeatherModule';
import CurrencyConverter from './components/CurrencyConverter/CurrencyConverter';

function App() {
  const [activeTab, setActiveTab] = useState('Weather');
  const tabs = ["Weather", "Currency", "Quote"];
  console.log("App is working");
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center py-10">
      <h1 className="text-3xl font-bold text-blue-700 mb-8">🌐 InfoHub</h1>

      <div className="flex gap-4 mb-6">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-6 py-2 rounded-lg font-semibold transition-all ${
              activeTab === tab
                ? "bg-blue-600 text-white"
                : "bg-white border border-blue-600 text-blue-600"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className="w-full max-w-md bg-white shadow-lg rounded-lg p-6">
        {activeTab === "Weather" && <WeatherModule />}
        {activeTab === "Currency" && <CurrencyConverter />}
        {activeTab === "Quote" && <QuoteGenerator />}
      </div>
    </div>
  )
}

export default App;