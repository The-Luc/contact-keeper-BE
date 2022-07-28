import React, { useContext, useMemo, useEffect } from 'react';
import ContactContext from '../../context/contact/contactContext';
import ContactItem from './ContactItem';

const Contacts = () => {
  const contactContext = useContext(ContactContext);

  const { contacts, filtered, getContacts } = contactContext;

  useEffect(() => {
    getContacts();
    // eslint-disable-next-line
  }, []);

  const contactList = useMemo(() => {
    return filtered || contacts;
  }, [filtered, contacts]);

  return (
    <>
      {contactList.map(contact => (
        <ContactItem key={contact._id} contact={contact} />
      ))}
    </>
  );
};

export default Contacts;
