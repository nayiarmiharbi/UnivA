-- Create the database
DROP DATABASE IF EXISTS UnivA;
CREATE DATABASE IF NOT EXISTS UnivA;
USE UnivA;

SET FOREIGN_KEY_CHECKS = 0;
DROP TABLE IF EXISTS Department;
DROP TABLE IF EXISTS Program;
DROP TABLE IF EXISTS Course;
DROP TABLE IF EXISTS Student;
DROP TABLE IF EXISTS Enrollment;
DROP TABLE IF EXISTS Faculty;
SET FOREIGN_KEY_CHECKS = 1;

-- Department Table
CREATE TABLE Department (
    dept_id INT AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL UNIQUE,
    PRIMARY KEY (dept_id)
);

CREATE TABLE Faculty (
    faculty_id INT AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    dob DATE,
    enrollment_year YEAR,
    dept_id INT NOT NULL,
    PRIMARY KEY (faculty_id),
    FOREIGN KEY (dept_id) REFERENCES Department(dept_id) ON DELETE CASCADE
);

-- Program Table (e.g., BSc in CSE, MSc in SWE, PhD in AI)
CREATE TABLE Program (
    program_id INT AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL,
    level ENUM('Undergraduate', 'Masters', 'PhD') NOT NULL,
    dept_id INT NOT NULL,
    UNIQUE (name, level, dept_id),
    PRIMARY KEY (program_id),
    FOREIGN KEY (dept_id) REFERENCES Department(dept_id) ON DELETE CASCADE
);

-- Course Table (courses may be offered under specific programs)
CREATE TABLE Course (
    course_id INT AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL,
    code VARCHAR(20) NOT NULL UNIQUE,
    credits INT CHECK (credits > 0),
    program_id INT,
    teach_id INT,
    PRIMARY KEY (course_id),
    FOREIGN KEY (teach_id) REFERENCES faculty(faculty_id) ON DELETE SET NULL,
    FOREIGN KEY (program_id) REFERENCES Program(program_id) ON DELETE SET NULL
);

-- Student Table (now linked to a Program)
CREATE TABLE Student (
    student_id INT AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    dob DATE,
    enrollment_year YEAR,
    program_id INT,
    PRIMARY KEY (student_id),
    FOREIGN KEY (program_id) REFERENCES Program(program_id) ON DELETE SET NULL
);

-- Enrollment Table (Many-to-Many between Student and Course)
CREATE TABLE Enrollment (
    student_id INT,
    course_id INT,
    semester VARCHAR(20),
    grade CHAR(2),
    PRIMARY KEY (student_id, course_id, semester),
    FOREIGN KEY (student_id) REFERENCES Student(student_id) ON DELETE CASCADE,
    FOREIGN KEY (course_id) REFERENCES Course(course_id) ON DELETE CASCADE
);


-- ======================Inserting Initial Values================================
INSERT INTO Department (name) VALUES ('ME');
