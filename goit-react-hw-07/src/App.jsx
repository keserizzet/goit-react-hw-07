import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { fetchContacts } from './redux/contactsOps';
import ContactList from './components/ContactList/ContactList';

export default function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  return (
    <div>
      <h1>Kişi Rehberi</h1>
      <ContactList />
    </div>
  );
}