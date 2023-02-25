import { useState } from 'react';

const Button = ({ title, onClick }) => {
  return <button onClick={onClick}>{title}</button>;
};

const StatisticLine = ({ text, value }) => {
  return (
    <tr>
      <th> {text}</th>
      <td> {value}</td>
    </tr>
  );
};

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);
  const average = (good + bad * -1) / 2;
  const postive = good / (good + neutral + bad) || 0;

  const handleGood = () => {
    setGood(good + 1);
  };

  const handleNeutral = () => {
    setNeutral(neutral + 1);
  };

  const handleBad = () => {
    setBad(bad + 1);
  };

  return (
    <div>
      <h1>Give Feedback</h1>
      <div>
        <Button title='Good' onClick={handleGood} />
        <Button title='Netural' onClick={handleNeutral} />
        <Button title='Bad' onClick={handleBad} />
      </div>

      <h2>Statistic</h2>
      <table>
        <tbody>
          <StatisticLine text='Good' value={good} />
          <StatisticLine text='Netural' value={neutral} />
          <StatisticLine text='Bad' value={bad} />
          <StatisticLine text='Average' value={average} />
          <StatisticLine text='Postive' value={postive} />
        </tbody>
      </table>
    </div>
  );
};

export default App;
