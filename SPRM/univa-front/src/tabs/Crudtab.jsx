import React, { useState, useEffect } from 'react';

const CrudTab = ({ label, fields, service }) => {
  const [items, setItems] = useState([]);
  const [newItem, setNewItem] = useState({});
  const [editing, setEditing] = useState(null);

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    const response = await service.getAll();
    setItems(response.data);
  };

  const handleCreate = async () => {
    await service.create(newItem);
    setNewItem({});
    fetchItems();
  };

  const handleUpdate = async (id) => {
    await service.update(id, editing);
    setEditing(null);
    fetchItems();
  };

  const handleDelete = async (id) => {
    await service.remove(id);
    fetchItems();
  };

  return (
    <div className="mt-4">
      <h2 className="text-2xl mb-2">{label}</h2>
      <div className="mb-4">
        {fields.map(field => (
          <input
            key={field.name}
            type="text"
            value={newItem[field.name] || ''}
            onChange={(e) => setNewItem({ ...newItem, [field.name]: e.target.value })}
            placeholder={field.placeholder}
            className="border p-2 mr-2"
          />
        ))}
        <button onClick={handleCreate} className="bg-green-500 text-white px-4 py-2">Add</button>
      </div>
      <table className="w-full border">
        <thead>
          <tr className="bg-gray-100">
            <th className="border p-2">ID</th>
            {fields.map(field => (
              <th key={field.name} className="border p-2">{field.label}</th>
            ))}
            <th className="border p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {items.map(item => (
            <tr key={item.id || item.deptId}>
              <td className="border p-2">{item.id || item.deptId}</td>
              {fields.map(field => (
                <td key={field.name} className="border p-2">
                  {editing && (editing.id || editing.deptId) === (item.id || item.deptId) ? (
                    <input
                      type="text"
                      value={editing[field.name]}
                      onChange={(e) => setEditing({ ...editing, [field.name]: e.target.value })}
                      className="border p-1"
                    />
                  ) : (
                    item[field.name]
                  )}
                </td>
              ))}
              <td className="border p-2">
                {editing && (editing.id || editing.deptId) === (item.id || item.deptId) ? (
                  <button
                    onClick={() => handleUpdate(item.id || item.deptId)}
                    className="bg-blue-500 text-white px-2 py-1 mr-2"
                  >
                    Save
                  </button>
                ) : (
                  <button
                    onClick={() => setEditing(item)}
                    className="bg-yellow-500 text-white px-2 py-1 mr-2"
                  >
                    Edit
                  </button>
                )}
                <button
                  onClick={() => handleDelete(item.id || item.deptId)}
                  className="bg-red-500 text-white px-2 py-1"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CrudTab;
