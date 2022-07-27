import React, { useContext, useMemo } from 'react';
import ContactContext from '../../context/contact/contactContext';
import ContactItem from './ContactItem';

const Contacts = () => {
  const contactContext = useContext(ContactContext);

  const { contacts, filtered } = contactContext;

  const contactList = useMemo(() => {
    return filtered || contacts;
  }, [filtered, contacts]);

  return (
    <>
      {contactList.map(contact => (
        <ContactItem key={contact.id} contact={contact} />
      ))}
    </>
  );
};

export default Contacts;
