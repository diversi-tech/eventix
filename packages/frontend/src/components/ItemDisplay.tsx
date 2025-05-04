import React, { useState, useEffect } from 'react';
import { getItemById } from '../services/api';
import { StoreItem } from '../types';

const ItemDisplay: React.FC = () => {
  const [item, setItem] = useState<StoreItem | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchItem = async () => {
      try {
        setLoading(true);
        // Fetch item with ID 1 (our mock item)
        const data = await getItemById(1);
        setItem(data);
      } catch (err) {
        setError('Failed to fetch the item. Please try again later.');
        console.error('Error:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchItem();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!item) return <div>No item found.</div>;

  return (
    <div className="item-display">
      <h2>Store Item Details</h2>
      <div className="item-card">
        <h3>{item.itemName}</h3>
        <p>Item Code: {item.itemCode}</p>
        <p>Price: ₪{item.price.toFixed(2)}</p>
        <p>Category: {item.category}</p>
      </div>
      <div className="item-json">
        <h3>JSON Data:</h3>
        <pre>{JSON.stringify(item, null, 2)}</pre>
      </div>
    </div>
  );
};

export default ItemDisplay;