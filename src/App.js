import React, { useState } from 'react';
import './App.css';
import LoadingOverlay from './LoadingOverlay';

function Prescription({ prescription }) {
  return (
    <div className="Prescription">
      <h2>Prescription Details</h2>
      <p>Registration ID: {prescription.regn}</p>
      <p>Name: {prescription.name}</p>
      <p>Age: {prescription.age}</p>
      <p>Sex: {prescription.sex}</p>
      <p>Problem: {prescription.problem}</p>
      <p>Blood Pressure: {prescription.BP}</p>
      <p>Temperature: {prescription.temp}</p>
      <p>Pulse Rate: {prescription.prate}</p>
      <p>SpO2: {prescription.spo}</p>
      <p>Instructions: {prescription.instructions}</p>
      <h3>Medicines:</h3>
      <ul>
        {prescription.selectedElements.map((element) => (
          <li key={element._id}>
            {element.element} - {element.value !== undefined ? element.value : '0'} days
            <ul>
              <li>Before Breakfast: {element.checkbox0 ? 'Yes' : 'No'}</li>
              <li>Morning: {element.checkbox1 ? 'Yes' : 'No'}</li>
              <li>Afternoon: {element.checkbox2 ? 'Yes' : 'No'}</li>
              <li>Night: {element.checkbox3 ? 'Yes' : 'No'}</li>
            </ul>
          </li>
        ))}
      </ul>
      <p>Investigation: {prescription.inv}</p>
      <p>Advice: {prescription.adv}</p>
      <p>Follow Up: {prescription.follow}</p>
      <p>Date: {prescription.date}</p>
    </div>
  );
}

function App() {
  const [registrationId, setRegistrationId] = useState('');
  const [prescriptionData, setPrescriptionData] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleRegistrationIdChange = (event) => {
    setRegistrationId(event.target.value);
  };

  const handleSearch = () => {
    setIsLoading(true); // Set loading to true when API call starts
    // Make API call here using registrationId
    fetch('https://shs-backend.vercel.app/getPrescriptionData', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ regn: registrationId }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        return response.json();
      })
      .then((data) => {
        setPrescriptionData(data.prescriptionData);
        setError(null);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
        setError('Failed to fetch data. Please try again later.');
        setPrescriptionData(null);
      })
      .finally(() => {
        setIsLoading(false); // Set loading to false when API call is done
      });
  };

  return (
    <div className="App">
      <header className="App-header">
        <div className="verification-text">
            <p>Verify the prescription generated through Vaidya-Mitra portal</p>
        </div>
        <div className="SearchBox">
          <input
            type="text"
            value={registrationId}
            onChange={handleRegistrationIdChange}
            placeholder="Enter registration ID"
          />
          <button onClick={handleSearch}>Search</button>
        </div>
        {isLoading && <LoadingOverlay />}
        {error && <p>{error}</p>}
        {prescriptionData && prescriptionData.map((prescription, index) => (
          <Prescription key={index} prescription={prescription} />
        ))}
      </header>
    </div>
  );
}

export default App;
