import './App.css';
import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {

  const [error, setError] = useState('');
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getData()
  }, []);

  function getData() {
    axios('https://api.hatchways.io/assessment/students')
      .then((response) => {
        setData(response.data.students);
      }).catch((error) => {
        console.error("Error fetching data: ", error);
        setError(error);
      }).finally(() => {
        setLoading(false);
      })
  }



  if (loading) return "Loading";
  if (error) return "Error";


  return (
    <div className="App">
      <h1 id='page-heading'>Frontend Assessment - Student Profile</h1>
      {data.map((studentInfo, index) => {
        const avg = studentInfo.grades.reduce((a, b) => a + parseFloat(b), 0) / studentInfo.grades.length;
        return (
          <div className='student-info'>
            <img id='student-pic' src={studentInfo.pic} alt='display' img />
            <h2 id='student-name'>{studentInfo.firstName}&nbsp;{studentInfo.lastName}</h2>
            <div id='student-text'>
              <div>Email: {studentInfo.email}</div>
              <div>Company: {studentInfo.company}</div>
              <div>Skill: {studentInfo.skill}</div>
              <div>Average: {avg}</div>
              </div>
          </div>
        )
      })}
    </div>
  );
}

export default App;
