import CountryDetail from './CountryDetail';
import CountryList from './CountryList';

const Result = ({ searchResult, handleShowDetail }) => {
  if (searchResult.length > 10) {
    return <p>Too many matches, specify another filter</p>;
  } else if (searchResult.length !== 1) {
    return (
      <CountryList country={searchResult} handleShowDetail={handleShowDetail} />
    );
  } else {
    return <CountryDetail country={searchResult[0]} />;
  }
};

export default Result;
