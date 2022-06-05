import React, { useEffect, useRef, useState } from 'react';
import { useContext } from 'react';

import { UserContext } from '../../store/UserContext';

import styles from '../requests/RequestFullView.module.css';
import { IoArrowBack } from 'react-icons/io5';

import { addDoc, collection, doc, getDoc } from 'firebase/firestore';
import { auth, db } from '../../firebase-config';

export default function OrderFillInformations(props) {
  //props.reply = reply

  const userData = useContext(UserContext);

  const [cities, setCities] = useState([]);
  const [middlemanData, setMiddlemanData] = useState([]);

  const city = useRef('');
  const description = useRef('');

  const ordersCollRef = collection(db, 'orders');
  const cityDocRef = doc(db, 'categories', 'cities');

  useEffect(() => {
    getCities();
    getMiddleman();
    console.log("data: ", userData.first_name);
    console.log("reply: ", props.reply.middleman_id);
  }, [])

  //get the cities
  const getCities = async () => {
    try {
      const docSnap = await getDoc(cityDocRef);
      setCities(docSnap.data().city);
      console.log("cities: ", docSnap.data().city);
    } catch (error) {
      console.log(error);
    }
  }

  //get middleman data
  const getMiddleman = async () => {
    const docRef = doc(db, "middlemen", props.reply.middleman_id);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      setMiddlemanData(docSnap.data());
      console.log("middleman: ", middlemanData)
    } else {
      console.log("no such document");
    }
  }


  const createOrder = async () => {
    try {
      const order = await addDoc(ordersCollRef, {
        auto_part: {
          title: props.reply.title,
          description: props.reply.description,
          image: props.reply.image,
          brand: props.reply.part_info.brand,
          model: props.reply.part_info.model,
          year: props.reply.part_info.year,
          category: props.reply.part_info.category,
        },
        destination_address: {
          city: city.current.value,
          description: description.current.value,
        },
        source_address: {
          city: props.reply.seller.address.city,
          description: props.reply.seller.address.description,
        },
        seller: {
          seller_name: props.reply.seller.name,
          seller_phone: props.reply.seller.phone,
        },
        middleman: {
          id: props.reply.middleman_id,
          first_name: middlemanData.first_name,
          last_name: middlemanData.last_name,
          phone: middlemanData.phone,
        },
        user: {
          id: auth.currentUser.uid,
          first_name: userData.first_name,
          last_name: userData.last_name,
          phone: userData.phone,
        },
        reply_id: props.reply.id,
        amount: props.reply.price,
        created_at: new Date(),
      });
      console.log("order: ", order);
    } catch (error) {
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
          ref={description}
          type='text'
          placeholder='Detailed address'
        />
        <br /><br />
        <input
          required
          list="cities"
          type="text"
          ref={city}
          autoComplete="on"
        />
        <datalist id="cities">
          {cities.map((city, i) => (
            <option key={i}>{city}</option>
          ))}
        </datalist>
        <br /><br />

        <button onClick={createOrder}>Send Order</button>
      </div>
    </div>
  )
}
