import React, { useEffect, useRef, useState } from 'react';

import styles from '../requests/RequestFullView.module.css';
import { IoArrowBack } from 'react-icons/io5';
import { addDoc, collection, doc, getDoc } from 'firebase/firestore';
import { auth, db } from '../../firebase-config';

export default function OrderFillInformations(props) {
  const [cities,setCities] = useState([]);

  const city = useRef('');
  const address = useRef('');

  const ordersCollRef = collection(db,'orders');
  const cityDocRef = doc(db,'categories', 'cities');

  useEffect(() => {
    getCities();
  }, [])

  //get the cities
  const getCities = async () => {
    try {
        const docSnap = await getDoc(cityDocRef);
        setCities(docSnap.data().city);
        console.log("cities: ",docSnap.data().city );
    } catch (error) {
        console.log(error);
    }
  }

  const createOrder = async() => {
    try {
      const order = await addDoc(ordersCollRef, {
        created_at: new Date(),
        destination: {
          city: city.current.value,
          address: address.current.data,
        },
        user_id: auth.currentUser.uid,
        reply_id: props.reply_id,
      });
    } catch(error) {
      console.log(error);
    }
  }

  return (
    <div className={styles.modalBackground}>
      <div className={styles.modal}>
        <div>
          <button className={styles.button} onClick={props.onClose}><IoArrowBack size='30' /></button>
        </div>
        <h3>Fill you informations</h3>
        <input 
          required 
          ref={address}
          type='text'
          placeholder='Detailed address'
        />
        <br/><br/>
        <input
            required
            list="cities"
            type="text"
            ref={city}
            //onChange={handleCityChange}
            //value={city}
            //pattern={autocompleteCities.join("|")}
            autoComplete="on"
          />
          <datalist id="cities">
            {cities.map((city, i) => (
              <option key={i}>{city}</option>
            ))}
          </datalist>
        <br/><br/>
      
        <button onClick={createOrder}>Send Order</button>
      </div>
    </div>
  )
}
