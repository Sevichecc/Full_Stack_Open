import { useState } from 'react';

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients',
  ];

  const [selected, setSelected] = useState(0);
  const [vote, setVoted] = useState(new Array(7).fill(0));
  const maxVote = vote.indexOf(Math.max(...vote));

  const handleSelected = () => {
    setSelected(Math.floor(Math.random() * 7));
  };

  const handleVote = (selected) => () => {
    const newCopy = [...vote];
    newCopy[selected]++;
    setVoted(newCopy);
  };

  console.log(vote.indexOf(Math.max(...vote)));
  return (
    <div>
      <div>
        <h2>Anecdote of the Day</h2>
        <p> {anecdotes[selected]}</p>
        <p>has {vote[selected]} votes</p>
        <button onClick={handleSelected}>Next anecdote</button>
        <button onClick={handleVote(selected)}>Vote</button>
      </div>
      <div>
        <h2>Anecdote with the most votes</h2>
        <p>{anecdotes[maxVote]}</p>
        <p>has {vote[maxVote]} votes</p>
      </div>
    </div>
  );
};

export default App;
