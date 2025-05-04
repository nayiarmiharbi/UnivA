import React from 'react';
import CrudTab from '../tabs/Crudtab';
import * as departmentService from '../services/departmentService';

const Department = () => {
  const fields = [
    { name: 'name', label: 'Name', placeholder: 'Department Name' },
  ];

  const service = {
    getAll: departmentService.getDepartments,
    create: departmentService.createDepartment,
    update: departmentService.updateDepartment,
    remove: departmentService.deleteDepartment,
  };

  return (
    <div className="p-4">
      <CrudTab label="Departments" fields={fields} service={service} />
    </div>
  );
};

export default Department;
