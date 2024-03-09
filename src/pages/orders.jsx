import React from "react";
// import { Link } from 'react-router-dom';
import Header from '../components/Header.jsx'
import Sections from '../components/Sections.jsx'

function Orders() {
  return (
    <>
      <Header />
      <Sections page="orders" />
      <p>Coming soon...</p>
    </>
  );
}

export default Orders;