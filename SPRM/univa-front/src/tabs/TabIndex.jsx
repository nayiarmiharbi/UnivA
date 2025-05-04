import React, { useState } from 'react';
import DepartmentList from './DepartmentList';
import DepartmentAdd from './DepartmentAdd';
import DepartmentEdit from './DepartmentEdit';

const TabIndex = () => {
  const [activeTab, setActiveTab] = useState('list');

  const renderTab = () => {
    switch (activeTab) {
      case 'add':
        return <DepartmentAdd />;
      case 'edit':
        return <DepartmentEdit />;
      case 'list':
      default:
        return <DepartmentList onEdit={() => setActiveTab('edit')} />;
    }
  };

  return (
    <div>
      <div className="flex space-x-2 mb-4">
        <button onClick={() => setActiveTab('list')} className="px-4 py-2 bg-gray-200">List</button>
        <button onClick={() => setActiveTab('add')} className="px-4 py-2 bg-gray-200">Add</button>
        {/* Edit tab is hidden unless triggered via List */}
      </div>
      {renderTab()}
    </div>
  );
};

export default TabIndex;
