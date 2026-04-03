create database project_db;

CREATE TABLE users (
    user_id SERIAL PRIMARY KEY,
    first_name VARCHAR(100),
    last_name VARCHAR(100),
    email VARCHAR(150) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    contact_number VARCHAR(15),
    profile_photo TEXT,
    role VARCHAR(20) DEFAULT 'user',
    gender VARCHAR(10),
    date_of_birth DATE,
    joining_date DATE DEFAULT CURRENT_DATE,
    paid_leaves INT DEFAULT 10,
    unpaid_leaves INT DEFAULT 0,
    total_leaves INT DEFAULT 10,
    used_leaves INT DEFAULT 0,
    remaining_leaves INT DEFAULT 10,
    status VARCHAR(20) DEFAULT 'active',
    last_login TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


CREATE TABLE leaves (
    leave_id SERIAL PRIMARY KEY,
    user_id INT REFERENCES users(user_id) ON DELETE CASCADE,
    leave_type VARCHAR(20),
    start_date DATE,
    end_date DATE,
    reason TEXT,
    status VARCHAR(20) DEFAULT 'pending',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


CREATE TABLE messages (
    message_id SERIAL PRIMARY KEY,
    sender_id INT REFERENCES users(user_id),
    receiver_id INT,
    message TEXT,
    message_type VARCHAR(20) DEFAULT 'text',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,  -- ✅ fixed
    is_read BOOLEAN DEFAULT FALSE
);


CREATE OR REPLACE FUNCTION register_user(
    p_first_name VARCHAR,
    p_last_name VARCHAR,
    p_email VARCHAR,
    p_password VARCHAR,
    p_contact VARCHAR
)
RETURNS VOID AS $$
BEGIN
    INSERT INTO users(first_name, last_name, email, password, contact_number)
    VALUES (p_first_name, p_last_name, p_email, p_password, p_contact);
END;
$$ LANGUAGE plpgsql;



CREATE OR REPLACE FUNCTION login_user(
    p_email VARCHAR,
    p_password VARCHAR
)
RETURNS TABLE(user_id INT, email VARCHAR, role VARCHAR, status VARCHAR) AS $$
BEGIN
    UPDATE users u
    SET last_login = CURRENT_TIMESTAMP
    WHERE u.email = p_email AND u.password = p_password;

    RETURN QUERY
    SELECT u.user_id, u.email, u.role, u.status
    FROM users u
    WHERE u.email = p_email AND u.password = p_password;
END;
$$ LANGUAGE plpgsql;




CREATE OR REPLACE FUNCTION get_dashboard()
RETURNS TABLE(user_id INT, name TEXT, email VARCHAR, role VARCHAR, last_login TIMESTAMP, status VARCHAR) AS $$
BEGIN
    RETURN QUERY
    SELECT u.user_id,
           CONCAT(u.first_name,' ',u.last_name),
           u.email,
           u.role,
           u.last_login,
           u.status
    FROM users u;
END;
$$ LANGUAGE plpgsql;


CREATE OR REPLACE FUNCTION get_user_profile(p_user_id INT)
RETURNS TABLE(profile_photo TEXT, first_name VARCHAR, last_name VARCHAR, full_name TEXT, email VARCHAR, mobile_number VARCHAR, role VARCHAR, date_of_birth DATE, joining_date DATE, paid_leaves INT, unpaid_leaves INT, total_leaves INT, used_leaves INT, remaining_leaves INT) AS $$
BEGIN
    RETURN QUERY
    SELECT u.profile_photo,
           u.first_name,
           u.last_name,
           CONCAT(u.first_name,' ',u.last_name),
           u.email,
           u.contact_number,
           u.role,
           u.date_of_birth,
           u.joining_date,
           u.paid_leaves,
           u.unpaid_leaves,
           u.total_leaves,
           u.used_leaves,
           u.remaining_leaves
    FROM users u
    WHERE u.user_id = p_user_id;
END;
$$ LANGUAGE plpgsql;




CREATE OR REPLACE FUNCTION update_profile(
    p_user_id INT,
    p_first_name VARCHAR,
    p_last_name VARCHAR,
    p_mobile VARCHAR,
    p_dob DATE,
    p_photo TEXT
)
RETURNS VOID AS $$
BEGIN
    UPDATE users u
    SET first_name = p_first_name,
        last_name = p_last_name,
        contact_number = p_mobile,
        date_of_birth = p_dob,
        profile_photo = p_photo,
        updated_at = CURRENT_TIMESTAMP
    WHERE u.user_id = p_user_id;
END;
$$ LANGUAGE plpgsql;



CREATE OR REPLACE FUNCTION apply_leave(
    p_user_id INT,
    p_type VARCHAR,
    p_start DATE,
    p_end DATE,
    p_reason TEXT
)
RETURNS VOID AS $$
BEGIN
    INSERT INTO leaves(user_id, leave_type, start_date, end_date, reason)
    VALUES (p_user_id, p_type, p_start, p_end, p_reason);
END;
$$ LANGUAGE plpgsql;




CREATE OR REPLACE FUNCTION update_leave_status(
    p_leave_id INT,
    p_status VARCHAR
)
RETURNS VOID AS $$
BEGIN
    UPDATE leaves l
    SET status = p_status
    WHERE l.leave_id = p_leave_id;
END;
$$ LANGUAGE plpgsql;



CREATE OR REPLACE FUNCTION send_message(
    p_sender INT,
    p_receiver INT,
    p_message TEXT
)
RETURNS VOID AS $$
BEGIN
    INSERT INTO messages(sender_id, receiver_id, message)
    VALUES (p_sender, p_receiver, p_message);
END;
$$ LANGUAGE plpgsql;



CREATE OR REPLACE FUNCTION get_chat(p_user1 INT, p_user2 INT)
RETURNS TABLE(
    message_id INT,
    sender_id INT,
    receiver_id INT,
    message TEXT,
    msg_time TIMESTAMP
) AS $$
BEGIN
    RETURN QUERY
    SELECT 
        m.message_id,
        m.sender_id,
        m.receiver_id,
        m.message,
        m.created_at
    FROM messages m
    WHERE (m.sender_id = p_user1 AND m.receiver_id = p_user2)
       OR (m.sender_id = p_user2 AND m.receiver_id = p_user1)
    ORDER BY m.created_at;
END;
$$ LANGUAGE plpgsql;



CREATE OR REPLACE FUNCTION update_timestamp()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_update_users
BEFORE UPDATE ON users
FOR EACH ROW
EXECUTE FUNCTION update_timestamp();
