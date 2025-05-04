package com.raiyan.univa.repository;

import java.sql.PreparedStatement;
import java.sql.Statement;
import java.util.List;

import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.jdbc.support.GeneratedKeyHolder;
import org.springframework.jdbc.support.KeyHolder;
import org.springframework.stereotype.Repository;

import com.raiyan.univa.model.Department;

@Repository
public class DepartmentRepository {
    private final JdbcTemplate jdbcTemplate;

    public DepartmentRepository(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    private final RowMapper<Department> rowMapper = (rs, rowNum) -> new Department(
            rs.getInt("dept_id"),
            rs.getString("name")
    );

    public int save(Department department) {
        String sql = "INSERT INTO Department (name) VALUES (?)";
        KeyHolder keyHolder = new GeneratedKeyHolder();

        jdbcTemplate.update(connection -> {
            PreparedStatement ps = connection.prepareStatement(sql, Statement.RETURN_GENERATED_KEYS);
            ps.setString(1, department.getName());
            return ps;
        }, keyHolder);

        return keyHolder.getKey().intValue();
    }

    public List<Department> findAll() {
        return jdbcTemplate.query("SELECT * FROM Department", rowMapper);
    }

    public Department findById(int id) {
        String sql = "SELECT * FROM Department WHERE dept_id = ?";
        List<Department> result = jdbcTemplate.query(sql, rowMapper, id);
        return result.isEmpty() ? null : result.get(0);
    }

    public void update(int id, Department department) {
        String sql = "UPDATE Department SET name = ? WHERE dept_id = ?";
        jdbcTemplate.update(sql, department.getName(), id);
    }

    public void delete(int id) {
        String sql = "DELETE FROM Department WHERE dept_id = ?";
        jdbcTemplate.update(sql, id);
    }
}
