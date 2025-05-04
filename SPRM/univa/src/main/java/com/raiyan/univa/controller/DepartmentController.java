package com.raiyan.univa.controller;

import java.util.List;
import java.util.logging.Logger;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.raiyan.univa.model.Department;
import com.raiyan.univa.service.DepartmentService;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api/departments")
public class DepartmentController {
    private static final Logger logger = Logger.getLogger(DepartmentController.class.getName());
    private final DepartmentService service;
    public DepartmentController(DepartmentService service) {
        this.service = service;
    }
    
    @GetMapping
    public ResponseEntity<List<Department>> getAllDepartments() {
        List<Department> departments = service.getAllDepartments();
        return departments.isEmpty() ? ResponseEntity.noContent().build() : ResponseEntity.ok(departments);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Department> getDepartmentById(@PathVariable int id) {
        Department department = service.getDepartmentById(id);
        return department != null ? ResponseEntity.ok(department) : ResponseEntity.notFound().build();
    }

    @PostMapping
    public ResponseEntity<Department> createDepartment(@RequestBody Department department) {
        Department created = service.createDepartment(department);
        logger.info("Created Department with ID: " + created.getDeptId());
        return ResponseEntity.ok(created);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Department> updateDepartment(@PathVariable int id, @RequestBody Department department) {
        Department updated = service.updateDepartment(id, department);
        return ResponseEntity.ok(updated);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteDepartment(@PathVariable int id) {
        service.deleteDepartment(id);
        logger.info("Deleted Department with ID: " + id);
        return ResponseEntity.noContent().build();
    }
}
