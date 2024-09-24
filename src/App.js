import React, { useEffect, useState } from "react";
import axios from "axios";

const App = () => {
  const [countries, setCountries] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("https://restcountries.com/v3.1/all")
      .then((response) => {
        setCountries(response.data);
        setLoading(false);
        console.log(response.data);
        
      })
      .catch((error) => {
        console.error("Error fetching the countries data!", error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div className="text-center text-2xl">Loading...</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4 text-center">Country List</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {countries.map((country) => (
          <div key={country.cca3} className="border p-4 rounded shadow">
            <img
              src={country.flags.svg}
              alt={`${country.name.common} Flag`}
              className="w-full h-40 object-cover mb-2"
            />
            <h2 className="text-xl font-semibold">{country.name.common}</h2>
            <p>
              <strong>Population:</strong> {country.population.toLocaleString()}
            </p>
            <p>
              <strong>Region:</strong> {country.region}
            </p>
            <p>
              <strong>Capital:</strong>{" "}
              {country.capital ? country.capital[0] : "N/A"}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;
