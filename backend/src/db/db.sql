CREATE DATABASE taskapp;

USE taskapp;

CREATE TABLE users(
    id INT(6) NOT NULL AUTO_INCREMENT,
    username VARCHAR(12) NOT NULL,
    password VARCHAR(15) NOT NULL,
    PRIMARY KEY(id)
);

CREATE TABLE projects(
    id INT(9) NOT NULL AUTO_INCREMENT,
    user_id INT(6) NOT NULL,
    title VARCHAR(50) NOT NULL,
    description VARCHAR(255),
    created_at timestamp NOT NULL DEFAULT current_timestamp,
    CONSTRAINT fk_user FOREIGN KEY (user_id) REFERENCES users(id),
    PRIMARY KEY(id)
);

CREATE TABLE tasks(
    id INT(15) NOT NULL AUTO_INCREMENT,
    project_id INT(11) NOT NULL,
    title VARCHAR(100) NOT NULL,
    description VARCHAR(255),
    created_at timestamp NOT NULL DEFAULT current_timestamp,
    CONSTRAINT fk_project FOREIGN KEY (project_id) REFERENCES projects(id),
    PRIMARY KEY(id)
);

CREATE TABLE notes(
    id INT(9) NOT NULL AUTO_INCREMENT,
    user_id INT(6) NOT NULL,
    title VARCHAR(50) NOT NULL,
    description VARCHAR(1000),
    created_at timestamp NOT NULL DEFAULT current_timestamp,
    CONSTRAINT fk_user_notes FOREIGN KEY (user_id) REFERENCES users(id),
    PRIMARY KEY(id)
);

ALTER TABLE tasks ADD done BOOLEAN NOT NULL DEFAULT false AFTER description;
ALTER TABLE tasks MODIFY description VARCHAR(255) DEFAULT " ";

CREATE TABLE events(
    id INT(9) NOT NULL AUTO_INCREMENT,
    user_id INT(6) NOT NULL,
    title VARCHAR(50) NOT NULL,
    start VARCHAR(100) NOT NULL,
    end VARCHAR(100) NOT NULL,
    created_at timestamp NOT NULL DEFAULT current_timestamp,
    CONSTRAINT fk_user_events FOREIGN KEY (user_id) REFERENCES users(id),
    PRIMARY KEY(id)
);