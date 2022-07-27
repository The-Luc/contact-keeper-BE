import React, { useContext, useRef } from 'react';
import contactContext from '../../context/contact/contactContext';

const ContactFilter = () => {
  const { clearFilter, filterContacts } = useContext(contactContext);

  const text = useRef('');

  const onChange = () => {
    const term = text.current.value;

    if (!term) {
      clearFilter();
      return;
    }

    filterContacts(term);
  };
  return (
    <form>
      <input ref={text} type="text" placeholder="Enter filter" onChange={onChange} />
    </form>
  );
};

export default ContactFilter;
