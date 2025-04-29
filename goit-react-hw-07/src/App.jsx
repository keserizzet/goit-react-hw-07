import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  // Başlangıçta localStorage'dan yükle
  const [entries, setEntries] = useState(() => {
    const saved = localStorage.getItem('entries');
    return saved ? JSON.parse(saved) : [];
  });
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [editId, setEditId] = useState(null);

  // entries değiştiğinde localStorage'a kaydet
  useEffect(() => {
    localStorage.setItem('entries', JSON.stringify(entries));
  }, [entries]);

  // Ekleme ve güncelleme metodu
  const handleAddOrUpdate = () => {
    const trimmedName = name.trim();
    const trimmedPhone = phone.trim();
    if (!trimmedName || !trimmedPhone) return;

    if (editId) {
      setEntries(
        entries.map(entry =>
          entry.id === editId
            ? { ...entry, name: trimmedName, phone: trimmedPhone }
            : entry
        )
      );
      setEditId(null);
    } else {
      setEntries([
        ...entries,
        { id: Date.now(), name: trimmedName, phone: trimmedPhone }
      ]);
    }

    setName('');
    setPhone('');
  };

  // Düzenleme metodu
  const handleEdit = (id) => {
    const entry = entries.find(e => e.id === id);
    if (entry) {
      setName(entry.name);
      setPhone(entry.phone);
      setEditId(id);
    }
  };

  // Silme metodu
  const handleDelete = (id) => {
    setEntries(entries.filter(e => e.id !== id));
    if (editId === id) {
      setEditId(null);
      setName('');
      setPhone('');
    }
  };

  // Arama filtresi (isim veya telefon)
  const filteredEntries = entries.filter(entry =>
    entry.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    entry.phone.includes(searchTerm)
  );

  return (
    <div className="app-container">
      <h1>Rehber Uygulaması</h1>

      <div className="controls">
        <input
          type="text"
          placeholder="İsim"
          value={name}
          onChange={e => setName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Telefon Numarası"
          value={phone}
          onChange={e => setPhone(e.target.value)}
        />
        <button onClick={handleAddOrUpdate}>
          {editId ? 'Güncelle' : 'Ekle'}
        </button>
        {editId && (
          <button onClick={() => {
            setEditId(null);
            setName('');
            setPhone('');
          }}>
            İptal
          </button>
        )}
      </div>

      <div className="controls">
        <input
          type="text"
          placeholder="Ara"
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
        />
      </div>

      <ul className="item-list">
        {filteredEntries.map(entry => (
          <li key={entry.id} className="item">
            <span>{entry.name} - {entry.phone}</span>
            <button onClick={() => handleEdit(entry.id)}>Düzenle</button>
            <button onClick={() => handleDelete(entry.id)}>Sil</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;