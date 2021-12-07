import React, { useState } from 'react';
import SpinnerLoader from './SpinnerLoader';
import firebase from './firebase';
import { v4 as uuidv4 } from 'uuid';

const dataForm = {
    first_name: '',
    last_name: '',
    interest: ''
};

const PersonsForm = () => {
    const ref = firebase.firestore().collection('person-data');
    const [form, setForm] = useState(dataForm);
    const [isLoadingPost, setIsLoadingPost] = useState(false);

    const handleFormChange = (event) => {
        setForm({...form, [event.target.name]: event.target.value});
        // console.log(form);
    }    

    const handleSubmit = (event) => {
        const data = {...form, id: uuidv4() };
        setIsLoadingPost(true);
        event.preventDefault();

        postPerson(data);
        setIsLoadingPost(false);
        
    };

    const postPerson = (newPerson) => {
        ref
            .doc(newPerson.id)
            .set(newPerson)
            .catch((error) => console.log(error));
    };


    return (
        <div style={{ marginBottom: '40px'}}>
            <form onSubmit={handleSubmit}>
                <div className="app-input-container">
                    <label htmlFor="first_name">First Name</label>
                    <input 
                        style={{ width: '100%' }}
                        name="first_name" 
                        type="text"
                        placeholder="First Name"
                        onChange={handleFormChange}
                        className="app-input"
                        required
                    />
                    <label htmlFor="last_name">Last Name</label>
                    <input 
                        style={{ width: '100%' }}
                        name="last_name" 
                        type="text"
                        placeholder="Last Name"
                        onChange={handleFormChange}
                        className="app-input"
                        required
                    />
                    <label htmlFor="interest">Interest</label>
                    <input 
                        style={{ width: '100%' }}
                        name="interest" 
                        type="text"
                        placeholder="Interest"
                        onChange={handleFormChange}
                        className="app-input"
                        required
                    />
                </div>
                <div className="">
                    {isLoadingPost ?
                    <SpinnerLoader />
                    : 
                    <button className="app-btn-submit">Save</button>
                    }
                </div>
            </form>
        </div>
    )
}

export default PersonsForm
