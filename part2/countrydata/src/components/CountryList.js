const CountryList = ({ country, handleShowDetail }) => {
  return country.map((country) => (
    <div key={country.ccn3}>
      <span> {country.name.common}</span>
      <button onClick={() => handleShowDetail([country])}>Show</button>
    </div>
  ));
};

export default CountryList;
