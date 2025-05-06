import React, { useState, useEffect } from 'react';

const CricketInventory = () => {
  const [items, setItems] = useState([]);
  const [formData, setFormData] = useState({
    id: '',
    name: '',
    category: '',
    price: '',
    stock: '',
    brand: '',
    description: ''
  });
  const [isEditing, setIsEditing] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'ascending' });

  // Load initial data
  useEffect(() => {
    // Mock initial inventory data
    const initialItems = [
      {
        id: '1',
        name: 'Kookaburra Ghost Pro',
        category: 'Bat',
        price: 299.99,
        stock: 15,
        brand: 'Kookaburra',
        description: 'Professional grade cricket bat with premium willow.'
      },
      {
        id: '2',
        name: 'GM Diamond Test Gloves',
        category: 'Gloves',
        price: 89.99,
        stock: 24,
        brand: 'Gunn & Moore',
        description: 'Premium batting gloves used by test professionals.'
      },
      {
        id: '3',
        name: 'Kookaburra Turf Ball',
        category: 'Ball',
        price: 24.99,
        stock: 50,
        brand: 'Kookaburra',
        description: 'Red cricket ball used in professional matches.'
      },
      {
        id: '4',
        name: 'SG Test Helmet',
        category: 'Protective Gear',
        price: 129.99,
        stock: 18,
        brand: 'SG',
        description: 'Premium cricket helmet with titanium grille.'
      },
      {
        id: '5',
        name: 'New Balance TC 860 Spikes',
        category: 'Footwear',
        price: 119.99,
        stock: 22,
        brand: 'New Balance',
        description: 'Professional cricket shoes with metal spikes.'
      }
    ];
    setItems(initialItems);
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: name === 'price' || name === 'stock' ? parseFloat(value) || '' : value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isEditing) {
      // Update existing item
      setItems(
        items.map((item) => (item.id === formData.id ? formData : item))
      );
      setIsEditing(false);
    } else {
      // Add new item with unique ID
      const newId = (Math.max(...items.map(item => parseInt(item.id)), 0) + 1).toString();
      setItems([...items, { ...formData, id: newId }]);
    }
    
    // Reset form
    setFormData({
      id: '',
      name: '',
      category: '',
      price: '',
      stock: '',
      brand: '',
      description: ''
    });
    setShowForm(false);
  };

  const handleEdit = (item) => {
    setFormData(item);
    setIsEditing(true);
    setShowForm(true);
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this item?')) {
      setItems(items.filter((item) => item.id !== id));
    }
  };

  const handleCancel = () => {
    setFormData({
      id: '',
      name: '',
      category: '',
      price: '',
      stock: '',
      brand: '',
      description: ''
    });
    setIsEditing(false);
    setShowForm(false);
  };

  const handleSort = (key) => {
    let direction = 'ascending';
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };

  const sortedItems = React.useMemo(() => {
    let sortableItems = [...items];
    if (sortConfig.key) {
      sortableItems.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === 'ascending' ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === 'ascending' ? 1 : -1;
        }
        return 0;
      });
    }
    return sortableItems;
  }, [items, sortConfig]);

  const filteredItems = sortedItems.filter(
    (item) =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.brand.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="inventory-container">
      <div className="inventory-header">
        <h1>Cricket Inventory Management</h1>
        <div className="inventory-controls">
          <div className="search-container">
            <input
              type="text"
              placeholder="Search inventory..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />
          </div>
          <button 
            className="add-item-btn"
            onClick={() => setShowForm(!showForm)}
          >
            {showForm ? 'Hide Form' : 'Add New Item'}
          </button>
        </div>
      </div>

      {showForm && (
        <div className="form-container">
          <h2>{isEditing ? 'Edit Item' : 'Add New Item'}</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-grid">
              <div className="form-group">
                <label htmlFor="name">Item Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="category">Category</label>
                <select
                  id="category"
                  name="category"
                  value={formData.category}
                  onChange={handleInputChange}
                  required
                >
                  <option value="">Select Category</option>
                  <option value="Bat">Bat</option>
                  <option value="Ball">Ball</option>
                  <option value="Gloves">Gloves</option>
                  <option value="Protective Gear">Protective Gear</option>
                  <option value="Footwear">Footwear</option>
                  <option value="Clothing">Clothing</option>
                  <option value="Accessories">Accessories</option>
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="brand">Brand</label>
                <input
                  type="text"
                  id="brand"
                  name="brand"
                  value={formData.brand}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="price">Price ($)</label>
                <input
                  type="number"
                  id="price"
                  name="price"
                  min="0"
                  step="0.01"
                  value={formData.price}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="stock">Stock</label>
                <input
                  type="number"
                  id="stock"
                  name="stock"
                  min="0"
                  value={formData.stock}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="form-group full-width">
                <label htmlFor="description">Description</label>
                <textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  rows="3"
                ></textarea>
              </div>
            </div>

            <div className="form-actions">
              <button type="submit" className="save-btn">
                {isEditing ? 'Update Item' : 'Save Item'}
              </button>
              <button type="button" className="cancel-btn" onClick={handleCancel}>
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="inventory-table-container">
        {filteredItems.length > 0 ? (
          <table className="inventory-table">
            <thead>
              <tr>
                <th onClick={() => handleSort('name')}>
                  Name {sortConfig.key === 'name' && (sortConfig.direction === 'ascending' ? '↑' : '↓')}
                </th>
                <th onClick={() => handleSort('category')}>
                  Category {sortConfig.key === 'category' && (sortConfig.direction === 'ascending' ? '↑' : '↓')}
                </th>
                <th onClick={() => handleSort('brand')}>
                  Brand {sortConfig.key === 'brand' && (sortConfig.direction === 'ascending' ? '↑' : '↓')}
                </th>
                <th onClick={() => handleSort('price')}>
                  Price {sortConfig.key === 'price' && (sortConfig.direction === 'ascending' ? '↑' : '↓')}
                </th>
                <th onClick={() => handleSort('stock')}>
                  Stock {sortConfig.key === 'stock' && (sortConfig.direction === 'ascending' ? '↑' : '↓')}
                </th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredItems.map((item) => (
                <tr key={item.id}>
                  <td>
                    <div className="item-name">{item.name}</div>
                    <div className="item-description">{item.description}</div>
                  </td>
                  <td>{item.category}</td>
                  <td>{item.brand}</td>
                  <td>${item.price.toFixed(2)}</td>
                  <td>
                    <span className={item.stock < 10 ? 'low-stock' : ''}>{item.stock}</span>
                  </td>
                  <td>
                    <div className="action-buttons">
                      <button className="edit-btn" onClick={() => handleEdit(item)}>
                        Edit
                      </button>
                      <button className="delete-btn" onClick={() => handleDelete(item.id)}>
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div className="no-items">
            <p>No items found. Please add new items or adjust your search.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CricketInventory;