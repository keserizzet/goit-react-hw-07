import React, { useState } from 'react';
import './App.css';

function App() {
  const [items, setItems] = useState([]);
  const [newItem, setNewItem] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  // Ekleme metodu
  const handleAddItem = () => {
    const trimmed = newItem.trim();
    if (trimmed) {
      setItems([...items, { id: Date.now(), text: trimmed }]);
      setNewItem('');
    }
  };

  // Silme metod
  const handleDeleteItem = (id) => {
    setItems(items.filter(item => item.id !== id));
  };

  // Arama sonuçları
  const filteredItems = items.filter(item =>
    item.text.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="app-container">
      <h1>Item Manager</h1>
      <div className="controls">
        <input
          type="text"
          placeholder="Yeni öğe ekle"
          value={newItem}
          onChange={e => setNewItem(e.target.value)}
        />
        <button onClick={handleAddItem}>Ekle</button>
      </div>

      <div className="controls">
        <input
          type="text"
          placeholder="Arama yap"
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
        />
      </div>

      <ul className="item-list">
        {filteredItems.map(item => (
          <li key={item.id} className="item">
            <span>{item.text}</span>
            <button onClick={() => handleDeleteItem(item.id)}>Sil</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
