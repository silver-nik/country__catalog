import { useState } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";

import { CountryList } from './components/pages/countryList';
import { SingleCountry } from './components/pages/singleCountry';

const App = () => {

  const [currentCountryName, setCurrentCountryName] = useState('');

  const changeCurrentCounntryName = (name) => {
    setCurrentCountryName(name);
    localStorage.setItem('name', name);
  }

  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<CountryList changeCurrentCountryName={changeCurrentCounntryName} />} /> 
          <Route path="/country" element={<SingleCountry name={currentCountryName} />} /> 
        </Routes>
      </Router>
    </div>
  );
}

export default App;
