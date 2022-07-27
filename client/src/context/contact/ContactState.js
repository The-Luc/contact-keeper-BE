import React, { useReducer } from 'react';
import uuid from 'uuid';
import ContactContext from './contactContext';
import contactReducer from './contactReducer';

import {
  ADD_CONTACT,
  DELETE_CONTACT,
  SET_CURRENT,
  CLEAR_CURRENT,
  UPDATE_CONTACT,
  FILTER_CONTACT,
  CLEAR_FILTER,
} from '../types';

const ContactState = props => {
  const initialState = {
    contacts: [
      {
        id: 1,
        name: 'Friend1',
        email: 'friend1@gmail.com',
        phone: '111-111-111',
        type: 'personal',
      },
      {
        id: 2,
        name: 'Friend2',
        email: 'friend2@gmail.com',
        phone: '111-111-111',
        type: 'professional',
      },
      {
        id: 3,
        name: 'Friend3',
        email: 'friend3@gmail.com',
        phone: '333-333-333',
        type: 'personal',
      },
      {
        id: 4,
        name: 'Friend4',
        email: 'friend4@gmail.com',
        phone: '111-111-111',
        type: 'personal',
      },
    ],
  };

  const [state, dispatch] = useReducer(contactReducer, initialState);
  // Add contact

  // Delete contact

  // Set current contact

  // Clear current contact

  // Update current contact

  // Filter contact

  // Clear filter

  return (
    <ContactContext.Provider value={{ contacts: state.contacts }}>
      {props.children}
    </ContactContext.Provider>
  );
};

export default ContactState;
