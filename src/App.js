import './App.css';
import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {

  const [error, setError] = useState('');
  const [data, setData] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getData()
  }, []);

  async function getData() {

    await axios('https://api.hatchways.io/assessment/students').then((response) => {
      setData(response.data);
    }).catch((error) => {
      console.error("Error fetching data: ", error);
      setError(error);
    }).finally(() => {
      setLoading(false);
    });

  }


  if (loading) return "Loading";
  if (error) return "Error";

  return (
    <div className="App">
      {/* <h1>Hello world, your React.js app is working</h1> */}
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
}

export default App;
