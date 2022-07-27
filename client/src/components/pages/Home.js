import React from 'react';
import Contacts from '../contacts/Contacts';

const Home = () => {
  return (
    <div className="grid-2">
      <div className="">{/* Contact form*/}</div>
      <div className="">
        <Contacts />
      </div>
    </div>
  );
};

export default Home;
