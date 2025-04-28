import React from 'react';
import { useSelector } from 'react-redux';
import { selectFilteredContacts } from '../../redux/contactsSlice';
import styles from './ContactList.module.css';

export default function ContactList() {
  const contacts = useSelector(selectFilteredContacts);

  return (
    <ul className={styles.list}>
      {contacts.map(contact => (
        <li key={contact.id} className={styles.item}>
          {contact.name}: {contact.phone}
        </li>
      ))}
    </ul>
  );
}