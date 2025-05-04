package com.raiyan.univa.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.raiyan.univa.model.Department;
import com.raiyan.univa.repository.DepartmentRepository;

@Service
public class DepartmentService {
    private final DepartmentRepository repository;

    public DepartmentService(DepartmentRepository repository) {
        this.repository = repository;
    }

    public List<Department> getAllDepartments() {
        return repository.findAll();
    }

    public Department getDepartmentById(int id) {
        return repository.findById(id);
    }

    public Department createDepartment(Department department) {
        int generatedId = repository.save(department);
        department.setDeptId(generatedId);
        return department;
    }

    public Department updateDepartment(int id, Department department) {
        Department existing = repository.findById(id);
        if (existing != null) {
            repository.update(id, department);
            return department;
        } else {
            throw new RuntimeException("Department not found with ID: " + id);
        }
    }

    public void deleteDepartment(int id) {
        repository.delete(id);
    }
}
