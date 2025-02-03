DROP TABLE IF EXISTS applications;
DROP TABLE IF EXISTS staff;
DROP TABLE IF EXISTS users;

-- Public Users Table
CREATE TABLE users (
    user_id VARCHAR(36) PRIMARY KEY,
    first_name VARCHAR(50),
    last_name VARCHAR(50),
    phone VARCHAR(10),
    email VARCHAR(50) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL, -- Hashed
    nic VARCHAR(12) UNIQUE NOT NULL
);

-- Staff Users Table
CREATE TABLE staff (
    staff_id VARCHAR(36) PRIMARY KEY,
    first_name VARCHAR(50),
    last_name VARCHAR(50),
    phone VARCHAR(10),
    email VARCHAR(50) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL, -- Hashed
    nic VARCHAR(12) UNIQUE NOT NULL,
    security_key VARCHAR(36) NOT NULL UNIQUE,
    role ENUM('administrative', 'managerial') NOT NULL DEFAULT 'managerial',
    job_title VARCHAR(50)
);

-- Applications Table
CREATE TABLE applications (
    application_id VARCHAR(36) PRIMARY KEY,
    applicant_id VARCHAR(36) NOT NULL,
    submitted_date TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    status ENUM('pending', 'under review', 'approved', 'rejected') NOT NULL DEFAULT 'pending',
    reviewed_by VARCHAR(36),
    assigned_to VARCHAR(36),
    title VARCHAR(50) NOT NULL,
    description TEXT NOT NULL,
    signed_by VARCHAR(36),
    signed_date TIMESTAMP,
    remarks TEXT,
    FOREIGN KEY (applicant_id) REFERENCES users(user_id) ON DELETE CASCADE,
    FOREIGN KEY (reviewed_by) REFERENCES staff(staff_id) ON DELETE SET NULL,
    FOREIGN KEY (assigned_to) REFERENCES staff(staff_id) ON DELETE SET NULL,
    FOREIGN KEY (signed_by) REFERENCES staff(staff_id) ON DELETE SET NULL
);

-- Indexes for Performance
CREATE INDEX idx_users_nic ON users(nic);
CREATE INDEX idx_staff_email ON staff(email);
CREATE INDEX idx_applications_status ON applications(status);
CREATE INDEX idx_applications_assigned_to ON applications(assigned_to);
