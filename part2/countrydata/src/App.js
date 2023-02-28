import { useEffect, useState } from 'react';
import axios from 'axios';
import Result from './components/Result';

const App = () => {
  const [searchKey, setSearchKey] = useState('');
  const [countries, setCountries] = useState([]);
  const [searchResult, setSearchResults] = useState([]);

  useEffect(() => {
    axios.get('https://restcountries.com/v3.1/all').then((response) => {
      setCountries(response.data);
    });
  }, []);

  const searchCountry = (searchKey) => {
    if (!searchKey) return;
    setSearchResults(
      countries.filter((country) =>
        country.name.common.match(new RegExp(searchKey, 'gi'))
      )
    );
  };

  const handleSearchChange = (event) => {
    setSearchKey(event.target.value);
    searchCountry(searchKey);
  };
  const handleShowDetail = (country) => {
    setSearchResults(country);
  };
  return (
    <div>
      find countries:
      <input value={searchKey} onChange={handleSearchChange} />
      <Result searchResult={searchResult} handleShowDetail={handleShowDetail} />
    </div>
  );
};

export default App;
