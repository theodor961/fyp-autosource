import React, { useState, useEffect } from 'react';
import { collection, query, where, onSnapshot } from 'firebase/firestore';
import { db, auth } from '../firebase-config';

import OrderItem from './orders/OrderItem';
import OrderFullView from './orders/OrderFullView';

export default function MyOrders() {
  const ordersCollRef = collection(db, 'orders');
  const [orders,setOrders] = useState([]);

  const [overlay, setOverlay] = useState({status: false, data: []});

  useEffect(() => {
    try {
      const q = query(ordersCollRef, where("user.id","==",auth.currentUser.uid));
      onSnapshot(q, (snapshot) => {
        setOrders(snapshot.docs.map((doc) => ({...doc.data(), id: doc.id})));
      });
      console.log("orders: ", orders);
    } catch(error) {
      console.log(error);
    }
  }, [])

  return (
    <div style={{textAlign: 'center'}}>
        <h1>My Orders</h1>

        {orders.map((order) => {
          return (
            <OrderItem 
              orderData={order}
              key={order.id} 
              onClick={() => {
                setOverlay({status: true, data: order});
              }}
            />
          ) 
        })}

        {overlay.status == true && 
          <OrderFullView  
            orderData={overlay.data}
            onClose={() => {setOverlay({status: false, data: []})}}
          />
        }
    </div>
  )
}
