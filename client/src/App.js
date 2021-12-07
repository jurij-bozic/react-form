import React, { useEffect, useState } from 'react';
import firebase from './firebase';

function App() {
  const ref = firebase.firestore().collection('person-data')
  const [personData, setPersonData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const getPersonData = () => {
    setIsLoading(true);
    ref.onSnapshot((items) => {
      const data = [];
      items.forEach((doc) => {
        data.push(doc.data());
      })
      setPersonData(data);
      setIsLoading(false);
    });
  };

  useEffect(() => {
    getPersonData();
  }, [])

  if(isLoading) {
    return <h2>loading data . . .</h2>
  }


  return (
    <div>
      <h1>Persons</h1>
      {personData.map((person) => (
        <div key={person.id}>
          <h3>Person name</h3>
          <p>{person.first_name} {person.last_name}</p>
        </div>
      ))}
    </div>
  );
}

export default App;
