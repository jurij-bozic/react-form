import React, { useEffect, useState } from 'react';
import firebase from './firebase';
import SpinnerLoader from './SpinnerLoader';
import PersonsForm from './PersonsForm';

function App() {
  const ref = firebase.firestore().collection('person-data')
  const [personData, setPersonData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const getPersonData = () => {
    setIsLoading(true);

    //live subscription to db changes
    ref.onSnapshot((items) => {
      const data = [];
      items.forEach((document) => {
        data.push(document.data());
      })
      setPersonData(data);
      setIsLoading(false);
    });
  };

  useEffect(() => {
    getPersonData();
  }, [])

  if(isLoading) {
    return <div className="app-spinner-container"> <SpinnerLoader /> </div>;
  }


  return (
    <div className="app-wrapper">
      <div className="app-content">
        <div className="app-content-persons">
          <div>
            <h1>Persons List App</h1>
            <br/>
            <PersonsForm />
            <div style={{ }}>
              <h2>Saved Persons</h2>
              {personData.map((person) => (
                <span key={person.id}>
                  <div className="app-person-card">
                    <h4>Person name</h4>
                    <p>{person.first_name} {person.last_name}</p>
                    <p>Interest: {person.interest}</p>
                  </div>
                  <br />
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
